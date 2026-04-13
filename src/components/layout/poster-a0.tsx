// @file: src/components/layout/poster-a0.tsx
import Image from "next/image";
import poLogo from "../../../public/logotyp-politechnika-opolska-01-en.png";
import styles from "./poster-a0.module.css";

const risks = [
  {
    title: "1. Militarization & Dual-Use",
    body: "Use of cognitive enhancement and brain-computer interfaces (BCIs) in armed conflicts raises concerns about human agency, responsibility, and lawful targeting [1, 19].",
  },
  {
    title: "2. Data Misuse",
    body: "Discriminatory or exploitative use of highly sensitive genetic, biometric, and health data by insurers or employers remains a core governance risk [5, 33].",
  },
  {
    title: "3. Algorithmic Bias",
    body: "AI systems can inherit and amplify disparities [15, 27]. Standard pulse oximeters can overestimate oxygen saturation in patients with darker skin pigmentation [16, 31].",
  },
];

const regulations = [
  {
    label: "GDPR",
    body: "Classifies genetic, biometric, and health data as special categories of personal data with strict processing limits [8].",
  },
  {
    label: "EU AI Act",
    body: "Classifies many clinical AI systems as high-risk, imposing obligations for data governance, documentation, oversight, robustness, and monitoring [17].",
  },
  {
    label: "EHDS",
    body: "Establishes HealthData@EU and controlled environments for primary care and approved secondary use of health data [6].",
  },
];

const contributions = [
  "Defines AIgmented HUMANity as a near-term synthesis of AI with mechanical and biological enhancement.",
  "Connects ethical risks with enforceable legal safeguards instead of treating them as symbolic principles.",
  "Operationalizes compliance-by-design as measurable AI system requirements.",
];

const scopePoints = [
  "Conceptual and methodological contribution.",
  "Risk-to-control mapping for evaluating AI-driven enhancement systems.",
  "Foundation for reference architectures, bias evaluation, and compliance metrics.",
];

const dataRightsScenarios = [
  {
    title: "Patients' data rights",
    body: "Relevant protections include access, rectification, erasure, portability, and meaningful human review of high-impact automated decisions [30].",
  },
  {
    title: "Genomic breach risk",
    body: "Unlike passwords, genomes cannot be changed once compromised, making breach notification, strong security, and controlled access essential [11, 14].",
  },
  {
    title: "Re-identification",
    body: "Partially anonymized genomic datasets may remain vulnerable to re-identification, extending risk to relatives and population groups [12, 13].",
  },
];

const deploymentSafeguards = [
  "human-rights-based system design",
  "strict data-governance controls",
  "auditability and traceable decisions",
  "enforceable patient protections",
];

const designImplications = [
  {
    metric: "Data access",
    value: "restricted, minimized, auditable",
  },
  {
    metric: "Model validation",
    value: "tested across demographic subgroups",
  },
  {
    metric: "High-impact decisions",
    value: "reviewed by accountable humans",
  },
  {
    metric: "Deployment",
    value: "monitored after release",
  },
];

const layers = [
  {
    title: "System Governance",
    eyebrow: "Control Mechanism",
    body: "Audit logs, documentation, post-deployment monitoring",
    layerClass: styles.layerDark,
    labelClass: styles.layerLabelDark,
  },
  {
    title: "Decision Layer",
    eyebrow: "Risk: Fully automated high-impact decisions",
    body: "Human-in-the-loop oversight, explainability mechanisms",
    layerClass: styles.layerBlue,
    labelClass: styles.layerLabelBlue,
  },
  {
    title: "AI Model Layer",
    eyebrow: "Risk: Algorithmic bias and discrimination",
    body: "Subgroup validation, bias monitoring, representative training data",
    layerClass: styles.layerLightBlue,
    labelClass: styles.layerLabelLightBlue,
  },
  {
    title: "Data Layer",
    eyebrow: "Risk: Misuse of genetic and health data",
    body: "Data minimization, access control, purpose limitation (GDPR)",
    layerClass: styles.layerWhite,
    labelClass: styles.layerLabelWhite,
  },
];

export default function PosterA0() {
  return (
    <div className={styles.shell}>
      <article className={styles.poster} aria-label="AIgmented HUMANity scientific poster">
        <header className={styles.header}>
          <div className={styles.brand} aria-label="Opole University of Technology">
            <Image
              src={poLogo}
              alt="Opole University of Technology"
              className={styles.brandLogo}
              priority
              unoptimized
            />
          </div>

          <div className={styles.titleBlock}>
            <h1 className={styles.title}>
              Ethical and legal aspects of <br />
              <span className={styles.titleStrong}>AIgmented HUMANity</span>
            </h1>
            <p className={styles.authors}>
              Nikolas Jerzy Feduniewicz, Kacper Boś, Anna Bryniarska
            </p>
            <p className={styles.affiliation}>
              Department of Computer Science, Opole University of Technology
            </p>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.leftColumn}>
            <section className={styles.card}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.titleBar} aria-hidden="true" />
                The Concept
              </h2>
              <p className={styles.bodyText}>
                <strong>AIgmented HUMANity</strong> describes a near-term integration
                of artificial intelligence with mechanical and biological enhancement.
                It focuses on preventive care, personalized intervention, and longevity
                support.
              </p>
            </section>

            <section className={styles.card}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.titleBar} aria-hidden="true" />
                Article Contribution
              </h2>
              <ul className={styles.contributionList}>
                {contributions.map((item) => (
                  <li className={styles.contributionItem} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.scopeCard}>
              <h2 className={styles.scopeTitle}>Scope of the Work</h2>
              <p className={styles.scopeLead}>
                The contribution is a compliance-by-design evaluation framework
                for AI-driven enhancement systems, not a single product
                implementation.
              </p>
              <ul className={styles.scopeList}>
                {scopePoints.map((item) => (
                  <li className={styles.scopeItem} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${styles.card} ${styles.riskCard}`}>
              <h2 className={styles.riskTitle}>
                <span className={styles.riskTitleBar} aria-hidden="true" />
                Key Ethical Risks
              </h2>

              <div className={styles.riskList}>
                {risks.map((risk) => (
                  <div key={risk.title}>
                    <h3 className={styles.riskHeading}>{risk.title}</h3>
                    <p className={styles.riskBody}>{risk.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.safeguardCard}>
              <h2 className={styles.safeguardTitle}>Deployment Safeguards</h2>
              <p className={styles.safeguardLead}>
                Ethical deployment depends on safeguards embedded directly into
                the system, not on voluntary declarations alone [23].
              </p>
              <ul className={styles.safeguardList}>
                {deploymentSafeguards.map((item) => (
                  <li className={styles.safeguardItem} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className={styles.rightColumn}>
            <section className={styles.regulatoryCard}>
              <h2 className={styles.regulatoryTitle}>Regulatory Landscape</h2>
              <ul className={styles.regulatoryList}>
                {regulations.map((item) => (
                  <li className={styles.regulatoryItem} key={item.label}>
                    <span className={styles.bullet} aria-hidden="true">
                      •
                    </span>
                    <span>
                      <strong>{item.label}:</strong> {item.body}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.dataRightsCard}>
              <h2 className={styles.dataRightsTitle}>
                Data Rights & Misuse Scenarios
              </h2>
              <div className={styles.dataRightsGrid}>
                {dataRightsScenarios.map((item) => (
                  <div className={styles.dataRightsItem} key={item.title}>
                    <h3 className={styles.dataRightsHeading}>{item.title}</h3>
                    <p className={styles.dataRightsBody}>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.frameworkCard}>
              <h2 className={styles.frameworkTitle}>Compliance-by-Design Framework</h2>
              <p className={styles.frameworkLead}>
                System-level mapping of ethical risks to control mechanisms, based
                on Table 1.
              </p>
              <p className={styles.frameworkFlow}>
                Data -&gt; AI Model -&gt; Decision -&gt; Governance
              </p>

              <div className={styles.layerStack}>
                {layers.map((layer) => (
                  <div
                    className={`${styles.layer} ${layer.layerClass}`}
                    key={layer.title}
                  >
                    <div className={`${styles.layerLabel} ${layer.labelClass}`}>
                      <h3 className={styles.layerTitle}>{layer.title}</h3>
                    </div>
                    <div className={styles.layerBody}>
                      <p className={styles.layerEyebrow}>{layer.eyebrow}</p>
                      <p className={styles.layerText}>{layer.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.implicationsCard}>
              <div>
                <h2 className={styles.implicationsTitle}>Design Implications</h2>
                <p className={styles.implicationsLead}>
                  Ethical and regulatory requirements become testable properties
                  of the system architecture.
                </p>
                <div className={styles.exampleBox}>
                  <p className={styles.exampleLabel}>Example scenario</p>
                  <p className={styles.exampleText}>
                    Wearable and genomic risk profiling requires minimized access,
                    subgroup validation, human validation, and audit logs.
                  </p>
                </div>
              </div>
              <div className={styles.metricGrid}>
                {designImplications.map((item) => (
                  <div className={styles.metricCard} key={item.metric}>
                    <p className={styles.metricLabel}>{item.metric}</p>
                    <p className={styles.metricValue}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.conclusion}>
            <h2 className={styles.footerTitle}>Conclusion</h2>
            <p className={styles.footerText}>
              AI-driven human enhancement must be treated as a system design problem.
              Governance requirements cannot be external constraints, but must be
              embedded directly into AI architectures through enforceable mechanisms
              across the AI lifecycle.
            </p>
          </div>
          <address className={styles.contact}>
            <p className={styles.contactTitle}>Contact:</p>
            <p className={styles.contactText}>a.bryniarska@po.edu.pl</p>
            <p className={styles.referencesTitle}>Selected references:</p>
            <p className={styles.referencesText}>
              Citation numbers follow the full paper bibliography. Key refs:
              IHL [1, 19], GDPR [8], EHDS [6], WHO [23], genomic risk [12-14,
              24, 25], bias [15, 16, 31].
            </p>
          </address>
        </footer>
      </article>
    </div>
  );
}
