import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE, telHref } from "@/lib/site";
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
        <div className="contact-grid contact-grid--split">
          <div className="form-shell">
            <h2 className="card-title"><HL text="Tell Us About Your Business" mark="Your Business" /></h2>
            <p className="muted">Share what you do and where you work—we use that to prepare a free homepage preview. No card required.</p>
            <Form
              fields={LEAD_FIELDS}
              button="Show Me My Free Homepage"
              fast
              fastText="No card required. We reply fast."
            />
            <div className="inline-action center">
              <p>Prefer to talk it through?</p>
              <Link className="btn btn--ghost" href="/strategy-call" prefetch={false}>Book a call</Link>
            </div>
          </div>
          <aside className="contact-info">
            <div className="contact-info__intro">
              <span className="eyebrow">Here to help</span>
              <h2>Let’s make your next step clear.</h2>
              <p>Tell us a little about your business. We’ll use it to prepare your free homepage preview.</p>
            </div>
            <div className="card">
              <h2 className="card-title">Call</h2>
              <p><a href={telHref(SITE.phone)}>{SITE.phone}</a></p>
            </div>
            <div className="card">
              <h2 className="card-title">Email</h2>
              <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </div>
            <div className="card">
              <h2 className="card-title">Service area</h2>
              <p>Service businesses across the United States. English and Spanish on the Plus plan.</p>
            </div>
            <p className="contact-info__callout"><span aria-hidden="true">✓</span> No card required <span aria-hidden="true">·</span> Free preview in 2 business days</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
