import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.brand}>Royal Waves Hotel, Patong, Phuket</p>
      <p className={styles.tag}>Experience comfort. Embrace the waves.</p>
      <p className={styles.copy}>© Royal Waves Hotel. All rights reserved.</p>
    </footer>
  );
}
