import { pageMetadata } from "@/lib/seo";
import { UPGRADES } from "@/lib/content";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, HL, Icon, IconCard, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("upgrades");

const UPGRADE_ICONS: Record<string, string> = {
  "Extra Page": "extra-page",
  "Site Care": "site-care",
  "Missed-Call Text-Back": "missed-call-text-back",
  "New Pages on Own It": "new-pages",
};

export default function Page() {
  return (
    <>
      <PageSchema page="upgrades" />
      <PageHero h1="Upgrades & Add-Ons" mark="Add-Ons" sub="Start with the plan you need. Add pages, care or text-back when your business is ready." image="upgrades" imageAlt="Add-on tiles around a contractor website" />
      <Section><div className="grid grid--4 upgrades">
        {UPGRADES.map(([t, d, p]) => <article className="card center" key={t}><Icon name={UPGRADE_ICONS[t] || "extra-page"} alt={t} /><h2 className="card-title">{t}</h2><p>{d}</p><p className="upgrade__price">{p}</p></article>)}
      </div></Section>
      <Section tint>
        <h2 className="center"><HL text="Included With Every Site" mark="Every Site" /></h2>
        <div className="grid grid--4 included">
          <IconCard title="Built for Your Trade" text="Real service pages and copy that sound like your business, not a generic template." icon="built-for-your-trade" />
          <IconCard title="Made for Calls" text="Click-to-call, short forms and clear next steps wherever someone lands." icon="made-for-calls" />
          <IconCard title="Fast + Secure" text="A fast phone load, plus hosting, SSL and security handled for every visit." icon="fast-and-secure" />
          <IconCard title="Managed for You" text="Small edits handled by our team, so you can keep working every job." icon="managed-for-you" />
        </div>
      </Section>
      <CtaBand h="Not Sure What You Need?" mark="You Need" sub="See the four plans or ask us for a free homepage preview. No card, no obligation." btn="See Plans & Pricing" href="/pricing" />
    </>
  );
}
