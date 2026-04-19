// @file: apps/web/src/i18n/messages.ts
import { FALLBACK_LOCALE, type AppLocale, type MessageNamespace } from "../schema/i18n";

type MessagesObject = Record<string, unknown>;

function isMessagesObject(value: unknown): value is MessagesObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeMessages(fallback: MessagesObject, localeMessages: MessagesObject): MessagesObject {
  const merged: MessagesObject = { ...fallback };

  for (const [key, value] of Object.entries(localeMessages)) {
    const fallbackValue = merged[key];

    merged[key] =
      isMessagesObject(fallbackValue) && isMessagesObject(value) ? mergeMessages(fallbackValue, value) : value;
  }

  return merged;
}

export async function loadMessagesForNamespace(locale: AppLocale, namespace: MessageNamespace): Promise<MessagesObject> {
  const bundle = await import(`../../messages/${locale}.json`)
    .then((m) => m.default as Record<string, unknown>)
    .catch(() => import(`../../messages/${FALLBACK_LOCALE}.json`).then((m) => m.default as Record<string, unknown>));

  if (!isMessagesObject(bundle)) {
    return {};
  }

  const fromBundle = bundle[namespace];
  const fallbackBundle = await import(`../../messages/${FALLBACK_LOCALE}.json`).then((m) => m.default as Record<string, unknown>);
  const fallbackNamespace = fallbackBundle[namespace];

  if (isMessagesObject(fromBundle) && isMessagesObject(fallbackNamespace)) {
    return mergeMessages(fallbackNamespace, fromBundle);
  }

  if (isMessagesObject(fromBundle)) {
    return fromBundle;
  }

  if (isMessagesObject(fallbackNamespace)) {
    return fallbackNamespace;
  }

  return {};
}

export async function loadMergedMessages(
  locale: AppLocale,
  namespaces: readonly MessageNamespace[],
): Promise<MessagesObject> {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => [namespace, await loadMessagesForNamespace(locale, namespace)] as const),
  );
  return Object.fromEntries(entries);
}
