import { Suspense } from "react";
import { HeroCluster } from "@/components/landing/ViewportCluster";
import {
  MatchedHeadline,
  MatchedMarketLine,
} from "@/components/landing/MatchedCopy";
import { PlanCta } from "@/components/landing/PlanCta";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

export function WebsiteHero({ page }: { page: LandingPageEntry }) {
  const lines = page.headlineLines?.length
    ? page.headlineLines
    : [page.headline];
  const still = page.heroStill;
  const market = page.marketLine ?? page.badge;

  return (
    <section
      className="lp-web-hero chapter relative overflow-x-clip"
      aria-labelledby="page-hero-heading"
    >
      <div className="shell lp-web-hero__stage relative">
        <div className="lp-web-hero__layout">
          <div className="lp-web-hero__copy">
            <p className="lp-web-hero__eyebrow">
              <Suspense fallback={market}>
                <MatchedMarketLine fallback={market} />
              </Suspense>
            </p>
            <h1 id="page-hero-heading" className="lp-web-hero__title">
              <Suspense
                fallback={lines.map((line) => (
                  <span key={line} className="lp-web-hero__line">
                    {line}
                  </span>
                ))}
              >
                <MatchedHeadline fallback={lines} />
              </Suspense>
            </h1>
            <p className="lp-web-hero__lede">{page.subheadline}</p>
            <div className="lp-web-hero__actions" id="lp-hero-actions">
              <PlanCta placement="hero" landingSlug={page.slug} size="xl" arrow>
                {page.heroCtaLabel ?? page.stickyCtaLabel}
              </PlanCta>
            </div>
            {page.heroFinePrint ? (
              <p className="lp-web-hero__micro">{page.heroFinePrint}</p>
            ) : null}
            {page.heroMeta?.length ? (
              <p className="lp-web-hero__values">{page.heroMeta.join(" · ")}</p>
            ) : null}
          </div>
          <div className="lp-web-hero__visual">
            {still?.mobileSrc ? (
              <>
                <link
                  rel="preload"
                  as="image"
                  href={still.mobileSrc}
                  type="image/webp"
                  fetchPriority="high"
                />
                <link
                  rel="preload"
                  as="image"
                  href={still.src}
                  type="image/webp"
                  media="(min-width: 1024px)"
                />
              </>
            ) : null}
            <HeroCluster
              image={still?.src}
              imageAlt={still?.alt}
              phoneImage={still?.mobileSrc}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
