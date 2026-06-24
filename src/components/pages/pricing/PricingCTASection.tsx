"use client";

import { m as motion } from "@/lib/framer";
import Button from "@/components/ui/Button";
import TwoLineText from "@/components/ui/TwoLineText";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { pageSectionClasses } from "@/lib/page-section-surface";

type Props = {
  headline: string;
  subtitle: string;
  ctaLabel: string;
};

export default function PricingCTASection({ headline, subtitle, ctaLabel }: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <section
      id="pricing-cta"
      className={pageSectionClasses(0, { tone: "cta" })}
      aria-labelledby="pricing-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-32 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-gradient opacity-10 blur-[100px]" />
      </div>
      <motion.div
        className="container-site relative text-center section-header"
        style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.span variants={fadeUp} className="section-label">
          Ready to scope your plan?
        </motion.span>
        <motion.h2 id="pricing-cta-heading" variants={fadeUp} className="section-title text-balance">
          {headline}
        </motion.h2>
        <motion.p variants={fadeUp} className="section-subtitle">
          <TwoLineText text={subtitle} variant="body" />
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-2"
          style={{ marginTop: "var(--space-subheading-cta)" }}
        >
          <div className="cta-stack w-full justify-center">
            <Button href="/contact" variant="primary" fullWidthMobile>
              {ctaLabel}
            </Button>
          </div>
          <p className="text-xs text-white/30">No long-term contracts. Month to month.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
