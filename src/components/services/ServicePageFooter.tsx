"use client";

import FAQSection from "@/components/sections/FAQSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { getServiceRelatedLinks } from "@/lib/service-related-links";
import { getServiceLocationLinks } from "@/lib/location-related-links";
import { mergeServiceFaqs } from "@/content/service-seo";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { FAQItem } from "@/components/sections/FAQSection";
import type { Locale } from "@/i18n/routing";

type Props = {
  slug: ServiceSeoSlug;
  locale: Locale;
  existingFaqs?: FAQItem[];
};

export default function ServicePageFooter({ slug, locale, existingFaqs = [] }: Props) {
  const faqs = mergeServiceFaqs(slug, locale, existingFaqs);
  const links = getServiceRelatedLinks(slug);
  const locationLinks = getServiceLocationLinks(slug);

  return (
    <>
      <FAQSection items={faqs} />
      <RelatedLinks
        agencyHub
        serviceLinks={links.services}
        solutionLinks={links.solutions.length > 0 ? links.solutions : undefined}
        locationLinks={locationLinks.length > 0 ? locationLinks : undefined}
        caseStudyLinks={links.caseStudies}
        blogLinks={links.blog}
      />
    </>
  );
}
