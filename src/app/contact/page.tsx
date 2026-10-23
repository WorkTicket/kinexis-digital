import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Form, { LEAD_FIELDS } from "@/components/Form";
import { HL, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";
import IndustryAudit from "@/components/IndustryAudit";

export const metadata = pageMetadata("contact");

export default function Page() {
  return (
    <>
      <PageSchema page="contact" />
      <PageHero h1={<HL text="Let’s Get Started With Your New Website" mark="Your New Website" />} sub="Questions? Let’s talk about whether we’re a fit for your business." image="contact" imageAlt="Phone, envelope, and chat bubbles" />
      <Section>
        <div className="contact-grid">
          <div className="contact-form">
            <h2 className="card-title">Send a Message</h2>
            <p className="muted">Tell us about your business and goals; we’ll reply fast.</p>
            <p className="muted small">Include your phone number and service area so we can route your inquiry quickly.</p>
            <Form fields={LEAD_FIELDS} button="Let’s Chat!" fast />
            <p className="center" style={{ marginTop: "24px" }}><strong>Prefer to talk it through?</strong> <Link className="btn btn--primary" href="/strategy-call" prefetch={false}>Book a Strategy Call</Link></p>
          </div>
        </div>
      </Section>
      <IndustryAudit />
    </>
  );
}
