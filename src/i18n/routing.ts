// @file: src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en"],
  defaultLocale: "pl",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];

export function isValidLocale(locale: string): locale is AppLocale {
  return routing.locales.includes(locale as AppLocale);
}
