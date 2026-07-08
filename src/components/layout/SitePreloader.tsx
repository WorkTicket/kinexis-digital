"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import "@/styles/site-preloader.css";

const LOGO_SRC = "/assets/logos/KINEXIS_logo_preloader.webp";
const MIN_MS_DESKTOP = 0;
const MIN_MS_MOBILE = 0;
const MAX_MS_DESKTOP = 600;
const MAX_MS_MOBILE = 400;
const FADE_MS = 180;
const FADE_MS_REDUCED = 40;
const COMPLETE_MS = 200;
const PROGRESS_CAP = 0.9;

type PreloaderPhase = "visible" | "hiding" | "gone";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 1023px)").matches;
}

function easeOut(progress: number) {
  return 1 - (1 - progress) ** 1.85;
}

/** Site-wide first-paint shell — React-controlled to avoid hydration conflicts. */
export default function SitePreloader() {
  const tA11y = useTranslations("a11y");
  const [phase, setPhase] = useState<PreloaderPhase>("visible");
  const barRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();
    const minMs = reduced ? 0 : mobile ? MIN_MS_MOBILE : MIN_MS_DESKTOP;
    const maxMs = mobile ? MAX_MS_MOBILE : MAX_MS_DESKTOP;
    const fadeMs = reduced ? FADE_MS_REDUCED : FADE_MS;
    const started = performance.now();
    let finished = false;
    let running = true;
    let rafId = 0;
    let dismissTimer: ReturnType<typeof setTimeout> | undefined;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;

    root.classList.add("preloader-active");
    root.setAttribute("aria-busy", "true");

    const setProgress = (value: number, animate = false) => {
      const bar = barRef.current;
      const track = trackRef.current;
      if (!bar) return;

      const clamped = Math.min(1, Math.max(0, value));
      bar.style.transition = animate ? `transform ${COMPLETE_MS}ms var(--ease-out)` : "none";
      bar.style.transform = `scaleX(${clamped})`;
      track?.setAttribute("aria-valuenow", String(Math.round(clamped * 100)));
    };

    const tick = () => {
      if (!running) return;
      const elapsed = performance.now() - started;
      const raw = Math.min(PROGRESS_CAP, elapsed / maxMs);
      setProgress(easeOut(raw));
      rafId = requestAnimationFrame(tick);
    };

    if (!reduced) {
      rafId = requestAnimationFrame(tick);
    }

    const cleanup = () => {
      running = false;
      cancelAnimationFrame(rafId);
      root.classList.remove("preloader-active");
      root.removeAttribute("aria-busy");
      setPhase("gone");
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      running = false;
      cancelAnimationFrame(rafId);

      if (reduced) {
        setProgress(1);
        setPhase("hiding");
        fadeTimer = setTimeout(cleanup, fadeMs);
        return;
      }

      setProgress(1, true);

      const waitForBar = minMs - (performance.now() - started);
      const delay = Math.max(COMPLETE_MS + 40, waitForBar + COMPLETE_MS + 40);

      dismissTimer = setTimeout(() => {
        setPhase("hiding");
        fadeTimer = setTimeout(cleanup, fadeMs);
      }, delay);
    };

    const scheduleFinish = () => {
      const wait = Math.max(0, minMs - (performance.now() - started));
      dismissTimer = setTimeout(finish, wait);
    };

    if (document.readyState === "interactive" || document.readyState === "complete") {
      scheduleFinish();
    } else {
      document.addEventListener("DOMContentLoaded", scheduleFinish, { once: true });
    }

    const safetyCap = setTimeout(finish, maxMs);

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        if (dismissTimer) clearTimeout(dismissTimer);
        if (fadeTimer) clearTimeout(fadeTimer);
        cleanup();
      }
    };

    window.addEventListener("pageshow", onPageShow, { once: true });

    return () => {
      running = false;
      clearTimeout(safetyCap);
      cancelAnimationFrame(rafId);
      if (dismissTimer) clearTimeout(dismissTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      window.removeEventListener("pageshow", onPageShow);
      root.classList.remove("preloader-active");
      root.removeAttribute("aria-busy");
    };
  }, []);

  if (phase === "gone") return null;

  const isHiding = phase === "hiding";

  return (
    <div
      id="site-preloader"
      className={`site-preloader${isHiding ? " site-preloader--done" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!isHiding}
      aria-hidden={isHiding}
      aria-label={tA11y("loadingSite")}
    >
      <div className="site-preloader__inner">
        <div className="site-preloader__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt={tA11y("preloaderLogoAlt")}
            width={180}
            height={30}
            decoding="async"
            className="site-preloader__logo"
          />
          <div
            ref={trackRef}
            className="site-preloader__track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            aria-label="Page load progress"
          >
            <span ref={barRef} className="site-preloader__bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
