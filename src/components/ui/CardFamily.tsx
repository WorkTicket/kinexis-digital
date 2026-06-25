"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { SPRING_SNAPPY } from "@/lib/motion-config";

type Family = "glass" | "editorial" | "dashboard" | "showcase" | "interactive";

type Props = {
  family: Family;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

const familyStyles: Record<Family, string> = {
  glass:
    "rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl card-pad",
  editorial:
    "border-0 border-b border-white/[0.06] rounded-none bg-transparent pb-6",
  dashboard:
    "rounded-2xl border border-white/[0.06] bg-bg-dark card-pad",
  showcase:
    "relative overflow-hidden rounded-2xl bg-bg-secondary border border-white/[0.06] card-pad",
  interactive:
    "rounded-2xl border border-white/[0.06] bg-bg-secondary card-pad",
};

export default function CardFamily({ family, children, className, hover = true }: Props) {
  const { fadeUp } = useMotionVariants();
  const base = familyStyles[family];
  const hoverClass = hover ? "motion-card" : "";

  return (
    <motion.div
      className={cn(base, hoverClass, className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      // Spring press: satisfying push-down and spring-back on click
      whileTap={hover ? { scale: 0.982, transition: SPRING_SNAPPY } : undefined}
    >
      {children}
    </motion.div>
  );
}
