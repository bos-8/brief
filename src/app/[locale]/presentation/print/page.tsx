// @file: src/app/[locale]/presentation/print/page.tsx
import type { Metadata } from "next";
import PresentationPrintDeck from "@/components/layout/presentation-print-deck";
import PresentationPrintButton from "@/components/ui/presentation-print-button";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isValidLocale, routing, type AppLocale } from "@/i18n/routing";
import { firstPresentationSlideId, presentationSlides } from "@/schema/presentation";
import type { PresentationSlideCopy } from "@/types/presentation";
import { notFound } from "next/navigation";

type PresentationPrintPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PresentationPrintPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Presentation" });

  return {
    title: t("printPageTitle"),
    description: t("printPageDescription"),
  };
}

export default async function PresentationPrintPage({
  params,
}: PresentationPrintPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Presentation");
  const slides = presentationSlides.map((definition) => ({
    definition,
    copy: t.raw(`slides.${definition.key}`) as PresentationSlideCopy,
  }));

  return (
    <div className="presentation-print-page-shell">
      <header className="presentation-print-toolbar">
        <Link
          href={`/presentation/slide/${firstPresentationSlideId}`}
          locale={locale as AppLocale}
          className="presentation-control-link"
        >
          {t("backToPresentation")}
        </Link>
        <PresentationPrintButton label={t("printNowLabel")} />
      </header>
      <PresentationPrintDeck deckLabel={t("deckBadgeTitle")} slides={slides} />
    </div>
  );
}
