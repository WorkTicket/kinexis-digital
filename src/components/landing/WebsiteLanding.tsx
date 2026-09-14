import { WebsiteHero } from "@/components/landing/WebsiteHero";
import {
  WebsiteBuild,
  WebsiteFinalCta,
  WebsiteFit,
  WebsitePain,
  WebsitePlan,
  WebsitePricing,
  WebsiteProcess,
  WebsiteTrust,
  WebsiteWork,
} from "@/components/landing/WebsiteSections";
import { LandingStickyCta } from "@/components/landing/LandingStickyCta";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { faqSchema } from "@/lib/schema";
import "@/styles/components/landing.css";
import "@/styles/components/landing-agency.css";

export function WebsiteLanding({ page }: { page: LandingPageEntry }) {
  const samples = page.samples ?? [];
  const cta = page.heroCtaLabel ?? page.stickyCtaLabel;

  return (
    <main className="lp-web flex flex-1 flex-col pb-24 lg:pb-0">
      <JsonLd data={faqSchema(page.faqs)} />
      <WebsiteHero page={page} />
      {page.heroMeta?.length ? <WebsiteTrust items={page.heroMeta} /> : null}
      {samples.length && page.samplesTitle ? (
        <WebsiteWork
          title={page.samplesTitle}
          intro={page.samplesIntro}
          samples={samples}
        />
      ) : null}
      {page.painTitle && page.painSubtitle && page.painItems?.length ? (
        <WebsitePain
          title={page.painTitle}
          subtitle={page.painSubtitle}
          items={page.painItems}
        />
      ) : null}
      {page.buildTitle && page.sellPoints?.length ? (
        <WebsiteBuild title={page.buildTitle} points={page.sellPoints} />
      ) : null}
      {page.fitTitle && page.fitItems?.length ? (
        <WebsiteFit title={page.fitTitle} items={page.fitItems} />
      ) : null}
      {page.process?.length && page.processTitle ? (
        <WebsiteProcess title={page.processTitle} steps={page.process} />
      ) : null}
      {page.pricing?.length && page.pricingTitle ? (
        <WebsitePricing
          title={page.pricingTitle}
          intro={page.pricingQualify}
          items={page.pricing}
          note={page.pricingNote}
          ctaLabel={cta}
          landingSlug={page.slug}
        />
      ) : null}
      <WebsitePlan page={page} />
      <FaqAccordion
        items={page.faqs}
        eyebrow="Questions"
        title="Before you start"
        startClosed
        className="lp-web-faq"
      />
      <WebsiteFinalCta
        title={page.closingTitle ?? page.formTitle}
        copy={page.closingCopy}
        ctaLabel={cta}
        finePrint={page.closingFinePrint}
        landingSlug={page.slug}
      />
      <LandingStickyCta
        label={page.stickyCtaLabel}
        revealAfterId="lp-hero-actions"
      />
    </main>
  );
}
