/**
 * All marketing cards → <Card> or cardClasses()
 * CardFamily → only when semantic family (glass/editorial/dashboard) matters
 * MetricCard → proof stats, case study metrics
 * Never inline: rounded-2xl border border-surface bg-surface-raised
 */
"use client";

import { m as motion } from "@/lib/framer";
import { cardClasses, type CardSurface } from "@/lib/card-styles";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { SPRING_SNAPPY } from "@/lib/motion-config";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = {
  surface?: CardSurface;
  hover?: boolean;
  animated?: boolean;
  press?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

export default function Card({
  surface = "default",
  hover = true,
  animated = false,
  press = false,
  className,
  children,
  ...props
}: CardProps) {
  const { fadeUp } = useMotionVariants();
  const classes = cardClasses({ surface, hover, className });

  if (animated) {
    return (
      <motion.div
        className={classes}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileTap={press ? { scale: 0.982, transition: SPRING_SNAPPY } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

/** Compact row card for dashboard-style list items. */
export function CardRow({
  animated = false,
  className,
  children,
  ...props
}: Omit<CardProps, "surface">) {
  return (
    <Card
      surface="elevated"
      hover={false}
      animated={animated}
      className={cn("flex flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5", className)}
      {...props}
    >
      {children}
    </Card>
  );
}
