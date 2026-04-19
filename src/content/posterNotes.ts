// @file: src/content/posterNotes.ts
import { getMessages } from "next-intl/server";
import type { AppLocale } from "@/schema/i18n";

type MessageRecord = Record<string, unknown>;

type NotesDefinition = {
  short: string;
  long: string;
};

type PosterNoteSection = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
};

export type PosterNotesContent = {
  eyebrow: string;
  title: string;
  lead: string;
  sectionsHeading?: string;
  sections: PosterNoteSection[];
  summary?: {
    title: string;
    paragraphs: string[];
  };
  qa?: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  abbreviations?: {
    title: string;
    items: NotesDefinition[];
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

function readRecordArray(record: MessageRecord, key: string, path: string): MessageRecord[] {
  const value = record[key];

  if (!Array.isArray(value)) {
    throw new Error(`Expected object array at "${path}.${key}".`);
  }

  return value.map((item, index) => readRecord(item, `${path}.${key}[${index}]`));
}

export async function getPosterNotes(locale: AppLocale): Promise<PosterNotesContent> {
  const root = readRecord(await getMessages({ locale }), "messages");
  const poster = readRecord(root.poster, "poster");
  const notes = readRecord(poster.notes, "poster.notes");

  const sectionsRecord = readOptionalRecord(notes, "sections");
  const summaryRecord = readOptionalRecord(notes, "summary");
  const qaRecord = readOptionalRecord(notes, "qa");
  const abbreviationsRecord = readOptionalRecord(notes, "abbreviations");

  return {
    eyebrow: readString(notes, "eyebrow", "poster.notes"),
    title: readString(notes, "title", "poster.notes"),
    lead: readString(notes, "lead", "poster.notes"),
    sectionsHeading: readOptionalString(notes, "sectionsHeading"),
    sections: sectionsRecord
      ? readRecordArray(sectionsRecord, "items", "poster.notes.sections").map((item, index) => ({
          id: readString(item, "id", `poster.notes.sections.items[${index}]`),
          label: readString(item, "label", `poster.notes.sections.items[${index}]`),
          title: readString(item, "title", `poster.notes.sections.items[${index}]`),
          paragraphs: readStringArray(item, "paragraphs", `poster.notes.sections.items[${index}]`),
        }))
      : [],
    summary: summaryRecord
      ? {
          title: readString(summaryRecord, "title", "poster.notes.summary"),
          paragraphs: readStringArray(summaryRecord, "paragraphs", "poster.notes.summary"),
        }
      : undefined,
    qa: qaRecord
      ? {
          title: readString(qaRecord, "title", "poster.notes.qa"),
          items: readRecordArray(qaRecord, "items", "poster.notes.qa").map((item, index) => ({
            question: readString(item, "question", `poster.notes.qa.items[${index}]`),
            answer: readString(item, "answer", `poster.notes.qa.items[${index}]`),
          })),
        }
      : undefined,
    abbreviations: abbreviationsRecord
      ? {
          title: readString(abbreviationsRecord, "title", "poster.notes.abbreviations"),
          items: readRecordArray(abbreviationsRecord, "items", "poster.notes.abbreviations").map((item, index) => ({
            short: readString(item, "short", `poster.notes.abbreviations.items[${index}]`),
            long: readString(item, "long", `poster.notes.abbreviations.items[${index}]`),
          })),
        }
      : undefined,
    noticeTitle: readOptionalString(notes, "noticeTitle"),
    noticeText: readOptionalString(notes, "noticeText"),
  };
}
