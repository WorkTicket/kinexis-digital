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
          <div className="form-shell contact-form-shell">
            <div className="contact-form-heading">
              <p className="eyebrow">Start a conversation</p>
              <h2 className="card-title"><HL text="Tell Us About Your Business" mark="Your Business" /></h2>
              <p className="muted">Choose what you need. If you request a free homepage preview, we’ll ask for a little more detail so we can make it useful for your business.</p>
            </div>
            <Form
              fields={LEAD_FIELDS}
              contactInquiry={{ locale: "en", followupHref: "/intake" }}
              button="Send My Message"
              fast
              fastText="No card required. We reply fast."
            />
          </div>
          <aside className="contact-aside" aria-label="Other ways to contact Kinexis Digital">
            <p className="eyebrow">Prefer to talk first?</p>
            <h2>We’re happy to help.</h2>
            <p className="contact-aside__intro">Reach out directly or book a short strategy call.</p>
            <a className="contact-aside__link" href={telHref(SITE.phone)}>
              <span>Call</span>
              <strong>{SITE.phone}</strong>
            </a>
            <a className="contact-aside__link" href={`mailto:${SITE.email}`}>
              <span>Email</span>
              <strong>{SITE.email}</strong>
            </a>
            <div className="contact-aside__area">
              <span>Service area</span>
              <p>Service businesses across the United States. English and Spanish on the Plus plan.</p>
            </div>
            <Link className="btn btn--ghost contact-aside__cta" href="/strategy-call" prefetch={false}>Book a call</Link>
          </aside>
        </div>
      </Section>
    </>
  );
}
