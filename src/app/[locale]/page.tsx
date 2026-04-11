// @file: src/app/[locale]/page.tsx
import HomeLanding from "@/components/layout/home-landing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isValidLocale, type AppLocale } from "@/i18n/routing";
import {
  firstPresentationSlideId,
  presentationSlides,
} from "@/schema/presentation";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const slideCopy = await getTranslations("Presentation");

  const slides = presentationSlides.slice(0, 6).map((slide, index) => ({
    id: slide.id,
    order: index + 1,
    title: slideCopy(`slides.${slide.key}.title`),
    description: slideCopy(`slides.${slide.key}.summary`),
  }));

  return (
    <HomeLanding
      locale={locale as AppLocale}
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
      startHref={`/presentation/slide/${firstPresentationSlideId}`}
      startLabel={t("startPresentation")}
      deckLabel={t("deckLabel")}
      slideCountLabel={t("slideCount", { count: presentationSlides.length })}
      themeLabel={t("themeToggle")}
      switcherLabel={t("languageSwitcherLabel")}
      backToLanguageLabel={t("backToLanguage")}
      slides={slides}
    />
  );
}
