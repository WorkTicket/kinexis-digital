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
import Section from "@/components/shared/services/Section";
type Props = { solution: SolutionEntry };

export default function SolutionPageClient({ solution }: Props) {
  const industry = getIndustryBySlug(solution.industrySlug);
  const serviceHref = serviceRoutes[solution.serviceSlug as ServiceSlug] || `/services/${solution.serviceSlug}`;
  const serviceLabel = serviceLabels[solution.serviceSlug as ServiceSlug] || solution.serviceSlug;
  const solutionLinks = getSolutionRelatedLinks(solution.slug);
  let surfaceIndex = 0;

  return (
    <>
      <Section id="challenge" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-3xl">
          <SectionHeader title="The challenge" headingId="challenge-heading" />
          <p className="mt-6 text-muted leading-relaxed">{solution.challenge}</p>
        </div>
      </Section>

      <Section id="approach" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title="Our approach" description="A tailored strategy, not a template with your industry name swapped in." headingId="approach-heading" />
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
          <SectionHeader title="Deliverables" />
          <div className="mt-8 grid gap-grid-sm md:grid-cols-2 items-stretch">
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
          <SectionHeader title="Results framework" />
          <div className="section-content grid gap-grid-sm md:grid-cols-3">
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
