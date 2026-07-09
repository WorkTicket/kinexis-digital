"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { SPRING_SNAPPY } from "@/lib/motion-config";
import type { CardSurface } from "@/lib/card-styles";

type Family = "glass" | "editorial" | "dashboard" | "showcase" | "interactive";

type Props = {
  family: Family;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

const familySurfaces: Record<Exclude<Family, "editorial">, CardSurface> = {
  glass: "glass",
  dashboard: "default",
  showcase: "elevated",
  interactive: "default",
};

const familyExtras: Record<Family, string> = {
  glass: "",
  editorial: "border-0 border-b border-surface rounded-none bg-transparent pb-6",
  dashboard: "bg-bg-dark",
  showcase: "relative overflow-hidden bg-bg-secondary",
  interactive: "bg-bg-secondary",
};

export default function CardFamily({ family, children, className, hover = true }: Props) {
  const { fadeUp } = useMotionVariants();

  if (family === "editorial") {
    return (
      <motion.div
        className={cn(familyExtras.editorial, hover && "motion-card", className)}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileTap={hover ? { scale: 0.982, transition: SPRING_SNAPPY } : undefined}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Card
      surface={familySurfaces[family]}
      hover={hover}
      animated
      press={hover}
      className={cn(familyExtras[family], className)}
    >
      {children}
    </Card>
  );
}
