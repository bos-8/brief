// @file: src/components/ui/presentation-print-button.tsx
"use client";

type PresentationPrintButtonProps = {
  label: string;
};

export default function PresentationPrintButton({
  label,
}: PresentationPrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="presentation-control-link"
    >
      {label}
    </button>
  );
}
