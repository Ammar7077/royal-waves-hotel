import styles from "./WhatsAppButton.module.css";

const phone = "+66 627 513 520";
const waLink = "https://wa.me/66627513520";

export default function WhatsAppButton() {
  return (
    <a
      className={styles.fab}
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp with ${phone}`}
      title={`Chat on WhatsApp: ${phone}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28" focusable="false">
          <path
            fill="currentColor"
            d="M16.04 3.2A12.7 12.7 0 0 0 5.1 21.2l-1.9 7 7.2-1.9a12.8 12.8 0 0 0 5.64 1.34h.01a12.8 12.8 0 0 0 12.84-12.83A12.75 12.75 0 0 0 16.04 3.2Zm0 23.3h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.27 1.12 1.14-4.16-.25-.42a10.64 10.64 0 0 1-1.64-5.66A10.75 10.75 0 0 1 16.03 5.5h.01a10.72 10.72 0 0 1 10.72 10.72A10.72 10.72 0 0 1 16.04 26.5Zm5.88-7.98c-.32-.16-1.9-.94-2.19-1.05-.29-.11-.5-.16-.71.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.5.14-.66.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.73-.98-2.37-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.09 1.3 3.31.16.21 2.25 3.43 5.45 4.81.76.33 1.35.53 1.82.68.76.24 1.46.21 2.01.13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.52-.08-.14-.29-.21-.61-.37Z"
          />
        </svg>
      </span>
      <span className={styles.label}>{phone}</span>
    </a>
  );
}
