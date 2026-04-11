// @file: src/components/layout/home-landing.tsx
import { ArrowRight, CollectionPlay, LayoutTextWindowReverse } from "react-bootstrap-icons";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import LocaleSwitcher from "@/components/ui/locale-switcher";
import ThemeToggle from "@/components/ui/theme-toggle";

type HomeLandingSlide = {
  id: string;
  order: number;
  title: string;
  description: string;
};

type HomeLandingProps = {
  locale: AppLocale;
  eyebrow: string;
  title: string;
  lead: string;
  startHref: string;
  startLabel: string;
  deckLabel: string;
  slideCountLabel: string;
  themeLabel: string;
  switcherLabel: string;
  backToLanguageLabel: string;
  slides: HomeLandingSlide[];
};

export default function HomeLanding({
  locale,
  eyebrow,
  title,
  lead,
  startHref,
  startLabel,
  deckLabel,
  slideCountLabel,
  themeLabel,
  switcherLabel,
  backToLanguageLabel,
  slides,
}: HomeLandingProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12">
      <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-card-foreground transition hover:border-accent/45"
        >
          <LayoutTextWindowReverse className="size-4" />
          {backToLanguageLabel}
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <LocaleSwitcher
            currentLocale={locale}
            href="/"
            label={switcherLabel}
          />
          <ThemeToggle label={themeLabel} />
        </div>
      </header>

      <section className="grid flex-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="hero-glow space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/74 px-4 py-2 text-sm text-muted-foreground">
            <CollectionPlay className="size-4" />
            <span>{slideCountLabel}</span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {lead}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={startHref}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-92 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {startLabel}
              <ArrowRight className="size-4" />
            </Link>
            <p className="text-sm text-muted-foreground">
              `{startHref}`
            </p>
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-6">
          <div className="mb-5">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {deckLabel}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-card-foreground">
              Slide overview
            </h2>
          </div>

          <div className="grid gap-4">
            {slides.map((slide) => (
              <article
                key={slide.id}
                className="rounded-3xl border border-border bg-background/58 p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent/12 text-sm font-semibold text-accent">
                    {slide.order}
                  </span>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {slide.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  {slide.description}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
