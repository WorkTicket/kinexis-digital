import Link from "next/link";
import { INDUSTRIES } from "@/data/industries";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, HL, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";
import IndustryGrid from "@/components/IndustryGrid";
import { HomeSectionArtwork } from "@/components/CampaignArtwork";

export const metadata = pageMetadata("industries");

export default function Page() {
  return (
    <>
      <PageSchema page="industries" items={INDUSTRIES.filter((industry) => industry.status === "live").map((industry) => ({ name: industry.name, path: `/industries/${industry.slug}` }))} />
      <PageHero
        image="industries"
        imageAlt="Websites designed for a range of local service industries"
        eyebrow="Industries"
        h1="A Website That Fits Your Business"
        mark="Your Business"
        sub="Choose your industry to see how the site can cover its common jobs, useful pages, and day-to-day follow-up."
      >
        <p className="btn-row">
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
          <Link className="btn btn--ghost" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
        </p>
      </PageHero>
      <Section tint>
        <div className="trades-feature">
          <div className="trades-feature__copy">
            <p className="eyebrow">Pick your trade</p>
            <h2><HL text="Find The Work You Do" mark="Work You Do" /></h2>
            <p className="muted">The four plans stay the same. The pages and wording change to match the calls your kind of business actually receives.</p>
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
          moreHref="/contact"
          moreLabel="& more"
          moreMeta="Any local business — if customers call you, we can help."
          moreLayout="cell"
        />
      </Section>
      <Section narrow>
        <div className="industry-plan-bridge">
          <p className="eyebrow">Same plans · Every trade</p>
          <h2 className="center"><HL text="What Stays The Same In Every Plan" mark="Every Plan" /></h2>
          <div className="industry-plan-bridge__body">
            <p>You see a free homepage preview first, with no card and no obligation. Once it is approved, choose Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497.</p>
            <p>Lead System and Plus include Google review requests after the job. Missed-call text-back is an optional add-on on those plans. Every site is fast and organized so Google can read it. Ongoing SEO is quoted separately.</p>
          </div>
          <p className="center btn-row">
            <Link className="btn btn--ghost" href="/pricing" prefetch={false}>Compare Plans</Link>
          </p>
        </div>
      </Section>
      <CtaBand h="See How Your Business Could Look" mark="Your Business" sub="We’ll prepare the homepage before you pay. No card and no obligation." btn="Get My Free Preview" href="/contact" />
    </>
  );
}
