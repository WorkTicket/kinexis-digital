import Link from "next/link";
import { DESIGN_PROCESS_STEPS, WEB_FAQS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import IndustryGrid from "@/components/IndustryGrid";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, Faq, HL, IconCard, MediaSplit, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("web-design");

export default function Page() {
  return (
    <>
      <PageSchema page="web-design" faqs={WEB_FAQS} />
      <PageHero
        eyebrow="Website Design"
        h1="See Your Homepage Design Before You Commit"
        mark="Before You Commit"
        sub="For plumbers, HVAC companies, electricians, roofers, and other service businesses. Share a look you like—or send your own ideas—and we’ll prepare a free homepage preview in 2 business days. No card required."
        image="web-design"
        imageAlt="Website design on a desktop monitor and a phone"
      />

      {/* Placeholder art: replace step visuals later — see docs/CURRENT-TASK.md */}
      <Section>
        <h2 className="center"><HL text="How Website Design Works Here" mark="Works Here" /></h2>
        <p className="center muted">A clear path from first ideas to a homepage you can review—then a full site when you’re ready.</p>
        <ol className="design-process">
          {DESIGN_PROCESS_STEPS.map((step, i) => (
            <li key={step.title}>
              <b aria-hidden="true">{i + 1}</b>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tint>
        <h2 className="center"><HL text="What To Send Us" mark="Send Us" /></h2>
        <p className="center muted">You don’t need a finished brand kit. Send what you have and we’ll fill in the rest for the preview.</p>
        <div className="grid grid--3">
          {/* Placeholder icons: swap for custom “what to send” art when ready */}
          <IconCard
            title="Design direction"
            text="Examples from our templates, portfolio, or screenshots of sites you like. A few references are enough to set the tone."
            icon="preview"
          />
          <IconCard
            title="Logo and brand basics"
            text="Your logo if you have one, business name, and any colors you already use on trucks, shirts, or cards."
            icon="built-for-your-trade"
          />
          <IconCard
            title="Photos (optional)"
            text="Real job photos, your truck, or your crew. If you’re still gathering them, we can start the preview without them."
            icon="better-design"
          />
        </div>
      </Section>

      {/* Placeholder art: reuse process hero until dedicated preview/revision art is added */}
      <Section>
        <MediaSplit image="process" alt="Design process preview for a service business website">
          <h2><HL text="Review The Homepage First" mark="Homepage First" /></h2>
          <p>We prepare a homepage concept for your trade so you can judge the layout, wording, and call-to-action before paying.</p>
          <p>Request changes until it feels right. When you’re ready, choose Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497—and we finish the full site.</p>
          <p className="btn-row spaced">
            <Link className="btn btn--primary" href="/contact" prefetch={false}>Get My Free Preview</Link>
            <Link className="btn btn--ghost" href="/portfolio" prefetch={false}>View the Portfolio</Link>
          </p>
        </MediaSplit>
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
        <IndustryGrid
          layout="index"
          moreHref="/industries"
          moreLabel="& more"
          moreMeta="Any local business — if customers call you, we can help."
        />
      </Section>

      <Section narrow>
        <h2 className="center"><HL text="Questions About Your Website" mark="Your Website" /></h2>
        <Faq items={WEB_FAQS} />
      </Section>

      <CtaBand
        h="Ready To See Your Homepage?"
        mark="Your Homepage"
        sub="Share your trade, a design direction, and whatever brand assets you have. We’ll prepare your free homepage preview—no card required."
        btn="Get My Free Preview"
        href="/contact"
      />
    </>
  );
}
