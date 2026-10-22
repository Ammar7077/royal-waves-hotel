import styles from "./GuestExperience.module.css";

export default function GuestExperience() {
  return (
    <section id="guests" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Guest experience</h2>
        <p className={styles.text}>
          Guests frequently highlight the convenient location, friendly and
          helpful staff, and excellent value. Many appreciate the ease of
          arranging tours, vehicle rentals, and local recommendations through
          the front desk.
        </p>
        <p className={styles.note}>
          Ratings typically range 6.2–6.7/10 across major platforms. Individual
          experiences may vary.
        </p>
      </div>
    </section>
  );
}
