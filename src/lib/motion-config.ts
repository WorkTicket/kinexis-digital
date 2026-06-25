import type { TargetAndTransition } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Spring presets for interactive elements (buttons, cards, tabs)
export const SPRING_SNAPPY = { type: "spring" as const, stiffness: 420, damping: 30 };
export const SPRING_GENTLE = { type: "spring" as const, stiffness: 200, damping: 24 };

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
  blurAmount: number;
  instant: boolean;
};

export function resolveMotionConfig({ reduced, mobile }: MotionEnvironment): ResolvedMotionConfig {
  return {
    // y is only used for the visible-state target (mobile reduces travel distance).
    // It is NOT encoded into the hidden state so all SSR renders are identical.
    y: mobile ? 10 : 22,
    duration: reduced ? 0 : mobile ? 0.3 : 0.65,
    fadeInDuration: reduced ? 0 : mobile ? 0.25 : 0.55,
    scaleInDuration: reduced ? 0 : mobile ? 0.25 : 0.5,
    staggerChildren: reduced ? 0 : mobile ? 0.05 : 0.09,
    delayChildren: reduced ? 0 : mobile ? 0.02 : 0.06,
    // Blur is skipped on reduced motion. Mobile gets same blur — it's GPU-composited
    // so it's lightweight, and the visual effect is worth keeping on modern phones.
    blurAmount: reduced ? 0 : 7,
    instant: reduced,
  };
}

export type MotionVariantPair = {
  hidden: TargetAndTransition;
  visible: TargetAndTransition;
};

export type MotionVariants = {
  fadeUp: MotionVariantPair;
  fadeIn: MotionVariantPair;
  scaleIn: MotionVariantPair;
  stagger: MotionVariantPair;
  blurFadeUp: MotionVariantPair;
  popUp: MotionVariantPair;
};

export function createMotionVariants(config: ResolvedMotionConfig): MotionVariants {
  const {
    y,
    duration,
    fadeInDuration,
    scaleInDuration,
    staggerChildren,
    delayChildren,
    blurAmount,
  } = config;

  // IMPORTANT: hidden states NEVER use `instant` to collapse to the visible state.
  // Doing so would cause SSR/hydration mismatches because the server renders with
  // reduced=false (window is unavailable) while a client with prefers-reduced-motion
  // could synchronously detect reduced=true, producing different inline styles.
  //
  // Instead, "instant" animations are expressed as duration:0 in the visible
  // transition. MotionConfig reducedMotion="always" (set in MotionProvider when
  // reduced=true) also independently snaps Framer Motion to final values with zero
  // duration, so reduced-motion users never see a flash.
  return {
    fadeUp: {
      hidden: { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: EASE_OUT },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: fadeInDuration, ease: EASE_OUT },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.96 },
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

    // Premium blur-in reveal: elements enter from a haze and come into focus.
    // This is the defining quality marker of high-end sites (Linear, Vercel, Stripe).
    // Uses the same easing and y-travel as fadeUp, plus a gaussian blur.
    blurFadeUp: {
      hidden: { opacity: 0, y, filter: `blur(${blurAmount}px)` },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration, ease: EASE_OUT },
      },
    },

    // Compact pop-up for badges, chips, labels — tighter travel, slight scale.
    popUp: {
      hidden: { opacity: 0, y: 10, scale: 0.93 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.38, ease: EASE_OUT },
      },
    },
  };
}

export const defaultMotionVariants = createMotionVariants(
  resolveMotionConfig({ reduced: false, mobile: false })
);
