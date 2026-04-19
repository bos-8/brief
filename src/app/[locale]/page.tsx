// @file: src/app/[locale]/page.tsx
import { Display, Grid3x3Gap } from "react-bootstrap-icons";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { isAppLocale } from "@/schema/i18n";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type MaterialCardProps = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: "/presentation" | "/poster";
  icon: React.ReactNode;
};

const iconShellClass =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/40 text-accent shadow-sm [&>svg]:h-6 [&>svg]:w-6";

function MaterialCard({
  title,
  body,
  primaryLabel,
  primaryHref,
  icon,
}: MaterialCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-border bg-card/80 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.12),transparent_32%)] opacity-80" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <h2 className="max-w-xl text-2xl font-black tracking-tight text-card-foreground md:text-3xl">{title}</h2>
          <div className={iconShellClass}>
            {icon}
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{body}</p>

        <div className="mt-6">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-semibold text-card-foreground transition-colors hover:bg-background"
          >
            <Display size={16} />
            {primaryLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="mx-auto w-full grow">
        <section className="relative overflow-hidden px-6 pb-10 pt-10 md:pb-14 md:pt-14">
          <div className="hero-accent-glow pointer-events-none absolute inset-x-0 top-24 -z-10 h-72 blur-3xl" />
          <div className="mx-auto w-full max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{t("overviewEyebrow")}</p>
            <h1 className="hero-title-glow mt-5 text-5xl font-black leading-none tracking-tight text-card-foreground sm:text-7xl md:text-[6rem]">
              {t("title")}
            </h1>
            <p className="mt-4 text-sm font-medium uppercase tracking-widest text-muted-foreground md:text-base">
              {t("tagline")}
            </p>
            <p className="mt-8 max-w-3xl text-xl font-semibold leading-9 tracking-tight text-card-foreground md:text-2xl">
              {t("overviewTitle")}
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-muted-foreground md:text-base">
              {t("overviewBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/presentation"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground shadow-sm transition-colors hover:bg-background"
              >
                <Display size={16} />
                {t("openPresentation")}
              </Link>
              <Link
                href="/poster"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-5 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-background/35 hover:text-card-foreground"
              >
                <Grid3x3Gap size={16} />
                {t("openPoster")}
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 pt-2">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {t("cardsEyebrow")}
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <MaterialCard
                title={t("presentationCardTitle")}
                body={t("presentationCardBody")}
                primaryLabel={t("openPresentation")}
                primaryHref="/presentation"
                icon={<Display size={24} />}
              />

              <MaterialCard
                title={t("posterCardTitle")}
                body={t("posterCardBody")}
                primaryLabel={t("openPoster")}
                primaryHref="/poster"
                icon={<Grid3x3Gap size={24} />}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
