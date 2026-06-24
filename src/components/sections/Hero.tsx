"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import MeshBackground from "@/components/ui/MeshBackground";
import TwoLineText from "@/components/ui/TwoLineText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const reducedMotion = usePrefersReducedMotion();

  const heroLines = [
    { text: t("line1"), muted: false },
    { text: t("line2"), muted: true },
  ];

  const headline = (
    <h1 className="type-hero">
      {heroLines.map((line) => (
        <span
          key={line.text}
          className={`type-hero-line ${line.muted ? "text-white/25" : ""}`}
        >
          {line.text}
        </span>
      ))}
      <span className="type-hero-line">
        {t("line3")}{" "}
        <span className="gradient-text sm:whitespace-nowrap">{t("line3Highlight")}</span>
      </span>
    </h1>
  );

  return (
    <section className="hero hero--home">
      <MeshBackground variant="hero" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/25 via-transparent to-[#111827]/50" />
      </div>

      <div className="container-site hero__container relative z-10">
        <div className="w-full">
          {reducedMotion ? (
            headline
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {headline}
            </motion.div>
          )}

          {reducedMotion ? (
            <>
              <p className="section-intro-lg">
                <TwoLineText text={t("subtitle")} variant="body" className="hero-home-subtitle-line" />
              </p>
              <div className="hero__cta cta-stack">
                <Button href="/contact" variant="primary" fullWidthMobile>
                  {tCommon("bookStrategyCall")}
                </Button>
              </div>
            </>
          ) : (
            <>
              <motion.p
                className="section-intro-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <TwoLineText text={t("subtitle")} variant="body" className="hero-home-subtitle-line" />
              </motion.p>

              <motion.div
                className="hero__cta cta-stack"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button href="/contact" variant="primary" fullWidthMobile>
                  {tCommon("bookStrategyCall")}
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
