import { pageMetadata } from "@/lib/seo";
import IntakeForm from "@/components/IntakeForm";
import { PageSchema } from "@/components/JsonLd";
import { PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("intake");

export default function Page() {
  return (
    <>
      <PageSchema page="intake" />
      <PageHero
        previewBar={false}
        h1="Website Content Intake"
        mark="Content Intake"
        sub="Send the details and photos we need for your homepage preview. Job photos, your truck, and your logo make the preview feel like your business."
      />
      <Section narrow>
        <div className="intake-intro">
          <h2 className="card-title">What helps most</h2>
          <ul className="intake-checklist">
            <li>Business name, phone for the site, and the cities you serve</li>
            <li>The main services you want featured first</li>
            <li>Logo if you have one, plus job / truck / team photos</li>
            <li>Sites you like, or a short note on colors and style</li>
          </ul>
          <p className="muted">Still gathering photos? Check “start with placeholders” and send what you have — we can still begin the preview.</p>
        </div>
        <IntakeForm />
      </Section>
    </>
  );
}
