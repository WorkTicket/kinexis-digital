"use client";

import { useTranslations } from "next-intl";
import { m as motion } from "@/lib/framer";
import Button from "@/components/ui/Button";
import TwoLineText from "@/components/ui/TwoLineText";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { pageSectionClasses } from "@/lib/page-section-surface";

/** Locked site-wide service CTA — identical on every service page. */
export default function ServiceCTA() {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");
  const { fadeUp, blurFadeUp, popUp, stagger } = useMotionVariants();
  const headline = `${t("title")} ${t("titleHighlight")}`;

  return (
    <section
      id="cta"
      className={pageSectionClasses(0, { tone: "cta" })}
      aria-labelledby="cta-heading"
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
        <motion.span variants={popUp} className="section-label">
          {t("label")}
        </motion.span>
        <motion.h2 id="cta-heading" variants={blurFadeUp} className="section-title text-balance">
          <TwoLineText text={headline} variant="section" />
        </motion.h2>
        <motion.p variants={fadeUp} className="section-subtitle">
          <TwoLineText text={t("subtitle")} variant="body" />
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 mt-[var(--space-subheading-cta)]">
          <div className="cta-stack w-full justify-center">
            <Button href="/contact" variant="primary" fullWidthMobile>
              {tCommon("bookStrategyCall")}
            </Button>
          </div>
          <p className="text-xs text-text-muted">No long-term contracts. Month to month.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
