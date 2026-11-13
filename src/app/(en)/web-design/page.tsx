import Link from "next/link";
import { WEB_FAQS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import CostGuides from "@/components/CostGuides";
import DesignProcess from "@/components/DesignProcess";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, Faq, HL, IconCard, MediaSplit, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("web-design");

export default function Page() {
  return (
    <>
      <PageSchema page="web-design" faqs={WEB_FAQS} />
      <PageHero
        eyebrow="Website Design"
        h1="Contractor Website Design You Can See Before You Commit"
        mark="Before You Commit"
        sub="Contractor website design from $97/mo, $0 down. Share a look you like—or send your own ideas—and we’ll prepare a free homepage preview in 2 business days. No card required."
        image="web-design"
        imageAlt="Website design on a desktop monitor and a phone"
      />

      <Section>
        <h2 className="center"><HL text="How Website Design Works Here" mark="Works Here" /></h2>
        <p className="center muted">A clear path from first ideas to a homepage you can review—then a full site when you’re ready.</p>
        <DesignProcess />
      </Section>

      <Section tint>
        <h2 className="center"><HL text="What Every Contractor Website Needs" mark="Website Needs" /></h2>
        <p className="center muted">These are the patterns that get the phone to ring—written for trades, not generic small-business templates.</p>
        <div className="grid grid--3">
          <IconCard title="Phone on the first screen" text="Name the work, the service area, and a tap-to-call number above the fold on mobile. Callers should not hunt the footer." icon="visible-phone-number" />
          <IconCard title="One page per job" text="Leak repair is not a remodel. Repair is not replacement. Separate pages keep searchers and callers on the right path." icon="separate-service-pages" />
          <IconCard title="Honest service area" text="List the cities you actually crew. Skip doorway pages that only swap the town name." icon="location" />
          <IconCard title="Real photos" text="Truck, crew, and finished jobs beat stock tradespeople. If photos are still coming, the preview can start without them." icon="gallery" />
          <IconCard title="Reviews you can trust" text="Show proof from real jobs, and on Lead System or Plus send a Google review request after the work is done." icon="after-every-job" />
          <IconCard title="Short form" text="Name, phone, and job type are enough for a first quote request. Long forms lose driveway callers." icon="short-estimate-form" />
        </div>
        <p className="center spaced">
          Full walkthrough:{" "}
          <Link href="/blog/web-design-for-contractors" prefetch={false}>contractor website checklist</Link>.
        </p>
      </Section>

      <Section>
        <h2 className="center"><HL text="What To Send Us" mark="Send Us" /></h2>
        <p className="center muted">You don’t need a finished brand kit. Send what you have and we’ll fill in the rest for the preview.</p>
        <div className="grid grid--3">
          <IconCard title="Design direction" text="Examples from our portfolio, or screenshots of sites you like. A few references set the tone." icon="preview" />
          <IconCard title="Logo and brand basics" text="Your logo if you have one, the business name, and any colors you already use on trucks, shirts, or cards." icon="built-for-your-trade" />
          <IconCard title="Photos (optional)" text="Real job photos, your truck, or your crew. If you’re still gathering them, the preview can start without them." icon="better-design" />
        </div>
      </Section>

      <Section tint>
        <MediaSplit image="process" alt="Design process preview for a service business website">
          <h2><HL text="Review The Homepage First" mark="Homepage First" /></h2>
          <p>We prepare a homepage concept for your business so you can judge the layout, wording, and call-to-action before paying.</p>
          <p>Request changes until it feels right. When you’re ready, choose Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497—and we finish the full site.</p>
          <p className="btn-row spaced">
            <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
            <Link className="btn btn--ghost" href="/portfolio" prefetch={false}>View the Portfolio</Link>
          </p>
        </MediaSplit>
      </Section>

      <Section>
        <h2 className="center"><HL text="Websites by Trade" mark="by Trade" /></h2>
        <p className="center muted">Each trade page owns its “website design” query. Use these anchors when you already know the work you sell.</p>
        <CostGuides variant="design" />
      </Section>

      <Section tint narrow>
        <h2 className="center"><HL text="Plans From $97/mo" mark="$97/mo" /></h2>
        <p>Service businesses anywhere in the United States can choose Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497. Monthly plans are $0 down, month-to-month, cancel anytime, with the price locked 24 months.</p>
        <p>The wording is tailored to your trade and service area. Ongoing SEO is scoped separately after the site is built.</p>
        <p className="center btn-row spaced">
          <Link className="btn btn--primary" href="/pricing" prefetch={false}>See Plans &amp; Pricing</Link>
          <Link className="btn btn--ghost" href="/portfolio" prefetch={false}>View the Portfolio</Link>
        </p>
      </Section>

      <Section narrow>
        <h2 className="center"><HL text="Questions About Your Website" mark="Your Website" /></h2>
        <Faq items={WEB_FAQS} />
      </Section>

      <CtaBand
        h="Ready To See Your Homepage?"
        mark="Your Homepage"
        sub="Share your business, a design direction, and whatever brand assets you have. We’ll prepare your free homepage preview—no card required."
        btn="Get My Free Preview"
        href="/contact"
      />
    </>
  );
}
