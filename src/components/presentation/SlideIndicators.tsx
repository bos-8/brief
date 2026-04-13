// @file: src/components/presentation/SlideIndicators.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./SlideIndicators.module.css";

type SlideIndicatorItem = {
  id: string;
  index: number;
  title: string;
};

type SlideIndicatorsProps = {
  deckId: string;
  items: SlideIndicatorItem[];
};

export function SlideIndicators({ deckId, items }: SlideIndicatorsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const deck = document.getElementById(deckId);
    if (!deck) return;

    const sections = itemIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        setActiveId(visible.target.id);
      },
      {
        root: deck,
        threshold: [0.35, 0.6, 0.85],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [deckId, itemIds]);

  function goToSlide(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <div className={styles.container} aria-label="Slide navigation">
      <div className={styles.panel}>
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <div key={item.id} className={styles.dotWrap}>
              <button
                type="button"
                aria-label={`${String(item.index).padStart(2, "0")} ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goToSlide(item.id)}
                className={[styles.dot, isActive ? styles.dotActive : ""].join(" ")}
              />
              <div className={styles.tooltip}>
                {String(item.index).padStart(2, "0")} · {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
