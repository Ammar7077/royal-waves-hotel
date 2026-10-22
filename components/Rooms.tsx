import styles from "./Rooms.module.css";

const categories = ["Standard", "Superior", "Deluxe"];

const features = [
  "Climate-controlled air conditioning",
  "Private bathroom with shower and complimentary toiletries",
  "Flat-screen television",
  "Dedicated workspace",
  "Complimentary high-speed Wi-Fi",
  "Tea and coffee making facilities",
  "Select rooms with balcony and scenic views",
];

export default function Rooms() {
  return (
    <section id="rooms" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>Your private sanctuary</h2>
          <p className={styles.intro}>
            Every room is crafted for restful nights and effortless days. Choose
            from Standard, Superior, and Deluxe categories, many featuring
            private balconies with pool or mountain views.
          </p>
          <ul className={styles.cats}>
            {categories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className={styles.panel}>
          <h3 className={styles.sub}>Signature room features</h3>
          <ul className={styles.features}>
            {features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className={styles.note}>
            Family rooms are available for those traveling with loved ones.
            Daily housekeeping keeps your space pristine.
          </p>
          <a href="#contact" className={styles.cta}>View room categories and rates</a>
        </div>
      </div>
    </section>
  );
}
