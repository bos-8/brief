// @file: src/app/[locale]/presentation/slide/[id]/page.tsx
import type { Metadata } from "next";
import PresentationShell from "@/components/layout/presentation-shell";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isValidLocale, routing, type AppLocale } from "@/i18n/routing";
import {
  firstPresentationSlideId,
  getPresentationNavigation,
  getPresentationSlide,
  lastPresentationSlideId,
  presentationSlides,
} from "@/schema/presentation";
import type { PresentationSlideCopy } from "@/types/presentation";

type SlidePageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    presentationSlides.map((slide) => ({
      locale,
      id: slide.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: SlidePageProps): Promise<Metadata> {
  const { locale, id } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const slide = getPresentationSlide(id);

  if (!slide) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: `Presentation.slides.${slide.key}`,
  });

  return {
    title: t("title"),
    description: t("summary"),
  };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { locale, id } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const slide = getPresentationSlide(id);

  if (!slide) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Presentation");
  const navigation = getPresentationNavigation(id);

  if (!navigation) {
    notFound();
  }

  const copy = t.raw(`slides.${slide.key}`) as PresentationSlideCopy;
  const slides = presentationSlides.map((definition) => ({
    definition,
    title: t(`slides.${definition.key}.title`),
  }));

  return (
    <PresentationShell
      locale={locale as AppLocale}
      slide={slide}
      copy={copy}
      slides={slides}
      currentPath={`/presentation/slide/${slide.id}`}
      homeHref="/"
      homeLabel={t("backHome")}
      previousHref={
        navigation.previousId ? `/presentation/slide/${navigation.previousId}` : null
      }
      previousLabel={t("previous")}
      nextHref={navigation.nextId ? `/presentation/slide/${navigation.nextId}` : null}
      nextLabel={t("next")}
      firstHref={`/presentation/slide/${firstPresentationSlideId}`}
      lastHref={`/presentation/slide/${lastPresentationSlideId}`}
      deckBadgeLabel={t("deckBadgeLabel")}
      deckBadgeTitle={t("deckBadgeTitle")}
      deckModeLabel={t("deckModeLabel")}
      dotLabel={t("dotNavigationLabel")}
      statusLabel={t("statusLabel")}
      progressLabel={t("progress", {
        current: navigation.index + 1,
        total: presentationSlides.length,
      })}
      hintLabel={t("hintLabel")}
      switcherLabel={t("languageSwitcherLabel")}
      themeLabel={t("themeToggle")}
      printHref="/presentation/print"
      printLabel={t("printLabel")}
    />
  );
}
