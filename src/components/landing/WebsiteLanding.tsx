import { WebsiteHero } from "@/components/landing/WebsiteHero";
import {
  WebsiteBuild,
  WebsiteFit,
  WebsiteOutcomes,
  WebsitePain,
  WebsitePlan,
  WebsitePricing,
  WebsiteProcess,
  WebsiteWork,
} from "@/components/landing/WebsiteSections";
import { LandingStickyCta } from "@/components/landing/LandingStickyCta";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { faqSchema } from "@/lib/schema";
import "@/styles/components/landing.css";
import "@/styles/components/landing-agency.css";
import "@/styles/components/landing-showcase.css";

/**
 * Live get-a-website section order (from production DOM):
 *   1. Hero
 *   2. Outcomes (aside)
 *   3. Pain (before/after ShowcaseSite + compare)
 *   4. Work
 *   5. Build
 *   6. Process
 *   7. Pricing (panel; soft = no addon sticker board)
 *   8. Fit (good / not columns)
 *   9. FAQ
 *  10. Plan / form
 *
 * No FinalCta on live. Sticky CTA is client-side.
 */
export function WebsiteLanding({ page }: { page: LandingPageEntry }) {
  const samples = page.samples ?? [];
  const cta = page.heroCtaLabel ?? page.stickyCtaLabel;

  return (
    <main className="lp-web flex flex-1 flex-col pb-24 lg:pb-0">
      <JsonLd data={faqSchema(page.faqs)} />
      <WebsiteHero page={page} />
      {page.outcomes?.length ? <WebsiteOutcomes items={page.outcomes} /> : null}
      {page.painTitle && page.painSubtitle ? (
        <WebsitePain
          eyebrow={page.painEyebrow}
          title={page.painTitle}
          subtitle={page.painSubtitle}
          before={page.transformBefore}
          after={page.transformAfter}
        />
      ) : null}
      {samples.length && page.samplesTitle ? (
        <WebsiteWork
          title={page.samplesTitle}
          intro={page.samplesIntro}
          samples={samples}
          testimonial={page.testimonial}
          proofIntro={page.proofIntro}
          workCtaTitle={page.workCtaTitle}
          ctaLabel={cta}
          landingSlug={page.slug}
        />
      ) : null}
      {page.buildTitle && page.sellPoints?.length ? (
        <WebsiteBuild
          title={page.buildTitle}
          points={page.sellPoints}
          ownershipStatement={page.ownershipStatement}
        />
      ) : null}
      {page.process?.length && page.processTitle ? (
        <WebsiteProcess
          title={page.processTitle}
          intro={page.processIntro}
          steps={page.process}
        />
      ) : null}
      {page.pricingTitle && page.pricingAnchor ? (
        <WebsitePricing
          title={page.pricingTitle}
          intro={page.pricingIntro}
          anchor={page.pricingAnchor}
          delivery={page.pricingDelivery}
          qualify={page.pricingQualify}
          highlights={page.pricingHighlights}
          addOns={page.pricingAddOns}
          note={page.pricingNote}
          ctaLabel={cta}
          landingSlug={page.slug}
        />
      ) : null}
      {page.fitTitle && page.fitGoodItems?.length ? (
        <WebsiteFit
          title={page.fitTitle}
          goodTitle={page.fitGoodTitle}
          goodItems={page.fitGoodItems}
          notTitle={page.fitNotTitle}
          notItems={page.fitNotItems}
        />
      ) : null}
      <FaqAccordion
        items={page.faqs}
        eyebrow="Before you send the form"
        title="Straight answers"
        startClosed
        className="lp-web-faq"
      />
      <WebsitePlan page={page} />
      <LandingStickyCta
        label={page.stickyCtaLabel}
        revealAfterId="lp-hero-actions"
      />
    </main>
  );
}
