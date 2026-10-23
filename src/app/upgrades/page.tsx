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
      <PageHero h1="Add More When You Need It" mark="When You Need It" sub="Start with the right plan now, then add pages, site care, or text-back as the business changes." image="upgrades" imageAlt="Add-on tiles around a contractor website" />
      <Section><div className="grid grid--4 upgrades">
        {UPGRADES.map(([t, d, p]) => <article className="card center" key={t}><Icon name={UPGRADE_ICONS[t] || "extra-page"} alt={t} /><h2 className="card-title">{t}</h2><p>{d}</p><p className="upgrade__price">{p}</p></article>)}
      </div></Section>
      <Section tint>
        <h2 className="center"><HL text="The Basics Are Already Covered" mark="Already Covered" /></h2>
        <div className="grid grid--4 included">
          <IconCard title="Written For Your Trade" text="Service pages use the language your customers expect instead of generic template copy." icon="built-for-your-trade" />
          <IconCard title="Easy To Call Or Ask" text="Tap-to-call, short forms, and clear next steps are available wherever someone enters the site." icon="made-for-calls" />
          <IconCard title="Quick And Protected" text="Pages load quickly on phones, while hosting, SSL, and security are handled in the background." icon="fast-and-secure" />
          <IconCard title="Small Edits Handled" text="Send routine changes to our team so you can stay focused on the work in front of you." icon="managed-for-you" />
        </div>
      </Section>
      <CtaBand h="Need Help Choosing An Add-On?" mark="Choosing An Add-On" sub="Compare the four plans or ask what can be added later. The homepage preview is still free." btn="See Plans & Pricing" href="/pricing" />
    </>
  );
}
