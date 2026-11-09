"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const VARIANTS = ["bounce", "tap", "pulse", "rise", "glint", "knock"] as const;
type Variant = (typeof VARIANTS)[number];

const PLAY_MS = 1200;
const GAP_MIN_MS = 2800;
const GAP_MAX_MS = 5600;

function nextGap() {
  return GAP_MIN_MS + Math.floor(Math.random() * (GAP_MAX_MS - GAP_MIN_MS + 1));
}

function pickVariant(last: Variant | ""): Variant {
  let next = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
  while (next === last) {
    next = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
  }
  return next;
}

export default function HeaderCta({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let last: Variant | "" = "";
    let gapTimer = 0;
    let clearTimer = 0;
    let stopped = false;

    const clearNudge = () => {
      el.removeAttribute("data-cta-nudge");
    };

    const schedule = (delay: number) => {
      gapTimer = window.setTimeout(play, delay);
    };

    const play = () => {
      if (stopped) return;
      if (el.matches(":hover, :focus-visible, :active") || document.hidden) {
        schedule(nextGap());
        return;
      }
      const variant = pickVariant(last);
      last = variant;
      clearNudge();
      // Retrigger CSS even if the same attribute value is reused later.
      void el.offsetWidth;
      el.dataset.ctaNudge = variant;
      clearTimer = window.setTimeout(() => {
        clearNudge();
        schedule(nextGap());
      }, PLAY_MS);
    };

    const onVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(gapTimer);
        window.clearTimeout(clearTimer);
        clearNudge();
      } else if (!stopped) {
        schedule(nextGap());
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    schedule(1600);

    return () => {
      stopped = true;
      window.clearTimeout(gapTimer);
      window.clearTimeout(clearTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      clearNudge();
    };
  }, []);

  return (
    <Link ref={ref} className="btn btn--primary header__cta" href={href} prefetch={false}>
      <span className="header__cta-label">{label}</span>
    </Link>
  );
}
