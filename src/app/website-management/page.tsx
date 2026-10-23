import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, IconCard, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";

export const metadata = pageMetadata("website-management");

export default function Page() {
  return (
    <>
      <PageSchema page="website-management" />
      <PageHero h1="Website Management" mark="Management" sub="Hosting, updates, and security for business websites across the United States." image="maintenance" imageAlt="Website care panels with a gear and a shield" />
      <Section>
        <div className="grid grid--4">
          <IconCard level={2} title="Hosting" text="Fast, reliable hosting so your site stays online." icon="hosting" />
          <IconCard level={2} title="Updates" text="Content and software updates handled for you." icon="updates" />
          <IconCard level={2} title="Security" text="Security monitoring and regular backups." icon="security" />
          <IconCard level={2} title="Support" text="A real person to contact when you need a change." icon="support" />
        </div>
      </Section>
      <Section tint><div className="center"><Link className="btn btn--primary" href="/update" prefetch={false}>Request a Site Update</Link></div></Section>
      <CtaBand h="Want Us to Handle It?" mark="Handle It" sub="Tell us what you need and we'll take it off your plate." btn="Get Started" />
    </>
  );
}
