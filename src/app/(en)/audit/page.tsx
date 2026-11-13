import { pageMetadata } from "@/lib/seo";
import Form from "@/components/Form";
import { HL, Icon, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";

export const metadata = pageMetadata("audit");
const ASIDE = [
  ["Page Speed", "We check how quickly main pages open for visitors on phones and computers.", "audit-speed"],
  ["Search Setup", "We review titles, headings, indexing, and the basic signals Google reads.", "search-optimized"],
  ["Phone Experience", "We look at how the site fits, reads, and works on a smaller phone screen.", "audit-mobile"],
  ["Calls And Forms", "We check whether visitors can tell how to call, ask a question, or get a quote.", "audit-conversion"],
] as const;

export default function Page() {
  return (
    <>
      <PageSchema page="audit" />
      <PageHero h1="Get A Clear List Of Website Fixes" mark="Website Fixes" sub="Send us the link. We’ll review it and tell you which changes deserve attention first." image="website-audit" imageAlt="Audit dashboard with a magnifying glass and checklist" />
      <Section>
        <div className="contact-grid contact-grid--split">
          <div className="form-shell">
            <h2 className="card-title"><HL text="Request Your Free Audit" mark="Free Audit" /></h2>
            <p className="muted">Share the URL and we’ll send a clear priority list — no card required.</p>
            <Form button="Request My Audit" fields={[
              { label: "Your Name", name: "name", required: true }, { label: "Email", name: "email", kind: "email", required: true },
              { label: "Website URL", name: "url", kind: "url", required: true }, { label: "Is there a problem you want us to check?", name: "notes", kind: "textarea" }]} />
          </div>
          <aside className="contact-info">
            {ASIDE.map(([h, t, icon]) => (
              <div className="card" key={h}>
                <Icon name={icon} alt={h} size={64} />
                <h2 className="card-title">{h}</h2>
                <p className="muted">{t}</p>
              </div>
            ))}
          </aside>
        </div>
      </Section>
    </>
  );
}
