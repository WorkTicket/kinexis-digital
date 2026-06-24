"use client";

import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import ComparisonTable from "@/components/sections/seo/ComparisonTable";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ServiceFAQSection from "@/components/shared/services/ServiceFAQSection";
import PricingCTASection from "@/components/pages/pricing/PricingCTASection";
import PricingHero from "@/components/pages/pricing/PricingHero";
import PricingIncludedSection from "@/components/pages/pricing/PricingIncludedSection";
import { getServiceRelatedLinks } from "@/lib/service-related-links";
import type { PricingSlug } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import type { PricingPageContent } from "@/content/pricing/pricing-pages";
import type { BreadcrumbItem } from "@/lib/schema";

type Props = {
  slug: PricingSlug;
  locale: Locale;
  content: PricingPageContent;
  serviceHref: string;
  serviceLabel: string;
  breadcrumbs: BreadcrumbItem[];
};

export default function PricingPageClient({
  slug,
  locale: _locale,
  content: c,
  serviceHref,
  serviceLabel,
  breadcrumbs,
}: Props) {
  const relatedLinks = getServiceRelatedLinks(slug);
  const tiersSection = c.tiersSection!;
  const includedSection = c.includedSection!;
  const packages = c.comparison;

  let surfaceIndex = 0;

  return (
    <>
      <PricingHero
        slug={slug}
        label={c.hero.label}
        line1={c.hero.line1}
        line2={c.hero.line2}
        subtitle={c.hero.subtitle}
        ctaLabel={c.ctaLabel}
        serviceHref={serviceHref}
        serviceLabel={serviceLabel}
        breadcrumbs={breadcrumbs}
      />

      <AnswerBlock text={c.answerBlock} surfaceIndex={surfaceIndex++} />

      <ComparisonTable
        title={packages.title}
        subtitle={packages.subtitle}
        layout="progression"
        columns={packages.columns}
        rows={packages.rows}
        footerNote={tiersSection.note}
        surfaceIndex={surfaceIndex++}
      />

      <PricingIncludedSection
        title={includedSection.title}
        subtitle={includedSection.subtitle}
        items={includedSection.items}
        surfaceIndex={surfaceIndex++}
      />

      <ServiceFAQSection items={c.faqs} surfaceIndex={surfaceIndex++} />

      <RelatedLinks
        surfaceIndex={surfaceIndex++}
        serviceLinks={[
          { href: serviceHref, label: serviceLabel },
          ...relatedLinks.services.filter((link) => link.href !== serviceHref).slice(0, 2),
        ]}
        caseStudyLinks={relatedLinks.caseStudies.slice(0, 2)}
        blogLinks={relatedLinks.blog.slice(0, 2)}
      />

      <PricingCTASection headline={c.ctaHeadline} subtitle={c.ctaSubtitle} ctaLabel={c.ctaLabel} />
    </>
  );
}
