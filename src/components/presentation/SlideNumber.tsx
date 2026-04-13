// @file: src/components/presentation/SlideNumber.tsx
import styles from "./Slide.module.css";

type SlideNumberProps = {
  index: number;
};

export function SlideNumber({ index }: SlideNumberProps) {
  return (
    <span aria-hidden="true" className={styles.backgroundNumber}>
      {String(index).padStart(2, "0")}
    </span>
  );
}
