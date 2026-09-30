import { Suspense } from "react";
import { HeroCluster } from "@/components/landing/ViewportCluster";
import {
  MatchedHeadline,
  MatchedMarketLine,
} from "@/components/landing/MatchedCopy";
import { PlanCta } from "@/components/landing/PlanCta";
import { WhatsAppLink } from "@/components/landing/WhatsAppLink";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

/**
 * get-a-website hero — type-led copy + existing device still.
 * No floating badge clouds; presence comes from hierarchy, accent,
 * and a clear price-range signal into the CTA.
 */
export function WebsiteHero({
  page,
  caption = "A1 Property Services — live site",
}: {
  page: LandingPageEntry;
  caption?: string;
}) {
  const lines = page.headlineLines?.length
    ? page.headlineLines
    : [page.headline];
  const still = page.heroStill;
  const market = page.marketLine ?? page.badge;
  const heroPrice = page.heroPrice;
  const proof = page.heroMeta ?? [];
  const whatsapp =
    page.whatsappHref && page.whatsappHeroLabel
      ? { href: page.whatsappHref, label: page.whatsappHeroLabel }
      : null;

  return (
    <section
      className="lp-web-hero chapter relative overflow-x-clip"
      aria-labelledby="page-hero-heading"
    >
      <div className="shell lp-web-hero__stage relative">
        <div className="lp-web-hero__layout">
          <div className="lp-web-hero__copy">
            <p className="lp-web-hero__eyebrow">
              <span className="lp-web-hero__eyebrow-bar" aria-hidden />
              <Suspense fallback={market}>
                <MatchedMarketLine fallback={market} />
              </Suspense>
            </p>
            <h1 id="page-hero-heading" className="lp-web-hero__title">
              <Suspense
                fallback={lines.map((line, index) => (
                  <span
                    key={line}
                    className={
                      index === lines.length - 1
                        ? "lp-web-hero__line lp-web-hero__line--signal"
                        : "lp-web-hero__line"
                    }
                  >
                    {line}
                  </span>
                ))}
              >
                <MatchedHeadline fallback={lines} />
              </Suspense>
            </h1>
            <p className="lp-web-hero__lede">{page.subheadline}</p>
            {heroPrice ? (
              <p className="lp-web-hero__price">
                <span className="lp-web-hero__price-label">{heroPrice}</span>
              </p>
            ) : null}
            <div className="lp-web-hero__actions" id="lp-hero-actions">
              <PlanCta placement="hero" landingSlug={page.slug} size="xl" arrow>
                {page.heroCtaLabel ?? page.stickyCtaLabel}
              </PlanCta>
              {whatsapp ? (
                <WhatsAppLink
                  href={whatsapp.href}
                  label={whatsapp.label}
                  variant="hero"
                />
              ) : null}
            </div>
            {page.heroFinePrint ? (
              <p className="lp-web-hero__micro">{page.heroFinePrint}</p>
            ) : null}
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
            <div className="lp-web-hero__glow" aria-hidden />
            <HeroCluster
              image={still?.src}
              imageAlt={still?.alt}
              phoneImage={still?.mobileSrc}
              caption={caption}
              priority
            />
          </div>
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
