import styles from "./Dining.module.css";

export default function Dining() {
  return (
    <section id="dining" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Flavors of Thailand and beyond</h2>
        <p className={styles.text}>
          Savor authentic Thai dishes alongside French and international
          specialties in our inviting restaurant. Halal options are available.
          Start your day with a satisfying breakfast, enjoy leisurely lunches,
          or linger over dinner. The bar serves refreshing cocktails and evening
          drinks in a relaxed atmosphere.
        </p>
      </div>
    </section>
  );
}
