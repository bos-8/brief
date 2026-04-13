// @file: src/components/presentation/Slide.tsx
import type { ReactNode } from "react";
import styles from "./Slide.module.css";
import { SlideNumber } from "./SlideNumber";

type SlideProps = {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
};

export const slideDeckClassName = styles.deck;

export function Slide({ id, index, title, children }: SlideProps) {
  return (
    <section
      id={id}
      data-slide-title={title}
      data-slide-index={String(index).padStart(2, "0")}
      className={styles.slide}
    >
      <SlideNumber index={index} />
      <div
        className={styles.frame}
        data-slide-index={String(index).padStart(2, "0")}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
