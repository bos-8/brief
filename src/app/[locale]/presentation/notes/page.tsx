// @file: src/app/[locale]/presentation/notes/page.tsx
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SubpageControls } from "@/components/layout/SubpageControls";
import { getPresentationNotes } from "@/content/presentationNotes";
import { routing } from "@/i18n/routing";
import type { LocalePageProps } from "@/schema/app";
import { isAppLocale } from "@/schema/i18n";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function SectionBadge({ children }: { children: string }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{children}</p>;
}

export default async function PresentationNotesPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  const notes = await getPresentationNotes(locale);
  const hasDetailedNotes = notes.slides.length > 0;

  return (
    <section className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
      <SubpageControls />

      <header className="max-w-4xl rounded-[2rem] border border-border/60 bg-card/80 px-5 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8 sm:py-8">
        <SectionBadge>{notes.eyebrow}</SectionBadge>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-card-foreground sm:text-4xl lg:text-5xl">
          {notes.title}
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">{notes.lead}</p>
      </header>

      {hasDetailedNotes ? (
        <>
          {notes.slidesHeading ? (
            <section className="rounded-[2rem] border border-border/60 bg-card/75 px-5 py-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur sm:px-7">
              <SectionBadge>{notes.slidesHeading}</SectionBadge>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {notes.slides.map((slide) => (
                  <a
                    key={slide.id}
                    href={`#${slide.id}`}
                    className="rounded-2xl border border-border/70 bg-background/80 px-3 py-3 text-sm font-semibold text-foreground transition hover:border-accent/60 hover:bg-accent/8"
                  >
                    {slide.label}
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <div className="space-y-5">
            {notes.slides.map((slide) => (
              <article
                key={slide.id}
                id={slide.id}
                className="scroll-mt-24 rounded-[2rem] border border-border/60 bg-card/85 px-5 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7 sm:py-7"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <SectionBadge>{slide.label}</SectionBadge>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-card-foreground sm:text-3xl">
                      {slide.title}
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                  <section className="rounded-[1.6rem] border border-border/70 bg-background/80 p-5">
                    {notes.speechLabel ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{notes.speechLabel}</p>
                    ) : null}
                    <p className="mt-3 text-[1.02rem] leading-8 text-foreground/88 sm:text-[1.05rem]">{slide.speech}</p>
                  </section>

                  <aside className="rounded-[1.6rem] border border-border/70 bg-accent/6 p-5">
                    {notes.extensionLabel ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{notes.extensionLabel}</p>
                    ) : null}
                    <p className="mt-3 text-base leading-8 text-foreground/82">{slide.extension}</p>

                    {slide.bullets.length > 0 ? (
                      <ol className="mt-4 space-y-3">
                        {slide.bullets.map((bullet, index) => (
                          <li
                            key={bullet}
                            className="rounded-[1.2rem] border border-border/65 bg-background/80 px-4 py-3 text-sm leading-7 text-muted-foreground sm:text-base"
                          >
                            <span className="mr-2 font-semibold text-card-foreground">{index + 1}.</span>
                            {bullet}
                          </li>
                        ))}
                      </ol>
                    ) : null}
                  </aside>
                </div>
              </article>
            ))}
          </div>

          {notes.summary ? (
            <section className="rounded-[2rem] border border-border/60 bg-card/85 px-5 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7 sm:py-7">
              <SectionBadge>{notes.summary.title}</SectionBadge>
              <div className="mt-5 space-y-4">
                {notes.summary.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-foreground/86 sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {notes.takeaways ? (
            <section className="rounded-[2rem] border border-border/60 bg-card/85 px-5 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7 sm:py-7">
              <SectionBadge>{notes.takeaways.title}</SectionBadge>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {notes.takeaways.items.map((item, index) => (
                  <article
                    key={item.title}
                    className="rounded-[1.6rem] border border-border/70 bg-background/80 px-5 py-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 text-xl font-black tracking-tight text-card-foreground">{item.title}</h2>
                    <p className="mt-3 text-base leading-8 text-muted-foreground">{item.text1}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {notes.overviewSummary ? (
            <section className="rounded-[2rem] border border-accent/30 bg-accent/8 px-5 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7 sm:py-7">
              <SectionBadge>{notes.overviewSummary.title}</SectionBadge>
              <div className="mt-5 space-y-4">
                {notes.overviewSummary.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-foreground/86 sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {notes.qa ? (
            <section className="rounded-[2rem] border border-border/60 bg-card/85 px-5 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7 sm:py-7">
              <SectionBadge>{notes.qa.title}</SectionBadge>
              <div className="mt-5 space-y-4">
                {notes.qa.items.map((item, index) => (
                  <article
                    key={item.question}
                    className="rounded-[1.6rem] border border-border/70 bg-background/80 px-5 py-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                      Q{String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 text-xl font-black tracking-tight text-card-foreground">{item.question}</h2>
                    <p className="mt-3 text-base leading-8 text-muted-foreground">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {notes.abbreviations ? (
            <section className="rounded-[2rem] border border-border/60 bg-card/85 px-5 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7 sm:py-7">
              <SectionBadge>{notes.abbreviations.title}</SectionBadge>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {notes.abbreviations.items.map((item) => (
                  <article
                    key={item.short}
                    className="rounded-[1.6rem] border border-border/70 bg-background/80 px-5 py-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{item.short}</p>
                    <p className="mt-3 text-base leading-8 text-muted-foreground">{item.long}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <section className="rounded-[2rem] border border-border/60 bg-card/85 px-5 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7 sm:py-7">
          {notes.noticeTitle ? <SectionBadge>{notes.noticeTitle}</SectionBadge> : null}
          {notes.noticeText ? (
            <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{notes.noticeText}</p>
          ) : null}
        </section>
      )}
    </section>
  );
}
