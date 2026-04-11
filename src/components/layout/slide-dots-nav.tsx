// @file: src/components/layout/slide-dots-nav.tsx
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import type { PresentationSlideDefinition } from "@/types/presentation";

type SlideDotsNavProps = {
  locale: AppLocale;
  currentId: string;
  slides: Array<{ definition: PresentationSlideDefinition; title: string }>;
  label: string;
};

export default function SlideDotsNav({
  locale,
  currentId,
  slides,
  label,
}: SlideDotsNavProps) {
  return (
    <nav aria-label={label} className="presentation-dots-nav">
      <div className="presentation-progress-line">
        <div
          className="presentation-progress-fill"
          style={{
            height: `${(slides.findIndex((slide) => slide.definition.id === currentId) + 1) / slides.length * 100}%`,
          }}
        />
      </div>
      <div className="presentation-dots-list">
        {slides.map(({ definition, title }) => {
          const isActive = definition.id === currentId;

          return (
            <div key={definition.id} className="presentation-dot-wrap">
              <Link
                href={`/presentation/slide/${definition.id}`}
                locale={locale}
                aria-label={`${definition.id}. ${title}`}
                className={`presentation-dot ${isActive ? "is-active" : ""}`}
              />
              <span className="presentation-dot-tooltip">
                {definition.id}. {title}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
