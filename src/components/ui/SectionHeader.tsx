"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import TwoLineText from "@/components/ui/TwoLineText";

// ─── Unified API ────────────────────────────────────────────────────────────
// Every section in the site should consume SectionHeader for consistent
// badge → title → description hierarchy. The legacy pattern A–E API is
// preserved for backward compatibility but all new sections should use
// the primary props API.
//
// Usage:
//   <SectionHeader
//     badge="Our Process"
//     title="How We Generate Growth"
//     description="We combine search intent research, competitor analysis,
//                  and ongoing optimization to build campaigns designed for
//                  sustainable long-term growth."
//   />

type Align = "center" | "left";
type Size = "default" | "lg";
type Pattern = "A" | "B" | "C" | "D" | "E";

// Primary props — use these for all new sections
type PrimaryProps = {
  pattern?: never;
  badge?: string;
  title: string;
  description?: string;
  align?: Align;
  size?: Size;
  children?: React.ReactNode;
  className?: string;
};

// Legacy pattern props — preserved for backward compatibility
type LegacyProps = {
  pattern: Pattern;
  statement?: string;
  title?: string;
  subtitle?: string;
  backgroundWord?: string;
  content?: React.ReactNode;
  className?: string;
  // These are no-ops in legacy mode but kept for type safety
  badge?: never;
  description?: never;
  align?: never;
  size?: never;
  children?: never;
};

type Props = PrimaryProps | LegacyProps;

// ─── Primary SectionHeader ───────────────────────────────────────────────────
function PrimaryHeader({
  badge,
  title,
  description,
  align = "center",
  size = "default",
  children,
  className,
}: PrimaryProps) {
  const { fadeUp, blurFadeUp, popUp, stagger } = useMotionVariants();
  const isCenter = align === "center";

  return (
    <motion.div
      className={cn(
        "section-header",
        isCenter ? "mx-auto" : "mr-auto",
        className
      )}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Badge pops in first — quick, compact, sets the context */}
      {badge && (
        <motion.span variants={popUp} className="section-label">
          {badge}
        </motion.span>
      )}
      {/* Title blurs in — the focus-coming-into-view effect reads as premium */}
      <motion.h2
        variants={blurFadeUp}
        className={cn(
          "section-title text-balance",
          size === "lg" && "section-title--lg",
          badge ? "" : "mt-0"
        )}
      >
        <TwoLineText text={title} variant="section" />
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="section-subtitle">
          {description}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}

// ─── Legacy Patterns ─────────────────────────────────────────────────────────
function LegacyHeader({
  pattern,
  statement,
  title,
  subtitle,
  backgroundWord,
  content,
  className,
}: LegacyProps) {
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
          className={cn("service-section-header mx-auto max-w-3xl text-center", className)}
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
          className={cn("service-section-header mx-auto max-w-3xl text-center", className)}
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

// ─── Export ───────────────────────────────────────────────────────────────────
export default function SectionHeader(props: Props) {
  if (props.pattern !== undefined) {
    return <LegacyHeader {...(props as LegacyProps)} />;
  }
  return <PrimaryHeader {...(props as PrimaryProps)} />;
}
