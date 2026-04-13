// @file: src/components/presentation/Slide.tsx
import type { ReactNode } from "react";
import styles from "./Slide.module.css";

type SlideProps = {
  children: ReactNode;
};

export const slideDeckClassName = styles.deck;

export function Slide({ children }: SlideProps) {
  return (
    <section className={styles.slide}>
      <div className={styles.frame}>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
