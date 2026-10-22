import styles from "./Amenities.module.css";

const groups = [
  {
    title: "Aquatic escape",
    text: "Two outdoor swimming pools (including an infinity-style option) plus a sheltered indoor pool, perfect for morning laps or sunset relaxation.",
  },
  {
    title: "Wellness and recreation",
    text: "Fully equipped fitness center, billiards, a lush tropical garden, and a sun-drenched terrace.",
  },
  {
    title: "Dining and social",
    text: "On-site restaurant serving Thai, French, and international cuisine with halal options. Enjoy breakfast through dinner, or unwind with cocktails at the bar. Room service is available.",
  },
];

const services = [
  "24-hour front desk and concierge",
  "Free self-parking",
  "Complimentary Wi-Fi throughout",
  "Laundry facilities",
  "Tour, ticket, and transportation assistance",
  "Airport shuttle (on request)",
  "Safety deposit box and currency exchange",
];

export default function Amenities() {
  return (
    <section id="amenities" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Elevate every moment of your stay</h2>
        <div className={styles.grid}>
          {groups.map((g) => (
            <article key={g.title} className={styles.card}>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.services}>
          <h3>Guest services</h3>
          <ul>
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
