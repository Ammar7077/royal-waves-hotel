import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Contact and reservations</h2>
        <address className={styles.address}>
          <strong>Royal Waves Hotel</strong>
          <span>151/5 Nanai Road, Patong Beach, Phuket 83150, Thailand</span>
          <a href="tel:+66627513520">+66 627 513 520</a>
        </address>
        <p className={styles.text}>We look forward to welcoming you to Patong.</p>
        <a id="booking" href="tel:+66627513520" className={styles.cta}>
          Reserve your room now
        </a>
      </div>
    </section>
  );
}
