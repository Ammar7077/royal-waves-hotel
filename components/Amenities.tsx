"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Amenities.module.css";

type IconName =
  | "pool"
  | "dumbbell"
  | "utensils"
  | "bell"
  | "parking"
  | "wifi"
  | "laundry"
  | "map"
  | "shuttle"
  | "shield"
  | "exchange"
  | "clock";

const icons: Record<IconName, React.ReactNode> = {
  pool: (
    <>
      <path d="M7 4v10M11 4v10M7 7.5h4M7 11h4" />
      <path d="M2.5 17c1.7-1.7 3.4-1.7 5.1 0s3.4 1.7 5.1 0 3.4-1.7 5.1 0 3.4 1.7 5.1 0" />
      <path d="M2.5 20.5c1.7-1.7 3.4-1.7 5.1 0s3.4 1.7 5.1 0 3.4-1.7 5.1 0 3.4 1.7 5.1 0" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M4 9v6M7 6.5v11M17 6.5v11M20 9v6" />
      <path d="M7 12h10" />
    </>
  ),
  utensils: (
    <>
      <path d="M4.5 3v3a2.5 2.5 0 0 0 5 0V3" />
      <path d="M7 8.5V21" />
      <path d="M17 3c2 2.5 2.6 6 2.6 9h-2.6" />
      <path d="M17 3v18" />
    </>
  ),
  bell: (
    <>
      <path d="M4 18h16" />
      <path d="M5.5 18a6.5 6.5 0 0 1 13 0" />
      <path d="M12 8.5V6" />
      <circle cx="12" cy="4.6" r="1.2" />
    </>
  ),
  parking: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M10 17V7h3.4a3.2 3.2 0 0 1 0 6.4H10" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a15 15 0 0 1 19 0" />
      <path d="M6 12.6a10 10 0 0 1 12 0" />
      <path d="M9.4 16.2a5 5 0 0 1 5.2 0" />
      <circle cx="12" cy="19.4" r="1" />
    </>
  ),
  laundry: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="14" r="4.4" />
      <path d="M8 6.6h.01M11 6.6h.01" />
    </>
  ),
  map: (
    <>
      <path d="M9 20 4 18V4l5 2 6-2 5 2v14l-5-2-6 2Z" />
      <path d="M9 6v14M15 4v14" />
    </>
  ),
  shuttle: (
    <>
      <path d="M3 16V8a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v8" />
      <path d="M14 10h4l3 3v3" />
      <path d="M3 16h14" />
      <circle cx="7.5" cy="17.4" r="1.7" />
      <circle cx="17" cy="17.4" r="1.7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3Z" />
      <path d="m9.4 12.2 1.9 1.9 3.4-3.7" />
    </>
  ),
  exchange: (
    <>
      <path d="M4 8h12l-3.2-3.2" />
      <path d="M20 16H8l3.2 3.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.4l3.4 2" />
    </>
  ),
};

const groups: {
  title: string;
  headline: string;
  text: string;
  icon: IconName;
  points: string[];
}[] = [
  {
    title: "Aquatic escape",
    headline: "Three pools, one horizon",
    text: "Two outdoor swimming pools — including an infinity-style option that melts into the Andaman — plus a sheltered indoor pool for quiet morning laps or evening stillness.",
    icon: "pool",
    points: ["Infinity-style pool", "Sheltered indoor pool", "Lap lanes at first light"],
  },
  {
    title: "Wellness and recreation",
    headline: "Move, play, then unwind",
    text: "A fully equipped fitness centre for the disciplined days, billiards for the unhurried ones, and a lush tropical garden with a sun-drenched terrace to do absolutely nothing in.",
    icon: "dumbbell",
    points: ["Fitness centre", "Billiards room", "Tropical garden", "Sun terrace"],
  },
  {
    title: "Dining and social",
    headline: "Sunrise until last call",
    text: "An on-site restaurant serving Thai, French, and international cuisine with halal options. Breakfast through dinner, cocktails at the bar, and room service whenever you prefer the room.",
    icon: "utensils",
    points: ["Thai · French · International", "Halal options", "Bar & cocktails", "Room service"],
  },
];

const services: { label: string; icon: IconName }[] = [
  { label: "24-hour front desk & concierge", icon: "clock" },
  { label: "Free self-parking", icon: "parking" },
  { label: "Complimentary Wi-Fi throughout", icon: "wifi" },
  { label: "Laundry facilities", icon: "laundry" },
  { label: "Tours, tickets & transfers", icon: "map" },
  { label: "Airport shuttle on request", icon: "shuttle" },
  { label: "Safety deposit boxes", icon: "shield" },
  { label: "Currency exchange", icon: "exchange" },
  { label: "Luggage storage", icon: "bell" },
];

function LineIcon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

export default function Amenities() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (reduced) return;

      gsap.from("[data-reveal]", {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root, start: "top 78%" },
      });

      gsap.from("[data-rule]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power2.inOut",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 70%" },
      });

      gsap.from("[data-frame]", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });

      gsap.from("[data-item]", {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: { trigger: root, start: "top 62%" },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="amenities" className={styles.section} ref={rootRef}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.headMain}>
            <p className={styles.kicker} data-reveal>
              Hotel amenities
            </p>
            <h2 className={styles.title} data-reveal>
              Everything you need,
              <br />
              nothing you don&apos;t
            </h2>
          </div>
          <p className={styles.lead} data-reveal>
            Everything here sits minutes from your room: three pools to fall
            into, a gym to keep the promise, a kitchen that runs from sunrise to
            last call, and a team that never makes you ask twice.
          </p>
        </header>

        <div className={styles.body}>
          <figure className={styles.figure}>
            <div className={styles.frame} data-frame>
              <Image
                src="/hotel2.png"
                alt="The hotel swimming pool with a relaxed seating area beside the water"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>
              <span>Three pools</span>
              <span>Patong, Phuket</span>
            </figcaption>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt>3</dt>
                <dd>Pools</dd>
              </div>
              <div className={styles.stat}>
                <dt>2</dt>
                <dd>Outdoor</dd>
              </div>
              <div className={styles.stat}>
                <dt>1</dt>
                <dd>Indoor</dd>
              </div>
            </dl>
          </figure>

          <div className={styles.groups}>
            {groups.map((group, index) => (
              <article key={group.title} className={styles.group}>
                <span className={styles.rule} data-rule aria-hidden="true" />
                <div className={styles.groupHead}>
                  <span className={styles.index}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.groupTitle}>{group.title}</h3>
                  <span className={styles.groupIcon} aria-hidden="true">
                    <LineIcon name={group.icon} size={26} />
                  </span>
                </div>
                <p className={styles.groupHeadline}>{group.headline}</p>
                <p className={styles.groupText}>{group.text}</p>
                <ul className={styles.groupList}>
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.services}>
          <span className={styles.rule} data-rule aria-hidden="true" />
          <h3 className={styles.servicesTitle} data-reveal>
            Guest services
          </h3>
          <ul className={styles.serviceList}>
            {services.map((service) => (
              <li key={service.label} className={styles.service} data-item>
                <span className={styles.serviceIcon} aria-hidden="true">
                  <LineIcon name={service.icon} size={19} />
                </span>
                {service.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
