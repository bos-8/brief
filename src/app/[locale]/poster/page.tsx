// @file: src/app/[locale]/poster/page.tsx
import type { Metadata } from "next";
import PosterA0 from "@/components/layout/poster-a0";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isValidLocale, routing } from "@/i18n/routing";

type PosterPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PosterPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Poster" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default async function PosterPage({ params }: PosterPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <PosterA0 />;
}
