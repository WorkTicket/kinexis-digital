"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import CTAArchetype from "@/components/ui/CTAArchetype";
import FAQSection from "@/components/sections/FAQSection";
import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import RelatedLinks from "@/components/sections/RelatedLinks";
import TextLink from "@/components/ui/TextLink";
import { getServiceExploreLabel } from "@/lib/service-explore-labels";
import type { IndustryDetailContent } from "@/content/industries/detail";
import { Link } from "@/i18n/navigation";
import Section from "@/components/shared/services/Section";
import { cn } from "@/lib/utils";
import { featureCardGridClass } from "@/lib/card-styles";

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
  const tCommon = useTranslations("common");
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
                <span className="text-neon-cyan mt-1 shrink-0" aria-hidden>
                  →
                </span>
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

      <Section id="services" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={content.services.title} headingId="services-heading" />
          <ul className={`section-content ${featureCardGridClass(2)}`}>
            {content.services.items.map((svc) => (
              <li key={svc.href}>
                <Link href={svc.href} className="group block h-full touch-manipulation">
                  <Card className="flex h-full flex-col">
                    <h3 className="card-heading transition-colors duration-200 group-hover:text-neon-cyan">
                      {svc.label}
                    </h3>
                    <p className="mt-3 flex-1 type-body text-muted">{svc.description}</p>
                    <div className="mt-8 border-t border-strong pt-5">
                      <TextLink size="sm">{getServiceExploreLabel(svc.href)}</TextLink>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="outcomes" variant="proof" surfaceIndex={surfaceIndex++} compact className="border-y border-surface">
        <div className="container-site">
          <SectionHeader title={content.outcomes.title} headingId="outcomes-heading" />
          <ul className="section-content grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
            {content.outcomes.metrics.map((metric, index) => (
              <li key={metric.label}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-2 sm:px-8",
                    index === 0 && "sm:pl-0",
                    index === content.outcomes.metrics.length - 1 && "sm:pr-0",
                  )}
                >
                  <span className="type-metric text-3xl font-bold tracking-tight sm:text-4xl">
                    <span className="gradient-text">{metric.value}</span>
                  </span>
                  <span className="text-sm font-medium leading-snug text-white/85">{metric.label}</span>
                </div>
              </li>
            ))}
          </ul>
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
        headline={`Ready to grow your ${industryLabel.toLowerCase()} business?`}
        subtitle="We'll build marketing for your market, your buyers, and the revenue goals that matter."
        ctaLabel={tCommon("bookStrategyCall")}
        ctaHref="/contact"
      />
    </>
  );
}
