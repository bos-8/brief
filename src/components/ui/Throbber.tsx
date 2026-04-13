// @file: apps/web/src/components/ui/Throbber.tsx

type ThrobberProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
};

const SIZE_TO_CLASS: Record<NonNullable<ThrobberProps["size"]>, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4.5 w-4.5",
  lg: "h-5.5 w-5.5",
};

export function Throbber({ size = "md", label, className = "" }: ThrobberProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${SIZE_TO_CLASS[size]} shrink-0`}
        aria-hidden="true"
      />
      {label ? <span>{label}</span> : null}
    </span>
  );
}
