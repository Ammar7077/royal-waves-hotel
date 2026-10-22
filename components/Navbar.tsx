import styles from "./Navbar.module.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#dining", label: "Dining" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <a href="#top" className={styles.brand}>Royal Waves</a>
        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <a href="#booking" className={styles.book}>Book your stay</a>
      </nav>
    </header>
  );
}
