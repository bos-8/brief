// @file: src/content/presentationDeck.ts
import { getMessages } from "next-intl/server";
import type { AppLocale } from "@/schema/i18n";

type MessageRecord = Record<string, unknown>;

type TextCard = {
  title: string;
  text1: string;
};

type ComparisonRow = {
  rowLabel: string;
  left: string;
  right: string;
};

type DiagramLabels = {
  text1: string;
  text2?: string;
};

export type PresentationDeckContent = {
  slide1: {
    navTitle: string;
    title: string;
    subtitle: string;
    authorsLabel: string;
    authors: string[];
    affiliation: string;
  };
  slide2: {
    navTitle: string;
    title: string;
    cards: TextCard[];
  };
  slide3: {
    navTitle: string;
    title: string;
    traditionalLabel: string;
    enhancedLabel: string;
    rows: ComparisonRow[];
  };
  slide4: {
    navTitle: string;
    title: string;
    cards: Array<TextCard & { index: string }>;
    diagram: {
      controlSignals: DiagramLabels;
      telemetry: DiagramLabels;
      predictions: DiagramLabels;
      dynamicModification: DiagramLabels;
    };
  };
  slide5: {
    navTitle: string;
    title: string;
    pillars: string[];
    panels: Array<{ lead: string | null; text1: string }>;
  };
  slide6: {
    navTitle: string;
    title: string;
    panels: Array<{ lead: string; text1: string }>;
    diagram: {
      outerRing: string;
      middleRing: string;
      innerRing: string;
      core: string[];
    };
  };
  slide7: {
    navTitle: string;
    title: string;
    panels: Array<{ lead: string; text1: string }>;
  };
  slide8: {
    navTitle: string;
    title: string;
    panels: Array<{ lead: string; text1: string }>;
  };
  slide9: {
    navTitle: string;
    title: string;
    panels: Array<{ lead: string; text1: string }>;
  };
  slide10: {
    navTitle: string;
    title: string;
    mechanismTitle: string;
    mechanismText: string;
    constraintsTitle: string;
    constraints: string[];
    outcomes: string[];
  };
  slide11: {
    navTitle: string;
    title: string;
    panels: TextCard[];
  };
  slide12: {
    navTitle: string;
    title: string;
    mechanismTitle: string;
    mechanismText: string;
    constraintsTitle: string;
    constraints: TextCard[];
  };
  slide13: {
    navTitle: string;
    title: string;
    headers: string[];
    rows: Array<{ threat: string; risk: string; principle: string }>;
  };
  slide14: {
    navTitle: string;
    title: string;
    diagram: {
      outerRing: string;
      middleRing: string;
      center: string;
    };
    sections: TextCard[];
  };
  slide15: {
    navTitle: string;
    title: string;
    statements: string[];
  };
  slide16: {
    navTitle: string;
    title: string;
    caption: string;
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

function readNullableString(record: MessageRecord, key: string, path: string): string | null {
  const value = record[key];

  if (value === null) {
    return null;
  }

  if (typeof value !== "string") {
    throw new Error(`Expected string or null at "${path}.${key}".`);
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

export async function getPresentationDeck(locale: AppLocale): Promise<PresentationDeckContent> {
  const root = readRecord(await getMessages({ locale }), "messages");
  const presentation = readRecord(root.presentation, "presentation");
  const slides = readRecord(presentation.slides, "presentation.slides");

  const slide1 = readRecord(slides.slide1, "presentation.slides.slide1");
  const slide2 = readRecord(slides.slide2, "presentation.slides.slide2");
  const slide3 = readRecord(slides.slide3, "presentation.slides.slide3");
  const slide4 = readRecord(slides.slide4, "presentation.slides.slide4");
  const slide5 = readRecord(slides.slide5, "presentation.slides.slide5");
  const slide6 = readRecord(slides.slide6, "presentation.slides.slide6");
  const slide7 = readRecord(slides.slide7, "presentation.slides.slide7");
  const slide8 = readRecord(slides.slide8, "presentation.slides.slide8");
  const slide9 = readRecord(slides.slide9, "presentation.slides.slide9");
  const slide10 = readRecord(slides.slide10, "presentation.slides.slide10");
  const slide11 = readRecord(slides.slide11, "presentation.slides.slide11");
  const slide12 = readRecord(slides.slide12, "presentation.slides.slide12");
  const slide13 = readRecord(slides.slide13, "presentation.slides.slide13");
  const slide14 = readRecord(slides.slide14, "presentation.slides.slide14");
  const slide15 = readRecord(slides.slide15, "presentation.slides.slide15");
  const slide16 = readRecord(slides.slide16, "presentation.slides.slide16");

  return {
    slide1: {
      navTitle: readString(slide1, "navTitle", "presentation.slides.slide1"),
      title: readString(slide1, "title", "presentation.slides.slide1"),
      subtitle: readString(slide1, "subtitle", "presentation.slides.slide1"),
      authorsLabel: readString(slide1, "authorsLabel", "presentation.slides.slide1"),
      authors: readStringArray(slide1, "authors", "presentation.slides.slide1"),
      affiliation: readString(slide1, "affiliation", "presentation.slides.slide1"),
    },
    slide2: {
      navTitle: readString(slide2, "navTitle", "presentation.slides.slide2"),
      title: readString(slide2, "title", "presentation.slides.slide2"),
      cards: readRecordArray(slide2, "cards", "presentation.slides.slide2").map((item, index) =>
        readTextCard(item, `presentation.slides.slide2.cards[${index}]`),
      ),
    },
    slide3: {
      navTitle: readString(slide3, "navTitle", "presentation.slides.slide3"),
      title: readString(slide3, "title", "presentation.slides.slide3"),
      traditionalLabel: readString(slide3, "traditionalLabel", "presentation.slides.slide3"),
      enhancedLabel: readString(slide3, "enhancedLabel", "presentation.slides.slide3"),
      rows: readRecordArray(slide3, "rows", "presentation.slides.slide3").map((item, index) => ({
        rowLabel: readString(item, "rowLabel", `presentation.slides.slide3.rows[${index}]`),
        left: readString(item, "left", `presentation.slides.slide3.rows[${index}]`),
        right: readString(item, "right", `presentation.slides.slide3.rows[${index}]`),
      })),
    },
    slide4: {
      navTitle: readString(slide4, "navTitle", "presentation.slides.slide4"),
      title: readString(slide4, "title", "presentation.slides.slide4"),
      cards: readRecordArray(slide4, "cards", "presentation.slides.slide4").map((item, index) => ({
        index: readString(item, "index", `presentation.slides.slide4.cards[${index}]`),
        title: readString(item, "title", `presentation.slides.slide4.cards[${index}]`),
        text1: readString(item, "text1", `presentation.slides.slide4.cards[${index}]`),
      })),
      diagram: {
        controlSignals: (() => {
          const diagram = readNestedRecord(readNestedRecord(slide4, "diagram", "presentation.slides.slide4"), "controlSignals", "presentation.slides.slide4.diagram");
          return {
            text1: readString(diagram, "text1", "presentation.slides.slide4.diagram.controlSignals"),
            text2: readString(diagram, "text2", "presentation.slides.slide4.diagram.controlSignals"),
          };
        })(),
        telemetry: (() => {
          const diagram = readNestedRecord(readNestedRecord(slide4, "diagram", "presentation.slides.slide4"), "telemetry", "presentation.slides.slide4.diagram");
          return {
            text1: readString(diagram, "text1", "presentation.slides.slide4.diagram.telemetry"),
          };
        })(),
        predictions: (() => {
          const diagram = readNestedRecord(readNestedRecord(slide4, "diagram", "presentation.slides.slide4"), "predictions", "presentation.slides.slide4.diagram");
          return {
            text1: readString(diagram, "text1", "presentation.slides.slide4.diagram.predictions"),
          };
        })(),
        dynamicModification: (() => {
          const diagram = readNestedRecord(
            readNestedRecord(slide4, "diagram", "presentation.slides.slide4"),
            "dynamicModification",
            "presentation.slides.slide4.diagram",
          );
          return {
            text1: readString(diagram, "text1", "presentation.slides.slide4.diagram.dynamicModification"),
            text2: readString(diagram, "text2", "presentation.slides.slide4.diagram.dynamicModification"),
          };
        })(),
      },
    },
    slide5: {
      navTitle: readString(slide5, "navTitle", "presentation.slides.slide5"),
      title: readString(slide5, "title", "presentation.slides.slide5"),
      pillars: readStringArray(slide5, "pillars", "presentation.slides.slide5"),
      panels: readRecordArray(slide5, "panels", "presentation.slides.slide5").map((item, index) => ({
        lead: readNullableString(item, "lead", `presentation.slides.slide5.panels[${index}]`),
        text1: readString(item, "text1", `presentation.slides.slide5.panels[${index}]`),
      })),
    },
    slide6: {
      navTitle: readString(slide6, "navTitle", "presentation.slides.slide6"),
      title: readString(slide6, "title", "presentation.slides.slide6"),
      panels: readRecordArray(slide6, "panels", "presentation.slides.slide6").map((item, index) => ({
        lead: readString(item, "lead", `presentation.slides.slide6.panels[${index}]`),
        text1: readString(item, "text1", `presentation.slides.slide6.panels[${index}]`),
      })),
      diagram: (() => {
        const diagram = readNestedRecord(slide6, "diagram", "presentation.slides.slide6");
        return {
          outerRing: readString(diagram, "outerRing", "presentation.slides.slide6.diagram"),
          middleRing: readString(diagram, "middleRing", "presentation.slides.slide6.diagram"),
          innerRing: readString(diagram, "innerRing", "presentation.slides.slide6.diagram"),
          core: readStringArray(diagram, "core", "presentation.slides.slide6.diagram"),
        };
      })(),
    },
    slide7: {
      navTitle: readString(slide7, "navTitle", "presentation.slides.slide7"),
      title: readString(slide7, "title", "presentation.slides.slide7"),
      panels: readRecordArray(slide7, "panels", "presentation.slides.slide7").map((item, index) => ({
        lead: readString(item, "lead", `presentation.slides.slide7.panels[${index}]`),
        text1: readString(item, "text1", `presentation.slides.slide7.panels[${index}]`),
      })),
    },
    slide8: {
      navTitle: readString(slide8, "navTitle", "presentation.slides.slide8"),
      title: readString(slide8, "title", "presentation.slides.slide8"),
      panels: readRecordArray(slide8, "panels", "presentation.slides.slide8").map((item, index) => ({
        lead: readString(item, "lead", `presentation.slides.slide8.panels[${index}]`),
        text1: readString(item, "text1", `presentation.slides.slide8.panels[${index}]`),
      })),
    },
    slide9: {
      navTitle: readString(slide9, "navTitle", "presentation.slides.slide9"),
      title: readString(slide9, "title", "presentation.slides.slide9"),
      panels: readRecordArray(slide9, "panels", "presentation.slides.slide9").map((item, index) => ({
        lead: readString(item, "lead", `presentation.slides.slide9.panels[${index}]`),
        text1: readString(item, "text1", `presentation.slides.slide9.panels[${index}]`),
      })),
    },
    slide10: {
      navTitle: readString(slide10, "navTitle", "presentation.slides.slide10"),
      title: readString(slide10, "title", "presentation.slides.slide10"),
      mechanismTitle: readString(slide10, "mechanismTitle", "presentation.slides.slide10"),
      mechanismText: readString(slide10, "mechanismText", "presentation.slides.slide10"),
      constraintsTitle: readString(slide10, "constraintsTitle", "presentation.slides.slide10"),
      constraints: readStringArray(slide10, "constraints", "presentation.slides.slide10"),
      outcomes: readStringArray(slide10, "outcomes", "presentation.slides.slide10"),
    },
    slide11: {
      navTitle: readString(slide11, "navTitle", "presentation.slides.slide11"),
      title: readString(slide11, "title", "presentation.slides.slide11"),
      panels: readRecordArray(slide11, "panels", "presentation.slides.slide11").map((item, index) =>
        readTextCard(item, `presentation.slides.slide11.panels[${index}]`),
      ),
    },
    slide12: {
      navTitle: readString(slide12, "navTitle", "presentation.slides.slide12"),
      title: readString(slide12, "title", "presentation.slides.slide12"),
      mechanismTitle: readString(slide12, "mechanismTitle", "presentation.slides.slide12"),
      mechanismText: readString(slide12, "mechanismText", "presentation.slides.slide12"),
      constraintsTitle: readString(slide12, "constraintsTitle", "presentation.slides.slide12"),
      constraints: readRecordArray(slide12, "constraints", "presentation.slides.slide12").map((item, index) =>
        readTextCard(item, `presentation.slides.slide12.constraints[${index}]`),
      ),
    },
    slide13: {
      navTitle: readString(slide13, "navTitle", "presentation.slides.slide13"),
      title: readString(slide13, "title", "presentation.slides.slide13"),
      headers: readStringArray(slide13, "headers", "presentation.slides.slide13"),
      rows: readRecordArray(slide13, "rows", "presentation.slides.slide13").map((item, index) => ({
        threat: readString(item, "threat", `presentation.slides.slide13.rows[${index}]`),
        risk: readString(item, "risk", `presentation.slides.slide13.rows[${index}]`),
        principle: readString(item, "principle", `presentation.slides.slide13.rows[${index}]`),
      })),
    },
    slide14: {
      navTitle: readString(slide14, "navTitle", "presentation.slides.slide14"),
      title: readString(slide14, "title", "presentation.slides.slide14"),
      diagram: (() => {
        const diagram = readNestedRecord(slide14, "diagram", "presentation.slides.slide14");
        return {
          outerRing: readString(diagram, "outerRing", "presentation.slides.slide14.diagram"),
          middleRing: readString(diagram, "middleRing", "presentation.slides.slide14.diagram"),
          center: readString(diagram, "center", "presentation.slides.slide14.diagram"),
        };
      })(),
      sections: readRecordArray(slide14, "sections", "presentation.slides.slide14").map((item, index) =>
        readTextCard(item, `presentation.slides.slide14.sections[${index}]`),
      ),
    },
    slide15: {
      navTitle: readString(slide15, "navTitle", "presentation.slides.slide15"),
      title: readString(slide15, "title", "presentation.slides.slide15"),
      statements: readStringArray(slide15, "statements", "presentation.slides.slide15"),
    },
    slide16: {
      navTitle: readString(slide16, "navTitle", "presentation.slides.slide16"),
      title: readString(slide16, "title", "presentation.slides.slide16"),
      caption: readString(slide16, "caption", "presentation.slides.slide16"),
    },
  };
}
