import type { Metadata } from "next";
import Link from "next/link";
import Form, { LEAD_FIELDS } from "@/components/Form";
import { DeferredImg } from "@/components/DeferredImg";
import { ReasonBoard, ReviewRail } from "@/components/HomeBands";
import HeroFilm from "@/components/HeroFilm";
import { ContentSchema } from "@/components/JsonLd";
import { OpenDialog } from "@/components/OpenDialog";
import PlanOffer from "@/components/PlanOffer";
import ReviewsSection from "@/components/ReviewsSection";
import Stepper from "@/components/Stepper";
import TrustStrip from "@/components/TrustStrip";
import { Compare, CtaBand, Faq, HL, IconCard, MediaSplit, Section } from "@/components/ui";
import { LIVE_SITES } from "@/data/liveSites";
import { portfolioFile } from "@/data/portfolio";
import { FAQS as SITE_FAQS, STEPS } from "@/lib/content";
import { imageSrcSet, imageVariant } from "@/lib/image-sources";
import { SITE, telHref } from "@/lib/site";
import { contentMetadata } from "@/lib/seo";

/** Contractor proof sites for this LP (Preferred Plumbing + A1 Landscaping). */
const CONTRACTOR_LIVE = LIVE_SITES.filter((site) =>
  site.slug === "preferred-plumbing" || site.slug === "a1-landscaping",
);

function siteHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function SectionGraphic({ name, alt, className }: { name: string; alt: string; className: string }) {
  const base = `/assets/home/${name}`;
  const src = `${base}.webp`;
  const widths = [640, 768, 1120, 1280] as const;
  const sizes = "(max-width: 720px) 92vw, 600px";

  return (
    <picture className={`home-section-art ${className}`}>
      <source type="image/avif" srcSet={imageSrcSet(src, widths, "avif")} sizes={sizes} />
      <img
        src={imageVariant(src, 640, "webp")}
        srcSet={imageSrcSet(src, widths)}
        sizes={sizes}
        alt={alt}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

export const metadata: Metadata = contentMetadata({
  path: "/lp/phoenix-preview",
  title: "See Your New Website Free | Phoenix Contractors",
  description:
    "Phoenix plumbers, HVAC, and roofers: get a free homepage preview in 2 business days. $0 down, then from $97/mo. No card, no long-term contract.",
  index: false,
  image: "/assets/ads/fb-website-preview.jpg",
  imageAlt: "See your new website free — Kinexis Digital for Phoenix contractors",
});

const FAQS = [
  {
    q: "Do I pay before I see the preview?",
    a: "No. We design your homepage preview first. No card is required and there is no obligation. You choose a plan only after you like the direction.",
  },
  {
    q: "How fast is the free preview?",
    a: "Free homepage preview in 2 business days after you send the basics about your business.",
  },
  {
    q: "What does it cost after the preview?",
    a: "Website is $0 down, then $97/mo. Lead System is $0 down, then $197/mo. Plus is $297/mo, or Own It for a one-time $1,497. Every option is month-to-month with no long-term contract.",
  },
  {
    q: "What is the 60-day tracked-lead guarantee?",
    a: "On Lead System and Plus: if you receive zero tracked leads in your first 60 days live, we waive your 3rd and 4th monthly charges. Limited to one guarantee per business.",
  },
  {
    q: "What is the 30-day money-back guarantee?",
    a: "Every plan includes a 30-day money-back guarantee. If you are not satisfied within 30 days of launch, we refund your most recent payment in full when requested in writing. Third-party costs already paid on your behalf are excluded.",
  },
  ...SITE_FAQS.filter((item) =>
    ["Is this right for my kind of business?", "How does billing work?", "When will my site go live?"].includes(item.q),
  ),
];

export default async function PhoenixPreviewLp() {
  return (
    <div className="lp-page">
      <ContentSchema
        path="/lp/phoenix-preview"
        title="See Your New Website Free | Phoenix Contractors"
        description="Phoenix plumbers, HVAC, and roofers: get a free homepage preview in 2 business days. $0 down, then from $97/mo."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Phoenix Preview", path: "/lp/phoenix-preview" },
        ]}
        faqs={FAQS}
      />

      <section className="hero hero--fit">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="eyebrow">Phoenix plumbers, HVAC &amp; roofers</p>
            <h1>
              <HL text="See Your New Website Free" mark="Website Free" />
            </h1>
            <ul className="ticks">
              <li>
                <span className="tick__mark" aria-hidden="true">
                  ✓
                </span>
                <span className="tick__copy">
                  <span>
                    <b>Homepage in 2 business days</b> – no card
                  </span>
                  <span>and no commitment before you pay</span>
                </span>
              </li>
              <li>
                <span className="tick__mark" aria-hidden="true">
                  ✓
                </span>
                <span className="tick__copy">
                  <span>
                    <b>$0 down, then from $97/mo</b> – Website
                  </span>
                  <span>or Lead System at $197/mo for more calls</span>
                </span>
              </li>
              <li>
                <span className="tick__mark" aria-hidden="true">
                  ✓
                </span>
                <span className="tick__copy">
                  <span>
                    <b>Month-to-month</b> – no long-term
                  </span>
                  <span>contracts, cancel anytime</span>
                </span>
              </li>
            </ul>
            <div className="hero__btns">
              <a className="btn btn--primary btn--lg" href="#start">
                Get My Free Preview
              </a>
            </div>
            <div className="hero__reassure">
              <TrustStrip className="hero__trust" />
              <p className="hero__call muted small">
                Prefer to talk?{" "}
                <a className="trust-mark" href={telHref(SITE.phone)}>
                  {SITE.phone}
                </a>
              </p>
            </div>
          </div>
          <HeroFilm />
        </div>
      </section>

      <section className="lp-form-band" id="start">
        <div className="container lp-form-grid">
          <div className="lp-form-copy">
            <p className="eyebrow">Phoenix plumbers, HVAC &amp; roofers</p>
            <h2>See the homepage before you choose a plan.</h2>
            <p>
              Tell us what you do and where you work. We prepare a free homepage preview in 2 business days — no card and
              no obligation.
            </p>
            <div className="lp-form-note">
              <span aria-hidden="true">✓</span>
              <p>
                <strong>$0 down after the preview.</strong>
                <br />
                Website from $97/mo, month-to-month.
              </p>
            </div>
          </div>
          <div className="lp-form-card">
            <p className="lp-form-card__title">Get your free homepage preview</p>
            <p className="lp-form-card__sub">A few details is all we need to get started.</p>
            <Form
              fields={LEAD_FIELDS}
              button="Show Me My Free Homepage"
              note={
                <>
                  By submitting, you agree to our{" "}
                  <Link href="/privacy" prefetch={false}>
                    Privacy Policy
                  </Link>
                  .
                </>
              }
              fast
              fastText="No card required. We reply fast."
              hiddenFields={{
                source: "facebook",
                campaign: "phoenix-preview",
                landing_page: "/lp/phoenix-preview",
              }}
            />
            <TrustStrip />
          </div>
        </div>
      </section>

      <ReviewsSection
        variant="home"
        eyebrow="Proof from real owners"
        title="What Local Business Owners Say"
        mark="Business Owners Say"
        sub="Real feedback from owners who launched with a Kinexis website plan."
        ctaLabel="Read More Reviews"
        ctaHref="/reviews"
      />

      <Section>
        <MediaSplit image="web-design" reverse alt="Website design on a desktop monitor and a phone">
          <h2>
            <HL text="Websites Made for Contractors Like Yours" mark="Contractors Like Yours" />
          </h2>
          <p className="muted">
            Plumbing, HVAC, roofing, and other home services — clear services, clear area, and an obvious way to call or
            request a quote.
          </p>
        </MediaSplit>
        <div className="portfolio--live portfolio--live--pair">
          {CONTRACTOR_LIVE.map((site) => {
            const shot = portfolioFile(site.image, 640);
            const host = siteHost(site.url);
            return (
              <a key={site.slug} className="live-site" href={site.url} target="_blank" rel="noopener noreferrer">
                <div className="shot shot--static" data-name={site.name}>
                  <div className="shot__page">
                    <div className="shot__track">
                      <DeferredImg
                        src={shot}
                        sizes="(max-width: 960px) 92vw, 380px"
                        alt=""
                        width={640}
                        height={Math.round((site.height * 640) / site.width)}
                        className="shot__img"
                      />
                    </div>
                  </div>
                  <span className="btn btn--primary shot__cta-overlay" aria-hidden="true">
                    Visit Site
                  </span>
                </div>
                <span className="live-site__copy">
                  <span className="live-site__status">
                    <span className="live-site__dot" aria-hidden="true" />
                    Live
                  </span>
                  <span className="live-site__id">
                    <span className="live-site__name">{site.name}</span>
                    <span className="live-site__meta">
                      <span>{site.trade}</span>
                      <span className="live-site__host">{host}</span>
                    </span>
                  </span>
                  <span className="live-site__go">
                    Visit site
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                      <path
                        d="M4.5 11.5 11.5 4.5M6.5 4.5h5v5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </Section>

      <Section tint>
        <MediaSplit image="homepage" alt="Contractor showing a business website on a laptop and phone">
          <h2>
            <HL text="What You Get With a Kinexis Website Plan" mark="Website Plan" />
          </h2>
          <p>
            A website plan built for local service businesses: a fast site, practical SEO structure, and follow-up that
            keeps working when you are on a job. Plans start at $97/mo.
          </p>
        </MediaSplit>
        <div className="grid grid--3">
          <IconCard
            title={
              <>
                A Website That
                <br />
                Brings In More
                <br />
                Calls
              </>
            }
            iconAlt="A Website That Brings In More Calls"
            text="Your site loads quickly, explains your services, and gives people a quick way to call or send job details."
            icon="better-design"
          />
          <IconCard
            title={
              <>
                Follow-Up That
                <br />
                Works While You’re
                <br />
                On The Job
              </>
            }
            iconAlt="Follow-Up That Works While You’re On The Job"
            text="On Lead System and Plus, text-back and review requests keep running while you’re on a job, and every lead is tracked."
            icon="better-follow-up"
          />
          <IconCard
            title={
              <>
                Simple Pricing
                <br />
                With Everything
                <br />
                Up Front
              </>
            }
            iconAlt="Simple Pricing With Everything Up Front"
            text="Choose from four plans starting at $97/mo, with a free homepage preview, $0 down, and month-to-month billing."
            icon="better-pricing"
          />
        </div>
        <p className="center btn-row spaced">
          <a className="btn btn--primary" href="#start">
            Get My Free Preview
          </a>
        </p>
      </Section>

      <Section band="lead">
        <div className="lead-feature">
          <div className="lead-feature__copy">
            <p className="eyebrow">Available on Lead System and Plus</p>
            <h2>
              <HL text="More Calls. Better Website." mark="Better Website" />
            </h2>
            <p>
              Lead System is $0 down, then $197/mo — custom website up to 10 pages, Google review requests, and call
              tracking with a monthly report. Missed-call text-back is optional.
            </p>
            <p className="btn-row">
              <a className="btn btn--primary" href="#start">
                Get My Free Preview
              </a>
              <OpenDialog id="guarantee" className="btn btn--light">
                60-Day Tracked-Lead Guarantee
              </OpenDialog>
            </p>
          </div>
          <SectionGraphic
            name="google-reviews-handled"
            alt="A completed job leading to a text message and a Google review"
            className="home-section-art--reviews"
          />
        </div>
        <ReviewRail />
      </Section>

      <Section id="plans">
        <PlanOffer
          href="#start"
          pricingHref="#plans"
          secondary="See plan details"
          eyebrow="Four Plans · One Free Preview"
          note="Every plan starts with a free homepage preview in 2 business days — no card, no obligation. Month-to-month, cancel anytime."
        />
      </Section>

      <Section tint>
        <h2 className="center">
          <HL text="Why Business Owners Choose Kinexis Over Freelancers and Agencies" mark="Over Freelancers and Agencies" />
        </h2>
        <p className="center muted">A clearer plan than hiring a freelancer or a full web design agency for a small business.</p>
        <Compare />
        <p className="center muted small">Typical offerings; individual providers vary.</p>
      </Section>

      <Section>
        <div className="section-head">
          <p className="eyebrow">Built into every plan</p>
          <h2 className="center">
            <HL text="What Every Kinexis Website Includes" mark="Kinexis Website" />
          </h2>
          <p className="center muted">
            The essentials for looking credible, getting found, and turning visits into calls—with hosting and updates
            handled for you.
          </p>
        </div>
        <ReasonBoard />
      </Section>

      <Section tint>
        <h2 className="center">
          <HL text="From Free Preview to Launch" mark="to Launch" />
        </h2>
        <p className="center muted">See the homepage first. If it feels right, choose a plan and we’ll map out the launch in writing.</p>
        <Stepper steps={STEPS} />
        <p className="center btn-row spaced">
          <a className="btn btn--primary" href="#start">
            Get My Free Preview
          </a>
        </p>
      </Section>

      <Section>
        <h2 className="center">
          <HL text="60-Day Lead Guarantee" mark="Lead Guarantee" />
        </h2>
        <p className="center muted">
          Lead System and Plus include a written lead guarantee. If you get zero tracked leads in your first 60 days
          live, we waive the 3rd and 4th monthly charges.
        </p>
        <p className="center btn-row spaced">
          <OpenDialog id="guarantee" className="btn btn--ghost">
            Read the guarantee details
          </OpenDialog>
          <a className="btn btn--primary" href="#start">
            Get My Free Preview
          </a>
        </p>
        <TrustStrip className="center" />
      </Section>

      <Section narrow>
        <h2 className="center">
          <HL text="Frequently Asked Questions" mark="Questions" />
        </h2>
        <Faq items={FAQS} />
      </Section>

      <CtaBand
        h="Ready to See Your Homepage?"
        mark="Your Homepage"
        sub="Free preview in 2 business days. No card. No obligation."
        href="#start"
        secondary="See Plans Above"
        secondaryHref="#plans"
      />

      {/* Slim trust footer — full site footer stays hidden on /lp/* */}
      <div className="lp-foot" role="contentinfo">
        <div className="container lp-foot__inner">
          <Link className="lp-foot__logo" href="/" aria-label="Kinexis Digital home" prefetch={false}>
            <img
              src="/assets/logos/footer-nav.webp"
              alt="Kinexis Digital"
              width={420}
              height={420}
              loading="lazy"
              decoding="async"
            />
          </Link>
          <div className="lp-foot__meta">
            <nav className="lp-foot__links" aria-label="Legal">
              <Link href="/privacy" prefetch={false}>
                Privacy Policy
              </Link>
              <Link href="/terms" prefetch={false}>
                Terms
              </Link>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={telHref(SITE.phone)}>{SITE.phone}</a>
            </nav>
            <p className="lp-foot__copy">© {new Date().getFullYear()} Kinexis Digital</p>
          </div>
        </div>
      </div>
    </div>
  );
}
