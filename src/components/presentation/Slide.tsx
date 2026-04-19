// @file: src/components/presentation/Slide.tsx
import type { ReactNode } from "react";
import styles from "./Slide.module.css";
import { SlideNumber } from "./SlideNumber";

type SlideProps = {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
  fullBleed?: boolean;
};

export const slideDeckClassName = styles.deck;

export function Slide({ id, index, title, children, fullBleed = false }: SlideProps) {
  return (
    <section
      id={id}
      data-slide-title={title}
      data-slide-index={String(index).padStart(2, "0")}
      className={styles.slide}
    >
      <SlideNumber index={index} />
      <div
        className={fullBleed ? `${styles.frame} ${styles.fullBleedFrame}` : styles.frame}
        data-slide-index={String(index).padStart(2, "0")}
      >
        <div className={fullBleed ? `${styles.content} ${styles.fullBleedContent}` : styles.content}>{children}</div>
      </div>
    </section>
  );
}
