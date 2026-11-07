import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { FAQS, STEPS } from "@/lib/content";
import { SITE, telHref } from "@/lib/site";
import { OpenDialog } from "@/components/OpenDialog";
import Stepper from "@/components/Stepper";
import { PageSchema } from "@/components/JsonLd";
import IndustryGrid from "@/components/IndustryGrid";
import { ReasonBoard, ReviewRail } from "@/components/HomeBands";
import PlanOffer from "@/components/PlanOffer";
import TrustStrip from "@/components/TrustStrip";
import { Compare, Faq, HL, IconCard, MediaSplit, Section, Shots } from "@/components/ui";
import HeroFilm from "@/components/HeroFilm";
import { imageSrcSet, imageVariant } from "@/lib/image-sources";

export const metadata = pageMetadata("home");

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

function SectionCta({ primaryHref = "/contact", secondaryHref = "/pricing" }: { primaryHref?: string; secondaryHref?: string }) {
  return (
    <p className="center btn-row spaced">
      <Link className="btn btn--primary" href={primaryHref} prefetch={false}>Get My Free Preview</Link>
      <Link className="btn btn--ghost" href={secondaryHref} prefetch={false}>See Plans &amp; Pricing</Link>
    </p>
  );
}

export default function Home() {
  return (
    <>
      <PageSchema page="home" faqs={FAQS} />

      {/* 1. Hero — poster is the first paint; the film fades in once it is playing. */}
      <section className="hero hero--fit"><div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">Website plans for local businesses</p>
          <h1><HL text="A Website Built to Bring In More Calls" mark="More Calls" /></h1>
          <ul className="ticks">
            <li>
              <span className="tick__mark" aria-hidden="true">✓</span>
              <span className="tick__copy">
                <span><b>See your homepage free</b> – no card</span>
                <span>and no obligation before you pay</span>
              </span>
            </li>
            <li>
              <span className="tick__mark" aria-hidden="true">✓</span>
              <span className="tick__copy">
                <span><b>Catch the calls you miss</b> – automatic</span>
                <span>text-back and follow-up after every job</span>
              </span>
            </li>
            <li>
              <span className="tick__mark" aria-hidden="true">✓</span>
              <span className="tick__copy">
                <span><b>Build your Google reputation</b> – review</span>
                <span>requests sent for you, not left to chance</span>
              </span>
            </li>
          </ul>
          <div className="hero__btns">
            <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
            <Link className="btn btn--ghost" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
          </div>
          <TrustStrip className="hero__trust" />
          <p className="hero__call muted small">
            Prefer to talk?{" "}
            <Link className="link-btn" href="/strategy-call" prefetch={false}>Book a call</Link>
            {" · "}
            <a className="link-btn" href={telHref(SITE.phone)}>{SITE.phone}</a>
          </p>
        </div>
        <HeroFilm />
      </div></section>

      {/* 2. What you get */}
      <Section tint>
        <MediaSplit image="homepage" alt="Contractor showing a trade website on a laptop and phone">
          <h2><HL text="What You Get With a Kinexis Website Plan" mark="Website Plan" /></h2>
          <p>A website plan built for local service businesses: a fast site, practical SEO structure, and follow-up that keeps working when you are on a job. Plans start at $97/mo.</p>
        </MediaSplit>
        <div className="grid grid--3">
          <IconCard title={<>A Website That<br />Brings In More<br />Calls</>} iconAlt="A Website That Brings In More Calls" text="Your site loads quickly, explains your services, and gives people a quick way to call or send job details." icon="better-design" />
          <IconCard title={<>Follow-Up That<br />Works While You’re<br />On The Job</>} iconAlt="Follow-Up That Works While You’re On The Job" text="Missed callers get a text, happy customers get a review request, and every new lead is tracked for you." icon="better-follow-up" />
          <IconCard title={<>Simple Pricing<br />With Everything<br />Up Front</>} iconAlt="Simple Pricing With Everything Up Front" text="Choose from four plans starting at $97/mo, with a free homepage preview, $0 down, and month-to-month billing." icon="better-pricing" />
        </div>
        <SectionCta />
      </Section>

      {/* 3. Portfolio */}
      <Section>
        <MediaSplit image="web-design" reverse alt="Website design on a desktop monitor and a phone">
          <h2><HL text="Website Templates Built for Your Trade" mark="Your Trade" /></h2>
          <p className="muted">Pick a design that fits the work you do. We’ll customize it for your business, services, and service area. Hover to preview, then open the full template.</p>
        </MediaSplit>
        <div className="portfolio portfolio--home"><Shots n={8} mode="link" /></div>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
          <Link className="btn btn--ghost" href="/portfolio" prefetch={false}>Browse website templates</Link>
        </p>
      </Section>

      {/* 4. Comparison */}
      <Section tint>
        <h2 className="center"><HL text="Why Business Owners Choose Kinexis Over Freelancers and Agencies" mark="Over Freelancers and Agencies" /></h2>
        <p className="center muted">A clearer plan than hiring a freelancer or a full web design agency for a small business.</p>
        <Compare />
        <p className="center muted small">Typical offerings; individual providers vary.</p>
        <SectionCta />
      </Section>

      {/* 5. Lead System — cobalt feature band; art + steps tell one story */}
      <Section band="lead">
        <div className="lead-feature">
          <div className="lead-feature__copy">
            <p className="eyebrow">Included on Lead System and Plus</p>
            <h2><HL text="Missed-Call Text-Back and Google Review Requests" mark="Google Review Requests" /></h2>
            <p>When you miss a call, text-back keeps the lead warm. After the job, a Google review request goes out with a direct link to your profile.</p>
            <p className="btn-row">
              <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
              <Link className="btn btn--light" href="/pricing#lead-system" prefetch={false}>See the Lead System</Link>
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

      {/* 6. Includes — checklist sheet is the visual; no duplicate hero art */}
      <Section tint>
        <div className="section-head">
          <p className="eyebrow">Built into every plan</p>
          <h2 className="center"><HL text="What Every Kinexis Website Includes" mark="Kinexis Website" /></h2>
          <p className="center muted">The essentials for looking credible, getting found, and turning visits into calls—with hosting and updates handled for you.</p>
        </div>
        <ReasonBoard />
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
          <Link className="btn btn--ghost" href="/web-design" prefetch={false}>Website design details</Link>
          <Link className="btn btn--ghost" href="/seo-services" prefetch={false}>SEO services</Link>
        </p>
      </Section>

      {/* 7. Trades — short featured list; full directory lives on /industries */}
      <Section>
        <div className="trades-feature">
          <div className="trades-feature__copy">
            <h2><HL text="Built for Local Service Businesses" mark="Local Service Businesses" /></h2>
            <p className="muted">Plumbing, HVAC, roofing, and more — if customers search for what you do and call when they need help, we have you covered. Don’t see your trade? You’re still included.</p>
            <p className="btn-row">
              <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
              <Link className="btn btn--ghost" href="/industries" prefetch={false}>Browse industry websites</Link>
            </p>
          </div>
          <SectionGraphic
            name="built-for-your-trade"
            alt="A contractor website surrounded by tools and materials from multiple home-service trades"
            className="home-section-art--trades"
          />
        </div>
        <IndustryGrid
          layout="index"
          limit={5}
          moreHref="/industries"
          moreLabel="& more"
          moreMeta="Any local business — if customers call you, we can help."
        />
      </Section>

      {/* 8. Plans */}
      <Section id="plans">
        <PlanOffer />
      </Section>

      {/* 9. Process */}
      <Section>
        <h2 className="center"><HL text="From Free Preview to Launch" mark="to Launch" /></h2>
        <p className="center muted">See the homepage first. If it feels right, choose a plan and we’ll map out the launch in writing.</p>
        <Stepper steps={STEPS} />
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
          <Link className="btn btn--ghost" href="/about" prefetch={false}>See our full process</Link>
        </p>
      </Section>

      {/* 10. Guarantee — final offer block above FAQs */}
      <Section tint>
        <h2 className="center"><HL text="60-Day Lead Guarantee" mark="Lead Guarantee" /></h2>
        <p className="center muted">Lead System and Plus include a written lead guarantee. If you get zero tracked leads in your first 60 days live, we waive the 3rd and 4th monthly charges.</p>
        <p className="center btn-row spaced">
          <OpenDialog id="guarantee" className="btn btn--ghost">Read the guarantee details</OpenDialog>
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
        </p>
        <TrustStrip className="center" />
      </Section>

      {/* 11. FAQ */}
      <Section narrow>
        <h2 className="center"><HL text="Frequently Asked Questions" mark="Questions" /></h2>
        <Faq items={FAQS} />
        <p className="center"><Link className="btn btn--ghost" href="/faqs" prefetch={false}>More website and pricing FAQs</Link></p>
      </Section>
    </>
  );
}
