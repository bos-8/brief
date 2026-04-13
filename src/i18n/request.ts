// @file: src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import {
  DEFAULT_LOCALE,
  GLOBAL_MESSAGE_NAMESPACES,
  isAppLocale,
  type AppLocale,
} from "@/schema/i18n";
import { loadMergedMessages } from "@/i18n/messages";

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedRequestLocale = await requestLocale;
  const locale: AppLocale = isAppLocale(resolvedRequestLocale) ? resolvedRequestLocale : DEFAULT_LOCALE;
  const messages = await loadMergedMessages(locale, GLOBAL_MESSAGE_NAMESPACES);

  return {
    locale,
    messages,
  };
});
