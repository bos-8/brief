// @file: src/components/layout/document-locale-sync.tsx
"use client";

import { useEffect } from "react";
import type { AppLocale } from "@/i18n/routing";

type DocumentLocaleSyncProps = {
  locale: AppLocale;
};

export default function DocumentLocaleSync({
  locale,
}: DocumentLocaleSyncProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
