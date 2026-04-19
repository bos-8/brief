// @file: src/app/[locale]/page.tsx
import { Cpu, Display, FileEarmarkText, Grid3x3Gap, JournalText } from "react-bootstrap-icons";
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
  label: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: "/presentation" | "/poster";
  notesLabel: string;
  notesHref: "/presentation/notes" | "/poster/notes";
  icon: React.ReactNode;
};

const iconShellClass =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/40 text-accent shadow-sm [&>svg]:h-6 [&>svg]:w-6";

function MaterialCard({
  label,
  title,
  body,
  primaryLabel,
  primaryHref,
  notesLabel,
  notesHref,
  icon,
}: MaterialCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-border bg-card/80 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.12),transparent_32%)] opacity-80" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">{label}</p>
            <h3 className="mt-4 max-w-xl text-2xl font-black tracking-tight text-card-foreground md:text-3xl">
              {title}
            </h3>
          </div>
          <div className={iconShellClass}>
            {icon}
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{body}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-semibold text-card-foreground transition-colors hover:bg-background"
          >
            <Display size={16} />
            {primaryLabel}
          </Link>
          <Link
            href={notesHref}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-background/35 hover:text-card-foreground"
          >
            <JournalText size={16} />
            {notesLabel}
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
        <section className="relative overflow-hidden px-6 pb-8 pt-8 md:pb-12 md:pt-12">
          <div className="hero-accent-glow pointer-events-none absolute inset-x-0 top-24 -z-10 h-72 blur-3xl" />
          <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                {t("overviewEyebrow")}
              </p>
              <h1 className="hero-title-glow mt-5 text-5xl font-black leading-none tracking-tight text-card-foreground sm:text-7xl md:text-[7rem]">
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
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-border bg-card/70 p-6 shadow-sm backdrop-blur-sm">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 rounded-[1.5rem] border border-border bg-background/35 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background/50 text-accent [&>svg]:h-5 [&>svg]:w-5">
                      <Cpu size={22} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{t("descriptionLead")}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{t("descriptionBody")}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-border bg-background/30 p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/45 text-accent [&>svg]:h-5 [&>svg]:w-5">
                        <FileEarmarkText size={20} />
                      </div>
                      <p className="mt-4 text-sm font-semibold tracking-tight text-card-foreground">
                        Presentation notes
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Dedicated notes routes for quick speaker access.
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-border bg-background/30 p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/45 text-accent [&>svg]:h-5 [&>svg]:w-5">
                        <Grid3x3Gap size={20} />
                      </div>
                      <p className="mt-4 text-sm font-semibold tracking-tight text-card-foreground">
                        Static deployment
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Structured for portable publishing on GitHub Pages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 pt-4">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {t("cardsEyebrow")}
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <MaterialCard
                label={t("presentationCardLabel")}
                title={t("presentationCardTitle")}
                body={t("presentationCardBody")}
                primaryLabel={t("openPresentation")}
                primaryHref="/presentation"
                notesLabel={t("openNotes")}
                notesHref="/presentation/notes"
                icon={<Display size={24} />}
              />

              <MaterialCard
                label={t("posterCardLabel")}
                title={t("posterCardTitle")}
                body={t("posterCardBody")}
                primaryLabel={t("openPoster")}
                primaryHref="/poster"
                notesLabel={t("openNotes")}
                notesHref="/poster/notes"
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
