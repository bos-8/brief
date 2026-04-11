// @file: src/types/presentation.ts
export type SlideTone = "cyan" | "violet" | "amber" | "emerald" | "red";

export type SlideVariant =
  | "hero"
  | "summary-list"
  | "flow"
  | "grid-cards"
  | "split-pairs"
  | "metrics"
  | "checklist"
  | "columns"
  | "stack";

export type PresentationSlideDefinition = {
  id: string;
  key: string;
  tone: SlideTone;
  variant: SlideVariant;
};

export type PresentationChip = {
  text: string;
};

export type PresentationCard = {
  accent: SlideTone;
  icon: string;
  title: string;
  body: string;
  tags?: string[];
};

export type PresentationMetric = {
  label: string;
  value: string;
};

export type PresentationColumn = {
  accent: SlideTone;
  icon: string;
  title: string;
  items: string[];
};

export type PresentationPanel = {
  eyebrow: string;
  title: string;
};

export type PresentationSlideCopy = {
  eyebrow: string;
  title: string;
  summary: string;
  accentNote?: string;
  sideNote?: string;
  chips?: PresentationChip[];
  heroNodes?: string[];
  panel?: PresentationPanel;
  bulletItems?: string[];
  flowItems?: string[];
  cards?: PresentationCard[];
  metrics?: PresentationMetric[];
  columns?: PresentationColumn[];
};
