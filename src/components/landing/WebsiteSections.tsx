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
  LandingPagePricingAddOn,
  LandingPageSample,
  LandingPageSellPoint,
  LandingPageTestimonial,
} from "@/content/registry/landing-pages";

/* ------------------------------------------------------------------ */
/*  Marks (live custom SVGs — not Lucide)                              */
/* ------------------------------------------------------------------ */

function CheckMark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden>
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

function CrossMark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M22 22 42 42M42 22 22 42"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Index-ordered marks so Spanish outcome titles still get icons. */
const OUTCOME_MARKS: ReactNode[] = [
  <svg key="established" viewBox="0 0 64 64" fill="none" aria-hidden>
    <path d="M8 44V22L32 8l24 14v22L32 58 8 44Z" stroke="currentColor" strokeWidth="2.4" />
    <path d="M20 34V24.5L32 17.5 44 24.5V34L32 41 20 34Z" stroke="currentColor" strokeWidth="2.4" />
    <path d="M32 41v9" stroke="currentColor" strokeWidth="2.4" />
  </svg>,
  <svg key="inquiries" viewBox="0 0 64 64" fill="none" aria-hidden>
    <rect x="18" y="8" width="28" height="48" rx="5" stroke="currentColor" strokeWidth="2.4" />
    <path d="M26 14h12" stroke="currentColor" strokeWidth="2.4" />
    <rect x="24" y="22" width="16" height="7" rx="1.5" fill="currentColor" />
    <path d="M24 36h16M24 42h10" stroke="currentColor" strokeWidth="2.4" />
  </svg>,
  <svg key="fast" viewBox="0 0 64 64" fill="none" aria-hidden>
    <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.4" />
    <path d="M32 32 42 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M18 34h8l4 8 6-16 4 8h6" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
  </svg>,
  <svg key="own" viewBox="0 0 64 64" fill="none" aria-hidden>
    <rect x="14" y="26" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="2.4" />
    <path d="M22 26v-6a10 10 0 0 1 20 0v6" stroke="currentColor" strokeWidth="2.4" />
    <circle cx="32" cy="39" r="3" fill="currentColor" />
  </svg>,
];

const PROCESS_MARKS = [
  // Website plan
  <svg key="plan" viewBox="0 0 64 64" fill="none" aria-hidden>
    <rect x="14" y="8" width="36" height="48" rx="3" stroke="currentColor" strokeWidth="2.4" />
    <path d="M22 20h20M22 28h20M22 36h12" stroke="currentColor" strokeWidth="2.4" />
  </svg>,
  // Structure and design
  <svg key="structure" viewBox="0 0 64 64" fill="none" aria-hidden>
    <rect x="8" y="10" width="48" height="12" rx="2" stroke="currentColor" strokeWidth="2.4" />
    <rect x="8" y="28" width="22" height="26" rx="2" stroke="currentColor" strokeWidth="2.4" />
    <rect x="34" y="28" width="22" height="26" rx="2" stroke="currentColor" strokeWidth="2.4" />
  </svg>,
  // Development
  <svg key="dev" viewBox="0 0 64 64" fill="none" aria-hidden>
    <rect x="8" y="14" width="38" height="26" rx="3" stroke="currentColor" strokeWidth="2.4" />
    <path d="M8 22h38" stroke="currentColor" strokeWidth="2.4" />
    <circle cx="14" cy="18" r="1.4" fill="currentColor" />
    <circle cx="19" cy="18" r="1.4" fill="currentColor" />
    <rect x="22" y="28" width="28" height="22" rx="4" stroke="currentColor" strokeWidth="2.4" />
  </svg>,
  // Launch and tracking
  <svg key="launch" viewBox="0 0 64 64" fill="none" aria-hidden>
    <path d="M32 8 40 28H24L32 8Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M32 28v16" stroke="currentColor" strokeWidth="2.4" />
    <path d="M20 52h24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M24 44h16" stroke="currentColor" strokeWidth="2.4" />
  </svg>,
];

type TransformCol = { title: string; items: string[] };

/* ------------------------------------------------------------------ */
/*  Outcomes                                                           */
/* ------------------------------------------------------------------ */

function OutcomeBody({ body }: { body: string }) {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return (
    <span className="lp-web-outcomes__body">
      {lines.map((line) => (
        <span key={line} className="lp-web-outcomes__line">
          {line}
        </span>
      ))}
    </span>
  );
}

function OutcomeGroup({
  items,
  hidden = false,
  copyKey,
}: {
  items: LandingPageOutcome[];
  hidden?: boolean;
  copyKey: string;
}) {
  return (
    <ul className="lp-web-outcomes__group" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={`${copyKey}-${item.title}`}>
          <span className="lp-web-outcomes__mark" aria-hidden>
            {OUTCOME_MARKS[index % OUTCOME_MARKS.length] ?? <CheckMark />}
          </span>
          <span className="lp-web-outcomes__copy">
            <span className="lp-web-outcomes__title">{item.title}</span>
            <OutcomeBody body={item.body} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Repeated so a wide screen never runs out of items before the loop resets. */
const MARQUEE_COPIES = 4;

function OutcomeHalf({
  items,
  hidden = false,
}: {
  items: LandingPageOutcome[];
  hidden?: boolean;
}) {
  return (
    <div className="lp-web-outcomes__half">
      {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
        <OutcomeGroup
          key={copy}
          items={items}
          hidden={hidden || copy > 0}
          copyKey={hidden ? `b${copy}` : `a${copy}`}
        />
      ))}
    </div>
  );
}

export function WebsiteOutcomes({
  items,
  ariaLabel = "What the website is built to do",
}: {
  items: LandingPageOutcome[];
  ariaLabel?: string;
}) {
  if (!items.length) return null;
  return (
    <aside className="lp-web-outcomes" aria-label={ariaLabel}>
      <div className="lp-web-outcomes__marquee">
        <div className="lp-web-outcomes__track">
          <OutcomeHalf items={items} />
          <OutcomeHalf items={items} hidden />
        </div>
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
                        alt=""
                        width={1040}
                        height={692}
                        decoding="async"
                        loading="lazy"
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
                  {sample.challenge ? <p>{sample.challenge}</p> : null}
                  {sample.work ? <p>{sample.work}</p> : null}
                  {!sample.challenge && sample.summary ? (
                    <p>{sample.summary}</p>
                  ) : null}
                  {sample.result ? (
                    <p className="lp-web-work__result">{sample.result}</p>
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
        {workCtaTitle ? (
          <div className="lp-web-work__cta">
            <PlanCta placement="work" landingSlug={landingSlug} arrow>
              {workCtaTitle ?? ctaLabel}
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

const BUILD_PLATES = [
  <svg key="plate-0" viewBox="0 0 168 104" fill="none" aria-hidden={true} className="lp-web-plate"><rect width="168" height="104" rx="14" fill="#0c0c0c" /><rect x="0.7" y="0.7" width="166.6" height="102.6" rx="13.3" stroke="rgba(244,241,234,0.13)" /><g transform="rotate(-3.2 84 52)"><rect x="24" y="16" width="124" height="78" rx="3.5" fill="#141311" /><rect x="22" y="14" width="124" height="78" rx="3.5" fill="#f3efe6" /><rect x="38" y="24" width="92" height="52" rx="3" fill="#1c1b19" /><rect x="41" y="27" width="86" height="38" rx="1.5" fill="#0e0e0e" /><rect x="41" y="27" width="86" height="7" fill="#ece7dc" /><circle cx="45.5" cy="30.5" r="1.1" fill="#c4bfb4" /><circle cx="49" cy="30.5" r="1.1" fill="#c4bfb4" /><circle cx="52.5" cy="30.5" r="1.1" fill="#c4bfb4" /><rect x="46" y="38" width="28" height="18" rx="1" fill="#6f90c4" /><path d="M78 40h22M78 45h16M78 50h19" stroke="#ece7dc" strokeWidth="1.6" /><rect x="46" y="68" width="76" height="5" rx="1" fill="#2a2926" /><rect x="28" y="58" width="36" height="26" rx="2" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" /><path d="M34 66h24M34 71h18M34 76h14" stroke="#1c1b19" strokeWidth="1.4" /></g></svg>,
  <svg key="plate-1" viewBox="0 0 168 104" fill="none" aria-hidden={true} className="lp-web-plate"><rect width="168" height="104" rx="14" fill="#0c0c0c" /><rect x="0.7" y="0.7" width="166.6" height="102.6" rx="13.3" stroke="rgba(244,241,234,0.13)" /><g transform="rotate(2.8 84 52)"><rect x="24" y="16" width="124" height="78" rx="3.5" fill="#141311" /><rect x="22" y="14" width="124" height="78" rx="3.5" fill="#f3efe6" /><rect x="64" y="20" width="40" height="68" rx="7" fill="#1c1b19" /><rect x="67" y="26" width="34" height="54" rx="2" fill="#111110" /><rect x="67" y="26" width="34" height="18" fill="#6f90c4" /><path d="M72 48h24M72 53h16" stroke="#ece7dc" strokeWidth="1.5" /><rect x="71" y="60" width="26" height="8" rx="1.5" fill="#f3efe6" /><rect x="78" y="22.5" width="12" height="2" rx="1" fill="#2c2b28" /><path d="M80 82h8" stroke="#ece7dc" strokeWidth="1.8" strokeLinecap="round" /><circle cx="118" cy="72" r="10" fill="none" stroke="#6f90c4" strokeWidth="1.6" /><path d="M112 78 108 84" stroke="#6f90c4" strokeWidth="1.6" strokeLinecap="round" /></g></svg>,
  <svg key="plate-2" viewBox="0 0 168 104" fill="none" aria-hidden={true} className="lp-web-plate"><rect width="168" height="104" rx="14" fill="#0c0c0c" /><rect x="0.7" y="0.7" width="166.6" height="102.6" rx="13.3" stroke="rgba(244,241,234,0.13)" /><g transform="rotate(-2.4 84 52)"><rect x="24" y="16" width="124" height="78" rx="3.5" fill="#141311" /><rect x="22" y="14" width="124" height="78" rx="3.5" fill="#f3efe6" /><rect x="34" y="26" width="52" height="16" rx="2" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" /><rect x="40" y="46" width="52" height="16" rx="2" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" /><rect x="46" y="66" width="52" height="16" rx="2" fill="#1c1b19" /><path d="M40 32h28M46 52h24" stroke="#1c1b19" strokeWidth="1.4" /><path d="M52 72h28" stroke="#f3efe6" strokeWidth="1.5" /><path d="M90 34h18c6 0 10 4 10 9v6" stroke="#6f90c4" strokeWidth="1.8" fill="none" /><path d="M112 45l6 4-6 4" fill="#6f90c4" /><rect x="108" y="64" width="28" height="12" rx="6" fill="#6f90c4" /></g></svg>,
  <svg key="plate-3" viewBox="0 0 168 104" fill="none" aria-hidden={true} className="lp-web-plate"><rect width="168" height="104" rx="14" fill="#0c0c0c" /><rect x="0.7" y="0.7" width="166.6" height="102.6" rx="13.3" stroke="rgba(244,241,234,0.13)" /><g transform="rotate(3.1 84 52)"><rect x="24" y="16" width="124" height="78" rx="3.5" fill="#141311" /><rect x="22" y="14" width="124" height="78" rx="3.5" fill="#f3efe6" /><rect x="36" y="48" width="52" height="28" rx="2" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" /><rect x="42" y="38" width="52" height="28" rx="2" fill="#ece7dc" stroke="#1c1b19" strokeWidth="1.4" /><rect x="48" y="28" width="52" height="28" rx="2" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" /><path d="M56 38h28M56 43h18" stroke="#1c1b19" strokeWidth="1.4" /><path d="M108 68c0-14 10-24 24-24" stroke="#1c1b19" strokeWidth="1.6" fill="none" /><path d="M108 68h24" stroke="#1c1b19" strokeWidth="1.4" /><path d="M124 32 132 44" stroke="#6f90c4" strokeWidth="2" strokeLinecap="round" /><circle cx="124" cy="68" r="2.2" fill="#6f90c4" /></g></svg>,
  <svg key="plate-4" viewBox="0 0 168 104" fill="none" aria-hidden={true} className="lp-web-plate"><rect width="168" height="104" rx="14" fill="#0c0c0c" /><rect x="0.7" y="0.7" width="166.6" height="102.6" rx="13.3" stroke="rgba(244,241,234,0.13)" /><g transform="rotate(-3.6 84 52)"><rect x="24" y="16" width="124" height="78" rx="3.5" fill="#141311" /><rect x="22" y="14" width="124" height="78" rx="3.5" fill="#f3efe6" /><circle cx="52" cy="44" r="14" stroke="#1c1b19" strokeWidth="1.8" fill="#fffaf2" /><path d="M62 54 72 66" stroke="#1c1b19" strokeWidth="2" strokeLinecap="round" /><rect x="78" y="26" width="62" height="52" rx="3" fill="#fffaf2" stroke="#1c1b19" strokeWidth="1.4" /><path d="M86 36h30" stroke="#6f90c4" strokeWidth="1.6" /><path d="M86 44h46M86 50h38M86 56h28" stroke="#1c1b19" strokeWidth="1.4" /><rect x="86" y="64" width="16" height="6" rx="1" fill="#1c1b19" /><rect x="106" y="64" width="16" height="6" rx="1" fill="#ece7dc" stroke="#1c1b19" strokeWidth="1.2" /></g></svg>,
  <svg key="plate-5" viewBox="0 0 168 104" fill="none" aria-hidden={true} className="lp-web-plate"><rect width="168" height="104" rx="14" fill="#0c0c0c" /><rect x="0.7" y="0.7" width="166.6" height="102.6" rx="13.3" stroke="rgba(244,241,234,0.13)" /><g transform="rotate(2.2 84 52)"><rect x="24" y="16" width="124" height="78" rx="3.5" fill="#141311" /><rect x="22" y="14" width="124" height="78" rx="3.5" fill="#f3efe6" /><path d="M38 74V52h16v22H38Z" fill="#1c1b19" /><path d="M62 74V36h16v38H62Z" fill="#1c1b19" /><path d="M86 74V28h16v46H86Z" fill="#6f90c4" /><path d="M118 68c8-6 12-16 18-28" stroke="#1c1b19" strokeWidth="1.7" fill="none" strokeLinecap="round" /><circle cx="118" cy="68" r="3" fill="#1c1b19" /><circle cx="128" cy="52" r="3" fill="#1c1b19" /><circle cx="136" cy="40" r="3.2" fill="#6f90c4" /><path d="M38 78h100" stroke="#1c1b19" strokeWidth="1.4" /></g></svg>
] as const;

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
/*  Pricing — live panel ($2,000 starting; soft when addOns empty)     */
/* ------------------------------------------------------------------ */

export function WebsitePricing({
  title,
  intro,
  anchor,
  delivery,
  qualify,
  highlights,
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
            <p className="lp-web-pricing__anchor">
              <small>{startingLabel}</small>
              <span>{anchor}</span>
            </p>
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
    folioKicker: "Website plan",
    folioTitle: "Written plan.",
    folioLede: "Written around the business.",
    folioRows: ["First look", "On a phone", "Call path", "Speed", "Rebuild first"],
    folioStamp: "No obligation",
    stampWidth: 88,
    clickHere: "Click Here",
    navClutter: "nav clutter",
    buriedCta: "buried CTA",
    stockPhoto: "stock photo",
    inspection: "Site inspection · punch list",
    sheet: "SHT 01 · Structure",
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
    folioKicker: "Plan web",
    folioTitle: "Plan escrito.",
    folioLede: "Hecho para el negocio.",
    folioRows: ["Primera mirada", "En el celular", "Ruta de llamada", "Velocidad", "Qué cambiar"],
    folioStamp: "Sin compromiso",
    stampWidth: 118,
    clickHere: "Clic aquí",
    navClutter: "menú saturado",
    buriedCta: "botón escondido",
    stockPhoto: "foto genérica",
    inspection: "Inspección del sitio · fallos",
    sheet: "HOJA 01 · Estructura",
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
    folioKicker: "Plan web",
    folioTitle: "Plan escrito.",
    folioLede: "Hecho para el negocio.",
    folioRows: ["Primera mirada", "En el móvil", "Ruta de llamada", "Velocidad", "Qué cambiar"],
    folioStamp: "Sin compromiso",
    stampWidth: 118,
    clickHere: "Pulsa aquí",
    navClutter: "menú saturado",
    buriedCta: "botón escondido",
    stockPhoto: "foto de archivo",
    inspection: "Inspección de la web · fallos",
    sheet: "HOJA 01 · Estructura",
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
  figcaption = "A short written brief. Five points, then a clear recommendation.",
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
