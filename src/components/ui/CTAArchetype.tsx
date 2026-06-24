"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import Button from "@/components/ui/Button";
import TwoLineText from "@/components/ui/TwoLineText";

type Archetype = "default" | "tool" | "story" | "bold" | "inline";

type Props = {
  archetype?: Archetype;
  headline: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
};

export default function CTAArchetype({
  archetype = "default",
  headline,
  subtitle,
  ctaLabel,
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
  className,
}: Props) {
  const { fadeUp, blurFadeUp, popUp, stagger } = useMotionVariants();
  const t = useTranslations("cta");

  if (archetype === "tool") {
    return (
      <section className={cn("section-padding relative overflow-hidden bg-gradient-glow border-t border-surface", className)}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-32 bg-gradient blur-[100px] opacity-10" />
        </div>
        <motion.div
          className="container-site text-center relative"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="section-header mx-auto">
            <motion.h2 variants={blurFadeUp} className="section-title text-balance mt-0">
              <TwoLineText text={headline} variant="section" />
            </motion.h2>
            {subtitle && (
              <motion.p variants={fadeUp} className="section-subtitle">
                <TwoLineText text={subtitle} variant="body" />
              </motion.p>
            )}
            <motion.div
              variants={fadeUp}
              className="cta-stack mt-[var(--space-subheading-cta)]"
            >
              <Button href={ctaHref} variant="primary" fullWidthMobile>
                {ctaLabel}
              </Button>
              {secondaryCtaLabel && secondaryCtaHref && (
                <Button href={secondaryCtaHref} variant="secondary" fullWidthMobile>
                  {secondaryCtaLabel}
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }

  if (archetype === "story") {
    return (
      <section className={cn("section-padding relative overflow-hidden bg-bg border-t border-surface", className)}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/[0.02] blur-[120px]" />
        </div>
        <motion.div
          className="container-site text-center relative"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="section-header mx-auto">
            <motion.span variants={popUp} className="section-label">
              {t("label")}
            </motion.span>
            <motion.h2 variants={blurFadeUp} className="section-title text-balance">
              <TwoLineText text={headline} variant="section" />
            </motion.h2>
            {subtitle && (
              <motion.p variants={fadeUp} className="section-subtitle">
                <TwoLineText text={subtitle} variant="body" />
              </motion.p>
            )}
            <motion.div
              variants={fadeUp}
              className="cta-stack mt-[var(--space-subheading-cta)]"
            >
              <Button href={ctaHref} variant="primary" fullWidthMobile>
                {ctaLabel}
              </Button>
              {secondaryCtaLabel && secondaryCtaHref && (
                <Button href={secondaryCtaHref} variant="secondary" fullWidthMobile>
                  {secondaryCtaLabel}
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }

  if (archetype === "bold") {
    return (
      <section className={cn("section-padding relative overflow-hidden bg-gradient-glow", className)}>
        <div className="container-site">
          <motion.div
            className="section-header mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2 variants={blurFadeUp} className="section-title mt-0">
              <TwoLineText text={headline} variant="section" />
            </motion.h2>
            {subtitle && (
              <motion.p variants={fadeUp} className="section-subtitle">
                <TwoLineText text={subtitle} variant="body" />
              </motion.p>
            )}
            <motion.div
              variants={fadeUp}
              className="flex justify-center mt-[var(--space-subheading-cta)]"
            >
              <Button href={ctaHref} variant="primary" fullWidthMobile>
                {ctaLabel}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (archetype === "inline") {
    return (
      <section className={cn("section-padding border-t border-surface", className)}>
        <div className="container-site">
          <motion.div
            className="flex flex-col items-center justify-between gap-8 md:flex-row"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div>
              <motion.h2 variants={fadeUp} className="type-subheader text-balance">
                <TwoLineText text={headline} variant="subheader" />
              </motion.h2>
              {subtitle && (
                <motion.p variants={fadeUp} className="mt-3 type-body text-muted prose-readable-sm">
                  {subtitle}
                </motion.p>
              )}
            </div>
            <motion.div variants={fadeUp} className="shrink-0 w-full sm:w-auto">
              <Button href={ctaHref} variant="primary" fullWidthMobile>
                {ctaLabel}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("section-padding relative overflow-hidden bg-gradient-glow border-t border-surface", className)}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-32 bg-gradient blur-[100px] opacity-10" />
      </div>
      <motion.div
        className="container-site text-center relative"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="section-header mx-auto">
          <motion.span variants={popUp} className="section-label">
            {t("label")}
          </motion.span>
          <motion.h2 variants={blurFadeUp} className="section-title text-balance">
            <TwoLineText text={headline} variant="section" />
          </motion.h2>
          {subtitle && (
            <motion.p variants={fadeUp} className="section-subtitle">
              <TwoLineText text={subtitle} variant="body" />
            </motion.p>
          )}
          <motion.div
            variants={fadeUp}
            className="cta-stack mt-[var(--space-subheading-cta)]"
          >
            <Button href={ctaHref} variant="primary" fullWidthMobile>
              {ctaLabel}
            </Button>
            {secondaryCtaLabel && secondaryCtaHref && (
              <Button href={secondaryCtaHref} variant="secondary" fullWidthMobile>
                {secondaryCtaLabel}
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
