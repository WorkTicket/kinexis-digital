"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import ProofMetric from "@/components/ui/ProofMetric";
import CTAArchetype from "@/components/ui/CTAArchetype";
import FAQSection from "@/components/sections/FAQSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import type { SolutionEntry } from "@/content/registry/solutions";
import { serviceRoutes, serviceLabels, type ServiceSlug } from "@/content/registry/site-routes";
import { getIndustryBySlug } from "@/content/registry/industries";

type Props = { solution: SolutionEntry };

export default function SolutionPageClient({ solution }: Props) {
  const industry = getIndustryBySlug(solution.industrySlug);
  const serviceHref = serviceRoutes[solution.serviceSlug as ServiceSlug] || `/services/${solution.serviceSlug}`;
  const serviceLabel = serviceLabels[solution.serviceSlug as ServiceSlug] || solution.serviceSlug;

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        label={solution.title}
        headline={
          <>
            <span className="type-hero-line">{solution.headlineLine1}</span>
            <span className="type-hero-line">{solution.headlineLine2}</span>
          </>
        }
        subtitle={solution.challenge}
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
      />

      <section className="section-padding bg-bg-dark">
        <div className="container-site max-w-3xl">
          <SectionHeader pattern="B" title="The challenge" />
          <p className="mt-6 text-muted leading-relaxed">{solution.challenge}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader pattern="C" title="Our approach" subtitle="A tailored strategy, not a template with your industry name swapped in." />
          <ol className="mt-8 space-y-4 max-w-3xl">
            {solution.approach.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="text-neon-cyan font-bold text-sm w-8">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader pattern="C" title="Deliverables" />
          <div className="mt-8 grid gap-grid-sm md:grid-cols-2 items-stretch">
            {solution.deliverables.map((d) => (
              <CardFamily key={d} family="editorial" className="h-full flex flex-col">
                <p className="text-sm text-muted flex-1">{d}</p>
              </CardFamily>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader pattern="B" title="Results framework" />
          <div className="mt-8 grid gap-grid-sm md:grid-cols-3">
            {solution.results.map((r) => (
              <div key={r.label} className="proof-metric-card">
                <ProofMetric value={r.metric} label={r.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={solution.faqs} />

      <RelatedLinks
        agencyHub
        serviceLinks={[{ href: serviceHref, label: serviceLabel }]}
        industryLinks={
          industry
            ? [{ href: `/industries/${industry.categoryId}/${industry.slug}`, label: `${industry.label} Marketing` }]
            : undefined
        }
        caseStudyLinks={[
          { href: "/case-studies", label: "View All Case Studies" },
        ]}
      />

      <CTAArchetype
        archetype="story"
        headline={`Ready to get started with ${solution.title.toLowerCase()}?`}
        subtitle="Book a strategy call and we'll outline a plan tailored to your market, competition, and revenue goals."
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
      />
    </>
  );
}
