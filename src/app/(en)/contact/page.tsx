import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Form, { LEAD_FIELDS } from "@/components/Form";
import { HL, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";

export const metadata = pageMetadata("contact");

export default function Page() {
  return (
    <>
      <PageSchema page="contact" />
      <PageHero previewBar={false} h1={<HL text="Ready To See Your Homepage?" mark="Your Homepage" />} sub="Tell us about your business, and we’ll help you decide whether one of our plans makes sense." image="contact" imageAlt="Phone, envelope, and chat bubbles" />
      <Section>
        <div className="contact-grid">
          <div className="contact-form">
            <h2 className="card-title">Tell Us About Your Business</h2>
            <p className="muted">Share what you do and where you work—we use that to prepare a free homepage preview. No card required.</p>
            <Form
              fields={LEAD_FIELDS}
              button="Show Me My Free Homepage"
              note="No card required. We reply fast. 😊"
              fast
              fastText="No card required. We reply fast. 😊"
            />
            <div className="inline-action center">
              <p>Prefer to talk it through?</p>
              <Link className="btn btn--ghost" href="/strategy-call" prefetch={false}>Book a call</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
