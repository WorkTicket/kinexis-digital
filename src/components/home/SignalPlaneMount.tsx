"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { SignalPlaneFallback } from "@/components/home/SignalPlaneFallback";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SignalPlane = dynamic(
  () =>
    import("@/components/home/SignalPlane").then((mod) => mod.SignalPlane),
  {
    ssr: false,
    loading: () => <SignalPlaneFallback />,
  },
);

export function SignalPlaneMount() {
  const reducedMotion = usePrefersReducedMotion();
  const [unsupported, setUnsupported] = useState(false);
  const onUnsupported = useCallback(() => setUnsupported(true), []);

  return (
    <div
      aria-hidden
      className="hero-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {reducedMotion || unsupported ? (
        <SignalPlaneFallback />
      ) : (
        <SignalPlane onUnsupported={onUnsupported} />
      )}
    </div>
  );
}
