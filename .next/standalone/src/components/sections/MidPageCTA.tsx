"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import TwoLineText from "@/components/ui/TwoLineText";
import { useMotionVariants } from "@/hooks/useMotionVariants";

export default function MidPageCTA() {
  const { fadeUp, blurFadeUp, stagger } = useMotionVariants();
  const t = useTranslations("midCta");
  const tCommon = useTranslations("common");

  return (
    <section className="section-padding relative overflow-hidden border-y border-white/[0.06] bg-bg-dark">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-full max-w-lg bg-gradient blur-[80px] opacity-[0.08]" />
      </div>
      <motion.div
        className="container-site relative"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <div className="mid-cta-copy mx-auto text-center">
          <motion.h2 variants={blurFadeUp} className="mid-cta-title section-title text-balance">
            <TwoLineText text={t("title")} variant="section" />
          </motion.h2>
          <motion.p variants={fadeUp} className="mid-cta-subtitle">
            <TwoLineText text={t("subtitle")} variant="body" />
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 mt-[var(--space-subheading-cta)]">
            <div className="cta-stack w-full justify-center">
              <Button href="/contact" variant="primary" fullWidthMobile>
                {tCommon("bookStrategyCall")}
              </Button>
              <Button href="/lead-magnet" variant="secondary" fullWidthMobile>
                {t("secondaryCta")}
              </Button>
            </div>
            <p className="text-xs text-white/30">No long-term contracts. Month to month.</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
