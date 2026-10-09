import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { HeroParallax, HeroScrollRoot } from "@/components/home/HeroParallax";
import { HeroHeading } from "@/components/page/HeroHeading";
import { PageHeroAtmosphere } from "@/components/page/PageHeroAtmosphere";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import "@/styles/components/page-stages.css";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  signal?: string;
  copy: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  meta?: ReactNode;
  /** Optional right-rail visual (stage, gallery, device) */
  visual?: ReactNode;
  /** Explicit full-bleed atmosphere mount (rare — hubs are type-led) */
  atmosphere?: ReactNode;
  /** Opt-in still — omitted by default so hubs stay type-led */
  atmosphereSrc?: string;
  atmosphereSrcSm?: string;
  /** CSS object-position for the atmosphere still under the left wash */
  atmosphereFocus?: string;
  /** Shorter hero for intake pages (contact) */
  compact?: boolean;
  /** Hide CTA row when the next section is the action */
  hideActions?: boolean;
  /** Form in the visual rail — do not clip to the media-stage height. */
  intake?: boolean;
  className?: string;
};

/**
 * Site-wide cinematic hero — same shell, spacing, and enter cascade as HomeHero.
 * Marketing hubs are type-led (no shared desk still). Pass atmosphereSrc only
 * when a route truly needs a unique photographic plate.
 */
export async function PageHero({
  eyebrow,
  title,
  signal,
  copy,
  primaryHref = "/contact",
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  meta,
  visual,
  atmosphere,
  atmosphereSrc,
  atmosphereSrcSm,
  atmosphereFocus,
  compact = false,
  hideActions = false,
  intake = false,
  className,
}: PageHeroProps) {
  const t = await getTranslations("common");
  const resolvedPrimaryLabel = primaryLabel ?? t("bookStrategyCall");
  const hasPhotoAtmosphere = Boolean(atmosphere || atmosphereSrc);
  const sectionClass = cn(
    "hero-shell page-hero chapter chapter--void relative flex flex-col overflow-x-clip",
    !hasPhotoAtmosphere && "page-hero--type",
    compact ? "page-hero--compact" : null,
    visual ? "page-hero--split" : null,
    intake ? "page-hero--intake" : null,
    className,
  );

  const showActions = !hideActions;
  const atmosphereLayer = hasPhotoAtmosphere
    ? (atmosphere ?? (
        <PageHeroAtmosphere
          src={atmosphereSrc!}
          srcSm={atmosphereSrcSm}
          focus={atmosphereFocus}
        />
      ))
    : (
        <div
          aria-hidden
          className="page-hero-type-atmosphere pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="page-hero-type-atmosphere__wash" />
          <div className="page-hero-type-atmosphere__bloom" />
          <div className="page-hero-type-atmosphere__grain" />
        </div>
      );

  return (
    <section className={sectionClass} aria-labelledby="page-hero-heading">
      <div className="hero-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {atmosphereLayer}
      </div>

      <HeroScrollRoot
        className={cn(
          "shell shell--cinema hero-stage relative z-[2]",
          visual ? "page-hero__grid" : null,
        )}
      >
        <div className={visual ? "page-hero__copy-col" : undefined}>
          <HeroParallax layer="copy">
            <div className="hero-copy relative z-[3]">
              <div className="hero-enter hero-enter-1">
                <p className="section-eyebrow">{eyebrow}</p>
              </div>

              <h1
                id="page-hero-heading"
                className="hero-enter hero-enter-2 mt-5 font-[family-name:var(--font-display)] font-bold tracking-[-0.045em] text-foreground sm:mt-6 md:mt-7"
              >
                <HeroHeading title={title} signal={signal} />
              </h1>

              <p className="hero-enter hero-enter-3 hero-lede mt-7 max-w-xl text-[1.125rem] leading-relaxed text-muted sm:mt-8 sm:text-[1.25rem] md:text-[1.3125rem] md:leading-relaxed">
                {copy}
              </p>

              {meta ? (
                <div className="hero-enter hero-enter-3 page-hero__meta mt-5">
                  {meta}
                </div>
              ) : null}

              {showActions ? (
                <div className="hero-cta-row mt-10 sm:mt-11 md:mt-12">
                  <div className="hero-enter hero-enter-4">
                    <Button href={primaryHref} size="lg">
                      {resolvedPrimaryLabel}
                    </Button>
                  </div>
                  {secondaryHref && secondaryLabel ? (
                    <div className="hero-enter hero-enter-4b">
                      <Button href={secondaryHref} variant="link" arrow>
                        {secondaryLabel}
                      </Button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </HeroParallax>
        </div>

        {visual ? (
          <div className="page-hero__visual">
            <HeroParallax layer="stage">
              <div className="hero-enter hero-enter-5">{visual}</div>
            </HeroParallax>
          </div>
        ) : null}
      </HeroScrollRoot>
    </section>
  );
}
