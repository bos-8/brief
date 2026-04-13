// @file: src/app/[locale]/presentation/page.tsx
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PresentationPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("presentation");

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 md:py-24">
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

      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-sm">
          <div className="aspect-[16/10] rounded-2xl border border-dashed border-border bg-muted/50" />
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            {t("description")}
          </p>
        </article>

        <aside className="rounded-3xl border border-border bg-background p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80">
            BRIEF
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {t("lead")}
          </p>
        </aside>
      </div>
    </section>
  );
}
