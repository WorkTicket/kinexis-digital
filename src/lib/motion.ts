import {
  createMotionVariants,
  defaultMotionVariants,
  EASE_OUT,
  EASE_CINEMATIC,
  EASE_MEDIA,
  SPRING_SNAPPY,
  SPRING_GENTLE,
  SPRING_LUXE,
} from "@/lib/motion-config";

export const fadeUp = defaultMotionVariants.fadeUp;
export const fadeIn = defaultMotionVariants.fadeIn;
export const scaleIn = defaultMotionVariants.scaleIn;
export const stagger = defaultMotionVariants.stagger;
export const blurFadeUp = defaultMotionVariants.blurFadeUp;
export const popUp = defaultMotionVariants.popUp;

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  outExpo: EASE_OUT,
  cinematic: EASE_CINEMATIC,
  media: EASE_MEDIA,
};

export const duration = {
  fade: 0.6,
  fadeUp: 0.85,
  rise: 1.15,
  clip: 1.2,
  blur: 0.95,
  stagger: 0.09,
  staggerTight: 0.06,
  staggerLoose: 0.12,
};

export const spring = {
  chapter: { stiffness: 90, damping: 28, mass: 0.55 },
  parallax: { stiffness: 70, damping: 26, mass: 0.5 },
  press: SPRING_SNAPPY,
  luxe: SPRING_LUXE,
};

export const viewport = {
  once: { once: true, margin: "0px 0px -8% 0px", amount: 0.2 as const },
  media: { once: true, margin: "0px 0px -5% 0px", amount: 0.25 as const },
  chapter: { once: true, margin: "0px 0px -14% 0px", amount: 0.28 as const },
};

export {
  createMotionVariants,
  EASE_OUT,
  EASE_CINEMATIC,
  EASE_MEDIA,
  SPRING_SNAPPY,
  SPRING_GENTLE,
  SPRING_LUXE,
};
export type { MotionVariants } from "@/lib/motion-config";
