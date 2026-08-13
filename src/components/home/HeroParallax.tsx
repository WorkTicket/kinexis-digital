"use client";

import {
  m as motion,
  motionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

const HeroScrollContext = createContext<MotionValue<number> | null>(null);
const alwaysZero = motionValue(0);

type RootProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Shared scroll progress for the hero — keeps copy and stage in lockstep.
 */
export function HeroScrollRoot({ children, className }: RootProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <HeroScrollContext.Provider value={scrollYProgress}>
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    </HeroScrollContext.Provider>
  );
}

type Props = {
  children: ReactNode;
  /** Parallax intensity — stage drifts more than copy */
  layer?: "stage" | "copy";
};

/**
 * Scroll-linked depth for the hero — stage sinks and softens;
 * copy holds longer so the first viewport stays readable.
 */
export function HeroParallax({ children, layer = "stage" }: Props) {
  const reduced = useReducedMotion();
  const scrollYProgress = useContext(HeroScrollContext);
  const progress = scrollYProgress ?? alwaysZero;

  const rawStageY = useTransform(progress, [0, 1], [0, 120]);
  const rawStageOpacity = useTransform(
    progress,
    [0, 0.35, 0.85],
    [1, 0.72, 0.18],
  );
  const rawStageScale = useTransform(progress, [0, 1], [1, 0.9]);
  const rawStageRotate = useTransform(progress, [0, 1], [0, 2.5]);

  const rawCopyY = useTransform(progress, [0, 1], [0, 48]);
  const rawCopyOpacity = useTransform(
    progress,
    [0, 0.45, 0.95],
    [1, 0.85, 0.4],
  );

  const stageY = useSpring(rawStageY, spring.parallax);
  const stageOpacity = useSpring(rawStageOpacity, spring.parallax);
  const stageScale = useSpring(rawStageScale, spring.parallax);
  const stageRotate = useSpring(rawStageRotate, spring.parallax);
  const copyY = useSpring(rawCopyY, spring.parallax);
  const copyOpacity = useSpring(rawCopyOpacity, spring.parallax);

  if (reduced || !scrollYProgress) {
    return <>{children}</>;
  }

  const style =
    layer === "stage"
      ? {
          y: stageY,
          opacity: stageOpacity,
          scale: stageScale,
          rotateX: stageRotate,
          transformPerspective: 1400,
          transformOrigin: "center top",
        }
      : { y: copyY, opacity: copyOpacity };

  return (
    <div className="will-change-transform">
      <motion.div style={style}>{children}</motion.div>
    </div>
  );
}
