import Link from "next/link";
import { INDUSTRIES } from "@/data/industries";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, HL, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";
import IndustryGrid from "@/components/IndustryGrid";

export const metadata = pageMetadata("industries");

export default function Page() {
  return (
    <>
      <PageSchema page="industries" items={INDUSTRIES.map((industry) => ({ name: industry.name, path: `/industries/${industry.slug}` }))} />
      <PageHero
        eyebrow="Industries"
        h1="A Website That Fits Your Trade"
        mark="Your Trade"
        sub="Choose your trade to see how the site can cover its common jobs, useful pages, and day-to-day follow-up."
      >
        <p className="btn-row">
          <Link className="btn btn--primary" href="/audit" prefetch={false}>Get a Free Audit</Link>
          <Link className="btn btn--ghost" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
        </p>
      </PageHero>
      <Section>
        <h2 className="center"><HL text="Find The Work You Do" mark="Work You Do" /></h2>
        <p className="center muted">The four plans stay the same. The pages and wording change to match the calls your kind of business actually receives.</p>
        <IndustryGrid />
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="What Stays The Same In Every Plan" mark="Every Plan" /></h2>
        <p>You see a free homepage preview first, with no card and no obligation. Once it is approved, choose Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497.</p>
        <p>Lead System and Plus include Google review requests after the job. Missed-call text-back is an optional add-on on those plans. Every site is fast and organized so Google can read it. Ongoing SEO is quoted separately.</p>
      </Section>
      <CtaBand h="See How Your Trade Could Look" mark="Your Trade" sub="We’ll prepare the homepage before you pay. No card and no obligation." btn="Get a Free Audit" href="/audit" />
    </>
  );
}
