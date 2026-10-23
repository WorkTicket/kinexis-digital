import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { FAQS, STEPS } from "@/lib/content";
import Stepper from "@/components/Stepper";
import { PageSchema } from "@/components/JsonLd";
import { Faq, HL, IconCard, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("about");

export default function Page() {
  return (
    <>
      <PageSchema page="about" faqs={[FAQS[5], FAQS[3], FAQS[4]]} />
      <PageHero
        h1="A Digital Marketing Agency for US Businesses"
        mark="US Businesses"
        sub="SEO, websites, missed-call text-back, and Google review requests for service businesses across the United States. Free homepage preview first."
        image="about"
        imageAlt="Laptop, website layout, and a notebook sketch of a homepage"
      />
      <section className="section"><div className="container two-col">
        <div>
          <h2><HL text="Who we work with" mark="work with" /></h2>
          <p>Kinexis Digital is a digital marketing agency for plumbing, HVAC, electrical, roofing, landscaping, and other service businesses across the United States. Customers find you on Google and call when something needs fixing. The site, the follow-up, and the reviews are built around that.</p>
          <p>Every plan starts with a homepage concept for your trade. You see the design before you pay, with no card and no obligation. After you approve it, we confirm what is included and your launch date in writing.</p>
          <Link className="btn btn--primary" href="/contact" prefetch={false}>Work With Us</Link>
        </div>
        <div>
          <h2><HL text="What you can expect" mark="can expect" /></h2>
          <ul className="ticks ticks--orange">
            <li><b>Four plans for your trade</b><span>Website, text-back, and review requests</span></li>
            <li><b>Hosting handled for you</b><span>SSL and small edits on the monthly plans</span></li>
            <li><b>A straight answer up front</b><span>We’ll tell you if a plan is a poor fit for you</span></li>
          </ul>
        </div>
      </div></section>
      <Section tint>
        <h2 className="center"><HL text="How We Work" mark="We Work" /></h2>
        <div className="grid grid--3">
          <IconCard title="See it first" text="The free homepage preview is the starting point. You can approve it, ask for changes, or walk away." icon="preview" />
          <IconCard title="Follow-up included" text="On Lead System and Plus, missed-call text-back and Google review requests go out after the job." icon="better-follow-up" />
          <IconCard title="Plain pricing" text="Website, Lead System, Plus, or Own It. The price and the minimum are on the pricing page before you start." icon="better-pricing" />
        </div>
      </Section>
      <Section>
        <h2 className="center"><HL text="From Preview to Launch" mark="to Launch" /></h2>
        <p className="center muted">Text-back starts after carrier approval, typically 10–15 days.</p>
        <Stepper steps={STEPS} />
      </Section>
      <Section tint narrow>
        <h2 className="center"><HL text="Process Questions" mark="Questions" /></h2>
        <Faq items={[FAQS[5], FAQS[3], FAQS[4]]} />
      </Section>
      <Section>
        <div className="center">
          <h2><HL text="Talk to us before you pay" mark="before you pay" /></h2>
          <p className="muted">Call, email, or send a message. We will answer plan questions before you commit.</p>
          <p><Link className="btn btn--primary" href="/contact" prefetch={false}>Contact Us</Link></p>
        </div>
      </Section>
    </>
  );
}
