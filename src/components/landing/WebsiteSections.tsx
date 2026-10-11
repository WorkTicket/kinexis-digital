import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { CaseStudyViewTracker } from "@/components/landing/CaseStudyViewTracker";
import { PlanCta } from "@/components/landing/PlanCta";
import { GreenfieldExamples } from "@/components/landing/GreenfieldExamples";
import { WebsitePlanForm } from "@/components/landing/WebsitePlanForm";
import type {
  LandingPageEntry,
  LandingPageOutcome,
  LandingPagePrice,
  LandingPagePricingAddOn,
  LandingPageSample,
  LandingPageSellPoint,
  LandingPageTestimonial,
} from "@/content/registry/landing-pages";

/* ------------------------------------------------------------------ */
/*  Marks (live custom SVGs — not Lucide)                              */
/* ------------------------------------------------------------------ */

const markProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CheckMark() {
  return (
    <svg {...markProps}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="m8.2 12.2 2.4 2.5 5-5.4" />
    </svg>
  );
}

function CrossMark() {
  return (
    <svg {...markProps}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </svg>
  );
}

/** Index-ordered marks so Spanish titles still get the same icons. */
const OUTCOME_MARKS: ReactNode[] = [
  // Custom coded.
  <svg key="coded" {...markProps}>
    <path d="m9 7.5-4.25 4.5L9 16.5" />
    <path d="m15 7.5 4.25 4.5L15 16.5" />
  </svg>,
  // Looks like your company — a storefront, not a gem.
  <svg key="established" {...markProps}>
    <path d="M3.5 10.5 12 4l8.5 6.5" />
    <path d="M6 10v9.5h12V10" />
    <path d="M10 19.5V14h4v5.5" />
    <path d="M8 12.25h1.75M14.25 12.25H16" />
  </svg>,
  // Call and quote in reach — a phone that's ringing.
  <svg key="inquiries" {...markProps}>
    <rect x="3.25" y="2.75" width="9" height="18.5" rx="2" />
    <path d="M6 6h3.5M6.75 18.25h1.75" />
    <path d="M15.25 8a5.4 5.4 0 0 1 0 8" />
    <path d="M17.75 5.75a8.4 8.4 0 0 1 0 12.5" />
  </svg>,
  // Fast on a phone — a bolt, not a gauge with a pulse through it.
  <svg key="fast" {...markProps}>
    <path d="M13 2.25 4.75 13.25H11l-.75 8.5L19.25 10H12.5L13 2.25Z" />
  </svg>,
  // You own the site — the key, not a lock.
  <svg key="own" {...markProps}>
    <circle cx="8.25" cy="8.75" r="3.6" />
    <circle cx="8.25" cy="8.75" r="1.15" />
    <path d="m11.1 11.4 8.15 8.15" />
    <path d="m15.4 15.7 2.55-2.55" />
    <path d="m17.15 18.45 2.55-2.55" />
  </svg>,
];

const PROCESS_MARKS = [
  // Project call — handset, drawn to the same 16px box as the others.
  <svg key="plan" {...markProps}>
    <rect x="3.75" y="4.25" width="9" height="15.5" rx="2" />
    <path d="M6.35 7.15h3.8" />
    <path d="M7.15 16.7h2.2" />
    <path d="M15.15 8.7c1.55 1.05 1.55 2.85 0 3.9" />
    <path d="M17.45 6.55c2.45 1.75 2.45 5.45 0 7.2" />
  </svg>,
  // Structure and design
  <svg key="structure" {...markProps}>
    <rect x="4.25" y="4.25" width="15.5" height="15.5" rx="2" />
    <path d="M4.25 8.65h15.5" />
    <rect x="6.4" y="10.65" width="5.5" height="6.5" rx="0.9" />
    <rect x="13.15" y="10.65" width="4.4" height="2.55" rx="0.65" />
    <rect x="13.15" y="14.5" width="4.4" height="2.65" rx="0.65" />
  </svg>,
  // Development
  <svg key="dev" {...markProps}>
    <path d="M9.15 4.7 4.25 12l4.9 7.3" />
    <path d="M14.85 4.7 19.75 12l-4.9 7.3" />
    <path d="M13.15 4.45 10.85 19.55" />
  </svg>,
  // Launch and tracking
  <svg key="launch" {...markProps}>
    <path d="M4.25 19.55h15.5" />
    <path d="M6.45 15.15 10.15 11.35l3 2.45L19.7 4.45" />
    <path d="M15.15 4.45H19.7v4.55" />
  </svg>,
];

type TransformCol = { title: string; items: string[] };

/* ------------------------------------------------------------------ */
/*  Outcomes                                                           */
/* ------------------------------------------------------------------ */

export function WebsiteOutcomes({
  items,
  ariaLabel = "What the website is built to do",
}: {
  items: LandingPageOutcome[];
  ariaLabel?: string;
  /** Kept so the hero can mark this strip as inside the first screen. */
  nested?: boolean;
}) {
  if (!items.length) return null;
  return (
    <aside className="lp-web-outcomes" aria-label={ariaLabel}>
      <div className="shell">
        <ul className="lp-web-outcomes__list">
          {items.map((item, index) => (
            <li key={item.title}>
              <span className="lp-web-outcomes__mark" aria-hidden>
                {OUTCOME_MARKS[index % OUTCOME_MARKS.length] ?? <CheckMark />}
              </span>
              <span className="lp-web-outcomes__title">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Pain — interactive before/after sites + compare columns            */
/* ------------------------------------------------------------------ */

export function WebsitePain({
  eyebrow,
  title,
  subtitle,
  before,
  after,
  locale,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  before?: TransformCol;
  after?: TransformCol;
  locale: Locale;
}) {
  const beforeColumn =
    before && after ? (
      <article className="lp-web-compare__col lp-web-compare__col--before">
        <h3>{before.title}</h3>
        <ul>
          {before.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    ) : null;
  const afterColumn =
    before && after ? (
      <article className="lp-web-compare__col lp-web-compare__col--after">
        <h3>{after.title}</h3>
        <ul>
          {after.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    ) : null;

  return (
    <section
      aria-labelledby="lp-web-pain-heading"
      className="lp-web-pain chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          {eyebrow ? <p className="lp-web-kicker">{eyebrow}</p> : null}
          <h2 id="lp-web-pain-heading">{title}</h2>
          <p>{subtitle}</p>
        </header>
        <GreenfieldExamples
          locale={locale}
          beforeColumn={beforeColumn}
          afterColumn={afterColumn}
        />
      </div>
    </section>
  );
}


function WorkLaptop({
  image,
  imageAlt,
}: {
  image: string;
  imageAlt: string;
}) {
  return (
    <figure className="lp-hero-cluster" aria-label={imageAlt}>
      <div className="lp-hero-cluster__stage">
        <div className="lp-hero-cluster__desk">
          <div className="lp-audit-laptop">
            <div className="lp-audit-laptop__lid">
              <span className="lp-audit-laptop__cam" aria-hidden />
              <div className="lp-audit-laptop__screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt=""
                  width={2880}
                  height={1800}
                  decoding="async"
                  loading="lazy"
                  fetchPriority="low"
                  className="lp-frame-photo"
                />
              </div>
            </div>
            <div className="lp-audit-laptop__deck" aria-hidden>
              <span className="lp-audit-laptop__hinge" />
              <span className="lp-audit-laptop__base" />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

const QUOTE_METRIC = /(\d+[.,]\d+%)/;

/** Two sentences, one line each, so the quote doesn't rag into a short third line. */
function quoteLines(quote: string) {
  const parts = quote.split(/(?<=\.)\s+/).map((part) => part.trim()).filter(Boolean);
  return parts.length === 2 ? parts : [quote];
}

function renderQuoteLine(line: string, keyPrefix: string) {
  const parts = line.split(QUOTE_METRIC);
  return parts.map((part, index) =>
    QUOTE_METRIC.test(part) ? (
      <strong key={`${keyPrefix}-${index}`} className="lp-web-quote__metric">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function renderQuote(quote: string) {
  const lines = quoteLines(quote);
  return lines.map((line, index) => (
    <span key={line} className="lp-web-quote__line">
      {index === 0 ? "“" : null}
      {renderQuoteLine(line, String(index))}
      {index === lines.length - 1 ? "”" : null}
    </span>
  ));
}

/* ------------------------------------------------------------------ */
/*  Work                                                               */
/* ------------------------------------------------------------------ */

export function WebsiteWork({
  title,
  intro,
  samples,
  testimonial,
  proofIntro,
  workCtaTitle,
  ctaLabel,
  landingSlug,
  kicker = "Live sites",
  viewLiveLabel = "View live website",
}: {
  title: string;
  intro?: string;
  samples: LandingPageSample[];
  testimonial?: LandingPageTestimonial;
  proofIntro?: string;
  workCtaTitle?: string;
  ctaLabel: string;
  landingSlug: string;
  kicker?: string;
  viewLiveLabel?: string;
}) {
  if (!samples.length) return null;

  return (
    <section
      id="work"
      aria-labelledby="lp-web-work-heading"
      className="lp-web-work chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <p className="lp-web-kicker">{kicker}</p>
          <h2 id="lp-web-work-heading">{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </header>
        <ul className="lp-web-work__list">
          {samples.map((sample) => {
            const parts = sample.metric?.split(/\s*→\s*/) ?? [];
            const paired = parts.length === 2;
            return (
            <li key={sample.client}>
              <article className="lp-web-work__card">
                <CaseStudyViewTracker client={sample.client} />
                <div className="lp-web-work__devices">
                  {sample.deviceShot ? (
                    <figure
                      className="lp-web-work__shot"
                      aria-label={sample.imageAlt}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sample.deviceShot}
                        srcSet={sample.deviceShotSrcSet}
                        sizes={
                          sample.deviceShotSizes ??
                          "(max-width: 767px) 100vw, 34rem"
                        }
                        alt=""
                        width={1920}
                        height={1260}
                        decoding="async"
                        loading="lazy"
                        fetchPriority="low"
                      />
                    </figure>
                  ) : (
                    <WorkLaptop
                      image={sample.image}
                      imageAlt={sample.imageAlt}
                    />
                  )}
                </div>
                <div className="lp-web-work__copy">
                  <p className="lp-web-kicker">
                    {sample.kind ?? sample.industry}
                  </p>
                  <h3>{sample.client}</h3>
                  {sample.metric ? (
                    <p className="lp-web-work__stat">
                      <strong className={paired ? "lp-web-work__pair" : undefined}>
                        {paired ? (
                          <>
                            {parts[0]}
                            <span className="lp-web-work__arrow">→</span>
                            {parts[1]}
                          </>
                        ) : (
                          sample.metric
                        )}
                      </strong>
                      <span>{sample.label}</span>
                    </p>
                  ) : null}
                  {sample.summary ? (
                    <p>{sample.summary}</p>
                  ) : sample.challenge ? (
                    <p>{sample.challenge}</p>
                  ) : null}
                  {sample.liveUrl ? (
                    <a
                      href={sample.liveUrl}
                      className="lp-web-work__live"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {viewLiveLabel}
                    </a>
                  ) : null}
                </div>
              </article>
            </li>
            );
          })}
        </ul>
        {testimonial ? (
          <figure className="lp-web-quote">
            <blockquote>
              <p>{renderQuote(testimonial.quote)}</p>
            </blockquote>
            <figcaption>
              <div className="lp-web-quote__by">
                <span className="lp-web-quote__name">{testimonial.name}</span>
                <span className="lp-web-quote__role">{testimonial.role}</span>
              </div>
              {proofIntro ? (
                <p className="lp-web-quote__note">{proofIntro}</p>
              ) : null}
            </figcaption>
          </figure>
        ) : null}
        {workCtaTitle || ctaLabel ? (
          <div className="lp-web-work__cta">
            {workCtaTitle ? (
              <p className="lp-web-work__cta-title">{workCtaTitle}</p>
            ) : null}
            <PlanCta placement="work" landingSlug={landingSlug} size="lg" arrow>
              {ctaLabel}
            </PlanCta>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Build                                                              */
/* ------------------------------------------------------------------ */

export function WebsiteBuild({
  title,
  points,
  ownershipStatement,
  kicker = "What's included",
}: {
  title: string;
  points: LandingPageSellPoint[];
  ownershipStatement?: string;
  kicker?: string;
}) {
  return (
    <section
      aria-labelledby="lp-web-build-heading"
      className="lp-web-build chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <p className="lp-web-kicker">{kicker}</p>
          <h2 id="lp-web-build-heading">{title}</h2>
        </header>
        <figure className="lp-web-build__board">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/lp/craft-build-board.webp?v=20261010ll"
            alt="Printed cream plates on a studio desk, each one a piece of what a contractor website has to ship with."
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <ul className="lp-web-build__list">
          {points.map((point) => (
            <li key={point.title}>
              <article className="lp-web-build__item">
                <div className="lp-web-build__copy">
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
        {ownershipStatement ? (
          <figure className="lp-web-own">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/lp/craft-studio.webp?v=20261010ll"
              alt="A design studio desk with website layouts, a laptop, and a phone during a rebuild."
              width={1152}
              height={864}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="lp-web-build__own">
              {ownershipStatement}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */

export function WebsiteProcess({
  title,
  intro,
  steps,
  kicker = "How it works",
}: {
  title: string;
  intro?: string;
  steps: { title: string; detail: string }[];
  kicker?: string;
}) {
  return (
    <section
      aria-labelledby="lp-web-process-heading"
      className="lp-web-process chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <p className="lp-web-kicker">{kicker}</p>
          <h2 id="lp-web-process-heading">{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </header>
        <ol className="lp-web-process__list lp-web-process__rail">
          {steps.map((step, index) => (
            <li key={step.title}>
              <article className="lp-web-process__item">
                <span className="lp-web-mark" aria-hidden>
                  {PROCESS_MARKS[index] ?? PROCESS_MARKS[0]}
                </span>
                <div className="lp-web-process__copy">
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Proof strip — two live results directly under the hero             */
/* ------------------------------------------------------------------ */

export function WebsiteProofStrip({
  samples,
  viewLiveLabel = "View live site",
}: {
  samples: LandingPageSample[];
  viewLiveLabel?: string;
}) {
  const shown = samples.filter((sample) => sample.liveUrl).slice(0, 2);
  if (!shown.length) return null;

  return (
    <section className="lp-web-proofstrip" aria-label="Client results">
      <div className="shell">
        <ul className="lp-web-proofstrip__list">
          {shown.map((sample) => {
            const parts = sample.metric.split(/\s*→\s*/);
            const paired = parts.length === 2;
            return (
              <li key={sample.client}>
                <a
                  href={sample.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="lp-web-proofstrip__client">{sample.client}</p>
                  <p className="lp-web-proofstrip__metric">
                    {paired ? (
                      <>
                        <span className="lp-web-proofstrip__figure">{parts[0]}</span>
                        <span className="lp-web-proofstrip__arrow">→</span>
                        <span className="lp-web-proofstrip__figure">{parts[1]}</span>
                      </>
                    ) : (
                      <span className="lp-web-proofstrip__figure">{sample.metric}</span>
                    )}
                  </p>
                  <p className="lp-web-proofstrip__label">{sample.label}</p>
                  <span className="lp-web-proofstrip__go">{viewLiveLabel}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function finePrintParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/* ------------------------------------------------------------------ */
/*  Pricing — two starting prices, or a single soft panel              */
/* ------------------------------------------------------------------ */

export function WebsitePricing({
  title,
  intro,
  anchor,
  delivery,
  qualify,
  closer,
  compareTitle,
  compare,
  highlights,
  tiers,
  addOns,
  note,
  ctaLabel,
  landingSlug,
  kicker = "Pricing",
  startingLabel = "starting",
}: {
  title: string;
  intro?: string;
  anchor: string;
  delivery?: string;
  qualify?: string;
  closer?: string;
  compareTitle?: string;
  compare?: { label: string; basic: string; custom: string }[];
  highlights?: string[];
  tiers?: LandingPagePrice[];
  addOns?: LandingPagePricingAddOn[];
  note?: string;
  ctaLabel: string;
  landingSlug: string;
  kicker?: string;
  startingLabel?: string;
}) {
  const soft = !addOns?.length;

  return (
    <section
      id="pricing"
      aria-labelledby="lp-web-pricing-heading"
      className={`lp-web-pricing chapter relative${soft ? " lp-web-pricing--soft" : ""}`}
    >
      <div className="shell relative">
        <div className="lp-web-pricing__layout">
          <header className="lp-web-lead">
            <p className="lp-web-kicker">{kicker}</p>
            <h2 id="lp-web-pricing-heading">{title}</h2>
            {intro ? <p>{intro}</p> : null}
          </header>
          <div className="lp-web-pricing__panel">
            {compare?.length && tiers && tiers.length >= 2 ? (
              <div
                className="lp-web-pricing__board"
                role="table"
                aria-label={compareTitle}
              >
                <div className="lp-web-pricing__board-head" role="row">
                  {tiers.map((tier) => (
                    <div
                      key={tier.name}
                      role="columnheader"
                      className={
                        tier.featured
                          ? "lp-web-pricing__tier lp-web-pricing__tier--featured"
                          : "lp-web-pricing__tier"
                      }
                    >
                      <h3>{tier.name}</h3>
                      <p className="lp-web-pricing__tier-price">{tier.price}</p>
                      {tier.tag ? (
                        <p className="lp-web-pricing__fit">{tier.tag}</p>
                      ) : null}
                      {tier.body ? (
                        <p className="lp-web-pricing__tier-body">{tier.body}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="lp-web-pricing__board-cols" aria-hidden="true">
                  <span>{tiers[0].name}</span>
                  <span>{tiers[1].name}</span>
                </div>
                {compare
                  .filter((row) => !/^(price|precio)$/i.test(row.label))
                  .map((row) => (
                    <div
                      key={row.label}
                      className="lp-web-pricing__board-row"
                      role="row"
                    >
                      <div role="rowheader">{row.label}</div>
                      <div role="cell">{row.basic}</div>
                      <div role="cell">{row.custom}</div>
                    </div>
                  ))}
              </div>
            ) : tiers?.length ? (
              <ul className="lp-web-pricing__tiers">
                {tiers.map((tier) => (
                  <li
                    key={tier.name}
                    className={
                      tier.featured
                        ? "lp-web-pricing__tier lp-web-pricing__tier--featured"
                        : "lp-web-pricing__tier"
                    }
                  >
                    <h3>{tier.name}</h3>
                    <p className="lp-web-pricing__tier-price">{tier.price}</p>
                    {tier.tag ? (
                      <p className="lp-web-pricing__fit">{tier.tag}</p>
                    ) : null}
                    {tier.body ? (
                      <p className="lp-web-pricing__tier-body">{tier.body}</p>
                    ) : null}
                    {tier.items?.length ? (
                      <ul className="lp-web-pricing__points">
                        {tier.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="lp-web-pricing__anchor">
                <small>{startingLabel}</small>
                <span>{anchor}</span>
              </p>
            )}
            {delivery ? (
              <p className="lp-web-pricing__delivery">{delivery}</p>
            ) : null}
            {qualify || closer || highlights?.length || note ? (
              <div className="lp-web-pricing__foot">
                {closer ? (
                  <p className="lp-web-pricing__closer">{closer}</p>
                ) : null}
                {highlights?.length ? (
                  <ul className="lp-web-pricing__points">
                    {highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {qualify || note ? (
                  <div className="lp-web-pricing__details">
                    {qualify ? (
                      <div className="lp-web-pricing__qualify">
                        {finePrintParagraphs(qualify).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                    {note ? (
                      <div className="lp-web-pricing__note">
                        {finePrintParagraphs(note).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
            {addOns?.length ? (
              <ul className="lp-web-pricing__addons">
                {addOns.map((addon) => (
                  <li key={addon.title}>
                    <p className="lp-web-pricing__addon-price">
                      <span>{addon.price}</span>
                      <small>{addon.cadence}</small>
                    </p>
                    <div>
                      <h3>{addon.title}</h3>
                      <p>{addon.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="lp-web-pricing__cta">
              <PlanCta
                placement="pricing"
                landingSlug={landingSlug}
                size="xl"
                arrow
              >
                {ctaLabel}
              </PlanCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Fit — good / not columns                                           */
/* ------------------------------------------------------------------ */

export function WebsiteFit({
  title,
  goodTitle,
  goodItems,
  notTitle,
  notItems,
  kicker = "Fit check",
}: {
  title: string;
  goodTitle?: string;
  goodItems?: string[];
  notTitle?: string;
  notItems?: string[];
  kicker?: string;
}) {
  return (
    <section
      aria-labelledby="lp-web-fit-heading"
      className="lp-web-fit chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <p className="lp-web-kicker">{kicker}</p>
          <h2 id="lp-web-fit-heading">{title}</h2>
        </header>
        <div className="lp-web-fit__grid">
          {goodItems?.length ? (
            <article className="lp-web-fit__col lp-web-fit__col--good">
              <span className="lp-web-mark" aria-hidden>
                <CheckMark />
              </span>
              <h3>{goodTitle ?? "This is a good fit if"}</h3>
              <ul>
                {goodItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ) : null}
          {notItems?.length ? (
            <article className="lp-web-fit__col lp-web-fit__col--not">
              <span className="lp-web-mark" aria-hidden>
                <CrossMark />
              </span>
              <h3>{notTitle ?? "Probably not a fit if"}</h3>
              <ul>
                {notItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Plan                                                               */
/* ------------------------------------------------------------------ */

type PlanBoardCopy = {
  folioKicker: string;
  folioTitle: string;
  folioLede: string;
  folioRows: readonly [string, string, string, string, string];
  folioStamp: string;
  stampWidth: number;
  clickHere: string;
  navClutter: string;
  buriedCta: string;
  stockPhoto: string;
  inspection: string;
  sheet: string;
  home: string;
  entry: string;
  about: string;
  contact: string;
  services: string;
  hall: string;
  servicePages: string;
  servicePagesSub?: string;
  quote: string;
  desk: string;
  primaryPath: string;
};

const PLAN_BOARDS: Record<Locale, PlanBoardCopy> = {
  en: {
    folioKicker: "Project call",
    folioTitle: "15 minutes.",
    folioLede: "The business, the site, and what to build.",
    folioRows: ["The work you do", "Who you serve", "The current site", "What to fix first", "Scope and price"],
    folioStamp: "No obligation",
    stampWidth: 88,
    clickHere: "Click Here",
    navClutter: "nav clutter",
    buriedCta: "buried CTA",
    stockPhoto: "stock photo",
    inspection: "Site inspection · punch list",
    sheet: "Structure",
    home: "Home",
    entry: "entry",
    about: "About",
    contact: "Contact",
    services: "Services",
    hall: "hall",
    servicePages: "Service pages",
    quote: "Call / Get a quote",
    desk: "front desk",
    primaryPath: "Primary path",
  },
  "es-419": {
    folioKicker: "Llamada",
    folioTitle: "15 minutos.",
    folioLede: "El negocio, el sitio, y qué construir.",
    folioRows: ["El trabajo", "A quién sirves", "El sitio actual", "Qué cambiar primero", "Alcance y precio"],
    folioStamp: "Sin compromiso",
    stampWidth: 118,
    clickHere: "Clic aquí",
    navClutter: "menú saturado",
    buriedCta: "botón escondido",
    stockPhoto: "foto genérica",
    inspection: "Inspección del sitio · fallos",
    sheet: "Estructura",
    home: "Inicio",
    entry: "entrada",
    about: "Nosotros",
    contact: "Contacto",
    services: "Servicios",
    hall: "pasillo",
    servicePages: "Páginas",
    servicePagesSub: "de servicio",
    quote: "Llamar / Cotizar",
    desk: "recepción",
    primaryPath: "Camino principal",
  },
  "es-ES": {
    folioKicker: "Llamada",
    folioTitle: "15 minutos.",
    folioLede: "El negocio, el sitio, y qué construir.",
    folioRows: ["El trabajo", "A quién sirves", "El sitio actual", "Qué cambiar primero", "Alcance y precio"],
    folioStamp: "Sin compromiso",
    stampWidth: 118,
    clickHere: "Pulsa aquí",
    navClutter: "menú saturado",
    buriedCta: "botón escondido",
    stockPhoto: "foto de archivo",
    inspection: "Inspección de la web · fallos",
    sheet: "Estructura",
    home: "Inicio",
    entry: "entrada",
    about: "Nosotros",
    contact: "Contacto",
    services: "Servicios",
    hall: "pasillo",
    servicePages: "Páginas",
    servicePagesSub: "de servicio",
    quote: "Llamar / Cotizar",
    desk: "recepción",
    primaryPath: "Camino principal",
  },
};

function PlanReviewBoard({ copy }: { copy: PlanBoardCopy }) {
  return (
    <div className="lp-web-plan__sketch lp-web-plan__sketch--review">
      <div className="lp-web-plan__browser">
        <div className="lp-web-plan__browser-bar" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="lp-web-plan__browser-nav" aria-hidden>
          <i />
          <b />
          <b />
          <b />
          <b />
        </div>
        <div className="lp-web-plan__browser-hero" aria-hidden>
          <em />
          <em />
          <strong>{copy.clickHere}</strong>
        </div>
        <div className="lp-web-plan__browser-cards" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
      <ul className="lp-web-plan__tags">
        <li>{copy.navClutter}</li>
        <li>{copy.buriedCta}</li>
        <li>{copy.stockPhoto}</li>
      </ul>
      <p className="lp-web-plan__sketch-label">{copy.inspection}</p>
    </div>
  );
}

function PlanBuildBoard({ copy }: { copy: PlanBoardCopy }) {
  return (
    <div className="lp-web-plan__sketch lp-web-plan__sketch--build">
      <p className="lp-web-plan__sketch-label">{copy.sheet}</p>
      <div className="lp-web-plan__sitemap">
        <div className="lp-web-plan__node lp-web-plan__node--home">
          <strong>{copy.home}</strong>
          <span>{copy.entry}</span>
        </div>
        <div className="lp-web-plan__node">
          <strong>{copy.about}</strong>
        </div>
        <div className="lp-web-plan__node lp-web-plan__node--path">
          <strong>{copy.services}</strong>
          <span>{copy.hall}</span>
        </div>
        <div className="lp-web-plan__node">
          <strong>{copy.contact}</strong>
        </div>
        <div className="lp-web-plan__node lp-web-plan__node--path lp-web-plan__node--wide">
          <strong>{copy.servicePages}</strong>
          {copy.servicePagesSub ? <span>{copy.servicePagesSub}</span> : null}
        </div>
        <div className="lp-web-plan__node lp-web-plan__node--end">
          <strong>{copy.quote}</strong>
          <span>{copy.desk}</span>
        </div>
      </div>
      <p className="lp-web-plan__sketch-label lp-web-plan__sketch-label--end">
        {copy.primaryPath}
      </p>
    </div>
  );
}

export function WebsitePlan({
  page,
  locale = "en",
  kicker = "Next step",
}: {
  page: LandingPageEntry;
  locale?: Locale;
  kicker?: string;
  figcaption?: string;
}) {
  const boards = PLAN_BOARDS[locale] ?? PLAN_BOARDS.en;

  return (
    <section
      id="lp-form"
      aria-labelledby="lp-web-plan-heading"
      className="lp-web-plan chapter relative"
    >
      <div className="shell relative">
        <div className="lp-web-plan__layout">
          <div className="lp-web-plan__intro">
            <div>
              <p className="lp-web-kicker">{kicker}</p>
              <h2 id="lp-web-plan-heading">{page.formTitle}</h2>
              <p>{page.formSubtitle}</p>
              {page.formSteps?.length ? (
                <ol className="lp-web-plan__next">
                  {page.formSteps.map((step) => (
                    <li key={step.title}>
                      <strong>{step.title}</strong>
                      <span>{step.detail}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </div>
          <div className="lp-web-plan__form">
            <WebsitePlanForm page={page} />
          </div>
          <div className="lp-web-plan__paths">
            {page.planHasSiteItems?.length ? (
              <article className="lp-web-plan__path lp-web-plan__path--has">
                <figure className="lp-web-plan__preview" aria-hidden>
                  <PlanReviewBoard copy={boards} />
                </figure>
                <h3>{page.planHasSiteTitle}</h3>
                <ul>
                  {page.planHasSiteItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ) : null}
            {page.planNoSiteItems?.length ? (
              <article className="lp-web-plan__path lp-web-plan__path--none">
                <figure className="lp-web-plan__preview" aria-hidden>
                  <PlanBuildBoard copy={boards} />
                </figure>
                <h3>{page.planNoSiteTitle}</h3>
                <ul>
                  {page.planNoSiteItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
