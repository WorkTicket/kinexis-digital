import {
  m as motionM,
  AnimatePresence,
  useAnimation,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import type { ComponentType, JSX } from "react";

type MotionTag = keyof JSX.IntrinsicElements;

// Framer Motion + React 19 produce union types TS cannot represent (TS2590).
// Looser component props keep runtime behavior while allowing CI type checks.
type SimplifiedMotion = {
  [Tag in MotionTag]: ComponentType<Record<string, unknown>>;
};

export const m = motionM as unknown as SimplifiedMotion;

export { AnimatePresence, useAnimation, useInView, useMotionValue, useTransform };
export type { Variants, Transition };
