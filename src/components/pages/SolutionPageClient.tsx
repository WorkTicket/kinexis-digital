"use client";

import { useLocale, useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import FAQSection from "@/components/sections/FAQSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import type { SolutionEntry } from "@/content/registry/solutions";
import { serviceRoutes, serviceLabels, type ServiceSlug } from "@/content/registry/site-routes";
import { getIndustryBySlug } from "@/content/registry/industries";
import { getSolutionRelatedLinks } from "@/lib/solution-related-links";
import { uiChrome } from "@/content/ui-chrome";
import Section from "@/components/shared/services/Section";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

type Props = { solution: SolutionEntry };

export default function SolutionPageClient({ solution }: Props) {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations("common");
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
          <p className="section-content type-body text-muted leading-relaxed">{solution.challenge}</p>
        </div>
      </Section>

      <Section id="approach" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader
            title={copy.approach}
            description={copy.approachDesc}
            headingId="approach-heading"
          />
          <ol className="section-content max-w-3xl space-y-5">
            {solution.approach.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="w-8 shrink-0 font-mono text-sm font-bold text-neon-cyan">
                  {i + 1}
                </span>
                <span className="type-body text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="deliverables" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-3xl">
          <SectionHeader title={copy.deliverables} headingId="deliverables-heading" />
          <ul className="section-content space-y-4">
            {solution.deliverables.map((d) => (
              <li key={d} className="flex gap-3 type-body text-muted">
                <span className="mt-1 shrink-0 text-neon-cyan" aria-hidden>
                  →
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="results" variant="proof" surfaceIndex={surfaceIndex++} compact className="border-y border-surface">
        <div className="container-site">
          <SectionHeader title={copy.results} headingId="results-heading" />
          <ul
            className={cn(
              "section-content grid gap-8",
              solution.results.length >= 3
                ? "sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/[0.08]"
                : "sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-white/[0.08]",
            )}
          >
            {solution.results.map((r, index) => (
              <li key={r.label}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-2 sm:px-8",
                    index === 0 && "sm:pl-0",
                    index === solution.results.length - 1 && "sm:pr-0",
                  )}
                >
                  <span className="type-metric text-3xl font-bold tracking-tight sm:text-4xl">
                    <span className="gradient-text">{r.metric}</span>
                  </span>
                  <span className="text-sm font-medium leading-snug text-white/85">{r.label}</span>
                </div>
              </li>
            ))}
          </ul>
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
        headline={copy.ctaHeadline(solution.title)}
        subtitle={copy.ctaSubtitle}
        ctaLabel={copy.ctaLabel}
        ctaHref="/contact"
        secondaryCtaLabel={tCommon("viewOurWork")}
        secondaryCtaHref="/case-studies"
      />
    </>
  );
}
