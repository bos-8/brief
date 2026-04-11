// @file: src/schema/presentation.ts
import type { PresentationSlideDefinition } from "@/types/presentation";

export const presentationSlides = [
  { id: "1", key: "intro", tone: "cyan", variant: "hero" },
  { id: "2", key: "critical", tone: "cyan", variant: "summary-list" },
  { id: "3", key: "flow", tone: "violet", variant: "flow" },
  { id: "4", key: "threat-surface", tone: "violet", variant: "grid-cards" },
  { id: "5", key: "enumeration", tone: "amber", variant: "grid-cards" },
  { id: "6", key: "timing", tone: "cyan", variant: "split-pairs" },
  { id: "7", key: "abuse", tone: "amber", variant: "metrics" },
  { id: "8", key: "token", tone: "cyan", variant: "checklist" },
  { id: "9", key: "backend", tone: "emerald", variant: "split-pairs" },
  { id: "10", key: "mfa", tone: "red", variant: "columns" },
  { id: "11", key: "mail", tone: "amber", variant: "split-pairs" },
  { id: "12", key: "monitoring", tone: "emerald", variant: "grid-cards" },
  { id: "13", key: "antipatterns", tone: "red", variant: "grid-cards" },
  { id: "14", key: "architecture", tone: "violet", variant: "stack" },
  { id: "15", key: "summary", tone: "emerald", variant: "checklist" },
] as const satisfies readonly PresentationSlideDefinition[];

export const firstPresentationSlideId = presentationSlides[0].id;
export const lastPresentationSlideId =
  presentationSlides[presentationSlides.length - 1].id;

export function getPresentationSlide(id: string) {
  return presentationSlides.find((slide) => slide.id === id);
}

export function getPresentationNavigation(id: string) {
  const index = presentationSlides.findIndex((slide) => slide.id === id);

  if (index === -1) {
    return null;
  }

  return {
    index,
    previousId: presentationSlides[index - 1]?.id ?? null,
    nextId: presentationSlides[index + 1]?.id ?? null,
  };
}
