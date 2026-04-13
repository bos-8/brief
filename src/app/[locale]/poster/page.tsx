// @file: src/app/[locale]/poster/page.tsx
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PosterPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("poster");

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 md:py-24">
      <SubpageControls />

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-card-foreground md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
          {t("lead")}
        </p>
      </header>

      <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="aspect-[4/3] rounded-2xl border border-dashed border-border bg-muted/50" />
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          {t("description")}
        </p>
      </article>
    </section>
  );
}
