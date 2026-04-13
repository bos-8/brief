// @file: src/app/[locale]/poster/notes/page.tsx
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PosterNotesPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <section className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <SubpageControls />
      <div className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Poster notes</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-card-foreground md:text-6xl">
          Notes for the poster material
        </h1>
        <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
          This route is reserved for poster commentary, supporting speaking notes, and a concise explanation of the
          poster structure.
        </p>
      </div>
    </section>
  );
}
