import styles from "./PracticalInfo.module.css";

const rows: [string, string][] = [
  ["Check-in", "From 14:00"],
  ["Check-out", "Until 12:00"],
  ["Total rooms", "69"],
  ["Parking", "Free self-parking"],
  ["Wi-Fi", "Complimentary"],
  ["Pets", "Not permitted"],
  ["Phone", "+66 627 513 520"],
];

export default function PracticalInfo() {
  return (
    <section id="info" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Practical information</h2>
        <div className={styles.wrap}>
          <table className={styles.table}>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
