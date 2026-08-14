"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const FILM = "/assets/video/hero-open-v2";
/** Bump to force browsers to drop sticky video cache */
const V = "20260807f";
const POSTER = `${FILM}-poster.webp`;
const POSTER_LCP = `${FILM}-poster-sm.webp`;

type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
};

function canPlayHeroFilm() {
  if (window.matchMedia("(max-width: 768px)").matches) return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType === "2g" || connection?.effectiveType === "3g") {
    return false;
  }
  return true;
}

/**
 * Full-bleed homepage hero film — poster paints immediately (LCP).
 * The loop only starts on desktop after load so a 5MB video never
 * contends with LCP on mobile lab tests.
 */
export function HeroFilm() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    if (!canPlayHeroFilm()) return;

    const start = () => setLoadVideo(true);
    if (document.readyState === "complete") {
      const idleId =
        typeof requestIdleCallback === "function"
          ? requestIdleCallback(start, { timeout: 2500 })
          : 0;
      const timeoutId = idleId ? 0 : window.setTimeout(start, 1200);
      return () => {
        if (idleId) cancelIdleCallback(idleId);
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [reducedMotion]);

  useEffect(() => {
    if (!loadVideo || reducedMotion) return;
    const el = videoRef.current;
    if (!el) return;

    const markReady = () => setVideoReady(true);

    if (el.readyState >= 2) markReady();
    else {
      el.addEventListener("loadeddata", markReady, { once: true });
      el.addEventListener("playing", markReady, { once: true });
    }

    const play = el.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {
        /* Autoplay blocked — poster stays visible */
      });
    }

    return () => {
      el.removeEventListener("loadeddata", markReady);
      el.removeEventListener("playing", markReady);
    };
  }, [loadVideo, reducedMotion]);

  return (
    <div
      aria-hidden
      className="hero-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--background)]"
    >
      {/* Pre-optimized 32KB still — skip next/image so LCP is not queued behind Sharp. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_LCP}
        alt="Kinexis Digital homepage atmosphere"
        width={768}
        height={432}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[58%_42%] grayscale blur-[3.5px] scale-105 brightness-[0.92]"
      />

      {loadVideo ? (
        <video
          ref={videoRef}
          key={`${FILM}-${V}`}
          className={`hero-film-video absolute inset-0 h-full w-full object-cover object-[58%_42%] grayscale blur-[3.5px] scale-105 brightness-[0.92]${videoReady ? " is-ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={`${POSTER}?v=${V}`}
        >
          <source src={`${FILM}.webm?v=${V}`} type="video/webm" />
          <source src={`${FILM}.mp4?v=${V}`} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
