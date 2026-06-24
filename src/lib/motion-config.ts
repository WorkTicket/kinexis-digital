import type { Variants } from "@/lib/framer";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export type MotionEnvironment = {
  reduced: boolean;
  mobile: boolean;
};

export type ResolvedMotionConfig = {
  y: number;
  duration: number;
  fadeInDuration: number;
  scaleInDuration: number;
  staggerChildren: number;
  delayChildren: number;
  instant: boolean;
};

export function resolveMotionConfig({ reduced, mobile }: MotionEnvironment): ResolvedMotionConfig {
  return {
    y: reduced ? 0 : mobile ? 10 : 20,
    duration: reduced ? 0 : mobile ? 0.3 : 0.6,
    fadeInDuration: reduced ? 0 : mobile ? 0.25 : 0.5,
    scaleInDuration: reduced ? 0 : mobile ? 0.25 : 0.5,
    staggerChildren: reduced ? 0 : mobile ? 0.05 : 0.1,
    delayChildren: reduced ? 0 : mobile ? 0.025 : 0.05,
    instant: reduced,
  };
}

export type MotionVariants = {
  fadeUp: Variants;
  fadeIn: Variants;
  scaleIn: Variants;
  stagger: Variants;
};

export function createMotionVariants(config: ResolvedMotionConfig): MotionVariants {
  const {
    y,
    duration,
    fadeInDuration,
    scaleInDuration,
    staggerChildren,
    delayChildren,
    instant,
  } = config;

  return {
    fadeUp: {
      hidden: { opacity: instant ? 1 : 0, y: instant ? 0 : y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: EASE_OUT },
      },
    },
    fadeIn: {
      hidden: { opacity: instant ? 1 : 0 },
      visible: {
        opacity: 1,
        transition: { duration: fadeInDuration, ease: EASE_OUT },
      },
    },
    scaleIn: {
      hidden: { opacity: instant ? 1 : 0, scale: instant ? 1 : 0.97 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: scaleInDuration, ease: EASE_OUT },
      },
    },
    stagger: {
      hidden: {},
      visible: {
        transition: { staggerChildren, delayChildren },
      },
    },
  };
}

export const defaultMotionVariants = createMotionVariants(
  resolveMotionConfig({ reduced: false, mobile: false })
);
