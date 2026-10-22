import styles from "./WaveDivider.module.css";

export default function WaveDivider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className={styles.back}
          d="M0 66C220 26 400 96 600 64c200-32 360 32 580 4 140-18 220 2 260-8v140H0Z"
        />
        <path
          className={styles.mid}
          d="M0 102c200-34 380 28 560 0 180-28 340 30 540 4 170-22 270 0 340-12v106H0Z"
        />
        <path
          className={styles.main}
          d="M0 140c180-28 340 28 520 4 180-24 340 32 520 8 180-24 300-4 400-16v64H0Z"
        />
        <path
          className={styles.crest}
          d="M0 140c180-28 340 28 520 4 180-24 340 32 520 8 180-24 300-4 400-16"
        />
      </svg>
    </div>
  );
}
