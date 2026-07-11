import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import MetricCard from "@/components/ui/MetricCard";
import CTAArchetype from "@/components/ui/CTAArchetype";
import FAQSection from "@/components/sections/FAQSection";
import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import RelatedLinks from "@/components/sections/RelatedLinks";
import TextLink from "@/components/ui/TextLink";
import { getServiceExploreLabel } from "@/lib/service-explore-labels";
import type { IndustryDetailContent } from "@/content/industries/detail";
import { Link } from "@/i18n/navigation";
import Section from "@/components/shared/services/Section";
type Props = {
  content: IndustryDetailContent;
  categoryLabel: string;
  industryLabel: string;
  categoryId: string;
};

export default function IndustryDetailClient({
  content,
  categoryLabel,
  industryLabel,
  categoryId,
}: Props) {
  let surfaceIndex = 0;

  return (
    <>
      <AnswerBlock text={content.answerBlock} surfaceIndex={surfaceIndex++} />

      <Section id="challenges" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-3xl">
          <SectionHeader title={content.challenges.title} headingId="challenges-heading" />
          <ul className="section-content space-y-4 type-body text-muted">
            {content.challenges.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-neon-cyan mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="strategy" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-3xl">
          <SectionHeader title={content.strategy.title} headingId="strategy-heading" />
          <div className="section-content space-y-5 type-body text-muted">
            {content.strategy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 50)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="services" variant="data" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={content.services.title} />
          <div className="section-content grid gap-grid-sm md:grid-cols-2">
            {content.services.items.map((svc) => (
              <Link key={svc.href} href={svc.href} className="group block h-full">
                <Card className="h-full flex flex-col hover:border-neon-cyan/30">
                  <h3 className="card-heading group-hover:text-neon-cyan transition-colors">{svc.label}</h3>
                  <p className="mt-4 type-body text-muted flex-1">{svc.description}</p>
                  <span className="mt-4 block">
                    <TextLink size="sm">{getServiceExploreLabel(svc.href)}</TextLink>
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section id="outcomes" variant="proof" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={content.outcomes.title} />
          <div className="section-content grid gap-grid-sm md:grid-cols-3">
            {content.outcomes.metrics.map((metric) => (
              <MetricCard key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        </div>
      </Section>

      <FAQSection items={content.faqs} surfaceIndex={surfaceIndex++} />

      <RelatedLinks
        surfaceIndex={surfaceIndex++}
        industryLinks={[{ href: `/industries/${categoryId}`, label: `${categoryLabel} Industries` }]}
        solutionLinks={content.relatedSolutions}
        serviceLinks={content.services.items.slice(0, 3).map((svc) => ({ href: svc.href, label: svc.label }))}
      />

      <CTAArchetype
        archetype="story"
        headline={`Ready to grow your ${industryLabel.toLowerCase()} business?`}
        subtitle="Let's build marketing designed for your market, your buyers, and your revenue goals."
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
      />
    </>
  );
}
