"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import TwoLineText from "@/components/ui/TwoLineText";

type Pattern = "A" | "B" | "C" | "D" | "E";

type Props = {
  pattern: Pattern;
  statement?: string;
  title?: string;
  subtitle?: string;
  backgroundWord?: string;
  content?: React.ReactNode;
  className?: string;
};

export default function SectionHeader({
  pattern,
  statement,
  title,
  subtitle,
  backgroundWord,
  content,
  className,
}: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  switch (pattern) {
    case "A":
      return (
        <motion.div
          className={cn("section-header", className)}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {statement && (
            <motion.p variants={fadeUp} className="type-section">
              <TwoLineText text={statement} variant="section" />
            </motion.p>
          )}
        </motion.div>
      );

    case "B":
      return (
        <motion.div
          className={cn("service-section-header max-w-6xl", className)}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {title && (
            <motion.h2 variants={fadeUp} className="type-section text-balance leading-[1.1]">
              <TwoLineText text={title} variant="section" />
            </motion.h2>
          )}
          {subtitle && (
            <motion.p variants={fadeUp} className="service-section-subtitle">
              <TwoLineText text={subtitle} variant="body" />
            </motion.p>
          )}
        </motion.div>
      );

    case "C":
      return (
        <motion.div
          className={cn("service-section-header max-w-6xl", className)}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {title && (
            <motion.h2 variants={fadeUp} className="type-section text-balance leading-[1.1]">
              <TwoLineText text={title} variant="section" />
            </motion.h2>
          )}
          {subtitle && (
            <motion.p variants={fadeUp} className="service-section-subtitle">
              <TwoLineText text={subtitle} variant="body" />
            </motion.p>
          )}
          {content}
        </motion.div>
      );

    case "D":
      return (
        <motion.div
          className={cn("relative overflow-hidden section-padding-sm", className)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {backgroundWord && (
            <motion.div
              className="pointer-events-none select-none text-center text-[12rem] font-bold leading-none md:text-[20rem]"
              style={{ color: "rgba(255,255,255,0.03)" }}
              variants={fadeUp}
            >
              {backgroundWord}
            </motion.div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="section-header">
              {title && (
                <motion.h2 variants={fadeUp} className="section-title mt-0">
                  <TwoLineText text={title} variant="section" />
                </motion.h2>
              )}
              {subtitle && (
                <motion.p variants={fadeUp} className="section-subtitle">
                  <TwoLineText text={subtitle} variant="body" />
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      );

    case "E":
      return (
        <motion.div
          className={cn("relative", className)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {content}
          {title && (
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-8">
              <TwoLineText text={title} variant="section" />
            </motion.h2>
          )}
        </motion.div>
      );

    default:
      return null;
  }
}
