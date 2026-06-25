"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import TwoLineText from "@/components/ui/TwoLineText";
import { useMotionVariants } from "@/hooks/useMotionVariants";

export default function CTASection() {
  const { fadeUp, blurFadeUp, popUp, stagger } = useMotionVariants();
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <section className="section-padding border-t border-surface relative overflow-hidden bg-gradient-glow">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-32 bg-gradient blur-[100px] opacity-10" />
      </div>
      <motion.div
        className="container-site text-center relative"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="section-header mx-auto">
          <motion.span variants={popUp} className="section-label">
            {t("label")}
          </motion.span>
          <motion.h2 variants={blurFadeUp} className="section-title text-balance">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle">
            <TwoLineText text={t("subtitle")} variant="body" />
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-2 mt-[var(--space-subheading-cta)]"
          >
            <div className="cta-stack w-full justify-center">
              <Button href="/contact" variant="primary" fullWidthMobile>
                {tCommon("bookStrategyCall")}
              </Button>
              <Button href="/case-studies" variant="secondary" fullWidthMobile>
                {tCommon("viewOurWork")}
              </Button>
            </div>
            <p className="text-xs text-white/30">No long-term contracts. Month to month.</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
