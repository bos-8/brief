// @file: src/components/layout/slide-status-pill.tsx
type SlideStatusPillProps = {
  currentId: string;
  label: string;
  title: string;
};

export default function SlideStatusPill({
  currentId,
  label,
  title,
}: SlideStatusPillProps) {
  return (
    <div className="presentation-status-pill" aria-live="polite">
      <div className="presentation-status-count">
        {String(currentId).padStart(2, "0")}
      </div>
      <div>
        <small>{label}</small>
        <strong>{title}</strong>
      </div>
    </div>
  );
}
