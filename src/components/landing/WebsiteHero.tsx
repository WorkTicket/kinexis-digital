import { Suspense } from "react";
import {
  MatchedHeadline,
  MatchedMarketLine,
} from "@/components/landing/MatchedCopy";
import { PlanCta } from "@/components/landing/PlanCta";
import { WhatsAppLink } from "@/components/landing/WhatsAppLink";
import type { WebsiteLpChrome } from "@/content/lp/website-lp-chrome";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

type Benefit = WebsiteLpChrome["heroBenefits"][number];

/** Studio photo: laptop with a smaller phone, A1 site on both screens. */
const DEVICE_SHOT = "/assets/images/lp/a1-devices.webp?v=20260930d";

/**
 * get-a-website hero.
 * Mobile order: headline, supporting copy, CTA, device photo, benefits.
 */
export function WebsiteHero({
  page,
  caption = "A1 Property Services — live site",
  benefits,
}: {
  page: LandingPageEntry;
  caption?: string;
  benefits: Benefit[];
}) {
  const lines = page.headlineLines?.length
    ? page.headlineLines
    : [page.headline];
  const still = page.heroStill;
  const market = page.marketLine ?? page.badge;
  const whatsapp =
    page.whatsappHref && page.whatsappHeroLabel
      ? { href: page.whatsappHref, label: page.whatsappHeroLabel }
      : null;
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
          <div className="lp-web-hero__copy">
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

            <p className="lp-web-hero__lede lp-web-hero__anim lp-web-hero__anim--3">
              {page.subheadline}
            </p>

            <div
              className="lp-web-hero__actions lp-web-hero__anim lp-web-hero__anim--4"
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
                  className="lp-web-hero__whatsapp"
                />
              ) : null}
            </div>
          </div>

          {still?.src ? (
            <div className="lp-web-hero__devices lp-web-hero__anim lp-web-hero__anim--5">
              <link
                rel="preload"
                as="image"
                href={DEVICE_SHOT}
                type="image/webp"
                fetchPriority="high"
              />
              <div className="lp-web-hero__device-glow" aria-hidden />
              <figure className="lp-web-hero__shot" aria-label={still.alt}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DEVICE_SHOT}
                  alt=""
                  width={1040}
                  height={692}
                  decoding="sync"
                  fetchPriority="high"
                />
                {caption ? (
                  <figcaption className="lp-web-hero__shot-caption">
                    {caption}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ) : null}

          {benefits.length ? (
            <ul className="lp-web-hero__benefits lp-web-hero__anim lp-web-hero__anim--6">
              {benefits.map((item, index) => (
                <li key={item.label}>
                  <span className="lp-web-hero__benefit-icon" aria-hidden>
                    <BenefitIcon index={index} />
                  </span>
                  <span className="lp-web-hero__benefit-label">{item.label}</span>
                  <span className="lp-web-hero__benefit-note">{item.note}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };
  if (index === 0) {
    return (
      <svg {...common}>
        <path
          d="M13 3 5.5 13.5H12l-1 7.5 7.5-10.5H12L13 3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...common}>
        <rect
          x="7"
          y="3"
          width="10"
          height="18"
          rx="2.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M11 18.5h2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg {...common}>
        <path
          d="M12 3.5 19 6.2v5.3c0 4.1-2.8 7.2-7 8.9-4.2-1.7-7-4.8-7-8.9V6.2L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m9.2 12 1.9 1.9 3.8-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
