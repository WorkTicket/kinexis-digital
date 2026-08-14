import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import { HeroParallax, HeroScrollRoot } from "@/components/home/HeroParallax";
import { SignalPlaneMount } from "@/components/home/SignalPlaneMount";
import { IndustryVisual } from "@/components/industry/IndustryVisual";
import { PageBreadcrumb } from "@/components/page/PageHero";
import { Button } from "@/components/ui/Button";
import type { Industry } from "@/content/industries";
import { cn } from "@/lib/cn";

type IndustryHeroProps = {
  industry: Industry;
  className?: string;
};

/**
 * Homepage-grade cinematic open — veil, atmosphere, staggered enter,
 * split copy + editorial still that settles on load.
 */
export async function IndustryHero({ industry, className }: IndustryHeroProps) {
  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const accentStyle = {
    "--industry-accent": industry.accentColor ?? "#0066ff",
  } as CSSProperties;

  return (
    <section
      aria-labelledby="industry-hero-heading"
      className={cn(
        "hero-shell page-hero page-hero--split relative flex min-h-0 flex-col overflow-x-clip lg:min-h-[100svh]",
        className,
      )}
      style={accentStyle}
    >
      <SignalPlaneMount />
      <div className="hero-film-scrim" aria-hidden />
      <div className="hero-veil" aria-hidden />

      <HeroScrollRoot className="shell shell--cinema page-hero__grid hero-stage relative z-[2]">
        <div className="page-hero__copy-col">
          <HeroParallax layer="copy">
            <div className="hero-copy relative z-[3]">
              <div className="hero-enter hero-enter-1">
                <PageBreadcrumb
                  items={[
                    { href: "/", label: tNav("home") },
                    { href: "/industries", label: tNav("industries") },
                    { label: industry.title },
                  ]}
                />
                <p className="section-eyebrow mt-6">{industry.eyebrow}</p>
              </div>

              <h1
                id="industry-hero-heading"
                className="hero-enter hero-enter-2 mt-5 font-[family-name:var(--font-display)] font-bold tracking-[-0.045em] text-balance text-foreground sm:mt-6 md:mt-7"
              >
                <span className="hero-line">
                  <span className="hero-line__text">{industry.heroTitle}</span>
                </span>
                {industry.heroSignal ? (
                  <span className="hero-line hero-signal-line block">
                    <span className="hero-line__text">{industry.heroSignal}</span>
                  </span>
                ) : null}
              </h1>

              <p className="hero-enter hero-enter-3 hero-lede mt-7 max-w-xl text-[1.125rem] leading-relaxed text-muted sm:mt-8 sm:text-[1.25rem] md:text-[1.3125rem] md:leading-relaxed">
                {industry.heroCopy}
              </p>

              <div className="hero-cta-row mt-10 sm:mt-11 md:mt-12">
                <div className="hero-enter hero-enter-4">
                  <Button href="/contact" size="xl" lift arrow>
                    {t("bookStrategyCall")}
                  </Button>
                </div>
                <div className="hero-enter hero-enter-4b">
                  <Button href="/case-studies" variant="link" arrow>
                    {t("viewOurWork")}
                  </Button>
                </div>
              </div>
            </div>
          </HeroParallax>
        </div>

        <div className="page-hero__visual industry-hero__visual">
          <HeroParallax layer="stage">
            <div className="hero-enter hero-enter-5 industry-hero__stage">
              <IndustryVisual slug={industry.slug} variant="hero" priority />
              {industry.statCallout ? (
                <div
                  className="industry-hero__stat"
                  aria-label="Result highlight"
                >
                  <span className="industry-hero__stat-value">
                    {industry.statCallout.value}
                  </span>
                  <span className="industry-hero__stat-label">
                    {industry.statCallout.label}
                  </span>
                </div>
              ) : null}
            </div>
          </HeroParallax>
        </div>
      </HeroScrollRoot>
    </section>
  );
}
