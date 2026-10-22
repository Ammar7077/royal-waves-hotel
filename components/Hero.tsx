"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

const FRAME_COUNT = 381;
const FRAMES_PER_SHEET = 12;
const FRAME_COLUMNS = 4;
const FRAME_WIDTH = 800;
const FRAME_HEIGHT = 450;
const SHEET_COUNT = Math.ceil(FRAME_COUNT / FRAMES_PER_SHEET);
const OMITTED_FRAME_START = 240;
const OMITTED_FRAME_END = 300;
const OMITTED_SHEET_INDICES = new Set([20, 21, 22, 23, 24]);
const BRIDGE_PRELOAD_START = OMITTED_FRAME_START - FRAMES_PER_SHEET * 2;

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
    const sheetBlobs = new Map<number, Promise<Blob>>();
    const failedSheets = new Set<number>();
    let activeSheet = 0;
    let bridgePreloadActive = false;
    let drawRequest = 0;
    let isActive = true;

    const getSheetBlob = (sheetIndex: number) => {
      const cached = sheetBlobs.get(sheetIndex);
      if (cached) return cached;

      const sheetNumber = String(sheetIndex + 1).padStart(2, "0");
      const request = fetch(`/hero-frames/sheet-${sheetNumber}.jpg`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status} while loading frame sheet.`);
          }
          return response.blob();
        })
        .catch((error: unknown) => {
          sheetBlobs.delete(sheetIndex);
          throw error;
        });

      sheetBlobs.set(sheetIndex, request);
      return request;
    };

    const trimSheets = (keep: number[] = []) => {
      const pinnedSheets = new Set([
        ...keep,
        ...(bridgePreloadActive ? [19, 25] : []),
      ]);
      const distantSheets = [...sheets.keys()]
        .filter((sheetIndex) => !pinnedSheets.has(sheetIndex))
        .sort(
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
        OMITTED_SHEET_INDICES.has(sheetIndex) ||
        sheets.has(sheetIndex) ||
        pendingSheets.has(sheetIndex) ||
        failedSheets.has(sheetIndex)
      ) {
        return;
      }

      const sheetNumber = String(sheetIndex + 1).padStart(2, "0");
      const request = getSheetBlob(sheetIndex)
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

    const paintFrame = () => {
      const framePosition = gsap.utils.clamp(
        0,
        FRAME_COUNT - 1,
        playhead.frame,
      );
      bridgePreloadActive =
        framePosition >= BRIDGE_PRELOAD_START &&
        framePosition <= OMITTED_FRAME_END;

      if (
        framePosition >= OMITTED_FRAME_START &&
        framePosition <= OMITTED_FRAME_END
      ) {
        activeSheet =
          Math.round(framePosition) <
          (OMITTED_FRAME_START + OMITTED_FRAME_END) / 2
            ? 19
            : 25;
        loadSheet(19);
        loadSheet(25);
        trimSheets([19, 25]);

        const outgoingSheet = sheets.get(19);
        const incomingSheet = sheets.get(25);
        if (!outgoingSheet || !incomingSheet) return;

        const blendProgress = gsap.utils.clamp(
          0,
          1,
          (framePosition - OMITTED_FRAME_START) /
            (OMITTED_FRAME_END - OMITTED_FRAME_START),
        );
        const blend = blendProgress * blendProgress * (3 - 2 * blendProgress);
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawCroppedFrame(outgoingSheet, OMITTED_FRAME_START - 1, 1);
        drawCroppedFrame(incomingSheet, OMITTED_FRAME_END, blend);
        context.globalAlpha = 1;
        return;
      }

      const firstFrame = Math.floor(framePosition);
      const secondFrame = Math.min(firstFrame + 1, FRAME_COUNT - 1);
      const firstSheetIndex = Math.floor(firstFrame / FRAMES_PER_SHEET);
      const secondSheetIndex = Math.floor(secondFrame / FRAMES_PER_SHEET);
      const movingForward = firstSheetIndex >= activeSheet;

      activeSheet = firstSheetIndex;
      loadSheet(firstSheetIndex);
      if (
        framePosition >= BRIDGE_PRELOAD_START &&
        firstFrame < OMITTED_FRAME_START
      ) {
        loadSheet(25);
      }
      loadSheet(
        gsap.utils.clamp(
          0,
          SHEET_COUNT - 1,
          firstSheetIndex + (movingForward ? 1 : -1),
        ),
      );
      loadSheet(
        gsap.utils.clamp(
          0,
          SHEET_COUNT - 1,
          firstSheetIndex + (movingForward ? 2 : -2),
        ),
      );
      trimSheets();

      const firstSheet = sheets.get(firstSheetIndex);
      const secondSheet = sheets.get(secondSheetIndex);
      if (!firstSheet) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCroppedFrame(firstSheet, firstFrame, 1);

      const blend = framePosition - firstFrame;
      if (blend > 0 && secondSheet) {
        drawCroppedFrame(secondSheet, secondFrame, blend);
      }
      context.globalAlpha = 1;
    };

    const preloadSheets = async (sheetIndices: number[]) => {
      for (const sheetIndex of sheetIndices) {
        if (!isActive) return;
        if (OMITTED_SHEET_INDICES.has(sheetIndex)) continue;

        try {
          await getSheetBlob(sheetIndex);
        } catch (error) {
          console.error(
            `Unable to preload hero frame sheet ${String(sheetIndex + 1).padStart(2, "0")}.`,
            error,
          );
        }
      }
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
        scrub: 0.8,
        onUpdate: (self) => gsap.set(progressBar, { scaleX: self.progress }),
      },
    });

    drawFrame();
    void Promise.all([
      preloadSheets(Array.from({ length: 20 }, (_, index) => index)),
      preloadSheets(Array.from({ length: 7 }, (_, index) => index + 25)),
    ]);

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
      sheetBlobs.clear();
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
