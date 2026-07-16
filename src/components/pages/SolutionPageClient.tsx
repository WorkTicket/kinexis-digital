"use client";

import { useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import MetricCard from "@/components/ui/MetricCard";
import CTAArchetype from "@/components/ui/CTAArchetype";
import FAQSection from "@/components/sections/FAQSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import type { SolutionEntry } from "@/content/registry/solutions";
import { serviceRoutes, serviceLabels, type ServiceSlug } from "@/content/registry/site-routes";
import { getIndustryBySlug } from "@/content/registry/industries";
import { getSolutionRelatedLinks } from "@/lib/solution-related-links";
import { uiChrome } from "@/content/ui-chrome";
import Section from "@/components/shared/services/Section";
import { featureCardGridClass } from "@/lib/card-styles";
import type { Locale } from "@/i18n/routing";

type Props = { solution: SolutionEntry };

export default function SolutionPageClient({ solution }: Props) {
  const locale = useLocale() as Locale;
  const copy = uiChrome[locale].solution;
  const industry = getIndustryBySlug(solution.industrySlug);
  const serviceHref = serviceRoutes[solution.serviceSlug as ServiceSlug] || `/services/${solution.serviceSlug}`;
  const serviceLabel = serviceLabels[solution.serviceSlug as ServiceSlug] || solution.serviceSlug;
  const solutionLinks = getSolutionRelatedLinks(solution.slug);
  let surfaceIndex = 0;

  return (
    <>
      <Section id="challenge" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-3xl">
          <SectionHeader title={copy.challenge} headingId="challenge-heading" />
          <p className="mt-6 text-muted leading-relaxed">{solution.challenge}</p>
        </div>
      </Section>

      <Section id="approach" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader
            title={copy.approach}
            description={copy.approachDesc}
            headingId="approach-heading"
          />
          <ol className="mt-8 space-y-4 max-w-3xl">
            {solution.approach.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="text-neon-cyan font-bold text-sm w-8">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="deliverables" variant="data" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={copy.deliverables} />
          <div className={featureCardGridClass(solution.deliverables.length, "mt-8 items-stretch")}>
            {solution.deliverables.map((d) => (
              <CardFamily key={d} family="editorial" className="h-full flex flex-col">
                <p className="text-sm text-muted flex-1">{d}</p>
              </CardFamily>
            ))}
          </div>
        </div>
      </Section>

      <Section id="results" variant="proof" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={copy.results} />
          <div className={featureCardGridClass(solution.results.length, "section-content")}>
            {solution.results.map((r) => (
              <MetricCard key={r.label} value={r.metric} label={r.label} />
            ))}
          </div>
        </div>
      </Section>

      <FAQSection items={solution.faqs} surfaceIndex={surfaceIndex++} />

      <RelatedLinks
        surfaceIndex={surfaceIndex++}
        agencyHub
        serviceLinks={[{ href: serviceHref, label: serviceLabel }]}
        solutionLinks={solutionLinks.length > 0 ? solutionLinks : undefined}
        industryLinks={
          industry
            ? [
                {
                  href: `/industries/${industry.categoryId}/${industry.slug}`,
                  label: copy.industryMarketing(industry.label),
                },
              ]
            : undefined
        }
        caseStudyLinks={[{ href: "/case-studies", label: copy.viewCaseStudies }]}
      />

      <CTAArchetype
        archetype="story"
        headline={copy.ctaHeadline(solution.title)}
        subtitle={copy.ctaSubtitle}
        ctaLabel={copy.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
