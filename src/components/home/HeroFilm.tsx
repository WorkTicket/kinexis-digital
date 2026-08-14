"use client";

import { useEffect, useRef } from "react";

const SRC = "/assets/video/hero-open-v2.mp4?v=20260814c";
const POSTER_LCP = "/assets/video/hero-open-v2-poster-sm.webp";

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

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
    el.addEventListener("canplaythrough", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    window.addEventListener("focus", tryPlay);

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("canplaythrough", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
      window.removeEventListener("focus", tryPlay);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="hero-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--background)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_LCP}
        alt=""
        width={768}
        height={432}
        fetchPriority="high"
        decoding="async"
        className="hero-film-media"
      />

      <video
        ref={videoRef}
        className="hero-film-media hero-film-video"
        src={SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="hero-atmosphere__fade" />
    </div>
  );
}
