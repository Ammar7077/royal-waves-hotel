"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const progressBar = progressRef.current;

    if (!hero || !video || !progressBar) return;

    gsap.registerPlugin(ScrollTrigger);

    const playhead = { progress: 0 };
    let targetTime = 0;
    let seekRequest = 0;
    let seekInProgress = false;
    const seekTolerance = 1 / 48;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const requestVideoTime = (time: number) => {
      targetTime = gsap.utils.clamp(0, video.duration || 0, time);
      if (
        prefersReducedMotion ||
        video.readyState < HTMLMediaElement.HAVE_METADATA ||
        seekInProgress ||
        seekRequest
      ) {
        return;
      }

      seekRequest = requestAnimationFrame(() => {
        seekRequest = 0;
        if (
          !video.isConnected ||
          video.readyState < HTMLMediaElement.HAVE_METADATA ||
          Math.abs(video.currentTime - targetTime) < seekTolerance
        ) {
          return;
        }

        seekInProgress = true;
        video.currentTime = targetTime;
      });
    };

    const onSeeked = () => {
      seekInProgress = false;
      if (Math.abs(video.currentTime - targetTime) >= seekTolerance) {
        requestVideoTime(targetTime);
      }
    };

    const onMetadataLoaded = () => requestVideoTime(targetTime);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onMetadataLoaded);

    const scrollAnimation = gsap.to(playhead, {
      progress: 1,
      ease: "none",
      onUpdate: () => {
        requestVideoTime(playhead.progress * video.duration);
      },
      scrollTrigger: {
        trigger: hero,
        start: "top top+=64px",
        end: "bottom bottom",
        scrub: 0.65,
        onUpdate: (self) => gsap.set(progressBar, { scaleX: self.progress }),
      },
    });

    video.pause();

    if (prefersReducedMotion) {
      scrollAnimation.scrollTrigger?.disable();
      gsap.set(progressBar, { scaleX: 0 });
    } else if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      requestVideoTime(0);
    }

    return () => {
      cancelAnimationFrame(seekRequest);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
      scrollAnimation.scrollTrigger?.kill();
      scrollAnimation.kill();
    };
  }, []);

  return (
    <section id="top" className={styles.hero} ref={heroRef}>
      <div className={styles.stage}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/hero-scrub.mp4"
          poster="/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.scene}>
          <div className={styles.location}>
            <svg
              className={styles.locationMark}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>PATONG, PHUKET</span>
            <span className={styles.locationDivider}>/</span>
            <span>THAILAND</span>
          </div>

          <div className={styles.copy}>
            <p className={styles.eyebrow}>A slower kind of escape</p>
            <h1 className={styles.title}>
              <span>Stay close to</span>
              <span>
                the <em>Andaman.</em>
              </span>
            </h1>
            <p className={styles.lead}>
              Find your own rhythm at Royal Waves — a welcoming hideaway in
              vibrant Patong, just moments from the sea.
            </p>
            <div className={styles.actions}>
              <a href="#booking" className={styles.primary}>
                <span>Book your stay</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
              <a href="#rooms" className={styles.secondary}>
                Discover the rooms
              </a>
            </div>
          </div>

          <div className={styles.roomNote}>
            <span className={styles.roomCount}>69</span>
            <span className={styles.roomCaption}>
              thoughtful rooms
              <br />
              made for unwinding
            </span>
          </div>

          <div className={styles.scrollCue} aria-hidden="true">
            <span className={styles.scrollLine} />
            <span>SCROLL TO FEEL THE FLOW</span>
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span>01</span>
            <span className={styles.progressTrack}>
              <span ref={progressRef} className={styles.progressBar} />
            </span>
            <span>02</span>
          </div>
        </div>
      </div>
    </section>
  );
}
