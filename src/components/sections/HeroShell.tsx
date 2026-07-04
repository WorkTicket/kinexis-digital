import { getTranslations } from "next-intl/server";
import HeroCtaLinks from "@/components/ui/HeroCtaLinks";
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
          {/* fetchpriority hints LCP text for the parser (lowercase DOM attr) */}
          <h1 className="type-hero" {...({ fetchpriority: "high" } as Record<string, string>)}>
            <span className="type-hero-line">{t("line1")}</span>
            <span className="type-hero-line text-white/25">{t("line2")}</span>
            <span className="type-hero-line">
              {t("line3")}{" "}
              <span className="gradient-text sm:whitespace-nowrap">{t("line3Highlight")}</span>
            </span>
          </h1>

          <p className="section-intro-lg" {...({ fetchpriority: "high" } as Record<string, string>)}>
            <TwoLineText text={t("subtitle")} variant="body" className="hero-home-subtitle-line" />
          </p>

          <HeroCtaLinks
            primary={{ label: tCommon("bookStrategyCall"), href: "/contact" }}
            secondary={{ label: tCommon("viewOurWork"), href: "/case-studies" }}
          />
        </div>
      </div>
    </section>
  );
}
