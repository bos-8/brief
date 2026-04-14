// @file: src/app/[locale]/poster/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";
import styles from "./Poster.module.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = repositoryName ? `/${repositoryName}` : "";
const posterLogoSrc = `${basePath}/logo_politechnika_opolska_en.png`;
const posterLogoDarkSrc = `${basePath}/logo_politechnika_opolska_en_dark.png`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PosterPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <section className={styles.page}>
      <SubpageControls />

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
          </header>

          <section className={styles.summaryRow}>
            <div className={styles.summaryCard}>
              <h3>Why it matters</h3>
              <p>
                AI is becoming the coordination layer for mechanical and biological enhancement in realistic healthcare
                settings.
              </p>
            </div>
            <div className={styles.summaryCard}>
              <h3>What we do</h3>
              <p>
                We examine ethical risks, legal safeguards, and the design logic of AI-driven human enhancement
                systems.
              </p>
            </div>
            <div className={styles.summaryCard}>
              <h3>What we argue</h3>
              <p>
                Responsible deployment is possible only when compliance is embedded directly into system architecture.
              </p>
            </div>
          </section>

          <section className={styles.topRow}>
            <section className={styles.sectionCard}>
              <span className={styles.sectionNo}>01.</span>
              <h3>From Enhancement to AIgmented HUMANity</h3>
              <p>
                Human enhancement has long progressed along two pathways: mechanical interventions such as prosthetics
                and implants, and biological interventions such as vaccination, regenerative medicine, and gene
                editing. AI now acts as a unifying layer that combines longitudinal health data, clinical knowledge,
                and contextual signals to support prevention, personalization, and functional support.
              </p>
              <p>
                AIgmented HUMANity describes this near-term integration of AI with realistic enhancement technologies.
                The focus is not speculative transhumanism, but practical applications in healthspan, early
                intervention, and quality of life.
              </p>

              <div className={styles.miniDiagram}>
                <div className={styles.miniDiagramRow}>
                  <div className={styles.miniBox}>
                    <strong>Mechanical enhancement</strong>
                    prosthetics, implants, exoskeletons
                  </div>
                  <div className={styles.miniBox}>
                    <strong>Biological enhancement</strong>
                    vaccination, regenerative medicine, gene editing
                  </div>
                  <div className={styles.miniBox}>
                    <strong>AI as coordination layer</strong>
                    prediction, personalization, optimization
                  </div>
                </div>
                <p className={styles.miniDiagramCaption}>
                  Preventive care | Personalized intervention | Longevity support
                </p>
              </div>
            </section>

            <section className={styles.sectionCard}>
              <span className={styles.sectionNo}>02.</span>
              <h3>Ethical Risk Landscape</h3>
              <p>
                AI-guided human enhancement raises risks that are not speculative. They emerge from existing military
                interest in neurotechnology, strong incentives to exploit sensitive health data, and measurable bias in
                clinical AI systems.
              </p>
              <div className={styles.miniDiagram}>
                <div className={styles.miniBox}>
                  <strong>Militarization and dual use</strong>
                  Enhancement systems may be redirected toward performance optimization, coercion, or strategic misuse.
                </div>
                <div className={styles.miniBox}>
                  <strong>Misuse of genetic, biometric, and health data</strong>
                  Sensitive data may become tools for exclusion, profiling, or surveillance by employers, insurers, or
                  state actors.
                </div>
                <div className={styles.miniBox}>
                  <strong>Algorithmic bias and discrimination</strong>
                  Biased models and biased input data can amplify inequities in access, diagnosis, and treatment
                  decisions.
                </div>
              </div>
              <p>
                Ethical deployment therefore requires rights-based design, auditable systems, and enforceable patient
                protections.
              </p>
            </section>

            <section className={styles.sectionCard}>
              <span className={styles.sectionNo}>03.</span>
              <h3>Legal and Regulatory Baseline</h3>
              <div className={styles.miniDiagram}>
                <div className={styles.miniBox}>
                  <strong>GDPR</strong>
                  Genetic, biometric, and health data are special categories requiring strict safeguards.
                </div>
                <div className={styles.miniBox}>
                  <strong>EU AI Act</strong>
                  Most clinical AI applications qualify as high-risk systems and require governance, oversight, and
                  monitoring.
                </div>
                <div className={styles.miniBox}>
                  <strong>EHDS</strong>
                  Health and genomic data may circulate only within controlled access and regulated secondary-use
                  environments.
                </div>
                <div className={styles.miniBox}>
                  <strong>Oviedo Convention</strong>
                  A human-rights-based approach prohibits genetic discrimination and strengthens patient protection.
                </div>
              </div>
              <p>
                Together, these frameworks make AI-enabled enhancement legally possible, but only within a strict
                compliance architecture.
              </p>
            </section>
          </section>

          <section className={styles.framework}>
            <h3>04. Compliance-by-Design Framework for AI-Driven Human Enhancement</h3>
            <div className={styles.frameworkGrid}>
              <div className={styles.frameworkColumn}>
                <div className={styles.frameworkInput}>
                  <strong>Wearables</strong>
                  Continuous bodily and behavioural signals.
                </div>
                <div className={styles.frameworkInput}>
                  <strong>Clinical records</strong>
                  Medical history and structured evidence.
                </div>
                <div className={styles.frameworkInput}>
                  <strong>Genomic data</strong>
                  High-sensitivity biological indicators.
                </div>
                <div className={styles.frameworkInput}>
                  <strong>Contextual signals</strong>
                  Environmental and situational inputs.
                </div>
              </div>

              <div className={styles.frameworkLayers}>
                <div className={styles.frameworkLayer}>
                  <strong>Data Governance Layer</strong>
                  data minimization · purpose limitation · access control · cybersecurity
                </div>
                <div className={styles.frameworkLayer}>
                  <strong>AI Decision-Making Layer</strong>
                  risk prediction · personalization · subgroup validation · explainability
                </div>
                <div className={styles.frameworkLayer}>
                  <strong>Oversight and Compliance Layer</strong>
                  human-in-the-loop review · audit logs · bias monitoring · post-deployment oversight
                </div>
              </div>

              <div className={styles.frameworkColumn}>
                <div className={styles.frameworkOutput}>
                  <strong>Preventive recommendations</strong>
                  Risk-aware support before deterioration.
                </div>
                <div className={styles.frameworkOutput}>
                  <strong>Personalized interventions</strong>
                  Tailored action based on validated inputs.
                </div>
                <div className={styles.frameworkOutput}>
                  <strong>Traceable decisions</strong>
                  Documented and reviewable system outcomes.
                </div>
              </div>
            </div>
            <p className={styles.frameworkNote}>
              Ethical and legal requirements are embedded as system properties, not added after deployment.
            </p>
          </section>

          <section className={styles.bottomRow}>
            <section className={styles.sectionCard}>
              <span className={styles.sectionNo}>05.</span>
              <h3>Example of Operationalization</h3>
              <p>
                Consider an AI-supported preventive health platform that combines wearable signals, clinical history,
                and genomic markers to estimate long-term risk and support early intervention. In a compliance-by-design
                model, data collection is limited to justified inputs, model outputs are checked across demographic
                groups, high-impact recommendations require human review, and all decisions remain traceable through
                audit logs.
              </p>
              <div className={styles.miniFlow}>
                <div className={styles.flowStep}>
                  <strong>Input</strong>
                  <span>justified data only</span>
                </div>
                <div className={styles.flowStep}>
                  <strong>Model</strong>
                  <span>subgroup checks</span>
                </div>
                <div className={styles.flowStep}>
                  <strong>Human validation</strong>
                  <span>clinician review</span>
                </div>
                <div className={styles.flowStep}>
                  <strong>Action</strong>
                  <span>traceable recommendation</span>
                </div>
              </div>
            </section>

            <section className={styles.sectionCard}>
              <span className={styles.sectionNo}>06.</span>
              <h3>From Ethical Risk to Technical Control</h3>
              <div className={styles.riskTable}>
                <div className={styles.riskRow}>
                  <strong>Sensitive data misuse</strong>
                  <span className={styles.arrow}>→</span>
                  <span>data minimization, access control, purpose limitation</span>
                </div>
                <div className={styles.riskRow}>
                  <strong>Bias and discrimination</strong>
                  <span className={styles.arrow}>→</span>
                  <span>subgroup validation, representative data, bias monitoring</span>
                </div>
                <div className={styles.riskRow}>
                  <strong>Automated high-impact decisions</strong>
                  <span className={styles.arrow}>→</span>
                  <span>human oversight, explainability, escalation paths</span>
                </div>
                <div className={styles.riskRow}>
                  <strong>Lack of accountability</strong>
                  <span className={styles.arrow}>→</span>
                  <span>documentation, audit logs, monitoring, incident reporting</span>
                </div>
              </div>
            </section>

            <section className={styles.sectionCard}>
              <span className={styles.sectionNo}>07.</span>
              <h3>Conclusions and Implications</h3>
              <ul className={styles.bulletList}>
                <li>AI-driven human enhancement is near-term and technically feasible.</li>
                <li>The central challenge is governance, not only model performance.</li>
                <li>
                  Compliance-by-design translates ethics and law into measurable system requirements.
                </li>
                <li>
                  The framework is transferable to other AI systems operating on sensitive human data.
                </li>
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
                <li>Regulation (EU) 2016/679 — GDPR</li>
                <li>Regulation (EU) 2024/1689 — AI Act</li>
                <li>Regulation (EU) 2025/327 — EHDS</li>
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
