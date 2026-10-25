import Link from "next/link";
import { WEB_FAQS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import IndustryGrid from "@/components/IndustryGrid";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, Faq, HL, IconCard, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("web-design");

export default function Page() {
  return (
    <>
      <PageSchema page="web-design" faqs={WEB_FAQS} />
      <PageHero
        eyebrow="Website Design"
        h1="Websites Built Around The Work You Do"
        mark="The Work You Do"
        sub="For plumbers, HVAC companies, electricians, roofers, and other trades where the phone matters. You see the homepage before you pay."
        image="web-design"
        imageAlt="Website design on a desktop monitor and a phone"
      />
      <Section>
        <h2 className="center"><HL text="What Your Site Needs To Do" mark="Needs To Do" /></h2>
        <div className="grid grid--3">
          <IconCard title="Show The Work You Want" text="Different services get their own pages, so a repair call and a larger project don’t compete for attention." icon="built-for-your-trade" />
          <IconCard title="Make Contact Simple" text="Your number is easy to tap and quote forms stay short. Lead System and Plus can also text missed callers." icon="made-for-calls" />
          <IconCard title="Give Google A Clear Structure" text="Useful titles, organized headings, fast pages, and a sitemap help search engines understand what you offer." icon="search-optimized" />
          <IconCard title="Load Quickly On A Phone" text="Customers often search from a driveway or kitchen. The page needs to open quickly and show them what to do next." icon="fast-and-secure" />
          <IconCard title="Be Honest About Your Area" text="We list the cities you really cover on one useful page instead of making thin copies for every town." icon="location" />
          <IconCard title="Review The Homepage First" text="We prepare a homepage for your trade before charging a card. You review it, request changes, and then choose a plan." icon="preview" />
        </div>
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="The Same Four Plans Nationwide" mark="Plans Nationwide" /></h2>
        <p>Service businesses anywhere in the United States can choose Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497.</p>
        <p>The wording is tailored to your trade and service area. The technical search setup stays consistent, and any ongoing SEO is scoped separately after the site is built.</p>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
          <Link className="btn btn--ghost" href="/portfolio" prefetch={false}>View the Portfolio</Link>
        </p>
      </Section>
      <Section>
        <h2 className="center"><HL text="Choose Your Trade" mark="Your Trade" /></h2>
        <IndustryGrid layout="index" />
      </Section>
      <Section narrow>
        <h2 className="center"><HL text="Questions About Your Website" mark="Your Website" /></h2>
        <Faq items={WEB_FAQS} />
      </Section>
      <CtaBand h="See The Homepage Before You Decide" mark="Before You Decide" sub="Tell us about your trade and we’ll prepare a preview. No card and no obligation." btn="Get a Free Audit" href="/audit" />
    </>
  );
}
