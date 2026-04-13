// @file: apps/web/src/schemas/i18n.ts

export const APP_LOCALES = ["pl", "en"] as const;
export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "pl";
export const FALLBACK_LOCALE: AppLocale = "en";

export const GLOBAL_MESSAGE_NAMESPACES = ["common", "home"] as const;
export type GlobalMessageNamespace = (typeof GLOBAL_MESSAGE_NAMESPACES)[number];
export type MessageNamespace = GlobalMessageNamespace;

export type LocaleMeta = {
  code: AppLocale;
  label: string;
  flag: string;
};

export const LOCALE_META: readonly LocaleMeta[] = [
  { code: "pl", label: "Polish", flag: "🇵🇱" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

const APP_LOCALE_SET = new Set<string>(APP_LOCALES);

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && APP_LOCALE_SET.has(value);
}

