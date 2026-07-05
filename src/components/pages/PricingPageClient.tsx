"use client";

import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import ComparisonTable from "@/components/sections/seo/ComparisonTable";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ServiceFAQSection from "@/components/shared/services/ServiceFAQSection";
import PricingCTASection from "@/components/pages/pricing/PricingCTASection";
import PricingHero from "@/components/pages/pricing/PricingHero";
import PricingIncludedSection from "@/components/pages/pricing/PricingIncludedSection";
import PricingTierProof from "@/components/pages/pricing/PricingTierProof";
import PricingTrustStrip from "@/components/pages/pricing/PricingTrustStrip";
import { getServiceRelatedLinks } from "@/lib/service-related-links";
import { getPricingRelatedLinks } from "@/lib/pricing-related-links";
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
  const pricingLinks = getPricingRelatedLinks(slug);
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

      <section className="pb-0 pt-2">
        <div className="container-site">
          <PricingTrustStrip locale={_locale} />
          {c.tierProof && <PricingTierProof proof={c.tierProof} />}
        </div>
      </section>

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
        pricingLinks={pricingLinks}
        caseStudyLinks={relatedLinks.caseStudies.slice(0, 2)}
        blogLinks={relatedLinks.blog.slice(0, 2)}
      />

      <PricingCTASection
        headline={c.ctaHeadline}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaLabel}
        secondaryCtaLabel={
          _locale === "es" ? `Ver alcance de ${serviceLabel}` : `See ${serviceLabel} scope`
        }
        secondaryCtaHref={serviceHref}
        contractNote={
          _locale === "es" ? "Sin contratos largos. Mes a mes." : "No long-term contracts. Month to month."
        }
      />
    </>
  );
}
