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
 * get-a-website hero — professional agency composition.
 * Mobile-first: type → device proof in the first viewport → price/CTA.
 * Shared site theme (kinexis-theme / data-theme). Real KINEXIS device stills.
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
        <span className="lp-web-hero__grain" />
      </div>

      <div className="shell lp-web-hero__stage relative">
        <div className="lp-web-hero__layout">
          <div className="lp-web-hero__copy-top">
            <p className="lp-web-hero__eyebrow lp-web-hero__anim lp-web-hero__anim--1">
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

            {priceAnchor || priceFallback ? (
              <div className="lp-web-hero__meta lp-web-hero__anim lp-web-hero__anim--3">
                {priceAnchor ? (
                  <>
                    <span className="lp-web-hero__chip lp-web-hero__chip--price">
                      {priceAnchor}
                    </span>
                    {priceDelivery ? (
                      <span className="lp-web-hero__chip">{priceDelivery}</span>
                    ) : null}
                  </>
                ) : (
                  <span className="lp-web-hero__chip lp-web-hero__chip--price">
                    {priceFallback}
                  </span>
                )}
              </div>
            ) : null}
          </div>

          {phoneSrc ? (
            <div className="lp-web-hero__phone-lead lp-web-hero__anim lp-web-hero__anim--3">
              <link
                rel="preload"
                as="image"
                href={phoneSrc}
                type="image/webp"
                fetchPriority="high"
              />
              <div className="lp-web-hero__phone-stage">
                <div className="lp-web-hero__phone-glow" aria-hidden />
                <div className="lp-web-hero__phone-floor" aria-hidden />
                <figure className="lp-web-hero__phone-figure">
                  <PhoneFrame image={phoneSrc} priority />
                  <figcaption className="lp-web-hero__phone-caption">
                    {caption}
                  </figcaption>
                </figure>
              </div>
            </div>
          ) : null}

          <div className="lp-web-hero__copy-bot">
            <p className="lp-web-hero__lede lp-web-hero__anim lp-web-hero__anim--4">
              {page.subheadline}
            </p>

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
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

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
            <div className="lp-web-hero__visual-floor" aria-hidden />
            <HeroCluster
              image={still?.src}
              imageAlt={still?.alt}
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
      <path
        d="M18 33.5 28 43.5 46 22"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
