// @file: src/components/layout/presentation-slide-body.tsx
import PresentationHeroDiagram from "@/components/layout/presentation-hero-diagram";
import type {
  PresentationCard,
  PresentationColumn,
  PresentationMetric,
  PresentationSlideCopy,
  PresentationSlideDefinition,
} from "@/types/presentation";

type PresentationSlideBodyProps = {
  slide: PresentationSlideDefinition;
  copy: PresentationSlideCopy;
};

function getAccentClass(accent: PresentationCard["accent"] | PresentationColumn["accent"]) {
  return `presentation-accent-badge presentation-accent-badge--${accent}`;
}

function renderCards(cards: PresentationCard[]) {
  return (
    <div className="presentation-card-grid">
      {cards.map((card) => (
        <article key={`${card.title}-${card.icon}`} className="presentation-glass presentation-card">
          <div className={getAccentClass(card.accent)}>{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.body}</p>
          {card.tags?.length ? (
            <div className="presentation-tag-row">
              {card.tags.map((tag) => (
                <span key={tag} className="presentation-tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function renderColumns(columns: PresentationColumn[]) {
  return (
    <div className="presentation-column-grid">
      {columns.map((column) => (
        <article
          key={`${column.title}-${column.icon}`}
          className="presentation-glass presentation-column-card"
        >
          <div className={getAccentClass(column.accent)}>{column.icon}</div>
          <h3>{column.title}</h3>
          <div className="presentation-column-list">
            {column.items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function renderMetrics(metrics: PresentationMetric[]) {
  return (
    <div className="presentation-metric-grid">
      {metrics.map((metric, index) => (
        <article
          key={`${metric.label}-${metric.value}`}
          className="presentation-glass presentation-metric-card"
        >
          <span className="presentation-metric-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="presentation-metric-label">{metric.label}</p>
            <strong className="presentation-metric-value">{metric.value}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function PresentationSlideBody({
  slide,
  copy,
}: PresentationSlideBodyProps) {
  switch (slide.variant) {
    case "hero":
      return (
        <div className="presentation-layout presentation-layout--hero">
          <section className="presentation-copy presentation-copy--hero">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h1 className="presentation-title presentation-title--hero">{copy.title}</h1>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.chips?.length ? (
              <div className="presentation-chip-row">
                {copy.chips.map((chip) => (
                  <span key={chip.text} className="presentation-chip">
                    {chip.text}
                  </span>
                ))}
              </div>
            ) : null}
            {copy.sideNote ? (
              <p className="presentation-side-note">{copy.sideNote}</p>
            ) : null}
          </section>
          <PresentationHeroDiagram nodes={copy.heroNodes ?? []} />
        </div>
      );
    case "summary-list":
      return (
        <div className="presentation-layout presentation-layout--split">
          <section className="presentation-copy">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h2 className="presentation-title">{copy.title}</h2>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.accentNote ? (
              <div className="presentation-accent-note">{copy.accentNote}</div>
            ) : null}
          </section>
          <aside className="presentation-glass presentation-side-panel">
            {copy.panel ? (
              <header className="presentation-panel-header">
                <div>
                  <small>{copy.panel.eyebrow}</small>
                  <h3>{copy.panel.title}</h3>
                </div>
                <div className="presentation-panel-icon">🎯</div>
              </header>
            ) : null}
            <div className="presentation-bullet-list">
              {copy.bulletItems?.map((item) => (
                <div key={item} className="presentation-bullet-item">
                  <span className="presentation-bullet-mark">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      );
    case "flow":
      return (
        <div className="presentation-layout presentation-layout--split">
          <section className="presentation-copy">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h2 className="presentation-title">{copy.title}</h2>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.accentNote ? (
              <div className="presentation-accent-note">{copy.accentNote}</div>
            ) : null}
          </section>
          <aside className="presentation-glass presentation-side-panel">
            <div className="presentation-flow-list">
              {copy.flowItems?.map((item, index) => (
                <div key={item} className="presentation-flow-step">
                  <span className="presentation-flow-index">{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      );
    case "grid-cards":
      return (
        <div className="presentation-layout presentation-layout--stack">
          <section className="presentation-copy">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h2 className="presentation-title">{copy.title}</h2>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.accentNote ? (
              <div className="presentation-accent-note">{copy.accentNote}</div>
            ) : null}
          </section>
          {copy.cards ? renderCards(copy.cards) : null}
        </div>
      );
    case "split-pairs":
      return (
        <div className="presentation-layout presentation-layout--split">
          <section className="presentation-copy">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h2 className="presentation-title">{copy.title}</h2>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.accentNote ? (
              <div className="presentation-accent-note">{copy.accentNote}</div>
            ) : null}
          </section>
          <div className="presentation-pair-grid">
            {copy.cards ? renderCards(copy.cards) : null}
          </div>
        </div>
      );
    case "metrics":
      return (
        <div className="presentation-layout presentation-layout--stack">
          <section className="presentation-copy">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h2 className="presentation-title">{copy.title}</h2>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.accentNote ? (
              <div className="presentation-accent-note">{copy.accentNote}</div>
            ) : null}
          </section>
          {copy.metrics ? renderMetrics(copy.metrics) : null}
        </div>
      );
    case "checklist":
      return (
        <div className="presentation-layout presentation-layout--split">
          <section className="presentation-copy">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h2 className="presentation-title">{copy.title}</h2>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.accentNote ? (
              <div className="presentation-accent-note">{copy.accentNote}</div>
            ) : null}
          </section>
          <aside className="presentation-glass presentation-side-panel">
            {copy.panel ? (
              <header className="presentation-panel-header">
                <div>
                  <small>{copy.panel.eyebrow}</small>
                  <h3>{copy.panel.title}</h3>
                </div>
                <div className="presentation-panel-icon">🗝</div>
              </header>
            ) : null}
            <div className="presentation-bullet-list">
              {copy.bulletItems?.map((item) => (
                <div key={item} className="presentation-bullet-item">
                  <span className="presentation-bullet-mark">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      );
    case "columns":
      return (
        <div className="presentation-layout presentation-layout--stack">
          <section className="presentation-copy">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h2 className="presentation-title">{copy.title}</h2>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.accentNote ? (
              <div className="presentation-accent-note">{copy.accentNote}</div>
            ) : null}
          </section>
          {copy.columns ? renderColumns(copy.columns) : null}
        </div>
      );
    case "stack":
      return (
        <div className="presentation-layout presentation-layout--split">
          <section className="presentation-copy">
            <span className="presentation-eyebrow">{copy.eyebrow}</span>
            <h2 className="presentation-title">{copy.title}</h2>
            <p className="presentation-summary">{copy.summary}</p>
            {copy.accentNote ? (
              <div className="presentation-accent-note">{copy.accentNote}</div>
            ) : null}
          </section>
          <div className="presentation-stack-list">
            {copy.cards?.map((card) => (
              <article
                key={`${card.title}-${card.icon}`}
                className="presentation-glass presentation-stack-card"
              >
                <div className={getAccentClass(card.accent)}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                {card.tags?.length ? (
                  <div className="presentation-tag-row">
                    {card.tags.map((tag) => (
                      <span key={tag} className="presentation-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
