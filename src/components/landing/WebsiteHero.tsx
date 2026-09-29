import { Suspense } from "react";
import { HeroCluster } from "@/components/landing/ViewportCluster";
import {
  MatchedHeadline,
  MatchedMarketLine,
} from "@/components/landing/MatchedCopy";
import { PlanCta } from "@/components/landing/PlanCta";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

/**
 * Live get-a-website hero — recovered from production DOM.
 * Key differences vs prior repo: heroPrice line, proof list with marks
 * under the visual (not a joined values string), captioned HeroCluster.
 * Spanish WhatsApp support lives in the header nav (not the hero).
 */
export function WebsiteHero({ page }: { page: LandingPageEntry }) {
  const lines = page.headlineLines?.length
    ? page.headlineLines
    : [page.headline];
  const still = page.heroStill;
  const market = page.marketLine ?? page.badge;
  const heroPrice = page.heroPrice;
  const proof = page.heroMeta ?? [];

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
            {heroPrice ? (
              <p className="lp-web-hero__price">{heroPrice}</p>
            ) : null}
            <div className="lp-web-hero__actions" id="lp-hero-actions">
              <PlanCta placement="hero" landingSlug={page.slug} size="xl" arrow>
                {page.heroCtaLabel ?? page.stickyCtaLabel}
              </PlanCta>
            </div>
            {page.heroFinePrint ? (
              <p className="lp-web-hero__micro">{page.heroFinePrint}</p>
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
              caption="A1 Property Services — live site"
              priority
            />
          </div>
          {proof.length ? (
            <ul className="lp-web-hero__proof">
              {proof.map((item) => (
                <li key={item}>
                  <span className="lp-web-hero__proof-mark" aria-hidden>
                    <CheckMark />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M20 33.5 28.5 42 44 24"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
