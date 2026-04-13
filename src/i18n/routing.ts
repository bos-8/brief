// @file: src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { APP_LOCALES, DEFAULT_LOCALE } from "@/schema/i18n";

export const routing = defineRouting({
  locales: [...APP_LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  localeDetection: true,
});
