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
import MeshBackground from "@/components/ui/MeshBackground";
import TwoLineText from "@/components/ui/TwoLineText";

export default async function HeroShell() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");

  return (
    <section className="hero hero--home hero--ssr">
      <MeshBackground variant="hero" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/25 via-transparent to-charcoal/50" />
      </div>

      <div className="container-site hero__container relative z-10">
        <div className="w-full">
          <HeroTitle>
            <span className="type-hero-line">{t("line1")}</span>
            <span className="type-hero-line text-white/40" aria-hidden="true">{t("line2")}</span>
            <span className="type-hero-line">{t("line3")}</span>
            <span className="type-hero-line gradient-text hero-home-highlight">{t("line3Highlight")}</span>
          </HeroTitle>

          <HeroSubtitle variant="intro-plain">
            <TwoLineText text={t("subtitle")} variant="body" className="hero-home-subtitle-line" />
          </HeroSubtitle>

          <HeroCtaLinks
            primary={{ label: tCommon("bookStrategyCall"), href: "/contact" }}
            secondary={{ label: tCommon("viewOurWork"), href: "/case-studies" }}
          />
        </div>
      </div>
    </section>
  );
}
