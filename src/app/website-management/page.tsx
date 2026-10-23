import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, IconCard, PageHero, Section } from "@/components/ui";
import { PageSchema } from "@/components/JsonLd";

export const metadata = pageMetadata("website-management");

export default function Page() {
  return (
    <>
      <PageSchema page="website-management" />
      <PageHero h1="Keep Your Website Current" mark="Website Current" sub="We handle the hosting, routine changes, backups, and security your business site needs." image="maintenance" imageAlt="Website care panels with a gear and a shield" />
      <Section>
        <div className="grid grid--4">
          <IconCard level={2} title="Reliable Hosting" text="Your site has a dependable place to run, without you managing a server." icon="hosting" />
          <IconCard level={2} title="Requested Changes" text="Send us the new text or details and we’ll update the page for you." icon="updates" />
          <IconCard level={2} title="Backups And Security" text="We monitor the site and keep regular backups in case something goes wrong." icon="security" />
          <IconCard level={2} title="A Person To Ask" text="When you need a change, you can contact someone who knows the site." icon="support" />
        </div>
      </Section>
      <Section tint><div className="center"><Link className="btn btn--primary" href="/update" prefetch={false}>Request a Site Update</Link></div></Section>
      <CtaBand h="Want The Upkeep Off Your List?" mark="Off Your List" sub="Tell us what the site needs, and we’ll explain how we can take care of it." btn="Tell Us What Needs Care" />
    </>
  );
}
