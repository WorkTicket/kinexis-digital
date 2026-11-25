import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { FAQS, STEPS } from "@/lib/content";
import Stepper from "@/components/Stepper";
import { PageSchema } from "@/components/JsonLd";
import IndustryGrid from "@/components/IndustryGrid";
import CostGuides from "@/components/CostGuides";
import { ReasonBoard, ReviewRail } from "@/components/HomeBands";
import PlanOffer from "@/components/PlanOffer";
import PreviewBar from "@/components/PreviewBar";
import ReviewsSection from "@/components/ReviewsSection";
import TrustStrip from "@/components/TrustStrip";
import PlanCompare from "@/components/PlanCompare";
import { HomeCaseStudyShowcase } from "@/components/HomeCaseStudyShowcase";
import { Compare, Faq, HL, IconCard, MediaSplit, Section } from "@/components/ui";
import HeroFilm from "@/components/HeroFilm";
import { CampaignHeroArtwork, HomeSectionArtwork } from "@/components/CampaignArtwork";

export const metadata = pageMetadata("home");
// Homepage is curated (no live review APIs). Keep a long ISR window so the
// OpenNext KV cache can serve HTML without rebooting Next on every hit.
export const revalidate = 86400;

export default async function Home() {
  return (
    <>
      <PageSchema page="home" faqs={FAQS} />

      <div className="home-page">
        {/* 1. Hero — poster is the first paint; the film fades in once it is playing. */}
      <section className="hero hero--fit"><div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">Websites for contractors and home service businesses</p>
          <h1 className="home-hero__title"><HL text={"See Your New Contractor\u00A0Website Before You Pay"} mark="Before You Pay" phrase /></h1>
          <p className="hero__sub">Get a free homepage preview in 2 business days, with no card or obligation. Lead System and Plus include Google review requests after jobs and offer optional missed-call text-back.</p>
          <ul className="ticks">
            <li>
              <span className="tick__mark" aria-hidden="true">✓</span>
              <span className="tick__copy">
                <span><b>Free homepage preview</b> – No card and</span>
                <span>no obligation before choosing a plan</span>
              </span>
            </li>
            <li>
              <span className="tick__mark" aria-hidden="true">✓</span>
              <span className="tick__copy">
                <span><b>Optional missed-call auto text-back</b> – On</span>
                <span>Lead System and Plus, or as a $97/mo add-on</span>
              </span>
            </li>
            <li>
              <span className="tick__mark" aria-hidden="true">✓</span>
              <span className="tick__copy">
                <span><b>Google review requests built in</b> – Included</span>
                <span>with Lead System and Plus after jobs</span>
              </span>
            </li>
          </ul>
          <div className="hero__btns">
            <Link className="btn btn--primary btn--lg" href="/contact" prefetch={false}>Get My Free Preview</Link>
          </div>
          <div className="hero__reassure">
            <TrustStrip className="hero__trust" />
          </div>
        </div>
        <HeroFilm />
      </div></section>
      <PreviewBar />

      {/* 2. Client reviews — real quotes right after the hero */}
      <ReviewsSection
        variant="home"
        eyebrow="Client reviews"
        title="What Local Business Owners Say"
        mark="Business Owners Say"
        sub="Real feedback from owners who launched with a Kinexis website plan."
        ctaLabel="Read More Reviews"
        ctaHref="/reviews"
      />

      {/* 3. What you get */}
      <Section tint>
        <MediaSplit
          className="media-split--plan"
          art={<CampaignHeroArtwork name="homepage-hero" alt="A contractor viewing a website plan on a laptop and phone" fallback="/assets/heroes/01-homepage-640.webp" />}
        >
          <h2><HL text="What You Get With a Kinexis Website Plan" mark="Website Plan" /></h2>
          <p>A website plan built for local service businesses: a fast site, practical SEO structure, and follow-up that keeps working when you are on a job. Plans start at $97/mo.</p>
        </MediaSplit>
        <div className="grid grid--3">
          <IconCard title="A Website That Brings In More Calls" iconAlt="A Website That Brings In More Calls" text="Your site loads quickly, explains your services clearly, and gives people a fast way to call or send the job details you need." icon="better-design" />
          <IconCard title="Follow-Up That Works While You’re On The Job" iconAlt="Follow-Up That Works While You’re On The Job" text="Lead System and Plus track calls and forms, send Google review requests after jobs, and offer optional missed-call text-back." icon="better-follow-up" />
          <IconCard title="Simple Pricing With Everything Up Front" iconAlt="Simple Pricing With Everything Up Front" text="Four plans from $97/mo with a free homepage preview, $0 down, month-to-month billing, and clear terms listed before you start." icon="better-pricing" />
        </div>
        <p className="center btn-row spaced"><Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link></p>
        <p className="center"><Link href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link></p>
      </Section>

      {/* 4. Portfolio */}
      <Section tint>
        <div className="home-case-studies__heading">
          <p className="eyebrow">Selected Work</p>
          <h2>Websites We’ve Built for Contractors</h2>
          <p className="muted">Explore two live client websites. Design concepts by trade live in the full portfolio.</p>
        </div>
        <HomeCaseStudyShowcase />
        <p className="home-case-studies__footer">
          <Link href="/portfolio" prefetch={false}>View Full Portfolio <span aria-hidden="true">→</span></Link>
        </p>
      </Section>

      {/* 5. Trades — qualification before differentiation and pricing */}
      <Section tint>
        <div className="trades-feature">
          <div className="trades-feature__copy">
            <h2><HL text="Built for Local Service Businesses" mark="Local Service Businesses" /></h2>
            <p className="muted">Plumbing, HVAC, roofing, and more—if customers search for your services and call when they need help, we can help you make the next step clear. Don’t see your industry? Tell us what you do; we also work with other local service businesses.</p>
            <p><Link href="/industries" prefetch={false}>Browse industry websites</Link></p>
          </div>
          <HomeSectionArtwork
            name="homepage-built-for-your-trade"
            alt="A contractor website surrounded by tools and materials from multiple home-service businesses"
            className="home-section-art--trades"
          />
        </div>
        <IndustryGrid
          layout="index"
          columns={4}
          limit={7}
          moreHref="/industries"
          moreLabel="& more"
          moreMeta="Any local business — if customers call you, we can help."
          moreLayout="cell"
        />
        <CostGuides className="cost-guides--home" />
      </Section>

      {/* 5b. Positioning vs freelancers and agencies */}
      <Section>
        <div className="section-head">
          <h2 className="center"><HL text="Why Business Owners Choose Kinexis" mark="Choose Kinexis" /></h2>
          <p className="center muted">What you get with us that most freelancers and agencies do not package the same way.</p>
        </div>
        <Compare />
        <p className="center muted small">Typical offerings; individual providers vary.</p>
      </Section>

      {/* 6. Plans offer, then comparison detail (one flow — no duplicate recommended card) */}
      <Section id="plans">
        <PlanOffer />
        <PlanCompare />
      </Section>

      {/* 7. Lead System — cobalt feature band; art + steps tell one story */}
      <Section band="lead">
        <div className="lead-feature">
          <div className="lead-feature__copy">
            <p className="eyebrow">Available on Lead System and Plus</p>
            <h2><HL text="Google Review Requests and Optional Missed-Call Text-Back" mark="Google Review Requests" /></h2>
            <p>Lead System and Plus include Google review requests after completed jobs. Missed-call text-back is optional and, once carrier-approved, gives a caller a way to reply while you’re working.</p>
            <p className="btn-row">
              <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
              <Link className="btn btn--light" href="/pricing#lead-system" prefetch={false}>See the Lead System</Link>
            </p>
          </div>
          <HomeSectionArtwork
            name="review-follow-up"
            alt="A completed job leading to a text message and a Google review"
            className="home-section-art--reviews"
          />
        </div>
        <ReviewRail />
      </Section>

      {/* 8. Includes — checklist sheet is the visual; no duplicate hero art */}
      <Section tint>
        <div className="section-head">
          <p className="eyebrow">Built into every plan</p>
          <h2 className="center"><HL text="What Every Kinexis Website Includes" mark="Kinexis Website" /></h2>
          <p className="center muted">The essentials for looking credible, getting found, and turning visits into calls—with hosting and updates handled for you.</p>
        </div>
        <ReasonBoard />
      </Section>

      {/* 10. Process */}
      <Section tint>
        <h2 className="center"><HL text="From Free Preview to Launch" mark="to Launch" /></h2>
        <p className="center muted">Review the homepage first. If the design works for you, choose a plan and we’ll confirm the launch details in writing.</p>
        <Stepper steps={STEPS} />
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
        </p>
        <p className="center"><Link href="/about" prefetch={false}>See our full process</Link></p>
      </Section>

      {/* 11. Guarantee — final offer block above FAQs */}
      <Section>
        <h2 className="center"><HL text="60-Day Lead Guarantee" mark="Lead Guarantee" /></h2>
        <p className="center muted">Lead System and Plus only: zero tracked leads in the first 60 days live waives the 3rd and 4th charges. A tracked lead is a 30+ second call, a missed caller who replies to text-back, or a real quote form; spam, wrong numbers, applicants, vendors, and existing customers do not count. The account must be in good standing. No coverage if your changes prevent tracking or you pause/cancel before day 60. One per business; Own It is excluded.</p>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
        </p>
        <TrustStrip className="center" />
      </Section>

      {/* 12. FAQ — global SiteAudit band follows after main */}
      <Section narrow>
        <h2 className="center">Frequently Asked Questions</h2>
        <Faq items={FAQS} />
        <p className="center"><Link href="/faqs" prefetch={false}>More website and pricing FAQs</Link></p>
      </Section>
      </div>
    </>
  );
}
