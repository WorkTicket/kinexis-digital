"use client";

import { m as motion } from "@/lib/framer";
import { useMotionVariants } from "@/hooks/useMotionVariants";
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
  const variants = useMotionVariants();
  const chosen = variants[variant] ?? variants.fadeUp;

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
