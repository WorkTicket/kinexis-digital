/**
 * Hero decision tree — pick one entry point per page type:
 *
 * Homepage           → HeroShell (SSR, LCP-optimized)
 * SSR service pages  → StaticHeroShell (no client JS for hero)
 * Hub/detail pages   → HeroArchetype (client, archetype-driven)
 * Contact            → StaticHeroShell compact variant
 * Blog/case study    → StaticHeroShell article variant
 *
 * Shared text primitives: @/components/ui/hero/HeroContent (+ HeroContentMotion for animation)
 */
import { getTranslations } from "next-intl/server";
import HeroCtaLinks from "@/components/ui/HeroCtaLinks";
import { HeroSubtitle, HeroTitle } from "@/components/ui/hero/HeroContent";
import TwoLineText from "@/components/ui/TwoLineText";

export default async function HeroShell() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");

  return (
    <section className="hero hero--home hero--centered hero--ssr">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-[18%] h-[28rem] w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-neon-cyan/[0.035] blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <div className="container-site hero__container relative z-10">
        <div className="hero-home-copy mx-auto w-full text-center">
          <p className="hero-label mb-5 md:mb-6">KINEXIS</p>

          <HeroTitle variant="center">
            <span className="type-hero-line">{t("line1")}</span>
            <span className="type-hero-line text-white/50" aria-hidden="true">
              {t("line2")}
            </span>
            <span className="type-hero-line">{t("line3")}</span>
            <span className="type-hero-line gradient-text hero-home-highlight">
              {t("line3Highlight")}
            </span>
          </HeroTitle>

          <HeroSubtitle variant="intro-center">
            <TwoLineText text={t("subtitle")} variant="body" className="hero-home-subtitle-line" />
          </HeroSubtitle>

          <HeroCtaLinks
            primary={{ label: tCommon("bookStrategyCall"), href: "/contact" }}
            secondary={{ label: tCommon("getFreeAudit"), href: "/lead-magnet" }}
          />
        </div>
      </div>
    </section>
  );
}
