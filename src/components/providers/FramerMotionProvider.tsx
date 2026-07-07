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
      duration: reduced ? 0 : mobile ? 0.3 : 0.65,
    }),
    [reduced, mobile]
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="never"
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

/** @deprecated Use MotionShell — kept for direct imports during migration. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionFlagsProvider>
      <FramerMotionProvider>{children}</FramerMotionProvider>
    </MotionFlagsProvider>
  );
}
