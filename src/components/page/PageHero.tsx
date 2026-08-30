import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { SignalPlaneMount } from "@/components/home/SignalPlaneMount";
import { HeroParallax, HeroScrollRoot } from "@/components/home/HeroParallax";
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
  /** Full-bleed SignalPlane atmosphere like the homepage hero */
  atmosphere?: boolean;
  /** Shorter hero for intake pages (contact) — skips WebGL by default */
  compact?: boolean;
  /** Hide CTA row when the next section is the action */
  hideActions?: boolean;
  /** Form in the visual rail — do not clip to the media-stage height. */
  intake?: boolean;
  className?: string;
};

/**
 * Site-wide cinematic hero — same shell, spacing, and enter cascade as HomeHero.
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
  atmosphere = false,
  compact = false,
  hideActions = false,
  intake = false,
  className,
}: PageHeroProps) {
  const t = await getTranslations("common");
  const resolvedPrimaryLabel = primaryLabel ?? t("bookStrategyCall");
  const sectionClass = cn(
    "hero-shell page-hero chapter chapter--void relative flex flex-col overflow-x-clip",
    compact ? "page-hero--compact" : visual ? "lg:min-h-[100svh]" : "min-h-[100svh]",
    visual ? "page-hero--split" : null,
    intake ? "page-hero--intake" : null,
    className,
  );

  const showActions = !hideActions;

  return (
    <section className={sectionClass} aria-labelledby="page-hero-heading">
      {atmosphere ? (
        <>
          <SignalPlaneMount />
          <div className="hero-film-scrim" aria-hidden />
        </>
      ) : null}
      <div className="hero-veil" aria-hidden />

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
                className="hero-enter hero-enter-2 mt-5 font-[family-name:var(--font-display)] font-bold tracking-[-0.045em] text-balance text-foreground sm:mt-6 md:mt-7"
              >
                <span className="hero-line">
                  <span className="hero-line__text">{title}</span>
                </span>
                {signal ? (
                  <span className="hero-line hero-signal-line block">
                    <span className="hero-line__text">{signal}</span>
                  </span>
                ) : null}
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
                    <Button href={primaryHref} size="xl" lift arrow>
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
