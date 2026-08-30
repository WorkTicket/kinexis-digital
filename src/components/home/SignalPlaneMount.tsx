"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { SignalPlaneFallback } from "@/components/home/SignalPlaneFallback";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SignalPlane = dynamic(
  () =>
    import("@/components/home/SignalPlane").then((mod) => mod.SignalPlane),
  {
    ssr: false,
    loading: () => null,
  },
);

function canMountWebGL() {
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

/**
 * WebGL only after a real user gesture. Auto-mounting on idle tanks desktop
 * TBT in lab tools (PSI) even when the canvas is decorative.
 */
export function SignalPlaneMount() {
  const reducedMotion = usePrefersReducedMotion();
  const [enhance, setEnhance] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const onUnsupported = useCallback(() => setUnsupported(true), []);

  useEffect(() => {
    if (reducedMotion) return;
    if (!canMountWebGL()) return;

    const start = () => setEnhance(true);
    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", start, opts);
    window.addEventListener("keydown", start, opts);
    window.addEventListener("touchstart", start, opts);
    // Scroll past the first fold — intentional browse, not lab idle
    const onScroll = () => {
      if (window.scrollY > 120) start();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  const showWebGL = enhance && !reducedMotion && !unsupported;

  return (
    <div
      aria-hidden
      className="hero-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <SignalPlaneFallback />
      {showWebGL ? <SignalPlane onUnsupported={onUnsupported} /> : null}
    </div>
  );
}
