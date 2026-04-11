// @file: src/components/layout/locale-entry.tsx
import Link from "next/link";
import { ArrowRight, Globe2 } from "react-bootstrap-icons";
import ThemeToggle from "@/components/ui/theme-toggle";

type LocaleCard = {
  locale: string;
  title: string;
  description: string;
};

type LocaleEntryProps = {
  siteName: string;
  eyebrow: string;
  title: string;
  lead: string;
  themeLabel: string;
  localeCards: readonly LocaleCard[];
};

export default function LocaleEntry({
  siteName,
  eyebrow,
  title,
  lead,
  themeLabel,
  localeCards,
}: LocaleEntryProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
      <div className="mb-8 flex items-center justify-end">
        <ThemeToggle label={themeLabel} />
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="hero-glow space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground">
            <Globe2 className="size-4" />
            <span>{siteName}</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              {eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {lead}
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <div className="mb-5">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Entry
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-card-foreground">
              Select a locale
            </h2>
          </div>
          <div className="grid gap-4">
            {localeCards.map((card) => (
              <Link
                key={card.locale}
                href={`/${card.locale}`}
                className="group rounded-3xl border border-border bg-background/56 p-5 transition hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-card-foreground">
                      {card.title}
                    </p>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 size-5 shrink-0 text-accent transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
