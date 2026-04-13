// @file: src/components/presentation/SlideKeyboardNavigation.tsx
"use client";

import { useEffect } from "react";

type SlideKeyboardNavigationProps = {
  slideIds: string[];
};

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tagName = target.tagName.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

export function SlideKeyboardNavigation({ slideIds }: SlideKeyboardNavigationProps) {
  useEffect(() => {
    if (slideIds.length === 0) return;

    function goToSlide(nextIndex: number) {
      const clampedIndex = Math.max(0, Math.min(nextIndex, slideIds.length - 1));
      const target = document.getElementById(slideIds[clampedIndex]);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || isEditableTarget(event.target)) return;

      const currentIndex = slideIds.findIndex((id) => {
        const element = document.getElementById(id);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const viewportMid = window.innerHeight * 0.5;
        return rect.top <= viewportMid && rect.bottom >= viewportMid;
      });

      const activeIndex = currentIndex === -1 ? 0 : currentIndex;

      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      }

      if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [slideIds]);

  return null;
}
