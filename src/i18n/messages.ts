// @file: apps/web/src/i18n/messages.ts
import { FALLBACK_LOCALE, type AppLocale, type MessageNamespace } from "../schema/i18n";

type MessagesObject = Record<string, unknown>;

export async function loadMessagesForNamespace(locale: AppLocale, namespace: MessageNamespace): Promise<MessagesObject> {
  const bundle = await import(`../../messages/${locale}.json`)
    .then((m) => m.default as Record<string, unknown>)
    .catch(() => import(`../../messages/${FALLBACK_LOCALE}.json`).then((m) => m.default as Record<string, unknown>));

  if (typeof bundle !== "object" || bundle === null) {
    return {};
  }

  const fromBundle = bundle[namespace];
  if (typeof fromBundle === "object" && fromBundle !== null) {
    return fromBundle as MessagesObject;
  }

  const fallbackBundle = await import(`../../messages/${FALLBACK_LOCALE}.json`).then((m) => m.default as Record<string, unknown>);
  const fallbackNamespace = fallbackBundle[namespace];

  if (typeof fallbackNamespace === "object" && fallbackNamespace !== null) {
    return fallbackNamespace as MessagesObject;
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
