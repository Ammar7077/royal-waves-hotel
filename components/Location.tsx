import styles from "./Location.module.css";

const places = [
  { name: "Patong Beach", distance: "approx. 1.1–1.8 km" },
  { name: "Jungceylon Shopping Center", distance: "~0.7–0.8 km" },
  { name: "Bangla Road nightlife district", distance: "short distance" },
  { name: "Banzaan Fresh Market", distance: "walking distance" },
  { name: "Phuket International Airport", distance: "~33–36 km (approx. 45–60 min)" },
];

export default function Location() {
  return (
    <section id="location" className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.title}>Perfectly positioned in Patong</h2>
          <address className={styles.address}>
            151/5 Nanai Road, Patong Beach, 83150 Phuket, Thailand
          </address>
          <p className={styles.text}>
            Ideal for beach days, shopping excursions, cultural shows, and
            evening entertainment, all within easy reach.
          </p>
        </div>
        <ul className={styles.list}>
          {places.map((p) => (
            <li key={p.name}>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.dist}>{p.distance}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
