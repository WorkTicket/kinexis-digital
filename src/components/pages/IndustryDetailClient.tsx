"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ProofMetric from "@/components/ui/ProofMetric";
import CTAArchetype from "@/components/ui/CTAArchetype";
import FAQSection from "@/components/sections/FAQSection";
import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import RelatedLinks from "@/components/sections/RelatedLinks";
import TextLink from "@/components/ui/TextLink";
import { getServiceExploreLabel } from "@/lib/service-explore-labels";
import type { IndustryDetailContent } from "@/content/industries/detail";
import { Link } from "@/i18n/navigation";

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
  return (
    <>
      <AnswerBlock text={content.answerBlock} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site max-w-3xl">
          <SectionHeader pattern="B" title={content.challenges.title} />
          <ul className="section-content space-y-4 type-body text-muted">
            {content.challenges.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-neon-cyan mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <SectionHeader pattern="B" title={content.strategy.title} />
          <div className="section-content space-y-5 type-body text-muted">
            {content.strategy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 50)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader pattern="C" title={content.services.title} />
          <div className="section-content grid gap-grid-sm md:grid-cols-2">
            {content.services.items.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="group block h-full service-card hover:border-neon-cyan/30 flex flex-col"
              >
                <h3 className="card-heading group-hover:text-neon-cyan transition-colors">{svc.label}</h3>
                <p className="service-card__body flex-1">{svc.description}</p>
                <span className="mt-4 block">
                  <TextLink size="sm">{getServiceExploreLabel(svc.href)}</TextLink>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader pattern="B" title={content.outcomes.title} />
          <div className="section-content grid gap-grid-sm md:grid-cols-3">
            {content.outcomes.metrics.map((metric) => (
              <div key={metric.label} className="proof-metric-card">
                <ProofMetric value={metric.value} label={metric.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={content.faqs} />

      <RelatedLinks
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
