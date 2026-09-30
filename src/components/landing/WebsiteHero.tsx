import { Suspense } from "react";
import { HeroCluster, PhoneFrame } from "@/components/landing/ViewportCluster";
import {
  MatchedHeadline,
  MatchedMarketLine,
} from "@/components/landing/MatchedCopy";
import { PlanCta } from "@/components/landing/PlanCta";
import { WhatsAppLink } from "@/components/landing/WhatsAppLink";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

/**
 * get-a-website hero — mobile-first, craft-led conversion composition.
 * Shared site theme (kinexis-theme / data-theme). Soft price range in meta.
 * No floating badge clouds or mockup gimmicks.
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
  const proof = page.heroMeta ?? [];
  const whatsapp =
    page.whatsappHref && page.whatsappHeroLabel
      ? { href: page.whatsappHref, label: page.whatsappHeroLabel }
      : null;
  const phoneSrc = still?.mobileSrc ?? still?.src;
  const priceAnchor = page.pricingAnchor;
  const priceDelivery = page.pricingDelivery;
  const priceFallback = page.heroPrice;

  return (
    <section
      className="lp-web-hero chapter relative overflow-x-clip"
      aria-labelledby="page-hero-heading"
    >
      <div className="lp-web-hero__atmosphere" aria-hidden>
        <span className="lp-web-hero__wash lp-web-hero__wash--a" />
        <span className="lp-web-hero__wash lp-web-hero__wash--b" />
        <span className="lp-web-hero__rail" />
        <span className="lp-web-hero__grain" />
      </div>

      <div className="shell lp-web-hero__stage relative">
        <div className="lp-web-hero__layout">
          <div className="lp-web-hero__copy">
            <p className="lp-web-hero__eyebrow lp-web-hero__anim lp-web-hero__anim--1">
              <span className="lp-web-hero__eyebrow-bar" aria-hidden />
              <Suspense fallback={market}>
                <MatchedMarketLine fallback={market} />
              </Suspense>
            </p>

            <h1
              id="page-hero-heading"
              className="lp-web-hero__title lp-web-hero__anim lp-web-hero__anim--2"
            >
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

            <p className="lp-web-hero__lede lp-web-hero__anim lp-web-hero__anim--3">
              {page.subheadline}
            </p>

            {priceAnchor || priceFallback ? (
              <p className="lp-web-hero__meta lp-web-hero__anim lp-web-hero__anim--4">
                {priceAnchor ? (
                  <>
                    <span className="lp-web-hero__meta-price">
                      {priceAnchor}
                    </span>
                    {priceDelivery ? (
                      <>
                        <span className="lp-web-hero__meta-dot" aria-hidden>
                          ·
                        </span>
                        <span className="lp-web-hero__meta-note">
                          {priceDelivery}
                        </span>
                      </>
                    ) : null}
                  </>
                ) : (
                  <span className="lp-web-hero__meta-note">{priceFallback}</span>
                )}
              </p>
            ) : null}

            <div
              className="lp-web-hero__actions lp-web-hero__anim lp-web-hero__anim--5"
              id="lp-hero-actions"
            >
              <PlanCta
                placement="hero"
                landingSlug={page.slug}
                size="lg"
                arrow
                className="lp-web-hero__cta"
              >
                {page.heroCtaLabel ?? page.stickyCtaLabel}
              </PlanCta>
              {whatsapp ? (
                <WhatsAppLink
                  href={whatsapp.href}
                  label={whatsapp.label}
                  variant="hero"
                  className="lp-web-hero__whatsapp--text"
                />
              ) : null}
            </div>

            {page.heroFinePrint ? (
              <p className="lp-web-hero__micro lp-web-hero__anim lp-web-hero__anim--6">
                {page.heroFinePrint}
              </p>
            ) : null}

            {proof.length ? (
              <ul className="lp-web-hero__proof lp-web-hero__anim lp-web-hero__anim--6">
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

          {/* Mobile product proof — staged phone, not a second CTA competitor */}
          {phoneSrc ? (
            <div className="lp-web-hero__phone-lead lp-web-hero__anim lp-web-hero__anim--4">
              <link
                rel="preload"
                as="image"
                href={phoneSrc}
                type="image/webp"
                fetchPriority="high"
              />
              <div className="lp-web-hero__phone-glow" aria-hidden />
              <figure className="lp-web-hero__phone-figure">
                <PhoneFrame image={phoneSrc} priority />
                <figcaption className="lp-web-hero__phone-caption">
                  {caption}
                </figcaption>
              </figure>
            </div>
          ) : null}

          {/* Desktop / tablet visual — laptop with live still */}
          <div className="lp-web-hero__visual lp-web-hero__anim lp-web-hero__anim--3">
            {still?.src ? (
              <link
                rel="preload"
                as="image"
                href={still.src}
                type="image/webp"
                media="(min-width: 768px)"
                fetchPriority="high"
              />
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
