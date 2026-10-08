import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { CaseStudyViewTracker } from "@/components/landing/CaseStudyViewTracker";
import { PlanCta } from "@/components/landing/PlanCta";
import { ShowcaseSite } from "@/components/landing/ShowcaseSite";
import { WebsitePlanForm } from "@/components/landing/WebsitePlanForm";
import { WhatsAppLink } from "@/components/landing/WhatsAppLink";
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
  // Look established — a storefront, not a gem.
  <svg key="established" {...markProps}>
    <path d="M3.5 10.5 12 4l8.5 6.5" />
    <path d="M6 10v9.5h12V10" />
    <path d="M10 19.5V14h4v5.5" />
    <path d="M8 12.25h1.75M14.25 12.25H16" />
  </svg>,
  // Generate inquiries — a phone that's ringing.
  <svg key="inquiries" {...markProps}>
    <rect x="3.25" y="2.75" width="9" height="18.5" rx="2" />
    <path d="M6 6h3.5M6.75 18.25h1.75" />
    <path d="M15.25 8a5.4 5.4 0 0 1 0 8" />
    <path d="M17.75 5.75a8.4 8.4 0 0 1 0 12.5" />
  </svg>,
  // Load quickly — a bolt, not a gauge with a pulse through it.
  <svg key="fast" {...markProps}>
    <path d="M13 2.25 4.75 13.25H11l-.75 8.5L19.25 10H12.5L13 2.25Z" />
  </svg>,
  // Own your website — the key, not a lock.
  <svg key="own" {...markProps}>
    <circle cx="8.25" cy="8.75" r="3.6" />
    <circle cx="8.25" cy="8.75" r="1.15" />
    <path d="m11.1 11.4 8.15 8.15" />
    <path d="m15.4 15.7 2.55-2.55" />
    <path d="m17.15 18.45 2.55-2.55" />
  </svg>,
];

const PROCESS_MARKS = [
  // Project call
  <svg key="plan" {...markProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>,
  // Structure and design
  <svg key="structure" {...markProps}>
    <rect x="3" y="3.5" width="18" height="17" rx="2" />
    <path d="M3 8h18" />
    <rect x="5.5" y="10.25" width="6" height="7.25" rx="1" />
    <rect x="13.25" y="10.25" width="5.25" height="3" rx="0.8" />
    <rect x="13.25" y="14.75" width="5.25" height="2.75" rx="0.8" />
  </svg>,
  // Development
  <svg key="dev" {...markProps}>
    <path d="m9 7.5-4.25 4.5L9 16.5" />
    <path d="m15 7.5 4.25 4.5L15 16.5" />
    <path d="m13 5.5-2 13" />
  </svg>,
  // Launch and tracking
  <svg key="launch" {...markProps}>
    <path d="M4 18.5h16" />
    <path d="m6 14.75 4.5-4.5 3 2.75L19.25 6" />
    <path d="M14.5 6H19.25v4.75" />
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
/*  Pain — ShowcaseSite before/after + compare columns                 */
/* ------------------------------------------------------------------ */

export function WebsitePain({
  eyebrow,
  title,
  subtitle,
  before,
  after,
  datedCaption = "A dated WordPress template",
  customCaption = "A custom Next.js rebuild",
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  before?: TransformCol;
  after?: TransformCol;
  datedCaption?: string;
  customCaption?: string;
}) {
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
        <div className="lp-web-pain__stage">
          <figure className="lp-web-pain__shot">
            <div className="lp-web-pain__screen">
              <ShowcaseSite variant="greenfield-dated" layout="desktop" />
            </div>
            <figcaption>{datedCaption}</figcaption>
          </figure>
          <figure className="lp-web-pain__shot lp-web-pain__shot--after">
            <div className="lp-web-pain__screen">
              <ShowcaseSite variant="greenfield" layout="desktop" />
            </div>
            <figcaption>{customCaption}</figcaption>
          </figure>
        </div>
        {before && after ? (
          <div className="lp-web-compare">
            <article className="lp-web-compare__col lp-web-compare__col--before">
              <h3>{before.title}</h3>
              <ul>
                {before.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="lp-web-compare__col lp-web-compare__col--after">
              <h3>{after.title}</h3>
              <ul>
                {after.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        ) : null}
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
          {samples.map((sample) => (
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
                      <strong>{sample.metric}</strong>
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
          ))}
        </ul>
        {testimonial ? (
          <figure className="lp-web-quote">
            <blockquote>
              <p>“{testimonial.quote}”</p>
            </blockquote>
            <figcaption>
              <span className="lp-web-quote__name">{testimonial.name}</span>
              <span className="lp-web-quote__role">{testimonial.role}</span>
            </figcaption>
            {proofIntro ? (
              <p className="lp-web-quote__note">{proofIntro}</p>
            ) : null}
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

function BuildPlate({
  rotate,
  children,
}: {
  rotate: number;
  children: ReactNode;
}) {
  return (
    <svg viewBox="0 0 168 104" fill="none" aria-hidden={true} className="lp-web-plate">
      <rect width="168" height="104" rx="14" fill="#0c0c0c" />
      <rect
        x="0.7"
        y="0.7"
        width="166.6"
        height="102.6"
        rx="13.3"
        stroke="rgba(244,241,234,0.13)"
      />
      <g transform={`rotate(${rotate} 84 52)`}>
        <rect x="24" y="16" width="124" height="78" rx="3.5" fill="#141311" />
        <rect x="22" y="14" width="124" height="78" rx="3.5" fill="#f3efe6" />
        {children}
      </g>
    </svg>
  );
}

const BUILD_PLATES = [
  // Built around the jobs, not a theme with a logo dropped on it.
  <BuildPlate key="company" rotate={-3.2}>
    <rect x="30" y="24" width="48" height="58" rx="2.5" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.3" />
    <circle cx="42" cy="36" r="5.5" fill="#c4bfb4" />
    <path d="M36 48h36M36 55h36M36 62h36M36 71h22" stroke="#c4bfb4" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="86" y="24" width="52" height="58" rx="2.5" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" />
    <rect x="90" y="28" width="44" height="24" rx="1.5" fill="#6f90c4" />
    <path d="M100 46.5 112 36.5 124 46.5v5h-24v-5z" fill="#f3efe6" />
    <rect x="108" y="42" width="8" height="6.5" fill="#6f90c4" />
    <path d="M92 58h32M92 64h24M92 70h28" stroke="#1c1b19" strokeWidth="1.7" strokeLinecap="round" />
  </BuildPlate>,
  // The site, on a phone. No search glass.
  <BuildPlate key="phone" rotate={2.8}>
    <rect x="60" y="18" width="48" height="72" rx="8" fill="#1c1b19" />
    <rect x="64" y="26" width="40" height="54" rx="2" fill="#111110" />
    <rect x="64" y="26" width="40" height="16" fill="#6f90c4" />
    <path d="M70 48h28M70 54h18M70 60h24" stroke="#ece7dc" strokeWidth="1.7" strokeLinecap="round" />
    <rect x="70" y="68" width="28" height="7" rx="2" fill="#f3efe6" />
    <rect x="74" y="21" width="20" height="2.4" rx="1" fill="#3a3834" />
    <path d="M80 82.5h8" stroke="#ece7dc" strokeWidth="1.8" strokeLinecap="round" />
  </BuildPlate>,
  // Services up top. Call and quote sit in the thumb zone.
  <BuildPlate key="call" rotate={-2.4}>
    <path d="M34 28h36M34 35h26M34 42h32" stroke="#1c1b19" strokeWidth="2" strokeLinecap="round" />
    <rect x="32" y="52" width="62" height="16" rx="8" fill="#1c1b19" />
    <g
      transform="translate(40 53.2) scale(0.58)"
      fill="none"
      stroke="#f3efe6"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </g>
    <path d="M58 60h24" stroke="#f3efe6" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="32" y="72" width="62" height="16" rx="8" fill="#6f90c4" />
    <rect x="40" y="75" width="9" height="10" rx="1.3" fill="#f3efe6" />
    <path d="M42.2 78h4.6M42.2 81h3.2" stroke="#6f90c4" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M54 80h22" stroke="#0c0c0c" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="86" cy="80" r="9" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.5" />
    <ellipse cx="86" cy="76.8" rx="3" ry="2" fill="#e4ddd0" />
  </BuildPlate>,
  // A light page, already loaded, with the speed mark beside it.
  <BuildPlate key="fast" rotate={3.1}>
    <rect x="30" y="24" width="68" height="56" rx="3" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" />
    <path d="M30 32h68" stroke="#1c1b19" strokeWidth="1.2" />
    <circle cx="37" cy="28" r="1.5" fill="#1c1b19" />
    <circle cx="42.5" cy="28" r="1.5" fill="#1c1b19" />
    <circle cx="48" cy="28" r="1.5" fill="#1c1b19" />
    <path d="M38 44h22" stroke="#1c1b19" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="38" y="68" width="52" height="4" rx="2" fill="#6f90c4" />
    <path d="M118 22 104 50h14l-8 30 26-34h-14l10-24z" fill="#6f90c4" />
  </BuildPlate>,
  // A search field, then the service pages Google can list.
  <BuildPlate key="search" rotate={-3.6}>
    <rect x="30" y="20" width="108" height="16" rx="8" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" />
    <circle cx="42" cy="28" r="3.4" stroke="#1c1b19" strokeWidth="1.5" />
    <path d="M44.5 30.6 47.2 33.4" stroke="#1c1b19" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M52 28h52" stroke="#c4bfb4" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M34 46h46" stroke="#6f90c4" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M34 53h78" stroke="#1c1b19" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M34 63h40" stroke="#6f90c4" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M34 70h70" stroke="#1c1b19" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M34 80h44" stroke="#6f90c4" strokeWidth="2.4" strokeLinecap="round" />
  </BuildPlate>,
  // New calls and quotes. Visits sit quieter underneath.
  <BuildPlate key="tracked" rotate={2.2}>
    <rect x="30" y="20" width="108" height="20" rx="3" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.3" />
    <circle cx="44" cy="30" r="6.5" fill="#6f90c4" />
    <path
      d="M41.3 27.4c.3-.55.95-.85 1.5-.55l.55.3c.4.25.55.75.35 1.2l-.25.55c-.1.25.05.5.3.55.65.2 1.2.6 1.6 1.1.15.2.1.5-.1.6l-.45.3c-.4.25-.5.8-.25 1.2l.3.55c.35.6.15 1.35-.5 1.65l-.6.25c-1.6.7-3.4-.1-4.2-1.6-.7-1.3-.75-2.8-.1-4.1l.4-.6c.3-.45.8-.6 1.2-.45z"
      fill="#f3efe6"
    />
    <path d="M56 30h42" stroke="#1c1b19" strokeWidth="2" strokeLinecap="round" />
    <circle cx="124" cy="30" r="3.2" fill="#6f90c4" />
    <rect x="30" y="44" width="108" height="20" rx="3" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.3" />
    <circle cx="44" cy="54" r="6.5" fill="#6f90c4" />
    <rect x="40.6" y="50.4" width="6.8" height="7.2" rx="1" fill="#f3efe6" />
    <path d="M42.2 52.6h3.6M42.2 54.6h2.6" stroke="#6f90c4" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M56 54h36" stroke="#1c1b19" strokeWidth="2" strokeLinecap="round" />
    <circle cx="124" cy="54" r="3.2" fill="#6f90c4" />
    <path d="M38 76h28" stroke="#c4bfb4" strokeWidth="2" strokeLinecap="round" />
    <path d="M72 76h22" stroke="#c4bfb4" strokeWidth="2" strokeLinecap="round" />
  </BuildPlate>,
];

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
            src="/assets/images/lp/craft-build-board.webp?v=20260915g"
            alt="Printed cream plates on a studio desk, each one a piece of what a contractor website has to ship with."
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <ul className="lp-web-build__list">
          {points.map((point, index) => (
            <li key={point.title}>
              <article className="lp-web-build__item">
                <span className="lp-web-build__plate-wrap" aria-hidden>
                  {BUILD_PLATES[index] ?? BUILD_PLATES[0]}
                </span>
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
              src="/assets/images/lp/craft-studio.webp?v=20260915g"
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
        <ol className="lp-web-process__list">
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
          {shown.map((sample) => (
            <li key={sample.client}>
              <p className="lp-web-proofstrip__client">{sample.client}</p>
              <p className="lp-web-proofstrip__metric">
                <span className="lp-web-proofstrip__figure">{sample.metric}</span>
                <span className="lp-web-proofstrip__label">{sample.label}</span>
              </p>
              <a
                href={sample.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {viewLiveLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
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
            {tiers?.length ? (
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
            {qualify ? (
              <p className="lp-web-pricing__qualify">{qualify}</p>
            ) : null}
            {highlights?.length ? (
              <ul className="lp-web-pricing__points">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            {note ? <p className="lp-web-pricing__note">{note}</p> : null}
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

function PlanFolio({ copy }: { copy: PlanBoardCopy }) {
  return (
    <div className="lp-web-plan__sheet">
      <p className="lp-web-plan__sheet-kicker">{copy.folioKicker}</p>
      <p className="lp-web-plan__sheet-title">{copy.folioTitle}</p>
      <p className="lp-web-plan__sheet-lede">{copy.folioLede}</p>
      <ul className="lp-web-plan__sheet-list">
        {copy.folioRows.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <p className="lp-web-plan__sheet-stamp">{copy.folioStamp}</p>
    </div>
  );
}

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
  figcaption = "A 15-minute call. Then scope and price in writing.",
}: {
  page: LandingPageEntry;
  locale?: Locale;
  kicker?: string;
  figcaption?: string;
}) {
  const boards = PLAN_BOARDS[locale] ?? PLAN_BOARDS.en;
  const whatsapp =
    page.whatsappHref && page.whatsappPlanLabel
      ? { href: page.whatsappHref, label: page.whatsappPlanLabel }
      : null;

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
              {whatsapp ? (
                <WhatsAppLink
                  href={whatsapp.href}
                  label={whatsapp.label}
                  variant="plan"
                />
              ) : null}
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
            <figure className="lp-web-plan__folio">
              <PlanFolio copy={boards} />
              <figcaption>{figcaption}</figcaption>
            </figure>
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
