"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

const FRAME_COUNT = 480;
const FRAMES_PER_SHEET = 12;
const FRAME_COLUMNS = 4;
const FRAME_WIDTH = 960;
const FRAME_HEIGHT = 540;
const SHEET_COUNT = FRAME_COUNT / FRAMES_PER_SHEET;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const progressBar = progressRef.current;

    if (!hero || !canvas || !progressBar) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Unable to create a canvas context for the hero animation.");
      return;
    }

    const playhead = { frame: 0 };
    const sheets = new Map<number, ImageBitmap>();
    const pendingSheets = new Map<number, Promise<void>>();
    const failedSheets = new Set<number>();
    let activeSheet = 0;
    let drawRequest = 0;
    let isActive = true;

    const trimSheets = () => {
      const distantSheets = [...sheets.keys()].sort(
        (first, second) =>
          Math.abs(second - activeSheet) - Math.abs(first - activeSheet),
      );

      while (sheets.size > 3) {
        const sheetIndex = distantSheets.shift();
        if (sheetIndex === undefined) break;
        sheets.get(sheetIndex)?.close();
        sheets.delete(sheetIndex);
      }
    };

    const loadSheet = (sheetIndex: number) => {
      if (
        sheetIndex < 0 ||
        sheetIndex >= SHEET_COUNT ||
        sheets.has(sheetIndex) ||
        pendingSheets.has(sheetIndex) ||
        failedSheets.has(sheetIndex)
      ) {
        return;
      }

      const sheetNumber = String(sheetIndex + 1).padStart(2, "0");
      const request = fetch(`/hero-frames/sheet-${sheetNumber}.jpg`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status} while loading frame sheet.`);
          }
          return response.blob();
        })
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
          if (!isActive) {
            bitmap.close();
            return;
          }

          sheets.set(sheetIndex, bitmap);
          trimSheets();
          drawFrame();
        })
        .catch((error: unknown) => {
          failedSheets.add(sheetIndex);
          console.error(`Unable to load hero frame sheet ${sheetNumber}.`, error);
        })
        .finally(() => {
          pendingSheets.delete(sheetIndex);
        });

      pendingSheets.set(sheetIndex, request);
    };

    const paintFrame = () => {
      const framePosition = gsap.utils.clamp(
        0,
        FRAME_COUNT - 1,
        playhead.frame,
      );
      const firstFrame = Math.floor(framePosition);
      const secondFrame = Math.min(firstFrame + 1, FRAME_COUNT - 1);
      const firstSheetIndex = Math.floor(firstFrame / FRAMES_PER_SHEET);
      const secondSheetIndex = Math.floor(secondFrame / FRAMES_PER_SHEET);
      const movingForward = framePosition >= activeSheet * FRAMES_PER_SHEET;

      activeSheet = firstSheetIndex;
      loadSheet(firstSheetIndex);
      loadSheet(movingForward ? firstSheetIndex + 1 : firstSheetIndex - 1);
      loadSheet(movingForward ? firstSheetIndex + 2 : firstSheetIndex - 2);
      trimSheets();

      const firstSheet = sheets.get(firstSheetIndex);
      const secondSheet = sheets.get(secondSheetIndex);
      if (!firstSheet) return;

      const drawCroppedFrame = (
        sheet: ImageBitmap,
        frame: number,
        opacity: number,
      ) => {
        const positionInSheet = frame % FRAMES_PER_SHEET;
        const sourceX = (positionInSheet % FRAME_COLUMNS) * FRAME_WIDTH;
        const sourceY =
          Math.floor(positionInSheet / FRAME_COLUMNS) * FRAME_HEIGHT;

        context.globalAlpha = opacity;
        context.drawImage(
          sheet,
          sourceX,
          sourceY,
          FRAME_WIDTH,
          FRAME_HEIGHT,
          0,
          0,
          canvas.width,
          canvas.height,
        );
      };

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCroppedFrame(firstSheet, firstFrame, 1);

      const blend = framePosition - firstFrame;
      if (blend > 0 && secondSheet) {
        drawCroppedFrame(secondSheet, secondFrame, blend);
      }
      context.globalAlpha = 1;
    };

    function drawFrame() {
      if (drawRequest) return;
      drawRequest = requestAnimationFrame(() => {
        drawRequest = 0;
        paintFrame();
      });
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scrollAnimation = gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      onUpdate: drawFrame,
      scrollTrigger: {
        trigger: hero,
        start: "top top+=64px",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => gsap.set(progressBar, { scaleX: self.progress }),
      },
    });

    drawFrame();

    if (prefersReducedMotion) {
      scrollAnimation.scrollTrigger?.disable();
      gsap.set(progressBar, { scaleX: 0 });
    }

    return () => {
      isActive = false;
      cancelAnimationFrame(drawRequest);
      scrollAnimation.scrollTrigger?.kill();
      scrollAnimation.kill();
      sheets.forEach((sheet) => sheet.close());
    };
  }, []);

  return (
    <section id="top" className={styles.hero} ref={heroRef}>
      <div className={styles.stage}>
        <canvas
          ref={canvasRef}
          className={styles.video}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          aria-hidden="true"
        />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.scene}>
          <div className={styles.location}>
            <span className={styles.locationMark} aria-hidden="true" />
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
