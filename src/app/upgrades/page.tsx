import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { UPGRADES } from "@/lib/content";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, HL, IconCard, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("upgrades");

const UPGRADE_VIDEOS: Record<string, string> = {
  "Extra Page": "kinexis-addon-extra-page-v5",
  "Site Care": "kinexis-addon-site-care-v4",
  "Missed-Call Text-Back": "kinexis-addon-missed-call-text-back-v4",
  "New Pages on Own It": "kinexis-addon-new-pages-own-it-v4",
};

export default function Page() {
  return (
    <>
      <PageSchema page="upgrades" />
      <PageHero eyebrow="Add-Ons" h1="Add More When You Need It" mark="When You Need It" sub="Start with the right plan now, then add pages, site care, or text-back as the business changes." image="upgrades" imageAlt="Add-on tiles around a contractor website" />
      <Section>
        <div className="section-head center">
          <p className="eyebrow">Optional Extras</p>
          <h2><HL text="Add Only What The Work Calls For" mark="The Work Calls For" /></h2>
          <p className="muted">Your plan already covers the basics. These are the extras for when a job needs one more page, regular site care, or a faster reply to a missed call.</p>
        </div>
        <div className="grid grid--4 upgrades">
          {UPGRADES.map(([t, d, p]) => {
            const video = UPGRADE_VIDEOS[t];
            const base = `/assets/video/addons/${video}`;
            return (
              <article className="card center" key={t}>
                <div className="upgrade__heading">
                  <h2 className="card-title">{t}</h2>
                  <p className="upgrade__price">{p}</p>
                </div>
                <button className="upgrade__preview" type="button" data-dialog="video" data-video-src={`${base}.mp4`} aria-label={`Play the ${t} video`}>
                  <span className="upgrade__frame">
                    <img src={`${base}-poster.webp`} alt="" width="960" height="540" loading="lazy" decoding="async" />
                    <span className="upgrade__play" aria-hidden="true">
                      <svg viewBox="0 0 48 48" width="48" height="48" focusable="false">
                        <circle cx="24" cy="24" r="21" fill="#ff6a00" stroke="#031b4e" strokeWidth="3" />
                        <path d="m20 16 13 8-13 8Z" fill="#031b4e" />
                      </svg>
                    </span>
                  </span>
                </button>
                <p className="upgrade__description">{d}</p>
              </article>
            );
          })}
        </div>
        <div className="section-outro section-outro--action center">
          <p>Each add-on is priced separately, so you only pay for the work you need.</p>
          <Link className="btn btn--primary" href="/pricing" prefetch={false}>Compare Plans &amp; Add-Ons</Link>
        </div>
      </Section>
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
