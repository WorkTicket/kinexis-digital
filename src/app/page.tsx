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
          <h1><HL text="Nationwide Websites That Turn Searches Into Booked Work" mark="Booked Work" /></h1>
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
          <h2><HL text="Kinexis Digital Helps You Scale Your Business" mark="Your Business" /></h2>
          <p>SEO, fast websites, and follow-up for service businesses across the United States. Four clear plans from $97/mo.</p>
        </MediaSplit>
        <div className="grid grid--3">
          <IconCard title="Better Design" text="Fast, modern websites you'll be proud to show customers, built around turning visitors into calls and quote requests." icon="better-design" />
          <IconCard title="Better Follow-Up" text="Missed-call text-back, review requests and lead tracking do the follow-up when you are on the job." icon="better-follow-up" />
          <IconCard title="Better Pricing" text="Four clear plans from $97/mo. Free homepage preview first, $0 down, and a 3-month minimum instead of a long contract." icon="better-pricing" />
        </div>
      </Section>

      {/* 3. Portfolio: 8 scrollable frames */}
      <Section>
        <MediaSplit image="web-design" reverse alt="Website design on a desktop monitor and a phone">
          <h2><HL text="We Build Great-Looking, High-Converting Websites. Let’s Build Yours Next!" mark="High-Converting" /></h2>
          <p className="muted">Hover to preview a site, click to open the project.</p>
        </MediaSplit>
        <div className="portfolio portfolio--home"><Shots n={8} mode="link" /></div>
        <p className="center"><Link className="btn btn--primary" href="/portfolio" prefetch={false}>View Our Portfolio</Link></p>
      </Section>

      {/* 4. Comparison */}
      <Section tint>
        <h2 className="center"><HL text="Don’t Settle for Either Service or Price… Get Both" mark="Get Both" /></h2>
        <Compare />
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
        <h2 className="center"><HL text="Four Reasons You’ll Love Working With Us" mark="You’ll Love" /></h2>
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
        <h2 className="center"><HL text="Working With Kinexis Digital Couldn’t Be Easier" mark="Couldn’t Be Easier" /></h2>
        <p className="center muted">Free preview first, then a clear launch plan and a 3-month minimum instead of a long contract.</p>
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
