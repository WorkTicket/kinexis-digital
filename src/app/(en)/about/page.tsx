import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { FAQS, STEPS } from "@/lib/content";
import ProcessFlow from "@/components/ProcessFlow";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, Faq, HL, IconCard, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("about");

export default function Page() {
  return (
    <>
      <PageSchema page="about" faqs={[FAQS[5], FAQS[3], FAQS[4]]} />
      <PageHero
        h1="A Small Team For Service Businesses Nationwide"
        mark="Service Businesses"
        sub="We build websites, improve search visibility, send Google review requests, and offer optional missed-call text-back for service businesses across the United States."
        image="about"
        imageAlt="Laptop, website layout, and a notebook sketch of a homepage"
      />
      <section className="section"><div className="container two-col">
        <div>
          <h2><HL text="Built for businesses that depend on the phone" mark="depend on the phone" /></h2>
          <p>Kinexis works with plumbers, HVAC companies, electricians, roofers, landscapers, and other service businesses across the United States. Your customers search when they need help, so the website and follow-up are designed around clear, useful next steps.</p>
          <p>We begin with a homepage concept for your business in 2 business days. You can review it without a card or obligation. If you approve it and send the content we need, the full site typically launches in 5 business days — confirmed in writing with your plan details.</p>
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Work With Us</Link>
        </div>
        <div>
          <h2><HL text="What stays straightforward" mark="straightforward" /></h2>
          <ul className="ticks ticks--orange">
            <li><b>Four clearly defined plans</b><span>Choose the website and follow-up you need</span></li>
            <li><b>The technical upkeep is covered</b><span>Monthly plans include hosting, SSL, and small edits</span></li>
            <li><b>Honest advice before you start</b><span>We’ll say so if a plan isn’t right for your business</span></li>
          </ul>
        </div>
      </div></section>
      <Section>
        <h2 className="center"><HL text="A Practical Way To Get Started" mark="Get Started" /></h2>
        <div className="grid grid--3">
          <IconCard title="Review A Homepage First" text="The free preview comes before payment. Approve it, request changes, or walk away with no charge." icon="preview" />
          <IconCard title="Choose Your Follow-Up" text="Lead System and Plus include Google review requests after completed jobs. Missed-call text-back is an optional add-on." icon="better-follow-up" />
          <IconCard title="Know The Terms Up Front" text="Price, cancel terms, and what’s included for Website, Lead System, Plus, and Own It are listed up front." icon="better-pricing" />
        </div>
      </Section>
      <Section tint>
        <h2 className="center"><HL text="How Your Site Gets Launched" mark="Gets Launched" /></h2>
        <p className="center muted">Optional text-back and review requests begin after carrier approval, which typically takes 10–15 days.</p>
        <ProcessFlow steps={STEPS} />
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="Questions Before You Begin" mark="Before You Begin" /></h2>
        <Faq items={[FAQS[5], FAQS[3], FAQS[4]]} />
      </Section>
      <CtaBand
        h="Ready To See Your Homepage?"
        mark="Your Homepage"
        sub="Start with a free preview. No card and no obligation — we’ll explain the plans before you commit."
        btn="Get My Free Preview"
        href="/contact"
      />
    </>
  );
}
