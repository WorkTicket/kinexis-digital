"use client";

import { m as motion } from "@/lib/framer";
import StepIcon from "@/components/ui/StepIcon";
import { cardClasses } from "@/lib/card-styles";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { AlertTriangle, Ban, CircleDollarSign, FileWarning, type LucideIcon } from "lucide-react";

type Point = { title: string; description: string };

type Props = {
  points: Point[];
};

const whyIcons: LucideIcon[] = [AlertTriangle, Ban, FileWarning, CircleDollarSign];

export default function WhyKinexusGrid({ points }: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <motion.div
      className="grid gap-grid-sm sm:grid-cols-2"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {points.map((point, i) => {
        const Icon = whyIcons[i % whyIcons.length];
        return (
          <motion.div
            key={point.title}
            variants={fadeUp}
            className={cardClasses({
              surface: "elevated",
              className: "group !p-6 md:!p-7 transition-all duration-500 hover:border-red-500/15",
            })}
          >
            <div className="flex gap-4">
              <StepIcon
                icon={Icon}
                size="sm"
                className="border-red-500/20 bg-red-500/10 [&_svg]:text-red-400"
              />
              <div className="min-w-0">
                <h3 className="font-bold leading-snug" style={{ fontSize: "var(--text-h4, 1.125rem)" }}>
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
