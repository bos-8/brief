// @file: apps/web/src/app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { LocaleLayoutProps } from "@/schema/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BRIEF",
  description: "BRIEF is a bilingual presentation system for scientific talks and conference materials.",
  authors: [{ name: "bos-8", url: "https://github.com/bos-8" }],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main className="grow mx-auto w-full">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}

