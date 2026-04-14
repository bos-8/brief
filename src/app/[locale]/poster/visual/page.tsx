// @file: src/app/[locale]/poster/visual/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import {
  Activity,
  BarChartSteps,
  ClipboardCheck,
  Cpu,
  DatabaseLock,
  Diagram3,
  Eye,
  FileEarmarkLock,
  GraphUp,
  People,
  PersonCheck,
  ShieldCheck,
  ShieldLock,
} from "react-bootstrap-icons";
import type { Icon } from "react-bootstrap-icons";
import { setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";
import styles from "./PosterVisual.module.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = repositoryName ? `/${repositoryName}` : "";
const posterLogoSrc = `${basePath}/logo_politechnika_opolska_en.png`;
const posterLogoDarkSrc = `${basePath}/logo_politechnika_opolska_en_dark.png`;
const frameworkOrnamentSrc = `${basePath}/poster-ornament-framework-gemini.png`;
const riskOrnamentSrc = `${basePath}/poster-ornament-risk-gpt.png`;

type OrnamentStyle = CSSProperties & {
  "--ornament-image": string;
};

type IconCard = {
  icon: Icon;
  title: string;
  body: string;
};

type Tone = "data" | "model" | "decision" | "governance";

type RiskControl = {
  layer: string;
  risk: string;
  control: string;
  tone: Tone;
};

const summaryCards: readonly IconCard[] = [
  {
    icon: Activity,
    title: "Why it matters",
    body: "AI is becoming the coordination layer for mechanical and biological enhancement in realistic healthcare settings.",
  },
  {
    icon: Diagram3,
    title: "What we do",
    body: "We examine ethical risks, legal safeguards, and the design logic of AI-driven human enhancement systems.",
  },
  {
    icon: ShieldCheck,
    title: "What we argue",
    body: "Responsible deployment is possible only when compliance is embedded directly into system architecture.",
  },
];

const riskTriad: readonly IconCard[] = [
  {
    icon: People,
    title: "Militarization and dual use",
    body: "Enhancement systems may be redirected toward performance optimization, coercion, or strategic misuse.",
  },
  {
    icon: DatabaseLock,
    title: "Genetic, biometric, and health data misuse",
    body: "Sensitive data may become tools for exclusion, profiling, or surveillance by employers, insurers, or state actors.",
  },
  {
    icon: BarChartSteps,
    title: "Algorithmic bias and discrimination",
    body: "Biased models and biased input data can amplify inequities in access, diagnosis, and treatment decisions.",
  },
];

const legalGuardrails: readonly IconCard[] = [
  {
    icon: FileEarmarkLock,
    title: "GDPR",
    body: "Genetic, biometric, and health data are special categories requiring strict safeguards.",
  },
  {
    icon: Cpu,
    title: "EU AI Act",
    body: "Most clinical AI applications qualify as high-risk systems with governance, oversight, and monitoring duties.",
  },
  {
    icon: ShieldLock,
    title: "EHDS",
    body: "Health and genomic data circulate through controlled access and regulated secondary-use environments.",
  },
  {
    icon: PersonCheck,
    title: "Oviedo Convention",
    body: "A human-rights-based approach prohibits genetic discrimination and strengthens patient protection.",
  },
];

const evidenceStats = [
  { value: "3", label: "compliance layers" },
  { value: "4", label: "risk-control mappings" },
  { value: "72h", label: "GDPR breach notice window" },
  { value: "6.9M", label: "people linked to the 2023 23andMe breach" },
] as const;

const riskControls: readonly RiskControl[] = [
  {
    layer: "Data Layer",
    risk: "Misuse of genetic and health data",
    control: "Data minimization, access control, purpose limitation",
    tone: "data",
  },
  {
    layer: "AI Model Layer",
    risk: "Algorithmic bias and discrimination",
    control: "Subgroup validation, bias monitoring, representative training data",
    tone: "model",
  },
  {
    layer: "Decision Layer",
    risk: "Fully automated high-impact decisions",
    control: "Human-in-the-loop oversight and explainability mechanisms",
    tone: "decision",
  },
  {
    layer: "System Governance",
    risk: "Lack of accountability and traceability",
    control: "Audit logs, documentation, post-deployment monitoring",
    tone: "governance",
  },
];

const frameworkInputs = ["Wearables", "Clinical records", "Genomic data", "Contextual signals"] as const;
const frameworkLayers = ["Data Governance", "AI Decision-Making", "Oversight and Compliance"] as const;
const frameworkOutputs = ["Preventive recommendations", "Personalized interventions", "Traceable decisions"] as const;

const operationalSteps: readonly IconCard[] = [
  {
    icon: DatabaseLock,
    title: "Input",
    body: "justified data only",
  },
  {
    icon: GraphUp,
    title: "Model",
    body: "subgroup checks",
  },
  {
    icon: PersonCheck,
    title: "Human validation",
    body: "clinician review",
  },
  {
    icon: ClipboardCheck,
    title: "Action",
    body: "traceable recommendation",
  },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function toneClassName(tone: Tone) {
  return {
    data: styles.toneData,
    model: styles.toneModel,
    decision: styles.toneDecision,
    governance: styles.toneGovernance,
  }[tone];
}

function ornamentStyle(src: string): OrnamentStyle {
  return { "--ornament-image": `url("${src}")` };
}

function IconRailCard({ icon: IconComponent, title, body }: IconCard) {
  return (
    <article className={styles.iconRailCard}>
      <span className={styles.iconShell}>
        <IconComponent aria-hidden="true" size={22} />
      </span>
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </article>
  );
}

function SectionLabel({ value }: { value: string }) {
  return <span className={styles.sectionNo}>{value}</span>;
}

export function PosterVisual({ printMode = false }: { printMode?: boolean }) {
  return (
    <section className={`${styles.page} ${printMode ? styles.printPage : ""}`}>
      {!printMode && <SubpageControls />}

      <article className={styles.poster}>
        <div className={styles.layout}>
          <header className={styles.header}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>
                Ethical and Legal Aspects of <span className={styles.accentAi}>AI</span>gmented{" "}
                <span className={styles.accentHuman}>HUMAN</span>ity
              </h1>
              <p className={styles.subtitle}>
                A compliance-by-design framework for AI-driven human enhancement
              </p>
              <p className={styles.authors}>Nikolas Jerzy Feduniewicz, Kacper Bos, Anna Bryniarska</p>
              <p className={styles.affiliation}>
                Department of Computer Science, Opole University of Technology, Opole, Poland
              </p>
              <div className={styles.tags}>
                {["AI Ethics", "Human Enhancement", "GDPR", "AI Act", "Compliance-by-Design"].map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="AIgmented HUMANity visual anchor">
              <div className={styles.logoArea} role="img" aria-label="Opole University of Technology">
                <Image
                  src={posterLogoSrc}
                  alt=""
                  width={1716}
                  height={397}
                  priority
                  aria-hidden="true"
                  className={`${styles.logoImage} ${styles.logoImageLight}`}
                />
                <Image
                  src={posterLogoDarkSrc}
                  alt=""
                  width={1716}
                  height={397}
                  priority
                  aria-hidden="true"
                  className={`${styles.logoImage} ${styles.logoImageDark}`}
                />
              </div>
            </aside>
          </header>

          <section className={styles.summaryRow} aria-label="Poster summary">
            {summaryCards.map((card) => (
              <IconRailCard key={card.title} {...card} />
            ))}
          </section>

          <section className={styles.evidenceStrip} aria-label="Evidence signals from the paper">
            {evidenceStats.map((stat) => (
              <div key={stat.label} className={styles.statCell}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </section>

          <section className={styles.topRow}>
            <section className={styles.sectionCard}>
              <SectionLabel value="01." />
              <h3>From Enhancement to AIgmented HUMANity</h3>
              <p>
                Human enhancement has long progressed along two pathways: mechanical interventions such as prosthetics
                and implants, and biological interventions such as vaccination, regenerative medicine, and gene editing.
                AI now acts as a unifying layer that combines longitudinal health data, clinical knowledge, and
                contextual signals to support prevention, personalization, and functional support.
              </p>
              <p>
                AIgmented HUMANity describes this near-term integration of AI with realistic enhancement technologies.
                The focus is not speculative transhumanism, but practical applications in healthspan, early intervention,
                and quality of life.
              </p>

              <div className={styles.pathwayDiagram} aria-label="Mechanical and biological enhancement pathways">
                <div className={styles.pathwayBranch}>
                  <strong>Mechanical</strong>
                  <span>prosthetics / implants / exoskeletons</span>
                </div>
                <div className={styles.pathwayCenter}>
                  <Cpu aria-hidden="true" size={28} />
                  <strong>AI coordination layer</strong>
                  <span>prediction / personalization / optimization</span>
                </div>
                <div className={styles.pathwayBranch}>
                  <strong>Biological</strong>
                  <span>vaccination / regenerative medicine / gene editing</span>
                </div>
              </div>
            </section>

          <section
            className={`${styles.sectionCard} ${styles.riskLandscapeCard}`}
            style={ornamentStyle(riskOrnamentSrc)}
          >
              <SectionLabel value="02." />
              <h3>Ethical Risk Landscape</h3>
              <p>
                AI-guided human enhancement raises risks that are not speculative. They emerge from existing military
                interest in neurotechnology, strong incentives to exploit sensitive health data, and measurable bias in
                clinical AI systems.
              </p>
              <div className={styles.riskTriad}>
                {riskTriad.map((risk) => (
                  <IconRailCard key={risk.title} {...risk} />
                ))}
              </div>
              <p>
                Ethical deployment therefore requires rights-based design, auditable systems, and enforceable patient
                protections.
              </p>
            </section>

            <section className={styles.sectionCard}>
              <SectionLabel value="03." />
              <h3>Legal and Regulatory Baseline</h3>
              <div className={styles.legalStack}>
                {legalGuardrails.map((item, index) => {
                  const IconComponent = item.icon;

                  return (
                    <article key={item.title} className={styles.legalItem}>
                      <span className={styles.legalIndex}>{String(index + 1).padStart(2, "0")}</span>
                      <IconComponent aria-hidden="true" size={20} />
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.body}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
              <p>
                Together, these frameworks make AI-enabled enhancement legally possible, but only within a strict
                compliance architecture.
              </p>
            </section>
          </section>

          <section className={styles.framework} style={ornamentStyle(frameworkOrnamentSrc)}>
            <div className={styles.frameworkHeader}>
              <div>
                <h3>04. Compliance-by-Design Framework for AI-Driven Human Enhancement</h3>
                <p>Ethical and legal requirements are embedded as system properties, not added after deployment.</p>
              </div>
              <div className={styles.frameworkBadge}>
                <ShieldCheck aria-hidden="true" size={22} />
                <span>measurable controls</span>
              </div>
            </div>

            <div className={styles.frameworkGrid}>
              <div className={styles.frameworkColumn}>
                <span className={styles.columnLabel}>Inputs</span>
                {frameworkInputs.map((input) => (
                  <div key={input} className={styles.frameworkInput}>
                    {input}
                  </div>
                ))}
              </div>

              <div className={styles.frameworkCore} aria-label="Three compliance-by-design layers">
                {frameworkLayers.map((layer, index) => (
                  <div key={layer} className={styles.frameworkLayer}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{layer}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.frameworkColumn}>
                <span className={styles.columnLabel}>Outcomes</span>
                {frameworkOutputs.map((output) => (
                  <div key={output} className={styles.frameworkOutput}>
                    {output}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.bottomRow}>
            <section className={styles.sectionCard}>
              <SectionLabel value="05." />
              <h3>Example of Operationalization</h3>
              <p>
                Consider an AI-supported preventive health platform that combines wearable signals, clinical history,
                and genomic markers to estimate long-term risk and support early intervention. In a compliance-by-design
                model, data collection is limited to justified inputs, model outputs are checked across demographic
                groups, high-impact recommendations require human review, and all decisions remain traceable through
                audit logs.
              </p>
              <div className={styles.operationalFlow} aria-label="Operationalization flow">
                {operationalSteps.map(({ icon: IconComponent, title, body }) => (
                  <div key={title} className={styles.flowStep}>
                    <IconComponent aria-hidden="true" size={21} />
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.sectionCard}>
              <SectionLabel value="06." />
              <h3>From Ethical Risk to Technical Control</h3>
              <div className={styles.riskMatrix} aria-label="Risk to control matrix">
                {riskControls.map((item) => (
                  <article key={item.layer} className={`${styles.riskMatrixRow} ${toneClassName(item.tone)}`}>
                    <div>
                      <span>{item.layer}</span>
                      <strong>{item.risk}</strong>
                    </div>
                    <div>
                      <Eye aria-hidden="true" size={18} />
                      <p>{item.control}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.sectionCard}>
              <SectionLabel value="07." />
              <h3>Conclusions and Implications</h3>
              <ul className={styles.bulletList}>
                <li>AI-driven human enhancement is near-term and technically feasible.</li>
                <li>The central challenge is governance, not only model performance.</li>
                <li>Compliance-by-design translates ethics and law into measurable system requirements.</li>
                <li>The framework is transferable to other AI systems operating on sensitive human data.</li>
              </ul>
              <p className={styles.closing}>Responsible enhancement begins with rights-aware architecture.</p>
            </section>
          </section>

          <footer className={styles.footer}>
            <section className={styles.footerCard}>
              <h3>QR / Contact</h3>
              <div className={styles.qrBox}>QR</div>
              <p>nikolas.feduniewicz@po.edu.pl</p>
            </section>

            <section className={styles.footerCard}>
              <h3>Selected references</h3>
              <ul className={styles.references}>
                <li>Regulation (EU) 2016/679 - GDPR</li>
                <li>Regulation (EU) 2024/1689 - AI Act</li>
                <li>Regulation (EU) 2025/327 - EHDS</li>
                <li>WHO guidance on ethics and governance of AI for health</li>
              </ul>
            </section>

            <section className={styles.footerCard}>
              <h3>Additional references</h3>
              <ul className={styles.references}>
                <li>Bias in clinical AI and subgroup performance evaluation literature</li>
                <li>Research on genetic and genomic data protection risks</li>
                <li>Department of Computer Science, Opole University of Technology</li>
              </ul>
            </section>
          </footer>
        </div>
      </article>
    </section>
  );
}

export default async function PosterVisualPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  return <PosterVisual />;
}
