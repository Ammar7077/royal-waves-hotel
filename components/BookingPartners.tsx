"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BookingPartners.module.css";

type IconName =
  | "bed"
  | "scale"
  | "compass"
  | "waves"
  | "layers"
  | "hotel"
  | "ticket"
  | "flag"
  | "globe"
  | "guests"
  | "star"
  | "clock"
  | "umbrella"
  | "plane";

type Partner = {
  name: string;
  domain: string;
  url: string;
  icon: IconName;
  note: string;
};

const icons: Record<IconName, React.ReactNode> = {
  bed: (
    <>
      <path d="M3 19v-6h18v6" />
      <path d="M3 13V8" />
      <path d="M21 13v-2a2 2 0 0 0-2-2h-7v4" />
      <circle cx="7.5" cy="10.4" r="1.5" />
    </>
  ),
  scale: (
    <>
      <path d="M4 7h16" />
      <path d="M6 7 3.5 13a2.6 2.6 0 0 0 5 0L6 7Z" />
      <path d="M18 7l-2.5 6a2.6 2.6 0 0 0 5 0L18 7Z" />
      <path d="M12 7v12" />
      <path d="M8 20h8" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.4 8.6-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  waves: (
    <>
      <path d="M3 14c1.8-1.8 3.6-1.8 5.4 0s3.6 1.8 5.4 0 3.6-1.8 5.4 0" />
      <path d="M3 18.5c1.8-1.8 3.6-1.8 5.4 0s3.6 1.8 5.4 0 3.6-1.8 5.4 0" />
      <path d="M7 4.5 13 12" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  hotel: (
    <>
      <path d="M4 21V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15" />
      <path d="M14 10h5a1 1 0 0 1 1 1v10" />
      <path d="M7 9h4M7 13h4M7 17h4" />
      <path d="M2 21h20" />
    </>
  ),
  ticket: (
    <>
      <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" />
      <path d="M14 6v2M14 11v2M14 16v2" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 5h12l-2.6 4L17 13H5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17.5" cy="9.5" r="2.3" />
      <path d="M17 14.6a5 5 0 0 1 4 4.9" />
    </>
  ),
  star: (
    <path d="m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.6Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.4l3.4 2" />
    </>
  ),
  umbrella: (
    <>
      <path d="M3 12a9 9 0 0 1 18 0H3Z" />
      <path d="M12 12v7a2.5 2.5 0 0 0 5 0" />
    </>
  ),
  plane: (
    <>
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
    </>
  ),
};

const bookingCom: Partner = {
  name: "Booking.com",
  domain: "booking.com",
  url: "https://www.booking.com/hotel/th/royal-wave.html",
  icon: "bed",
  note: "Official partner",
};

const partners: Partner[] = [
  bookingCom,
  {
    name: "Trivago",
    domain: "trivago.com",
    url: "https://www.trivago.com/en-US/oar/royal-waves-hotel-patong-beach?search=100-2382720",
    icon: "scale",
    note: "Compares many sites",
  },
  {
    name: "KAYAK",
    domain: "kayak.com.au",
    url: "https://www.kayak.com.au/Patong-Hotels-The-Wave-Patong-Boutique-Hotel.466546.ksp",
    icon: "waves",
    note: "Smart fare finder",
  },
  {
    name: "Momondo",
    domain: "momondo.com",
    url: "https://www.momondo.com/hotels/patong/The-Wave-Hotel-Patong-Sha.mhd466546.ksp",
    icon: "compass",
    note: "Deals & insights",
  },
  {
    name: "HotelsCombined",
    domain: "hotelscombined.ca",
    url: "https://www.hotelscombined.ca/Hotel/The_Wave_Boutique_Hotel.htm",
    icon: "layers",
    note: "One search, many sites",
  },
  {
    name: "Hotels.com",
    domain: "hotels.com",
    url: "https://zh.hotels.com/en/ho3531412352/royal-waves-hotel/",
    icon: "hotel",
    note: "Global hotel booking",
  },
  {
    name: "Tiket.com",
    domain: "tiket.com",
    url: "https://www.tiket.com/en-us/hotel/thailand/royal-waves-hotel-709001726824364994",
    icon: "ticket",
    note: "Travel & stay deals",
  },
  {
    name: "Almosafer",
    domain: "almosafer.com",
    url: "https://global.almosafer.com/en/hotel/details/atg/royal-waves-hotel-3942167",
    icon: "flag",
    note: "Regional favourite",
  },
  {
    name: "Planet of Hotels",
    domain: "planetofhotels.com",
    url: "https://en.planetofhotels.com/thailand/patong-beach/royal-waves-hotel",
    icon: "globe",
    note: "Boutique collection",
  },
  {
    name: "Guest Reservations",
    domain: "guestreservations.com",
    url: "https://www.guestreservations.com/es/royal-waves-hotel-patong-beach/booking",
    icon: "guests",
    note: "Instant confirmation",
  },
  {
    name: "Jetstar Hotels",
    domain: "jetstar.com",
    url: "https://www.jetstar.com/au/en/hotels/properties/1169233-royal-waves-hotel",
    icon: "star",
    note: "Jetstar stays",
  },
  {
    name: "Lastminute.com",
    domain: "lastminute.com",
    url: "https://www.lastminute.com/hotels/thailand/patong/royal-waves-hotel_hid-14422612",
    icon: "clock",
    note: "Last-minute savings",
  },
  {
    name: "A-Hotel.com",
    domain: "a-hotel.com",
    url: "https://www.a-hotel.com/thailand/5715-patong-beach/12767705-1-royal-waves-hotel/",
    icon: "umbrella",
    note: "Asia hotel network",
  },
  {
    name: "Turna",
    domain: "turna.com",
    url: "https://www.turna.com/otel/royal-waves-hotel",
    icon: "plane",
    note: "Travel portal",
  },
];

const rowOne = partners.slice(0, 7);
const rowTwo = partners.slice(7);

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <a
      className={styles.card}
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.chip} aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icons[partner.icon]}
        </svg>
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{partner.name}</span>
        <span className={styles.domain}>{partner.domain}</span>
      </span>
      <span className={styles.note}>{partner.note}</span>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export default function BookingPartners() {
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
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
        },
      });

      const tracks = root.querySelectorAll<HTMLElement>("[data-marquee]");
      tracks.forEach((track) => {
        const direction = Number(track.dataset.direction ?? "1");
        const tween = gsap.to(track, {
          xPercent: -50 * direction,
          duration: 46,
          ease: "none",
          repeat: -1,
        });

        const row = track.closest("[data-marquee-row]");
        if (!row) return;

        const enter = () => gsap.to(tween, { timeScale: 0.15, duration: 0.5 });
        const leave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });

        row.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leave);
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="booking" className={styles.section} ref={rootRef}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.waves} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0 60c120-34 240-34 360 0s240 34 360 0 240-34 360 0 240 34 360 0v60H0Z"
            fill="rgba(255,255,255,0.045)"
          />
          <path
            d="M0 84c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v36H0Z"
            fill="rgba(42,157,154,0.10)"
          />
        </svg>
      </div>

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker} data-reveal>
            BOOK DIRECT · BOOK SMART
          </p>
          <h2 className={styles.title} data-reveal>
            Reserve with the platform you trust
          </h2>
          <p className={styles.lead} data-reveal>
            Royal Waves is listed across the world&apos;s favourite travel
            platforms. Book in your own currency, in your own language, and with
            the terms that suit you — all with the same 69 rooms in Patong.
          </p>
        </header>

        <div className={styles.featured} data-reveal>
          <a
            className={styles.featuredCard}
            href={bookingCom.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.featuredGlow} aria-hidden="true" />
            <span className={styles.badge}>Official booking partner</span>
            <span className={styles.featuredBody}>
              <span className={styles.featuredChip} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons.bed}
                </svg>
              </span>
              <span>
                <span className={styles.featuredName}>Booking.com</span>
                <span className={styles.featuredDomain}>booking.com</span>
              </span>
            </span>
            <span className={styles.featuredText}>
              Free cancellation on most rates, member-only prices, and secure
              payment — the fastest way to confirm your stay at Royal Waves.
            </span>
            <span className={styles.featuredCta}>
              <span>Check availability</span>
              <span className={styles.featuredArrow} aria-hidden="true">
                ↗
              </span>
            </span>
          </a>

          <aside className={styles.direct}>
            <p className={styles.directKicker}>OR BOOK IT YOUR WAY</p>
            <p className={styles.directTitle}>
              Prefer to speak to a human? We&apos;re a short message away.
            </p>
            <ul className={styles.directList}>
              <li>
                <a href="tel:+66627513520" className={styles.directLink}>
                  <span className={styles.directIcon} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
                    </svg>
                  </span>
                  <span>
                    <span className={styles.directLabel}>Call reception</span>
                    <span className={styles.directValue}>+66 627 513 520</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/66627513520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directLink}
                >
                  <span className={styles.directIcon} aria-hidden="true">
                    <svg
                      viewBox="0 0 32 32"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M16.04 3.2A12.7 12.7 0 0 0 5.1 21.2l-1.9 7 7.2-1.9a12.8 12.8 0 0 0 5.64 1.34h.01a12.8 12.8 0 0 0 12.84-12.83A12.75 12.75 0 0 0 16.04 3.2Zm0 23.3h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.27 1.12 1.14-4.16-.25-.42a10.64 10.64 0 0 1-1.64-5.66A10.75 10.75 0 0 1 16.03 5.5h.01a10.72 10.72 0 0 1 10.72 10.72A10.72 10.72 0 0 1 16.04 26.5Zm5.88-7.98c-.32-.16-1.9-.94-2.19-1.05-.29-.11-.5-.16-.71.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.5.14-.66.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.73-.98-2.37-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.09 1.3 3.31.16.21 2.25 3.43 5.45 4.81.76.33 1.35.53 1.82.68.76.24 1.46.21 2.01.13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.52-.08-.14-.29-.21-.61-.37Z" />
                    </svg>
                  </span>
                  <span>
                    <span className={styles.directLabel}>WhatsApp</span>
                    <span className={styles.directValue}>Message us in seconds</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.directLink}>
                  <span className={styles.directIcon} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 6h16v12H4z" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                  </span>
                  <span>
                    <span className={styles.directLabel}>Front desk</span>
                    <span className={styles.directValue}>151/5 Nanai Road, Patong</span>
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div className={styles.marqueeBlock}>
          <div className={styles.marqueeRow} data-marquee-row>
            <div className={styles.track} data-marquee="1">
              {[...rowOne, ...rowOne].map((partner, i) => (
                <PartnerCard key={`a-${partner.name}-${i}`} partner={partner} />
              ))}
            </div>
          </div>
          <div className={styles.marqueeRow} data-marquee-row>
            <div className={styles.track} data-marquee="-1">
              {[...rowTwo, ...rowTwo].map((partner, i) => (
                <PartnerCard key={`b-${partner.name}-${i}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>

        <p className={styles.footnote} data-reveal>
          Rates and policies vary by platform and season — always confirm the
          final price, cancellation terms, and taxes at checkout.
        </p>
      </div>
    </section>
  );
}
