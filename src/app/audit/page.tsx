import { pageMetadata } from "@/lib/seo";
import Form from "@/components/Form";
import { PageHero, Section, Illustration, Icon } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";

export const metadata = pageMetadata("audit");
const ASIDE = [
  ["Speed", "How fast your pages load on mobile and desktop.", "audit-speed"],
  ["Search", "Titles, headings, indexing and on-page SEO basics.", "search-optimized"],
  ["Mobile", "How the site looks and works on phones.", "audit-mobile"],
  ["Conversion", "Whether calls to action and forms turn visitors into leads.", "audit-conversion"],
];

export default function Page() {
  return (
    <>
      <PageSchema page="audit" />
      <PageHero h1="Get a Website Audit" mark="Website Audit" sub="Send us your site and we'll tell you what to fix first." image="website-audit" imageAlt="Audit dashboard with a magnifying glass and checklist" />
      <Section>
        <div className="contact-grid">
          <div>
            <Illustration name="free-site-audit" format="webp" alt="Free site audit - laptop with magnifying glass" className="audit-hero-img" width={560} height={400} />
            <Form button="Request My Audit" fields={[
              { label: "Your Name", name: "name", required: true }, { label: "Email", name: "email", kind: "email", required: true },
              { label: "Website URL", name: "url", kind: "url", required: true }, { label: "Anything we should look at first?", name: "notes", kind: "textarea" }]} />
          </div>
          <aside className="contact-info">{ASIDE.map(([h, t, icon]) => <div className="card" key={h}><Icon name={icon} alt={h} size={64} /><h2 className="card-title">{h}</h2><p className="muted">{t}</p></div>)}</aside>
        </div>
      </Section>
    </>
  );
}
