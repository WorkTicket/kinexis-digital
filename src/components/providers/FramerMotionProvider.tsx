"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { useContext, useMemo, type ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion-config";
import {
  MotionEnvironmentContext,
  MotionFlagsProvider,
} from "@/components/providers/MotionFlagsProvider";

const loadDomAnimation = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

function FramerMotionInner({ children }: { children: ReactNode }) {
  const { reduced, mobile } = useContext(MotionEnvironmentContext);

  const resolved = useMemo(
    () => ({
      duration: reduced ? 0 : mobile ? 0.32 : 0.72,
    }),
    [reduced, mobile],
  );

  // Async feature load keeps domAnimation out of the first JS chunk.
  return (
    <LazyMotion features={loadDomAnimation} strict>
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
