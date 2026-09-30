import { getLocale } from "next-intl/server";
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
import { getWebsiteLpChrome } from "@/content/lp/website-lp-chrome";
import type { Locale } from "@/i18n/routing";
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
      />
      {page.outcomes?.length ? (
        <WebsiteOutcomes items={page.outcomes} ariaLabel={chrome.outcomesAria} />
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
      {page.buildTitle && page.sellPoints?.length ? (
        <WebsiteBuild
          title={page.buildTitle}
          points={page.sellPoints}
          ownershipStatement={page.ownershipStatement}
          kicker={chrome.includedKicker}
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
          kicker={chrome.pricingKicker}
          startingLabel={chrome.startingLabel}
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
      <WebsitePlan
        page={page}
        locale={locale}
        kicker={chrome.nextStepKicker}
        figcaption={chrome.planFigcaption}
      />
      <LandingStickyCta
        label={page.stickyCtaLabel}
        note={page.formCtaHint ?? page.heroFinePrint}
        revealAfterId="lp-hero-actions"
      />
    </main>
  );
}
