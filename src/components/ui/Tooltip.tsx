// @file: apps/web/src/components/ui/Tooltip.tsx
"use client";

import type { ReactElement, ReactNode } from "react";

type TooltipPlacement = "top" | "right" | "bottom" | "left";

type TooltipProps = {
  content: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  className?: string;
};

const placementClass: Record<TooltipPlacement, { bubble: string }> = {
  top: {
    bubble: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  },
  right: {
    bubble: "left-full top-1/2 -translate-y-1/2 ml-2",
  },
  bottom: {
    bubble: "top-full left-1/2 -translate-x-1/2 mt-2",
  },
  left: {
    bubble: "right-full top-1/2 -translate-y-1/2 mr-2",
  },
};

export function Tooltip({ content, children, placement = "top", className = "" }: TooltipProps) {
  const classes = placementClass[placement];

  return (
    <span className={["relative inline-flex group", className].join(" ")}>
      <span className="inline-flex">
        {children}
      </span>

      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute z-50 rounded-md border px-2 py-1 text-[11px] font-medium tracking-wide shadow-sm",
          "opacity-0 transition-all duration-150 group-hover:opacity-100",
          "border-[hsl(var(--border))] main-bg main-fg",
          "whitespace-nowrap",
          classes.bubble,
        ].join(" ")}
      >
        {content}
      </span>
    </span>
  );
}
