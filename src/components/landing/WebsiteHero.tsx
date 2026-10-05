import {
  MatchedHeadline,
  MatchedMarketLine,
} from "@/components/landing/MatchedCopy";
import { PlanCta } from "@/components/landing/PlanCta";
import { WebsiteOutcomes } from "@/components/landing/WebsiteSections";
import { WhatsAppLink } from "@/components/landing/WhatsAppLink";
import type { WebsiteLpChrome } from "@/content/lp/website-lp-chrome";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

type Benefit = WebsiteLpChrome["heroBenefits"][number];

/**
 * get-a-website hero. Fills the first screen.
 * Mobile order: headline, supporting copy, price, CTA, one-line credit, then the device photo.
 */
export function WebsiteHero({
  page,
  benefits,
  outcomesLabel,
}: {
  page: LandingPageEntry;
  /** Unused. Kept so older call sites can still pass a caption. */
  caption?: string;
  benefits: Benefit[];
  outcomesLabel?: string;
}) {
  const lines = page.headlineLines?.length
    ? page.headlineLines
    : [page.headline];
  const portrait = page.heroPortrait;
  const visual = page.heroDevices;
  const credit =
    page.heroCredit ??
    (portrait?.name ? creditLine(portrait.name, portrait.role) : null);
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
        <div
          className={
            visual
              ? "lp-web-hero__layout"
              : "lp-web-hero__layout lp-web-hero__layout--solo"
          }
        >
          <div className="lp-web-hero__copy">
            <p className="lp-web-hero__eyebrow lp-web-hero__anim lp-web-hero__anim--1">
              <MatchedMarketLine fallback={market} />
            </p>

            <h1
              id="page-hero-heading"
              className="lp-web-hero__title lp-web-hero__anim lp-web-hero__anim--2"
            >
              <MatchedHeadline fallback={lines} />
            </h1>

            <p className="lp-web-hero__lede lp-web-hero__anim lp-web-hero__anim--3">
              {page.subheadline}
            </p>

            {page.heroPrice ? (
              <p className="lp-web-hero__price lp-web-hero__anim lp-web-hero__anim--3">
                {page.heroPrice}
              </p>
            ) : null}

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
              {portrait && credit ? (
                <p className="lp-web-hero__byline">
                  {page.directIntro ? (
                    <a
                      href="#lp-direct"
                      className="lp-web-hero__byline-photo"
                      aria-label={portrait.name ?? "Introduction"}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/images/lp/colton-wehr-face.webp?v=20261005p"
                        alt=""
                        width={380}
                        height={380}
                        decoding="async"
                      />
                    </a>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src="/assets/images/lp/colton-wehr-face.webp?v=20261005p"
                      alt=""
                      width={380}
                      height={380}
                      decoding="async"
                    />
                  )}
                  <span>{credit}</span>
                </p>
              ) : null}
              {whatsapp ? (
                <WhatsAppLink
                  href={whatsapp.href}
                  label={whatsapp.label}
                  variant="hero"
                  className="lp-web-hero__whatsapp"
                />
              ) : null}
            </div>

            {page.heroMeta?.length ? (
              <ul className="lp-web-hero__trust lp-web-hero__anim lp-web-hero__anim--4">
                {page.heroMeta.map((item) => (
                  <li key={item}>
                    <TrustCheck />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {page.heroFinePrint ? (
              <p className="lp-web-hero__fine lp-web-hero__anim lp-web-hero__anim--4">
                {page.heroFinePrint}
              </p>
            ) : null}
          </div>

          {visual ? (
            <figure className="lp-web-hero__devices">
              <link
                rel="preload"
                as="image"
                href={visual.src}
                fetchPriority="high"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={visual.src}
                alt={visual.alt}
                width={visual.width}
                height={visual.height}
                decoding="sync"
                fetchPriority="high"
              />
            </figure>
          ) : null}

          {!portrait && benefits.length ? (
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

          {page.outcomes?.length ? (
            <WebsiteOutcomes
              items={page.outcomes}
              ariaLabel={outcomesLabel}
              nested
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function creditLine(name: string, role?: string) {
  const line = role ? `${name}, ${role}` : name;
  return line.endsWith(".") ? line : `${line}.`;
}

function TrustCheck() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path
        d="M3.2 8.2 6.4 11.4 12.8 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
