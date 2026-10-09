import { getLocale } from "next-intl/server";
import { WebsiteDirect } from "@/components/landing/WebsiteDirect";
import { WebsiteHero } from "@/components/landing/WebsiteHero";
import {
  WebsiteBuild,
  WebsiteFit,
  WebsitePain,
  WebsitePlan,
  WebsitePricing,
  WebsiteProcess,
  WebsiteProofStrip,
  WebsiteWork,
} from "@/components/landing/WebsiteSections";
import { LandingStickyCta } from "@/components/landing/LandingStickyCta";
import { WebsiteContactDock } from "@/components/landing/WebsiteReach";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { getWebsiteLpChrome } from "@/content/lp/website-lp-chrome";
import type { Locale } from "@/i18n/routing";
import { faqSchema } from "@/lib/schema";
import "@/styles/components/landing.css";
import "@/styles/components/landing-agency.css";
import "@/styles/components/landing-showcase.css";

/**
 * High-intent order: offer, proof, price, then the longer explanation.
 *   1. Hero
 *   2. Outcomes
 *   3. Proof strip
 *   4. Work
 *   5. Pricing
 *   6. Process
 *   7. Pain
 *   8. Build
 *   9. Fit
 *  10. FAQ
 *  11. Direct intro
 *  12. Plan / form
 *
 * No FinalCta. Sticky CTA is client-side.
 */
export async function WebsiteLanding({ page }: { page: LandingPageEntry }) {
  const locale = (await getLocale()) as Locale;
  const chrome = getWebsiteLpChrome(locale);
  const samples = page.samples ?? [];
  const cta = page.heroCtaLabel ?? page.stickyCtaLabel;

  return (
    <main className="lp-web flex flex-1 flex-col pb-24 lg:pb-0">
      <JsonLd data={faqSchema(page.faqs)} />
      <WebsiteHero
        page={page}
        caption={chrome.heroCaption}
        benefits={chrome.heroBenefits}
        outcomesLabel={chrome.outcomesAria}
      />
      {samples.length ? (
        <WebsiteProofStrip
          samples={samples}
          viewLiveLabel={chrome.viewLive}
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
          kicker={chrome.liveSitesKicker}
          viewLiveLabel={chrome.viewLive}
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
          tiers={page.pricing}
          addOns={page.pricingAddOns}
          note={page.pricingNote}
          ctaLabel={cta}
          landingSlug={page.slug}
          kicker={chrome.pricingKicker}
          startingLabel={chrome.startingLabel}
        />
      ) : null}
      {page.process?.length && page.processTitle ? (
        <WebsiteProcess
          title={page.processTitle}
          intro={page.processIntro}
          steps={page.process}
          kicker={chrome.howItWorksKicker}
        />
      ) : null}
      {page.painTitle && page.painSubtitle ? (
        <WebsitePain
          eyebrow={page.painEyebrow}
          title={page.painTitle}
          subtitle={page.painSubtitle}
          before={page.transformBefore}
          after={page.transformAfter}
          datedCaption={chrome.datedCaption}
          customCaption={chrome.customCaption}
        />
      ) : null}
      {page.buildTitle && page.sellPoints?.length ? (
        <WebsiteBuild
          title={page.buildTitle}
          points={page.sellPoints}
          ownershipStatement={page.ownershipStatement}
          kicker={chrome.includedKicker}
        />
      ) : null}
      {page.fitTitle && page.fitGoodItems?.length ? (
        <WebsiteFit
          title={page.fitTitle}
          goodTitle={page.fitGoodTitle}
          goodItems={page.fitGoodItems}
          notTitle={page.fitNotTitle}
          notItems={page.fitNotItems}
          kicker={chrome.fitKicker}
        />
      ) : null}
      <FaqAccordion
        items={page.faqs}
        eyebrow={chrome.faqEyebrow}
        title={chrome.faqTitle}
        startClosed
        className="lp-web-faq"
      />
      {page.directIntro && page.heroPortrait ? (
        <WebsiteDirect intro={page.directIntro} portrait={page.heroPortrait} />
      ) : null}
      <WebsitePlan
        page={page}
        locale={locale}
        kicker={chrome.nextStepKicker}
        figcaption={chrome.planFigcaption}
      />
      <LandingStickyCta
        label={page.stickyCtaLabel}
        note={chrome.stickyNote}
        revealAfterId="lp-hero-actions"
      />
      <WebsiteContactDock page={page} />
    </main>
  );
}
