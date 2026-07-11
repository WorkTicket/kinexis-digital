"use client";

import { useContext } from "react";
import { MotionEnvironmentContext } from "@/components/providers/MotionFlagsProvider";

/** Skip Framer Motion below the fold on mobile and when reduced-motion is preferred. */
export function useDeferMotion(): boolean {
  const { mobile, reduced } = useContext(MotionEnvironmentContext);
  return mobile || reduced;
}
