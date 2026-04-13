// @file: src/components/presentation/PresentationBackdrop.tsx
import styles from "./PresentationBackdrop.module.css";

export function PresentationBackdrop() {
  return (
    <div aria-hidden="true" className={styles.backdrop}>
      <div className={styles.grid} />
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />
      <div className={styles.glowCenter} />
      <div className={styles.scanlines} />
    </div>
  );
}
