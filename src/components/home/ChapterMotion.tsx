"use client";

import {
  m as motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { spring } from "@/lib/motion";
import { useDeferMotion } from "@/hooks/useDeferMotion";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Quiet scroll settle for long chapters — a few pixels of drift only.
 * Opacity stays untouched so Reveal entrances stay crisp.
 */
export function ChapterMotion({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const soft = useDeferMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = soft ? 12 : 32;
  const exit = soft ? -8 : -20;
  const scaleIn = soft ? 0.992 : 0.982;
  const scaleOut = soft ? 0.996 : 0.99;

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    [travel, 0, 0, exit],
  );
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    [scaleIn, 1, 1, scaleOut],
  );

  const y = useSpring(rawY, spring.chapter);
  const scale = useSpring(rawScale, spring.chapter);

  if (reduced || soft) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale, transformOrigin: "center top" }}>
        {children}
      </motion.div>
    </div>
  );
}
