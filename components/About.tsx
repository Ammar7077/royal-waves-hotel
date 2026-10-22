import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>A calm haven amidst Patong’s energy</h2>
        <div className={styles.text}>
          <p>
            Royal Waves Hotel is a welcoming 3-star retreat designed for
            travelers seeking comfort, convenience, and a touch of tropical
            elegance. With its lush garden, inviting terrace, and multiple
            swimming pools, the property provides a peaceful base from which to
            explore Phuket’s most dynamic destination.
          </p>
          <p>
            Whether you are drawn by the soft sands of Patong Beach, the
            shopping at Jungceylon, or the electric atmosphere of Bangla Road,
            you will return each evening to airy rooms, attentive service, and
            restorative amenities.
          </p>
        </div>
      </div>
    </section>
  );
}
