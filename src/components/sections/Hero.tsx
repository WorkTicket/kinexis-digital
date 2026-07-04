"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import MeshBackground from "@/components/ui/MeshBackground";
import TwoLineText from "@/components/ui/TwoLineText";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { EASE_OUT } from "@/lib/motion-config";

export default function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const { blurFadeUp, fadeUp, stagger } = useMotionVariants();

  const heroLines = [
    { text: t("line1"), muted: false },
    { text: t("line2"), muted: true },
  ];

  return (
    <section className="hero hero--home">
      <MeshBackground variant="hero" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/25 via-transparent to-charcoal/50" />
      </div>

      <div className="container-site hero__container relative z-10">
        {/* Outer stagger container — staggers its direct motion children */}
        <motion.div
          className="w-full"
          variants={stagger}
          initial={false}
          animate="visible"
        >
          {/* Headline: blurFadeUp for the premium focus-in effect */}
          <motion.h1
            className="type-hero"
            variants={blurFadeUp}
          >
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
          </motion.h1>

          {/* Subtitle: standard fadeUp — supporting role, clean and fast */}
          <motion.p
            className="section-intro-lg"
            variants={fadeUp}
            transition={{ delay: 0.06, ease: EASE_OUT }}
          >
            <TwoLineText text={t("subtitle")} variant="body" className="hero-home-subtitle-line" />
          </motion.p>

          {/* CTAs: last to enter, brief additional pause for hierarchy */}
          <motion.div
            className="hero__cta cta-stack"
            variants={fadeUp}
            transition={{ delay: 0.14, ease: EASE_OUT }}
          >
            <Button href="/contact" variant="primary" fullWidthMobile>
              {tCommon("bookStrategyCall")}
            </Button>
            <Button href="/case-studies" variant="secondary" fullWidthMobile>
              {tCommon("viewOurWork")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
