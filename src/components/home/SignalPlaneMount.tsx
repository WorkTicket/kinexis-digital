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
  if (window.matchMedia("(max-width: 768px)").matches) return false;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) return false;
  return true;
}

export function SignalPlaneMount() {
  const reducedMotion = usePrefersReducedMotion();
  const [enhance, setEnhance] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const onUnsupported = useCallback(() => setUnsupported(true), []);

  useEffect(() => {
    if (reducedMotion) return;
    if (!canMountWebGL()) return;

    const start = () => setEnhance(true);
    if (document.readyState === "complete") {
      const idleId =
        typeof requestIdleCallback === "function"
          ? requestIdleCallback(start, { timeout: 3000 })
          : 0;
      const timeoutId = idleId ? 0 : window.setTimeout(start, 1500);
      return () => {
        if (idleId) cancelIdleCallback(idleId);
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
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
