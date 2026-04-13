// @file: apps/web/src/app/[locale]/page.tsx

import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { isAppLocale } from "@/schema/i18n";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="mx-auto w-full grow">
        <section className="relative flex py-2 flex-col items-center justify-center px-6 text-center">
          <div className="hero-accent-glow pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-64 -translate-y-1/2 blur-3xl" />

          <h1 className="hero-title-glow mt-4 text-6xl font-black leading-none tracking-tight text-card-foreground sm:text-8xl md:text-[10rem] lg:text-[12rem]">
            {t("title")}
          </h1>

          <p className="mt-4 text-sm font-medium uppercase tracking-widest text-muted-foreground md:text-base">
            {t("tagline")}
          </p>
        </section>

        <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 pb-20 text-left">
          <p className="text-sm leading-7 text-muted-foreground">
            {t("descriptionLead")}
          </p>
          <p className="text-sm leading-7 text-card-foreground">
            {t("descriptionBody")}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
