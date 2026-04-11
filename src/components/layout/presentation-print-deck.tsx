// @file: src/components/layout/presentation-print-deck.tsx
import PresentationSlideBody from "@/components/layout/presentation-slide-body";
import type {
  PresentationSlideCopy,
  PresentationSlideDefinition,
} from "@/types/presentation";

type PresentationPrintDeckProps = {
  deckLabel: string;
  slides: Array<{
    definition: PresentationSlideDefinition;
    copy: PresentationSlideCopy;
  }>;
};

export default function PresentationPrintDeck({
  deckLabel,
  slides,
}: PresentationPrintDeckProps) {
  return (
    <main className="presentation-print-root">
      <div className="presentation-print-header">
        <span>{deckLabel}</span>
      </div>
      <div className="presentation-print-list">
        {slides.map(({ definition, copy }) => (
          <section
            key={definition.id}
            className={`presentation-print-page presentation-tone--${definition.tone}`}
          >
            <div className="presentation-print-index">
              {definition.id.padStart(2, "0")}
            </div>
            <div className="presentation-print-canvas">
              <PresentationSlideBody slide={definition} copy={copy} />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
