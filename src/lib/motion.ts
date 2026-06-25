import { createMotionVariants, defaultMotionVariants, EASE_OUT, SPRING_SNAPPY, SPRING_GENTLE } from "@/lib/motion-config";

/** Static defaults for SSR. Client components should prefer `useMotionVariants()`. */
export const fadeUp = defaultMotionVariants.fadeUp;
export const fadeIn = defaultMotionVariants.fadeIn;
export const scaleIn = defaultMotionVariants.scaleIn;
export const stagger = defaultMotionVariants.stagger;
export const blurFadeUp = defaultMotionVariants.blurFadeUp;
export const popUp = defaultMotionVariants.popUp;

export { createMotionVariants, EASE_OUT, SPRING_SNAPPY, SPRING_GENTLE };
export type { MotionVariants } from "@/lib/motion-config";
