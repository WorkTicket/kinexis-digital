import { pageMetadata } from "@/lib/seo";
import Form from "@/components/Form";
import { PageSchema } from "@/components/JsonLd";
import { PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("update");

export default function Page() {
  return (
    <>
      <PageSchema page="update" />
      <PageHero h1="Request a Site Update" mark="Site Update" sub="Tell us the page and the change. We handle small edits one at a time, inside the time included in your plan." />
      <Section narrow><Form button="Send Request" note="Website edits are done in two business days. Lead System edits are done in one business day. Plus edits requested by noon Central are done the same business day." fields={[
        { label: "Your Name", name: "name", required: true, auto: "name" },
        { label: "Email", name: "email", kind: "email", required: true, auto: "email" },
        { label: "Page URL", name: "page", kind: "url" },
        { label: "What should we change?", name: "request", kind: "textarea", required: true },
        { label: "Attach a file (optional)", name: "file", kind: "file" },
      ]} /></Section>
    </>
  );
}
