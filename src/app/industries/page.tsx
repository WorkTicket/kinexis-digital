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
        h1="Websites Built for the Trades You Run"
        mark="Trades You Run"
        sub="Built for service businesses across the United States. Each page covers the jobs, the pages, and the follow-up that trade actually needs."
      >
        <p className="btn-row">
          <Link className="btn btn--primary" href="/audit" prefetch={false}>Get a Free Audit</Link>
          <Link className="btn btn--ghost" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
        </p>
      </PageHero>
      <Section>
        <h2 className="center"><HL text="Pick Your Trade" mark="Your Trade" /></h2>
        <p className="center muted">Same four plans on every page. The site itself is written for the calls that trade gets, not a generic contractor template with the noun swapped.</p>
        <IndustryGrid />
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="What Every Trade Site Includes" mark="Every Trade Site" /></h2>
        <p>A free homepage preview comes first, with no card and no obligation. After you approve it, the full site is one of four plans: Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497.</p>
        <p>Lead System and Plus add missed-call text-back and a Google review request after the job. The pages are built fast and structured so Google can read them. Ongoing SEO is quoted separately. It is not bundled into the plans.</p>
      </Section>
      <CtaBand h="See a Homepage for Your Trade" mark="Your Trade" sub="We will build a preview before you pay. No card and no obligation." btn="Get a Free Audit" href="/audit" />
    </>
  );
}
