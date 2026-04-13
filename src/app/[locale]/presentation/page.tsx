// @file: src/app/[locale]/presentation/page.tsx
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";
import { Slide, slideDeckClassName } from "@/components/presentation/Slide";
import { SlideIndicators } from "@/components/presentation/SlideIndicators";
import { SlideKeyboardNavigation } from "@/components/presentation/SlideKeyboardNavigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PresentationPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("presentation");
  const deckId = "presentation-deck";
  const slideItems = [
    { id: "slide-01", index: 1, title: t("slideOneTitle") },
    { id: "slide-02", index: 2, title: t("slideTwoTitle") },
    { id: "slide-03", index: 3, title: t("slideThreeTitle") },
  ];

  return (
    <section
      id={deckId}
      className={`h-[100dvh] overflow-y-auto snap-y snap-mandatory bg-background ${slideDeckClassName}`}
    >
      <SubpageControls />
      <SlideIndicators deckId={deckId} items={slideItems} />
      <SlideKeyboardNavigation slideIds={slideItems.map((item) => item.id)} />

      <Slide id={slideItems[0].id} index={slideItems[0].index} title={slideItems[0].title}>
        <div className="flex h-full flex-col justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {t("slideOneEyebrow")}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-card-foreground md:text-6xl">
              {t("slideOneTitle")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              {t("slideOneBody")}
            </p>
          </div>

          <div className="mt-8 grid flex-1 gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.5rem] border border-border bg-card/80 p-6 shadow-sm">
              <div className="flex h-full items-center justify-center rounded-[1.25rem] border border-dashed border-border bg-background/60">
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground/55">
                  16:9 Canvas
                </span>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-background/60 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/65">
                BRIEF
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {t("lead")}
              </p>
            </div>
          </div>
        </div>
      </Slide>

      <Slide id={slideItems[1].id} index={slideItems[1].index} title={slideItems[1].title}>
        <div className="grid h-full gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between rounded-[1.5rem] border border-border bg-background/60 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {t("slideTwoEyebrow")}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-card-foreground md:text-5xl">
                {t("slideTwoTitle")}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              {t("slideTwoBody")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-rows-3">
            <div className="rounded-[1.5rem] border border-border bg-card/75 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
                Viewport width
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Limits the slide so it never touches the screen edge.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-card/75 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
                Viewport height
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Limits the frame so the canvas still fits vertically with margin.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-card/75 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
                Aspect ratio
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Keeps the actual presentation area locked to 16:9.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      <Slide id={slideItems[2].id} index={slideItems[2].index} title={slideItems[2].title}>
        <div className="flex h-full flex-col justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {t("slideThreeEyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-card-foreground md:text-5xl">
              {t("slideThreeTitle")}
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
              {t("slideThreeBody")}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-border bg-card/75 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-card-foreground">
                100dvh
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Each slide uses a full viewport step.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-card/75 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-card-foreground">
                Snap
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Scrolling lands on the next slide instead of a random vertical offset.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-card/75 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-card-foreground">
                Overlay controls
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Home, language and theme stay fixed outside the deck area.
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </section>
  );
}
