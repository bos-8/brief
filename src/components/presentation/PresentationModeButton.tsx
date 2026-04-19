// @file: src/components/presentation/PresentationModeButton.tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowsFullscreen } from "react-bootstrap-icons";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { forceDesktopDeckClassName } from "@/components/presentation/Slide";

type PresentationModeButtonProps = {
  deckId: string;
};

export function PresentationModeButton({ deckId }: PresentationModeButtonProps) {
  const t = useTranslations("common.presentationMode");
  const [isForced, setIsForced] = useState(false);

  useEffect(() => {
    const deck = document.getElementById(deckId);

    if (!deck) {
      return;
    }

    deck.classList.toggle(forceDesktopDeckClassName, isForced);

    return () => {
      deck.classList.remove(forceDesktopDeckClassName);
    };
  }, [deckId, isForced]);

  const label = isForced ? t("disable") : t("enable");

  return (
    <Tooltip content={label} placement="bottom">
      <span className="inline-flex">
        <Button
          aria-label={label}
          aria-pressed={isForced}
          tone={isForced ? "accent" : "main"}
          className="h-8 min-w-8 px-0"
          onClick={() => setIsForced((value) => !value)}
        >
          <ArrowsFullscreen size={14} className="shrink-0" />
        </Button>
      </span>
    </Tooltip>
  );
}
