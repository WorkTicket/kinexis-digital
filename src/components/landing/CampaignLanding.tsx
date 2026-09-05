import { CampaignClose } from "@/components/landing/CampaignClose";
import { CampaignHero } from "@/components/landing/CampaignHero";
import { CampaignQuote } from "@/components/landing/CampaignQuote";
import { CampaignScope } from "@/components/landing/CampaignScope";
import { LandingProcess } from "@/components/landing/LandingProcess";
import { LandingSpotlight } from "@/components/landing/LandingSpotlight";
import { LandingStickyCta } from "@/components/landing/LandingStickyCta";
import { LandingWorkSamples } from "@/components/landing/LandingWorkSamples";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { faqSchema } from "@/lib/schema";
import "@/styles/components/landing.css";

export function CampaignLanding({ page }: { page: LandingPageEntry }) {
  const hasWork = Boolean(page.samples?.length && page.samplesTitle);

  return (
    <main className="lp-campaign flex flex-1 flex-col pb-24 md:pb-0">
      <JsonLd data={faqSchema(page.faqs)} />
      <CampaignHero page={page} />

      {page.testimonial ? <CampaignQuote testimonial={page.testimonial} /> : null}

      {page.spotlight ? <LandingSpotlight {...page.spotlight} /> : null}

      {hasWork && page.samples && page.samplesTitle && page.samplesIntro ? (
        <LandingWorkSamples
          title={page.samplesTitle}
          intro={page.samplesIntro}
          samples={page.samples}
          proof={page.proof}
        />
      ) : null}

      {page.scopeItems?.length ? (
        <CampaignScope title={page.bulletsTitle} items={page.scopeItems} />
      ) : null}

      {page.process?.length && page.processTitle && page.processIntro ? (
        <LandingProcess
          title={page.processTitle}
          intro={page.processIntro}
          steps={page.process}
        />
      ) : null}

      <FaqAccordion
        items={page.faqs}
        eyebrow="Before you reach out"
        title="Straight answers."
      />

      <CampaignClose page={page} />
      <LandingStickyCta label={page.stickyCtaLabel} />
    </main>
  );
}
