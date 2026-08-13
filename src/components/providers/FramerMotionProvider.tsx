"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { useContext, useMemo, type ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion-config";
import {
  MotionEnvironmentContext,
  MotionFlagsProvider,
} from "@/components/providers/MotionFlagsProvider";

function FramerMotionInner({ children }: { children: ReactNode }) {
  const { reduced, mobile } = useContext(MotionEnvironmentContext);

  const resolved = useMemo(
    () => ({
      duration: reduced ? 0 : mobile ? 0.32 : 0.72,
    }),
    [reduced, mobile],
  );

  // No `strict` — the app still mixes a few full `motion` helpers (scroll APIs).
  // Animated UI should prefer `m` from @/lib/framer under this provider.
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: resolved.duration, ease: EASE_OUT }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

/** Framer Motion chunk — must render inside MotionFlagsProvider. */
export function FramerMotionProvider({ children }: { children: ReactNode }) {
  return <FramerMotionInner>{children}</FramerMotionInner>;
}

/** Root / page motion shell — flags + LazyMotion features. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionFlagsProvider>
      <FramerMotionProvider>{children}</FramerMotionProvider>
    </MotionFlagsProvider>
  );
}
