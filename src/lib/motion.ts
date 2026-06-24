import { createMotionVariants, defaultMotionVariants, EASE_OUT } from "@/lib/motion-config";

/** Static defaults for SSR. Client components should prefer `useMotionVariants()`. */
export const fadeUp = defaultMotionVariants.fadeUp;
export const fadeIn = defaultMotionVariants.fadeIn;
export const scaleIn = defaultMotionVariants.scaleIn;
export const stagger = defaultMotionVariants.stagger;

export { createMotionVariants, EASE_OUT };
export type { MotionVariants } from "@/lib/motion-config";
