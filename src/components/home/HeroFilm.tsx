"use client";

import { useEffect, useRef, useState } from "react";
import { HOME_HERO_POSTER_DESKTOP } from "@/lib/lcp-preload";
import { scheduleIdleOrScroll } from "@/lib/schedule-idle-or-scroll";

const POSTER_DESKTOP = HOME_HERO_POSTER_DESKTOP;
const SRC_WEBM = "/assets/video/hero-open-v2-sm.webm?v=20260816";
const SRC_MP4 = "/assets/video/hero-open-v2-sm.mp4?v=20260816";
const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function shouldLoadVideo(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Mobile lab + real devices: poster is not LCP; a multi-MB video fights first paint.
  if (window.matchMedia("(max-width: 1023px)").matches) return false;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") {
    return false;
  }
  return true;
}

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mountVideo, setMountVideo] = useState(false);

  useEffect(() => {
    if (!shouldLoadVideo()) return;
    return scheduleIdleOrScroll(() => setMountVideo(true), 4000);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !mountVideo) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;

    const tryPlay = () => {
      el.muted = true;
      void el.play();
    };

    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [mountVideo]);

  return (
    <div
      aria-hidden
      className="hero-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--background)]"
    >
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={POSTER_DESKTOP}
          type="image/webp"
        />
        {/* Transparent fallback so mobile never downloads the desktop film still. */}
        <img
          src={TRANSPARENT_PIXEL}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          className="hero-film-media"
        />
      </picture>

      {mountVideo ? (
        <video
          ref={videoRef}
          className="hero-film-media hero-film-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={SRC_MP4} type="video/mp4" />
          <source src={SRC_WEBM} type="video/webm" />
        </video>
      ) : null}
    </div>
  );
}
