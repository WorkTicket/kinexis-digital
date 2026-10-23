import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { FAQS, STEPS } from "@/lib/content";
import { OpenDialog } from "@/components/DialogHost";
import Stepper from "@/components/Stepper";
import { PageSchema } from "@/components/JsonLd";
import IndustryGrid from "@/components/IndustryGrid";
import { ReasonBoard, ReviewRail } from "@/components/HomeBands";
import PlanOffer from "@/components/PlanOffer";
import { Compare, Faq, HL, IconCard, MediaSplit, Section, Shots } from "@/components/ui";
import HeroFilm from "@/components/HeroFilm";

export const metadata = pageMetadata("home");

export default function Home() {
  return (
    <>
      <PageSchema page="home" faqs={FAQS} />

      {/* 1. Hero — poster is the first paint; the film fades in once it is playing. */}
      <section className="hero hero--fit"><div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">Websites and SEO, Nationwide</p>
          <h1><HL text="Websites That Turn Searches Into Booked Work" mark="Booked Work" /></h1>
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
            <Link className="btn btn--primary btn--lg" href="/audit" prefetch={false}>Get a Free Audit</Link>
            <Link className="btn btn--ghost btn--lg" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
            <OpenDialog id="guarantee" className="link-btn">60-Day Lead Guarantee</OpenDialog>
          </div>
        </div>
        <HeroFilm />
      </div></section>

      {/* 2. Helps you scale: artwork sits here so the hero can keep the video */}
      <Section tint>
        <MediaSplit image="homepage" alt="Contractor showing a trade website on a laptop and phone">
          <h2><HL text="What You Get With Kinexis" mark="With Kinexis" /></h2>
          <p>A fast website, practical SEO, and follow-up that keeps working when you’re busy. Plans start at $97/mo.</p>
        </MediaSplit>
        <div className="grid grid--3">
          <IconCard title={<>A Website That<br />Brings In More<br />Calls</>} iconAlt="A Website That Brings In More Calls" text="Your site loads quickly, explains your services, and gives people a quick way to call or send job details." icon="better-design" />
          <IconCard title={<>Follow-Up That<br />Works While You’re<br />On The Job</>} iconAlt="Follow-Up That Works While You’re On The Job" text="Missed callers get a text, happy customers get a review request, and every new lead is tracked for you." icon="better-follow-up" />
          <IconCard title={<>Simple Pricing<br />With Everything<br />Up Front</>} iconAlt="Simple Pricing With Everything Up Front" text="Choose from four plans starting at $97/mo, with a free homepage preview, $0 down, and a 3-month minimum." icon="better-pricing" />
        </div>
      </Section>

      {/* 3. Portfolio: 8 scrollable frames */}
      <Section>
        <MediaSplit image="web-design" reverse alt="Website design on a desktop monitor and a phone">
          <h2><HL text="Websites Made For Your Trade" mark="Your Trade" /></h2>
          <p className="muted">These are concept designs. Hover to preview one, then click to see the full project.</p>
        </MediaSplit>
        <div className="portfolio portfolio--home"><Shots n={8} mode="link" /></div>
        <p className="center"><Link className="btn btn--primary" href="/portfolio" prefetch={false}>View Our Portfolio</Link></p>
      </Section>

      {/* 4. Comparison */}
      <Section tint>
        <h2 className="center"><HL text="Why Business Owners Choose Kinexis" mark="Choose Kinexis" /></h2>
        <Compare />
        <p className="center muted small">Typical offerings; individual providers vary.</p>
      </Section>

      {/* 5. Google reviews, handled */}
      <Section>
        <p className="eyebrow center">Google reviews, handled</p>
        <h2 className="center"><HL text="Ask Every Happy Customer. Automatically." mark="Automatically" /></h2>
        <p className="center muted">Part of the Lead System. After every job, a review request goes out by text with a direct link to your Google page.</p>
        <ReviewRail />
        <p className="center btn-row spaced reviews-ctas"><Link className="btn btn--primary" href="/pricing" prefetch={false}>See the Lead System</Link><Link className="btn btn--ghost" href="/contact" prefetch={false}>Ask a Question</Link></p>
      </Section>

      {/* 6. Four reasons */}
      <Section tint>
        <h2 className="center"><HL text="What Every Kinexis Site Includes" mark="Kinexis Site" /></h2>
        <ReasonBoard />
        <p className="center btn-row spaced"><Link className="btn btn--primary" href="/web-design" prefetch={false}>See Website Design</Link><Link className="btn btn--ghost" href="/seo-services" prefetch={false}>Explore SEO Services</Link></p>
      </Section>

      {/* 7. Trades */}
      <Section>
        <h2 className="center"><HL text="Built for the Trade You Actually Run" mark="Trade You Actually Run" /></h2>
        <p className="center muted">The plans are the same. The site is written for the calls that trade gets, from a no-cool emergency to a kitchen consult.</p>
        <IndustryGrid layout="index" />
        <p className="center btn-row spaced"><Link className="btn btn--ghost" href="/industries" prefetch={false}>Browse Industries</Link></p>
      </Section>

      {/* 8. Four plans — same card language as the rest of the page */}
      <Section id="plans">
        <PlanOffer />
      </Section>

      {/* 8. Process stepper */}
      <Section tint>
        <h2 className="center"><HL text="From Free Preview To Launch" mark="To Launch" /></h2>
        <p className="center muted">See the homepage first. If it feels right, choose a plan and we’ll map out the launch in writing.</p>
        <Stepper steps={STEPS} />
        <p className="center btn-row spaced"><Link className="btn btn--ghost" href="/about" prefetch={false}>See Our Full Process</Link></p>
      </Section>

      {/* 9. FAQ */}
      <Section narrow>
        <h2 className="center"><HL text="Frequently Asked Questions" mark="Questions" /></h2>
        <Faq items={FAQS} />
      </Section>
    </>
  );
}
