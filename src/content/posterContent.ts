// @file: src/content/posterContent.ts
import { getMessages } from "next-intl/server";
import type { AppLocale } from "@/schema/i18n";

type MessageRecord = Record<string, unknown>;

type TextCard = {
  title: string;
  text1: string;
};

export type PosterContent = {
  header: {
    logoAriaLabel: string;
    titleParts: {
      ai: string;
      aiSuffix: string;
      human: string;
      humanSuffix: string;
    };
    subtitle: string;
    authors: string[];
    tags: string[];
  };
  backgroundIntro: {
    eyebrow: string;
    title: string;
  };
  backgroundCards: Array<TextCard & { number: string }>;
  practicalExample: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  legalFramework: {
    eyebrow: string;
    title: string;
    cards: TextCard[];
  };
  centralDiagram: {
    eyebrow: string;
    title: string;
    labelsCardTitle: string;
    labels: string[];
    ringsCardTitle: string;
    rings: Array<TextCard & { ring: string }>;
  };
  ethicalIssues: {
    eyebrow: string;
    title: string;
    cards: TextCard[];
  };
  patientRights: {
    eyebrow: string;
    title: string;
    cards: TextCard[];
    rights: string[];
  };
  riskMatrix: {
    eyebrow: string;
    title: string;
    layerLabel: string;
    riskLabel: string;
    controlLabel: string;
    rows: Array<{
      layer: string;
      risk: string;
      control: string;
    }>;
  };
  conclusion: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
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

function readString(record: MessageRecord, key: string, path: string): string {
  const value = record[key];

  if (typeof value !== "string") {
    throw new Error(`Expected string at "${path}.${key}".`);
  }

  return value;
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

function readTextCard(record: MessageRecord, path: string): TextCard {
  return {
    title: readString(record, "title", path),
    text1: readString(record, "text1", path),
  };
}

function readNestedRecord(record: MessageRecord, key: string, path: string): MessageRecord {
  return readRecord(record[key], `${path}.${key}`);
}

export async function getPosterContent(locale: AppLocale): Promise<PosterContent> {
  const root = readRecord(await getMessages({ locale }), "messages");
  const poster = readRecord(root.poster, "poster");
  const page = readNestedRecord(poster, "page", "poster");
  const header = readNestedRecord(page, "header", "poster.page");
  const titleParts = readNestedRecord(header, "titleParts", "poster.page.header");
  const backgroundIntro = readNestedRecord(page, "backgroundIntro", "poster.page");
  const practicalExample = readNestedRecord(page, "practicalExample", "poster.page");
  const legalFramework = readNestedRecord(page, "legalFramework", "poster.page");
  const centralDiagram = readNestedRecord(page, "centralDiagram", "poster.page");
  const ethicalIssues = readNestedRecord(page, "ethicalIssues", "poster.page");
  const patientRights = readNestedRecord(page, "patientRights", "poster.page");
  const riskMatrix = readNestedRecord(page, "riskMatrix", "poster.page");
  const conclusion = readNestedRecord(page, "conclusion", "poster.page");

  return {
    header: {
      logoAriaLabel: readString(header, "logoAriaLabel", "poster.page.header"),
      titleParts: {
        ai: readString(titleParts, "ai", "poster.page.header.titleParts"),
        aiSuffix: readString(titleParts, "aiSuffix", "poster.page.header.titleParts"),
        human: readString(titleParts, "human", "poster.page.header.titleParts"),
        humanSuffix: readString(titleParts, "humanSuffix", "poster.page.header.titleParts"),
      },
      subtitle: readString(header, "subtitle", "poster.page.header"),
      authors: readStringArray(header, "authors", "poster.page.header"),
      tags: readStringArray(header, "tags", "poster.page.header"),
    },
    backgroundIntro: {
      eyebrow: readString(backgroundIntro, "eyebrow", "poster.page.backgroundIntro"),
      title: readString(backgroundIntro, "title", "poster.page.backgroundIntro"),
    },
    backgroundCards: readRecordArray(page, "backgroundCards", "poster.page").map((item, index) => ({
      number: readString(item, "number", `poster.page.backgroundCards[${index}]`),
      ...readTextCard(item, `poster.page.backgroundCards[${index}]`),
    })),
    practicalExample: {
      eyebrow: readString(practicalExample, "eyebrow", "poster.page.practicalExample"),
      title: readString(practicalExample, "title", "poster.page.practicalExample"),
      steps: readStringArray(practicalExample, "steps", "poster.page.practicalExample"),
    },
    legalFramework: {
      eyebrow: readString(legalFramework, "eyebrow", "poster.page.legalFramework"),
      title: readString(legalFramework, "title", "poster.page.legalFramework"),
      cards: readRecordArray(legalFramework, "cards", "poster.page.legalFramework").map((item, index) =>
        readTextCard(item, `poster.page.legalFramework.cards[${index}]`),
      ),
    },
    centralDiagram: {
      eyebrow: readString(centralDiagram, "eyebrow", "poster.page.centralDiagram"),
      title: readString(centralDiagram, "title", "poster.page.centralDiagram"),
      labelsCardTitle: readString(centralDiagram, "labelsCardTitle", "poster.page.centralDiagram"),
      labels: readStringArray(centralDiagram, "labels", "poster.page.centralDiagram"),
      ringsCardTitle: readString(centralDiagram, "ringsCardTitle", "poster.page.centralDiagram"),
      rings: readRecordArray(centralDiagram, "rings", "poster.page.centralDiagram").map((item, index) => ({
        ring: readString(item, "ring", `poster.page.centralDiagram.rings[${index}]`),
        ...readTextCard(item, `poster.page.centralDiagram.rings[${index}]`),
      })),
    },
    ethicalIssues: {
      eyebrow: readString(ethicalIssues, "eyebrow", "poster.page.ethicalIssues"),
      title: readString(ethicalIssues, "title", "poster.page.ethicalIssues"),
      cards: readRecordArray(ethicalIssues, "cards", "poster.page.ethicalIssues").map((item, index) =>
        readTextCard(item, `poster.page.ethicalIssues.cards[${index}]`),
      ),
    },
    patientRights: {
      eyebrow: readString(patientRights, "eyebrow", "poster.page.patientRights"),
      title: readString(patientRights, "title", "poster.page.patientRights"),
      cards: readRecordArray(patientRights, "cards", "poster.page.patientRights").map((item, index) =>
        readTextCard(item, `poster.page.patientRights.cards[${index}]`),
      ),
      rights: readStringArray(patientRights, "rights", "poster.page.patientRights"),
    },
    riskMatrix: {
      eyebrow: readString(riskMatrix, "eyebrow", "poster.page.riskMatrix"),
      title: readString(riskMatrix, "title", "poster.page.riskMatrix"),
      layerLabel: readString(riskMatrix, "layerLabel", "poster.page.riskMatrix"),
      riskLabel: readString(riskMatrix, "riskLabel", "poster.page.riskMatrix"),
      controlLabel: readString(riskMatrix, "controlLabel", "poster.page.riskMatrix"),
      rows: readRecordArray(riskMatrix, "rows", "poster.page.riskMatrix").map((item, index) => ({
        layer: readString(item, "layer", `poster.page.riskMatrix.rows[${index}]`),
        risk: readString(item, "risk", `poster.page.riskMatrix.rows[${index}]`),
        control: readString(item, "control", `poster.page.riskMatrix.rows[${index}]`),
      })),
    },
    conclusion: {
      eyebrow: readString(conclusion, "eyebrow", "poster.page.conclusion"),
      title: readString(conclusion, "title", "poster.page.conclusion"),
      paragraphs: readStringArray(conclusion, "paragraphs", "poster.page.conclusion"),
    },
  };
}
