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
        h1="Website Design for Service Businesses Nationwide"
        mark="Nationwide"
        sub="Built for plumbers, HVAC companies, electricians, roofers, and the other trades that live on the phone. You see a homepage before you pay."
        image="web-design"
        imageAlt="Website design on a desktop monitor and a phone"
      />
      <Section>
        <h2 className="center"><HL text="What the Website Is For" mark="Website Is For" /></h2>
        <div className="grid grid--3">
          <IconCard title="The jobs you want" text="Separate pages for the calls that pay. A leak and a remodel do not belong on the same screen." icon="built-for-your-trade" />
          <IconCard title="A way to reach you" text="The number stays easy to tap. Quote forms stay short. Missed-call text-back is available on Lead System and Plus." icon="made-for-calls" />
          <IconCard title="Readable by Google" text="Clear titles, headings, fast pages, and a sitemap. The site is ready to be found in any state you serve." icon="search-optimized" />
          <IconCard title="Fast on a phone" text="Most of these searches happen in a driveway or a kitchen. The page has to load and show the next step." icon="fast-and-secure" />
          <IconCard title="Your service area" text="One honest page for the cities you cover. Not a stack of city pages that all say the same thing." icon="location" />
          <IconCard title="Preview first" text="We build a homepage for your trade before any card is charged. You approve it, then pick a plan." icon="preview" />
        </div>
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="The Same Offer in Every State" mark="Every State" /></h2>
        <p>Kinexis Digital is not a Houston shop with a national slogan. Service businesses anywhere in the United States can hire the same four plans: Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497.</p>
        <p>The copy changes with the trade. The search setup does not change with the ZIP code. Ongoing SEO, if you want it, is scoped after the site is built.</p>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
          <Link className="btn btn--ghost" href="/portfolio" prefetch={false}>View the Portfolio</Link>
        </p>
      </Section>
      <Section>
        <h2 className="center"><HL text="Pick the Trade the Site Should Sound Like" mark="Sound Like" /></h2>
        <IndustryGrid layout="index" />
      </Section>
      <Section narrow>
        <h2 className="center"><HL text="Website Design Questions" mark="Questions" /></h2>
        <Faq items={WEB_FAQS} />
      </Section>
      <CtaBand h="See a Homepage Before You Pay" mark="Before You Pay" sub="Tell us the trade and we will show you a preview. No card and no obligation." btn="Get a Free Audit" href="/audit" />
    </>
  );
}
