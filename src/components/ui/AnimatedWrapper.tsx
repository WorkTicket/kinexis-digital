"use client";

import { m as motion } from "@/lib/framer";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useDeferMotion } from "@/hooks/useDeferMotion";
import type { MotionVariants } from "@/lib/motion-config";

type VariantKey = keyof MotionVariants;

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: VariantKey;
  margin?: string;
};

export default function AnimatedWrapper({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  margin = "-50px",
}: Props) {
  const defer = useDeferMotion();
  const variants = useMotionVariants();
  const chosen = variants[variant] ?? variants.fadeUp;

  if (defer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={chosen}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
