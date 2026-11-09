"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const PLAY_MS = 1400;
const GAP_MIN_MS = 3200;
const GAP_MAX_MS = 7800;
const FIRST_DELAY_MS = 1800;

function nextGap() {
  return GAP_MIN_MS + Math.floor(Math.random() * (GAP_MAX_MS - GAP_MIN_MS + 1));
}

export default function HeaderCta({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

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
      clearNudge();
      void el.offsetWidth;
      el.dataset.ctaNudge = "1";
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
    schedule(FIRST_DELAY_MS);

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
