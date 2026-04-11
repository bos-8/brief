// @file: src/components/ui/presentation-hotkeys.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

type PresentationHotkeysProps = {
  previousHref: string | null;
  nextHref: string | null;
  firstHref: string;
  lastHref: string;
};

export default function PresentationHotkeys({
  previousHref,
  nextHref,
  firstHref,
  lastHref,
}: PresentationHotkeysProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;

      if (target?.closest("input, textarea, select, [contenteditable='true']")) {
        return;
      }

      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        if (!nextHref) {
          return;
        }

        event.preventDefault();
        router.push(nextHref);
      }

      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        if (!previousHref) {
          return;
        }

        event.preventDefault();
        router.push(previousHref);
      }

      if (event.key === "Home") {
        event.preventDefault();
        router.push(firstHref);
      }

      if (event.key === "End") {
        event.preventDefault();
        router.push(lastHref);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [firstHref, lastHref, nextHref, previousHref, router]);

  return null;
}
