// @file: src/content/presentationNotes.ts
import { getMessages } from "next-intl/server";
import type { AppLocale } from "@/schema/i18n";

type MessageRecord = Record<string, unknown>;

type NotesCard = {
  title: string;
  text1: string;
};

type NotesDefinition = {
  short: string;
  long: string;
};

type SlideNote = {
  id: string;
  label: string;
  title: string;
  speech: string;
  extension: string;
  bullets: string[];
};

export type PresentationNotesContent = {
  eyebrow: string;
  title: string;
  lead: string;
  speechLabel?: string;
  extensionLabel?: string;
  slidesHeading?: string;
  slides: SlideNote[];
  summary?: {
    title: string;
    paragraphs: string[];
  };
  takeaways?: {
    title: string;
    items: NotesCard[];
  };
  overviewSummary?: {
    title: string;
    paragraphs: string[];
  };
  abbreviations?: {
    title: string;
    items: NotesDefinition[];
  };
  qa?: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  noticeTitle?: string;
  noticeText?: string;
};

function isRecord(value: unknown): value is MessageRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRecord(value: unknown, path: string): MessageRecord {
  if (!isRecord(value)) {
    throw new Error(`Expected object at "${path}".`);
  }

  return value;
}

function readOptionalRecord(record: MessageRecord, key: string): MessageRecord | null {
  const value = record[key];
  return isRecord(value) ? value : null;
}

function readString(record: MessageRecord, key: string, path: string): string {
  const value = record[key];

  if (typeof value !== "string") {
    throw new Error(`Expected string at "${path}.${key}".`);
  }

  return value;
}

function readOptionalString(record: MessageRecord, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function readStringArray(record: MessageRecord, key: string, path: string): string[] {
  const value = record[key];

  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Expected string array at "${path}.${key}".`);
  }

  return [...value];
}

function readOptionalStringArray(record: MessageRecord, key: string): string[] {
  const value = record[key];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? [...value] : [];
}

function readRecordArray(record: MessageRecord, key: string, path: string): MessageRecord[] {
  const value = record[key];

  if (!Array.isArray(value)) {
    throw new Error(`Expected object array at "${path}.${key}".`);
  }

  return value.map((item, index) => readRecord(item, `${path}.${key}[${index}]`));
}

function readCard(record: MessageRecord, path: string): NotesCard {
  return {
    title: readString(record, "title", path),
    text1: readString(record, "text1", path),
  };
}

export async function getPresentationNotes(locale: AppLocale): Promise<PresentationNotesContent> {
  const root = readRecord(await getMessages({ locale }), "messages");
  const presentation = readRecord(root.presentation, "presentation");
  const notes = readRecord(presentation.notes, "presentation.notes");

  const slidesRecord = readOptionalRecord(notes, "slides");
  const summaryRecord = readOptionalRecord(notes, "summary");
  const takeawaysRecord = readOptionalRecord(notes, "takeaways");
  const overviewSummaryRecord = readOptionalRecord(notes, "overviewSummary");
  const abbreviationsRecord = readOptionalRecord(notes, "abbreviations");
  const qaRecord = readOptionalRecord(notes, "qa");

  return {
    eyebrow: readString(notes, "eyebrow", "presentation.notes"),
    title: readString(notes, "title", "presentation.notes"),
    lead: readString(notes, "lead", "presentation.notes"),
    speechLabel: readOptionalString(notes, "speechLabel"),
    extensionLabel: readOptionalString(notes, "extensionLabel"),
    slidesHeading: readOptionalString(notes, "slidesHeading"),
    slides: slidesRecord
      ? readRecordArray(slidesRecord, "items", "presentation.notes.slides").map((item, index) => ({
          id: readString(item, "id", `presentation.notes.slides.items[${index}]`),
          label: readString(item, "label", `presentation.notes.slides.items[${index}]`),
          title: readString(item, "title", `presentation.notes.slides.items[${index}]`),
          speech: readString(item, "speech", `presentation.notes.slides.items[${index}]`),
          extension: readString(item, "extension", `presentation.notes.slides.items[${index}]`),
          bullets: readOptionalStringArray(item, "bullets"),
        }))
      : [],
    summary: summaryRecord
      ? {
          title: readString(summaryRecord, "title", "presentation.notes.summary"),
          paragraphs: readStringArray(summaryRecord, "paragraphs", "presentation.notes.summary"),
        }
      : undefined,
    takeaways: takeawaysRecord
      ? {
          title: readString(takeawaysRecord, "title", "presentation.notes.takeaways"),
          items: readRecordArray(takeawaysRecord, "items", "presentation.notes.takeaways").map((item, index) =>
            readCard(item, `presentation.notes.takeaways.items[${index}]`),
          ),
        }
      : undefined,
    overviewSummary: overviewSummaryRecord
      ? {
          title: readString(overviewSummaryRecord, "title", "presentation.notes.overviewSummary"),
          paragraphs: readStringArray(overviewSummaryRecord, "paragraphs", "presentation.notes.overviewSummary"),
        }
      : undefined,
    abbreviations: abbreviationsRecord
      ? {
          title: readString(abbreviationsRecord, "title", "presentation.notes.abbreviations"),
          items: readRecordArray(abbreviationsRecord, "items", "presentation.notes.abbreviations").map((item, index) => ({
            short: readString(item, "short", `presentation.notes.abbreviations.items[${index}]`),
            long: readString(item, "long", `presentation.notes.abbreviations.items[${index}]`),
          })),
        }
      : undefined,
    qa: qaRecord
      ? {
          title: readString(qaRecord, "title", "presentation.notes.qa"),
          items: readRecordArray(qaRecord, "items", "presentation.notes.qa").map((item, index) => ({
            question: readString(item, "question", `presentation.notes.qa.items[${index}]`),
            answer: readString(item, "answer", `presentation.notes.qa.items[${index}]`),
          })),
        }
      : undefined,
    noticeTitle: readOptionalString(notes, "noticeTitle"),
    noticeText: readOptionalString(notes, "noticeText"),
  };
}
