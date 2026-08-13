"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const FILM = "/assets/video/hero-open-v2";
/** Bump to force browsers to drop sticky video cache */
const V = "20260807f";
const POSTER = `${FILM}-poster.webp`;

/**
 * Full-bleed homepage hero film — poster paints immediately (LCP),
 * then the loop fades in when it can play.
 */
export function HeroFilm() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
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
  }, [reducedMotion]);

  return (
    <div
      aria-hidden
      className="hero-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--background)]"
    >
      <Image
        src={POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_42%] grayscale blur-[3.5px] scale-105 brightness-[0.92]"
      />

      {!reducedMotion ? (
        <video
          ref={videoRef}
          key={`${FILM}-${V}`}
          className={`hero-film-video absolute inset-0 h-full w-full object-cover object-[58%_42%] grayscale blur-[3.5px] scale-105 brightness-[0.92]${videoReady ? " is-ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={`${POSTER}?v=${V}`}
        >
          <source src={`${FILM}.webm?v=${V}`} type="video/webm" />
          <source src={`${FILM}.mp4?v=${V}`} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
