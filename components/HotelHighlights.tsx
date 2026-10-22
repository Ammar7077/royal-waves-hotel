"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./HotelHighlights.module.css";

const items = [
  {
    title: "Rooms made for unwinding",
    text: "Settle into a thoughtfully appointed room with a comfortable king-size bed, warm ambient lighting, air conditioning, and your own private balcony overlooking the greenery.",
    image: "/hotel1.png",
    alt: "Elegant hotel guest room with a king-size bed and private balcony",
  },
  {
    title: "A refreshing pool escape",
    text: "Take a refreshing dip in the inviting swimming pool, then slow down beside the water in a relaxed tropical setting made for a little time out.",
    image: "/hotel2.png",
    alt: "The hotel swimming pool with a relaxed seating area",
  },
  {
    title: "Keep moving in the gym",
    text: "Stay on top of your routine in the hotel gym, with cardio equipment and a bright, leafy view to make every workout feel a little lighter.",
    image: "/hotel3.png",
    alt: "Cardio machines in the hotel gym overlooking tropical greenery",
  },
  {
    title: "A welcoming Patong landmark",
    text: "Find Royal Waves in the heart of Patong: a distinctive blue-and-white retreat that brings you close to Phuket’s beaches, shopping, and local energy.",
    image: "/hotel4.png",
    alt: "The exterior of Royal Waves Hotel in Patong",
  },
  {
    title: "Settle into the lounge",
    text: "Make yourself at home in the relaxed reception lounge, with comfortable seating and warm natural details—a welcoming pause between Phuket adventures.",
    image: "/hotel5.png",
    alt: "Comfortable seating area in the hotel reception lounge",
  },
];

export default function HotelHighlights() {
  const [active, setActive] = useState(0);

  return (
    <section id="highlights" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.gallery}>
          {items.map((item, i) => (
            <Image
              key={item.title}
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              priority={i === 0}
              aria-hidden={i !== active}
              className={`${styles.image} ${i === active ? styles.imageActive : ""}`}
            />
          ))}
          <div className={styles.imageCaption} aria-hidden="true">
            <span>ROYAL WAVES</span>
            <span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className={styles.list}>
          <p className={styles.kicker}>THE ROYAL WAVES EXPERIENCE</p>
          <h2 className={styles.heading}>Discover the hotel</h2>
          {items.map((item, i) => {
            const isOpen = i === active;
            return (
              <div
                key={item.title}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""} ${i === items.length - 1 ? styles.itemLast : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <button
                  type="button"
                  id={`highlight-btn-${i}`}
                  className={styles.button}
                  aria-expanded={isOpen}
                  aria-controls={`highlight-panel-${i}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className={styles.number}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                  <span className={styles.indicator} aria-hidden="true" />
                </button>
              </div>
            );
          })}
          <div className={styles.descriptionStage}>
            {items.map((item, i) => (
              <div
                key={item.title}
                id={`highlight-panel-${i}`}
                role="region"
                aria-labelledby={`highlight-btn-${i}`}
                aria-hidden={i !== active}
                className={`${styles.panel} ${i === active ? styles.panelActive : ""}`}
              >
                <p className={styles.text}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}