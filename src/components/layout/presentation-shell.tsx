// @file: src/components/layout/presentation-shell.tsx
import { ArrowLeft, ArrowRight, HouseDoor, Keyboard } from "react-bootstrap-icons";
import PresentationControls from "@/components/layout/presentation-controls";
import PresentationSlideBody from "@/components/layout/presentation-slide-body";
import SlideDotsNav from "@/components/layout/slide-dots-nav";
import SlideStatusPill from "@/components/layout/slide-status-pill";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import type {
  PresentationSlideCopy,
  PresentationSlideDefinition,
} from "@/types/presentation";
import PresentationHotkeys from "@/components/ui/presentation-hotkeys";

type PresentationShellProps = {
  locale: AppLocale;
  slide: PresentationSlideDefinition;
  copy: PresentationSlideCopy;
  slides: Array<{ definition: PresentationSlideDefinition; title: string }>;
  currentPath: string;
  homeHref: string;
  homeLabel: string;
  previousHref: string | null;
  previousLabel: string;
  nextHref: string | null;
  nextLabel: string;
  firstHref: string;
  lastHref: string;
  deckBadgeLabel: string;
  deckBadgeTitle: string;
  deckModeLabel: string;
  dotLabel: string;
  statusLabel: string;
  progressLabel: string;
  hintLabel: string;
  switcherLabel: string;
  themeLabel: string;
  printHref: string;
  printLabel: string;
};

export default function PresentationShell({
  locale,
  slide,
  copy,
  slides,
  currentPath,
  homeHref,
  homeLabel,
  previousHref,
  previousLabel,
  nextHref,
  nextLabel,
  firstHref,
  lastHref,
  deckBadgeLabel,
  deckBadgeTitle,
  deckModeLabel,
  dotLabel,
  statusLabel,
  progressLabel,
  hintLabel,
  switcherLabel,
  themeLabel,
  printHref,
  printLabel,
}: PresentationShellProps) {
  return (
    <main className={`presentation-screen presentation-tone--${slide.tone}`}>
      <div className="presentation-ambient presentation-ambient--primary" />
      <div className="presentation-ambient presentation-ambient--secondary" />
      <div className="presentation-grid-overlay" />

      <div className="presentation-deck-badge">
        <div className="presentation-deck-badge__icon">🛡</div>
        <div>
          <small>{deckBadgeLabel}</small>
          <strong>{deckBadgeTitle}</strong>
        </div>
      </div>

      <PresentationControls
        locale={locale}
        currentPath={currentPath}
        switcherLabel={switcherLabel}
        themeLabel={themeLabel}
        printHref={printHref}
        printLabel={printLabel}
      />

      <div className="presentation-corner-tag">{deckModeLabel}</div>

      <SlideDotsNav
        locale={locale}
        currentId={slide.id}
        slides={slides}
        label={dotLabel}
      />

      <SlideStatusPill
        currentId={slide.id}
        label={statusLabel}
        title={copy.title}
      />

      <div className="presentation-bottom-hint">
        <Keyboard className="size-4" />
        <span>{hintLabel}</span>
      </div>

      <div className="presentation-stage">
        <section className="presentation-canvas">
          <div className="presentation-canvas-index">
            {slide.id.padStart(2, "0")}
          </div>
          <div className="presentation-canvas-inner">
            <div className="presentation-progress-pill">{progressLabel}</div>
            <PresentationSlideBody slide={slide} copy={copy} />
          </div>
          <footer className="presentation-canvas-footer">
            {previousHref ? (
              <Link href={previousHref} locale={locale} className="presentation-nav-link">
                <ArrowLeft className="size-[1em]" />
                {previousLabel}
              </Link>
            ) : (
              <span className="presentation-nav-link is-disabled">
                <ArrowLeft className="size-[1em]" />
                {previousLabel}
              </span>
            )}

            <Link href={homeHref} locale={locale} className="presentation-nav-link">
              <HouseDoor className="size-[1em]" />
              {homeLabel}
            </Link>

            {nextHref ? (
              <Link href={nextHref} locale={locale} className="presentation-nav-link is-primary">
                {nextLabel}
                <ArrowRight className="size-[1em]" />
              </Link>
            ) : (
              <Link href={homeHref} locale={locale} className="presentation-nav-link is-primary">
                {homeLabel}
                <ArrowRight className="size-[1em]" />
              </Link>
            )}
          </footer>
        </section>
      </div>

      <PresentationHotkeys
        previousHref={previousHref}
        nextHref={nextHref}
        firstHref={firstHref}
        lastHref={lastHref}
      />
    </main>
  );
}
