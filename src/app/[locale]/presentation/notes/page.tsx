// @file: src/app/[locale]/presentation/notes/page.tsx
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PresentationNotesPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "presentation.notes" });

  return (
    <section className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <SubpageControls />
      <div className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("eyebrow")}</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-card-foreground md:text-6xl">{t("title")}</h1>
        <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
          {t.rich("text1", {
            path: (chunks) => <span className="font-semibold text-card-foreground">{chunks}</span>,
          })}
        </p>
      </div>
    </section>
  );
}
