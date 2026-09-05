import { LandingIntake } from "@/components/landing/LandingIntake";
import { Reveal } from "@/components/ui/Reveal";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

export function CampaignClose({ page }: { page: LandingPageEntry }) {
  return (
    <section
      id="get-started"
      aria-labelledby="lp-close-heading"
      className="lp-campaign-close chapter relative"
    >
      <div className="lp-campaign-close__glow" aria-hidden />
      <div className="shell chapter-shell--standard relative">
        <div className="lp-campaign-close__layout">
          <Reveal variant="rise" when="chapter" className="lp-campaign-close__copy">
            <p className="section-eyebrow">Start here</p>
            <h2 id="lp-close-heading" className="lp-campaign-close__title">
              {page.closingTitle ?? page.formTitle}
            </h2>
            <p className="lp-campaign-close__dek">
              {page.closingCopy ?? page.formSubtitle}
            </p>
            <p className="lp-campaign-close__hint">{page.formFootnote}</p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.1} when="chapter">
            <div id="lp-form-close">
              <LandingIntake
                page={page}
                embedded
                campaign
                formId="lp-form-close-fields"
                trust="none"
                showCallPath={false}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
