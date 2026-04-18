// @file: src/components/presentation/PresentationWordmark.tsx
import styles from "./PresentationWordmark.module.css";

export function PresentationWordmark() {
  return (
    <div aria-hidden="true" className={styles.wrapper}>
      <div className={styles.panel}>
        <p className={styles.wordmark}>
          <span className={styles.accent}>AI</span>gmented{" "}
          <span className={styles.accent}>HUMAN</span>ity
        </p>
      </div>
    </div>
  );
}
