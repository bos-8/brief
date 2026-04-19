// @file: src/app/[locale]/poster/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { LocalePageProps } from "@/schema/app";
import { getPosterContent } from "@/content/posterContent";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/schema/i18n";
import { SubpageControls } from "@/components/layout/SubpageControls";
import { PodcastControls } from "@/components/ui/PodcastControls";
import styles from "./Poster.module.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = repositoryName ? `/${repositoryName}` : "";
const posterLogoSrc = `${basePath}/logo_opole_univercity_of_technology_light.png`;
const posterLogoDarkSrc = `${basePath}/logo_opole_univercity_of_technology_dark.png`;
const posterPodcastSrc = `${basePath}/poster.mp3`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PosterPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);
  const poster = await getPosterContent(locale);

  return (
    <section className={styles.page}>
      <SubpageControls>
        <PodcastControls src={posterPodcastSrc} />
      </SubpageControls>

      <article className={styles.poster}>
        <div className={styles.layout}>
          <header className={styles.header}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>
                <span className={styles.accentAi}>{poster.header.titleParts.ai}</span>
                {poster.header.titleParts.aiSuffix} <span className={styles.accentHuman}>{poster.header.titleParts.human}</span>
                {poster.header.titleParts.humanSuffix}
              </h1>
              <p className={styles.subtitle}>{poster.header.subtitle}</p>
              <div className={styles.authorList}>
                {poster.header.authors.map((author) => (
                  <p key={author} className={styles.authorLine}>
                    {author}
                  </p>
                ))}
              </div>
              <div className={styles.tags}>
                {poster.header.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.logoArea} role="img" aria-label={poster.header.logoAriaLabel}>
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

          <section className={styles.sectionGroup}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>{poster.backgroundIntro.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{poster.backgroundIntro.title}</h2>
            </div>
            <div className={styles.cardGridThree}>
              {poster.backgroundCards.map((card) => (
                <section key={card.title} className={styles.sectionCard}>
                  <span className={styles.sectionNo}>{card.number}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text1}</p>
                </section>
              ))}
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>{poster.practicalExample.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{poster.practicalExample.title}</h2>
            </div>
            <div className={styles.flowSequence}>
              {poster.practicalExample.steps.map((step, index) => (
                <div key={step} className={styles.flowSequenceStep}>
                  <span className={styles.flowSequenceIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>{poster.legalFramework.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{poster.legalFramework.title}</h2>
            </div>
            <div className={styles.cardGridThree}>
              {poster.legalFramework.cards.map((card) => (
                <section key={card.title} className={styles.sectionCard}>
                  <h3>{card.title}</h3>
                  <p>{card.text1}</p>
                </section>
              ))}
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>{poster.centralDiagram.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{poster.centralDiagram.title}</h2>
            </div>
            <div className={styles.diagramLayout}>
              <section className={styles.sectionCard}>
                <h3>{poster.centralDiagram.labelsCardTitle}</h3>
                <div className={styles.labelCloud}>
                  {poster.centralDiagram.labels.map((label) => (
                    <span key={label} className={styles.labelPill}>
                      {label}
                    </span>
                  ))}
                </div>
              </section>

              <section className={styles.framework}>
                <h3>{poster.centralDiagram.ringsCardTitle}</h3>
                <div className={styles.ringGrid}>
                  {poster.centralDiagram.rings.map((card) => (
                    <div key={card.title} className={styles.ringCard}>
                      <span className={styles.ringLabel}>{card.ring}</span>
                      <strong>{card.title}</strong>
                      <p>{card.text1}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>{poster.ethicalIssues.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{poster.ethicalIssues.title}</h2>
            </div>
            <div className={styles.cardGridThree}>
              {poster.ethicalIssues.cards.map((card) => (
                <section key={card.title} className={styles.sectionCard}>
                  <h3>{card.title}</h3>
                  <p>{card.text1}</p>
                </section>
              ))}
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>{poster.patientRights.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{poster.patientRights.title}</h2>
            </div>
            <div className={styles.cardGridThree}>
              {poster.patientRights.cards.map((card) => (
                <section key={card.title} className={styles.sectionCard}>
                  <h3>{card.title}</h3>
                  <p>{card.text1}</p>
                </section>
              ))}
            </div>
            <div className={styles.rightsRow}>
              {poster.patientRights.rights.map((right) => (
                <span key={right} className={styles.rightPill}>
                  {right}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>{poster.riskMatrix.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{poster.riskMatrix.title}</h2>
            </div>
            <div className={styles.matrixGrid}>
              {poster.riskMatrix.rows.map((row) => (
                <article key={row.layer} className={styles.matrixCard}>
                  <div className={styles.matrixMeta}>
                    <span className={styles.matrixLabel}>{poster.riskMatrix.layerLabel}</span>
                    <strong>{row.layer}</strong>
                  </div>
                  <div className={styles.matrixMeta}>
                    <span className={styles.matrixLabel}>{poster.riskMatrix.riskLabel}</span>
                    <p>{row.risk}</p>
                  </div>
                  <div className={styles.matrixMeta}>
                    <span className={styles.matrixLabel}>{poster.riskMatrix.controlLabel}</span>
                    <p>{row.control}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>{poster.conclusion.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{poster.conclusion.title}</h2>
            </div>
            <div className={styles.conclusionStack}>
              {poster.conclusion.paragraphs.map((paragraph, index) => (
                <section key={paragraph} className={styles.sectionCard}>
                  <span className={styles.sectionNo}>{String(index + 1).padStart(2, "0")}.</span>
                  <p className={styles.conclusionText}>{paragraph}</p>
                </section>
              ))}
            </div>
          </section>
        </div>
      </article>
    </section>
  );
}
