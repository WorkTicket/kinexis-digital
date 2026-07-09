"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { pageSectionClasses } from "@/lib/page-section-surface";
import type { ReactNode } from "react";

export type SiteCTATone = "cta" | "dark" | "glow" | "story";
export type SiteCTALayout = "centered" | "inline";

export type SiteCTAProps = {
  id?: string;
  tone?: SiteCTATone;
  layout?: SiteCTALayout;
  surfaceIndex?: number;
  badge?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  contractNote?: string;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  headingId?: string;
  viewportMargin?: string;
  showGlow?: boolean;
};

function resolveSectionClass(tone: SiteCTATone, surfaceIndex: number, className?: string) {
  switch (tone) {
    case "cta":
      return pageSectionClasses(surfaceIndex, { tone: "cta", className });
    case "dark":
      return cn("section-padding relative overflow-hidden border-y border-surface bg-bg-dark", className);
    case "story":
      return cn("section-padding relative overflow-hidden border-t border-surface bg-bg", className);
    case "glow":
    default:
      return cn("section-padding relative overflow-hidden border-t border-surface bg-gradient-glow", className);
  }
}

export default function SiteCTA({
  id,
  tone = "cta",
  layout = "centered",
  surfaceIndex = 0,
  badge,
  title,
  subtitle,
  primaryLabel,
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  contractNote = "No long-term contracts. Month to month.",
  className,
  contentClassName,
  titleClassName,
  subtitleClassName,
  headingId,
  viewportMargin = "-80px",
  showGlow = true,
}: SiteCTAProps) {
  const { fadeUp, blurFadeUp, popUp, stagger } = useMotionVariants();
  const hasSecondary = Boolean(secondaryLabel && secondaryHref);

  const glow = showGlow && (
    <div className="pointer-events-none absolute inset-0">
      {tone === "story" ? (
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-neon-cyan/[0.02] blur-[120px]" />
      ) : (
        <div
          className={cn(
            "absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 bg-gradient blur-[100px]",
            tone === "dark" ? "h-24 max-w-lg opacity-[0.08] blur-[80px]" : "h-32 max-w-3xl opacity-10",
          )}
        />
      )}
    </div>
  );

  if (layout === "inline") {
    return (
      <section id={id} className={cn("section-padding border-t border-surface", className)}>
        <div className="container-site">
          <motion.div
            className="flex flex-col items-center justify-between gap-8 md:flex-row"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
          >
            <div>
              <motion.h2 id={headingId} variants={fadeUp} className={cn("type-subheader text-balance", titleClassName)}>
                {title}
              </motion.h2>
              {subtitle && (
                <motion.p variants={fadeUp} className={cn("mt-3 type-body text-muted prose-readable-sm", subtitleClassName)}>
                  {subtitle}
                </motion.p>
              )}
            </div>
            <motion.div variants={fadeUp} className="w-full shrink-0 sm:w-auto">
              <Button href={primaryHref} variant="primary" fullWidthMobile>
                {primaryLabel}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={resolveSectionClass(tone, surfaceIndex, className)}
      aria-labelledby={headingId}
    >
      {glow}
      <motion.div
        className={cn(
          "container-site relative text-center",
          tone === "dark" ? contentClassName ?? "mid-cta-copy mx-auto" : "section-header",
          tone !== "dark" && contentClassName,
        )}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: viewportMargin }}
      >
        {badge && (
          <motion.span variants={popUp} className="section-label">
            {badge}
          </motion.span>
        )}
        <motion.h2
          id={headingId}
          variants={blurFadeUp}
          className={cn(
            "section-title text-balance",
            tone === "dark" && "mid-cta-title",
            !badge && "mt-0",
            titleClassName,
          )}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={fadeUp} className={cn("section-subtitle", tone === "dark" && "mid-cta-subtitle", subtitleClassName)}>
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="mt-[var(--space-subheading-cta)] flex flex-col items-center gap-2">
          <div className="cta-stack w-full justify-center">
            <Button href={primaryHref} variant="primary" fullWidthMobile>
              {primaryLabel}
            </Button>
            {hasSecondary && (
              <Button href={secondaryHref!} variant="secondary" fullWidthMobile>
                {secondaryLabel}
              </Button>
            )}
          </div>
          {contractNote && <p className="text-xs text-text-muted">{contractNote}</p>}
        </motion.div>
      </motion.div>
    </section>
  );
}
