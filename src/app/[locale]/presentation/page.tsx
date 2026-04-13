// @file: src/app/[locale]/presentation/page.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";
import { Slide, slideDeckClassName } from "@/components/presentation/Slide";
import { SlideIndicators } from "@/components/presentation/SlideIndicators";
import { SlideKeyboardNavigation } from "@/components/presentation/SlideKeyboardNavigation";
import { PresentationBackdrop } from "@/components/presentation/PresentationBackdrop";

type SlideItem = {
  id: string;
  index: number;
  title: string;
};

const SLIDES: readonly SlideItem[] = [
  { id: "slide-01", index: 1, title: "Title Slide" },
  { id: "slide-02", index: 2, title: "Why Governance Must Change Now" },
  { id: "slide-03", index: 3, title: "Fragmented Rules, Connected Systems" },
  { id: "slide-04", index: 4, title: "What Counts as AI-Enabled Human Enhancement?" },
  { id: "slide-05", index: 5, title: "The Fundamental Rights Baseline" },
  { id: "slide-06", index: 6, title: "The Threat Map" },
  { id: "slide-07", index: 7, title: "From Therapy to Adversarial Use" },
  { id: "slide-08", index: 8, title: "Connected Implants, Cyber-Physical Risk" },
  { id: "slide-09", index: 9, title: "From Care Data to Social Sorting" },
  { id: "slide-10", index: 10, title: "When Choice Is Shaped by Pressure" },
  { id: "slide-11", index: 11, title: "The Codex of Augmented Humanity" },
  { id: "slide-12", index: 12, title: "Turning Principles into Controls" },
  { id: "slide-13", index: 13, title: "Rights-Based Governance Enables Benefit" },
  { id: "slide-14", index: 14, title: "What This Paper Contributes" },
  { id: "slide-15", index: 15, title: "Closing Slide" },
] as const;

const mainTitleClass =
  "mt-5 text-[clamp(3.4rem,6.6vw,6.8rem)] font-black tracking-[-0.04em] leading-[0.95] text-card-foreground";
const slideTitleClass =
  "mt-4 text-[clamp(2.1rem,4.2vw,4rem)] font-black tracking-[-0.035em] leading-[0.98] text-card-foreground";
const bodyTextClass =
  "mt-5 text-[clamp(1.12rem,1.55vw,1.5rem)] leading-[1.62] text-muted-foreground";
const standardTextClass =
  "text-[clamp(1.02rem,1.25vw,1.22rem)] leading-[1.68] text-muted-foreground";
const chipTextClass =
  "text-[clamp(0.72rem,0.82vw,0.88rem)] font-semibold uppercase tracking-[0.18em]";
const metaTextClass =
  "text-[clamp(0.82rem,0.95vw,0.98rem)] leading-[1.6] text-foreground/52";
const cardTitleClass =
  "text-[clamp(1.22rem,1.8vw,1.8rem)] font-semibold tracking-[-0.025em] text-card-foreground";
const sectionLabelClass = `font-semibold uppercase tracking-[0.22em] text-accent ${chipTextClass}`;

function SlideTag({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <span className="rounded-full border border-border bg-background/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
        {children}
      </span>
    </div>
  );
}

function SlideHeader({
  title,
  eyebrow,
  children,
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-4xl">
      {eyebrow ? (
        <p className={sectionLabelClass}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={slideTitleClass}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        <div
          key={item}
          className={`rounded-[1.25rem] border border-border bg-background/22 px-5 py-4 ${standardTextClass}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function StatementCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center rounded-[1.5rem] border border-border bg-background/28 p-8">
      <p className="text-[clamp(1.9rem,3.2vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-card-foreground">
        {children}
      </p>
    </div>
  );
}

function GridCard({
  title,
  children,
}: {
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-background/24 p-6">
      <h3 className={cardTitleClass}>{title}</h3>
      {children ? <div className={`mt-4 ${standardTextClass}`}>{children}</div> : null}
    </div>
  );
}

function WordStack({ words }: { words: readonly string[] }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5 rounded-[1.5rem] border border-border bg-background/18 p-8">
      {words.map((word) => (
        <div
          key={word}
          className="text-[clamp(2rem,3.4vw,4.6rem)] font-black uppercase tracking-[0.12em] text-card-foreground"
        >
          {word}
        </div>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PresentationPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();

  setRequestLocale(locale);

  const deckId = "presentation-deck";

  return (
    <section className="relative bg-background">
      <PresentationBackdrop />

      <div
        id={deckId}
        className={`relative z-10 h-[100dvh] overflow-y-auto snap-y snap-mandatory ${slideDeckClassName}`}
      >
        <SubpageControls />
        <SlideIndicators deckId={deckId} items={[...SLIDES]} />
        <SlideKeyboardNavigation slideIds={SLIDES.map((item) => item.id)} />

        <Slide id={SLIDES[0].id} index={SLIDES[0].index} title={SLIDES[0].title}>
          <div className="flex h-full flex-col justify-between">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div className="max-w-4xl">
                <p className={sectionLabelClass}>
                  Toward a Codex of Augmented Humanity
                </p>
                <h1 className={mainTitleClass}>
                  A Rights-Based Governance Framework for
                  <br />
                  AI-Enabled Human Enhancement
                </h1>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["AI Governance", "Human Enhancement", "Rights-Based Framework", "Ethics and Policy"].map((chip) => (
                    <span
                      key={chip}
                      className={`rounded-full border border-border bg-background/26 px-4 py-2 text-foreground/70 ${chipTextClass}`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start justify-end">
                <div className="rounded-[1.5rem] border border-dashed border-border bg-background/18 px-5 py-4 text-right text-sm font-semibold uppercase tracking-[0.18em] text-foreground/52">
                  Opole University
                  <br />
                  of Technology
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.5rem] border border-border bg-background/28 p-6">
                <p className={`text-foreground/55 ${chipTextClass}`}>
                  Authors
                </p>
                <div className="mt-5 space-y-4">
                  <p className="text-[clamp(1.18rem,1.55vw,1.72rem)] font-semibold tracking-[-0.02em] text-card-foreground">Kacper Bos</p>
                  <p className="text-[clamp(1.18rem,1.55vw,1.72rem)] font-semibold tracking-[-0.02em] text-card-foreground">
                    Nikolas Jerzy Feduniewicz
                  </p>
                  <p className="text-[clamp(1.18rem,1.55vw,1.72rem)] font-semibold tracking-[-0.02em] text-card-foreground">
                    Anna Bryniarska
                  </p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-background/18 p-6">
                <p className={`text-foreground/55 ${chipTextClass}`}>
                  Affiliation
                </p>
                <div className="mt-5 flex h-[15rem] flex-col justify-between rounded-[1.25rem] border border-dashed border-border bg-background/18 p-5">
                  <p className="text-[clamp(1.18rem,1.45vw,1.55rem)] font-semibold tracking-[-0.02em] text-card-foreground">
                    Department of Computer Science
                  </p>
                  <p className={standardTextClass}>Opole University of Technology</p>
                  <div className={`flex h-20 items-center justify-center rounded-xl border border-border/60 bg-background/20 text-foreground/38 ${chipTextClass}`}>
                    University logo area
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[1].id} index={SLIDES[1].index} title={SLIDES[1].title}>
          <div className="grid h-full gap-8 md:grid-cols-[0.6fr_0.4fr]">
            <div>
              <SlideTag>WHY NOW</SlideTag>
              <SlideHeader title="Why Governance Must Change Now" eyebrow="Problem framing">
                <p className={bodyTextClass}>
                  Human enhancement is becoming a continuous socio-technical system.
                </p>
              </SlideHeader>
              <BulletList
                items={[
                  "AI makes augmentation adaptive, connected, and scalable.",
                  "Control extends beyond the clinic to vendors, platforms, and institutions.",
                  "Governance must address power, not only safety.",
                ]}
              />
            </div>
            <StatementCard>
              Not speculative transhumanism.
              <br />
              This is a governance-by-design problem.
            </StatementCard>
          </div>
        </Slide>

        <Slide id={SLIDES[2].id} index={SLIDES[2].index} title={SLIDES[2].title}>
          <div className="h-full">
            <SlideTag>GOVERNANCE GAP</SlideTag>
            <SlideHeader title="Fragmented Rules, Connected Systems" eyebrow="Regulatory landscape">
              <div className="mt-5 flex flex-wrap gap-2">
                {["AI Act", "GDPR", "MDR", "EHDS"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border bg-background/24 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/65"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </SlideHeader>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <GridCard title="Existing regulatory layers">
                <BulletList
                  items={[
                    "Medical devices and software.",
                    "AI and data protection.",
                    "Cybersecurity and health data.",
                  ]}
                />
              </GridCard>
              <GridCard title="What remains under-governed">
                <BulletList
                  items={[
                    "Continuous adaptation over time.",
                    "Vendor and platform dependency.",
                    "Distributed control over bodily functions.",
                  ]}
                />
              </GridCard>
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[3].id} index={SLIDES[3].index} title={SLIDES[3].title}>
          <div className="grid h-full gap-8 md:grid-cols-[0.6fr_0.4fr]">
            <div>
              <SlideTag>DEFINITION</SlideTag>
              <SlideHeader title="What Counts as AI-Enabled Human Enhancement?" eyebrow="Analytical scope" />
              <BulletList
                items={[
                  "Directly affect bodily or cognitive function.",
                  "Use adaptive or data-driven optimisation.",
                  "Create ongoing technical or economic dependency.",
                ]}
              />
            </div>
            <div className="flex h-full flex-col justify-center gap-4 rounded-[1.5rem] border border-border bg-background/20 p-8">
              {["Sensing", "AI", "Actuation", "Oversight"].map((step) => (
                <div
                  key={step}
                  className="rounded-[1rem] border border-border bg-background/26 px-5 py-4 text-lg font-semibold tracking-tight text-card-foreground"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[4].id} index={SLIDES[4].index} title={SLIDES[4].title}>
          <div className="h-full">
            <SlideTag>RIGHTS</SlideTag>
            <SlideHeader title="The Fundamental Rights Baseline" eyebrow="Normative baseline" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <GridCard title="Dignity">Enhancement must serve the person.</GridCard>
              <GridCard title="Integrity">Protect bodily and mental integrity.</GridCard>
              <GridCard title="Autonomy">Keep consent free and informed.</GridCard>
              <GridCard title="Data and Equality">
                Protect sensitive data.
                <br />
                Prevent discrimination.
              </GridCard>
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[5].id} index={SLIDES[5].index} title={SLIDES[5].title}>
          <div className="h-full">
            <SlideTag>RISK MAP</SlideTag>
            <SlideHeader title="The Threat Map" eyebrow="Structural risk categories" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <GridCard title="Coercion">Pressure in work, defence, or competition.</GridCard>
              <GridCard title="Targeted misuse">Biological harm and dual-use abuse.</GridCard>
              <GridCard title="Cyber-physical control">
                Unsafe connectivity and remote interference.
              </GridCard>
              <GridCard title="Dependency">Profiling, lock-in, and pay-to-live dynamics.</GridCard>
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[6].id} index={SLIDES[6].index} title={SLIDES[6].title}>
          <div className="h-full">
            <SlideTag>THREAT I</SlideTag>
            <SlideHeader title="From Therapy to Adversarial Use" eyebrow="Coercion and misuse" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <GridCard title="Militarisation">
                <BulletList
                  items={[
                    "Hierarchy can destroy meaningful consent.",
                    "Enhancement can become an expected upgrade.",
                    "Irreversible interventions need long-term support.",
                  ]}
                />
              </GridCard>
              <GridCard title="Biological misuse">
                <BulletList
                  items={[
                    "AI can accelerate design and optimisation.",
                    "Sensitive biological data increases targeting risk.",
                    "Harm-oriented use must be absolutely prohibited.",
                  ]}
                />
              </GridCard>
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[7].id} index={SLIDES[7].index} title={SLIDES[7].title}>
          <div className="grid h-full gap-8 md:grid-cols-[0.6fr_0.4fr]">
            <div>
              <SlideTag>THREAT II</SlideTag>
              <SlideHeader title="Connected Implants, Cyber-Physical Risk" eyebrow="Connectivity as bodily risk" />
              <BulletList
                items={[
                  "Failure is not only technical.",
                  "It can become coercive and life-critical.",
                  "Cybersecurity is a bodily integrity issue.",
                ]}
              />
            </div>
            <StatementCard>
              Codex rule
              <br />
              <span className="text-card-foreground">No remote control by default.</span>
              <br />
              If connectivity is necessary:
              <br />
              minimal, authenticated, auditable, fail-safe.
            </StatementCard>
          </div>
        </Slide>

        <Slide id={SLIDES[8].id} index={SLIDES[8].index} title={SLIDES[8].title}>
          <div className="h-full">
            <SlideTag>THREAT III</SlideTag>
            <SlideHeader title="From Care Data to Social Sorting" eyebrow="Inference and profiling" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <GridCard title="Systemic risk">
                <BulletList
                  items={[
                    "AI can turn genetic, biometric, and health data into inference engines.",
                    "Profiling can affect work, insurance, credit, and access.",
                    "Function creep can turn care data into surveillance infrastructure.",
                  ]}
                />
              </GridCard>
              <GridCard title="Codex response">
                <BulletList
                  items={[
                    "Strict purpose limitation.",
                    "No enhancement-based discrimination.",
                    "No reuse for general surveillance or ranking.",
                  ]}
                />
              </GridCard>
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[9].id} index={SLIDES[9].index} title={SLIDES[9].title}>
          <div className="h-full">
            <SlideTag>THREAT IV</SlideTag>
            <SlideHeader title="When Choice Is Shaped by Pressure" eyebrow="Dependency and fairness" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <GridCard title="Economic dependency">
                <BulletList
                  items={[
                    "Life-sustaining functions must not become leverage.",
                    "Vendor lock-in can shift control over the body.",
                    "Continuity and exit mechanisms are essential.",
                  ]}
                />
              </GridCard>
              <GridCard title="Sport and fairness">
                <BulletList
                  items={[
                    "Competition can normalise pressure to upgrade.",
                    "Eligibility rules must protect integrity.",
                    "Therapy must not be treated as unfair advantage.",
                  ]}
                />
              </GridCard>
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[10].id} index={SLIDES[10].index} title={SLIDES[10].title}>
          <div className="h-full">
            <SlideTag>CODEX</SlideTag>
            <SlideHeader title="The Codex of Augmented Humanity" eyebrow="Red lines and constraints" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <GridCard title="No coercive enhancement" />
              <GridCard title="No harmful or population-targeted misuse" />
              <GridCard title="No hidden control of life-critical systems" />
              <GridCard title="No discriminatory or exploitative dependency" />
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[11].id} index={SLIDES[11].index} title={SLIDES[11].title}>
          <div className="h-full">
            <SlideTag>IMPLEMENTATION</SlideTag>
            <SlideHeader title="Turning Principles into Controls" eyebrow="Operational governance" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <GridCard title="Design-time">Hard limits on remote override.</GridCard>
              <GridCard title="Runtime">Human validation, logging, auditability.</GridCard>
              <GridCard title="Lifecycle">Security updates, maintenance, fail-safe modes.</GridCard>
              <GridCard title="Institutional">
                Certification, compliance audits, regulatory oversight.
              </GridCard>
            </div>
          </div>
        </Slide>

        <Slide id={SLIDES[12].id} index={SLIDES[12].index} title={SLIDES[12].title}>
          <div className="grid h-full gap-8 md:grid-cols-[0.6fr_0.4fr]">
            <div>
              <SlideTag>BENEFITS</SlideTag>
              <SlideHeader title="Rights-Based Governance Enables Benefit" eyebrow="Balanced conclusion" />
              <BulletList
                items={[
                  "Restore health, independence, and function.",
                  "Improve precision, monitoring, and personalisation.",
                  "Support therapy without enabling exploitation.",
                ]}
              />
            </div>
            <StatementCard>
              Therapy first.
              <br />
              Enhancement must serve the human being.
            </StatementCard>
          </div>
        </Slide>

        <Slide id={SLIDES[13].id} index={SLIDES[13].index} title={SLIDES[13].title}>
          <div className="grid h-full gap-8 md:grid-cols-[0.6fr_0.4fr]">
            <div>
              <SlideTag>CONTRIBUTION</SlideTag>
              <SlideHeader title="What This Paper Contributes" eyebrow="Research value" />
              <BulletList
                items={[
                  "Defines AI-enabled enhancement as a distinct governance category.",
                  "Maps structural risks beyond traditional safety paradigms.",
                  "Translates fundamental rights into operational governance constraints.",
                ]}
              />
            </div>
            <WordStack words={["Define", "Map", "Operationalise"]} />
          </div>
        </Slide>

        <Slide id={SLIDES[14].id} index={SLIDES[14].index} title={SLIDES[14].title}>
          <div className="flex h-full flex-col items-center justify-center text-center">
            <SlideTag>ACTION</SlideTag>
            <div className="mt-8 max-w-4xl">
              <p className="text-4xl font-black tracking-tight text-card-foreground md:text-6xl">
                We cannot wait.
                <br />
                We need to build the framework now.
              </p>
              <p className="mt-8 text-lg leading-8 text-muted-foreground md:text-2xl">
                Enhancement must serve the human being — never instrumentalise them.
              </p>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
}
