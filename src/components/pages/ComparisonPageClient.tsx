"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import ComparisonTable from "@/components/sections/seo/ComparisonTable";
import FAQSection from "@/components/sections/FAQSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import type { ComparisonPageContent } from "@/content/comparisons/comparison-pages";
import Section from "@/components/shared/services/Section";

type Props = { content: ComparisonPageContent };

export default function ComparisonPageClient({ content: c }: Props) {
  let surfaceIndex = 0;

  return (
    <>
      <HeroArchetype
        archetype="article"
        label={c.hero.label}
        headline={
          <>
            <span className="type-hero-line">{c.hero.line1}</span>
            <span className="type-hero-line">{c.hero.line2}</span>
          </>
        }
        subtitle={c.hero.subtitle}
        ctaLabel={c.ctaLabel}
        ctaHref="/contact"
      />

      <AnswerBlock text={c.answerBlock} surfaceIndex={surfaceIndex++} />

      {c.sections.map((section) => {
        const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        return (
        <Section key={section.title} id={sectionId} surfaceIndex={surfaceIndex++}>
          <div className="container-site max-w-3xl">
            <SectionHeader title={section.title} headingId={`${sectionId}-heading`} />
            <p className="mt-6 text-muted leading-relaxed">{section.body}</p>
          </div>
        </Section>
      );})}

      <ComparisonTable
        surfaceIndex={surfaceIndex++}
        title={c.table.title}
        subtitle={c.table.subtitle}
        columns={c.table.columns}
        rows={c.table.rows}
      />

      <FAQSection items={c.faqs} surfaceIndex={surfaceIndex++} />

      <RelatedLinks serviceLinks={c.relatedLinks} agencyHub surfaceIndex={surfaceIndex++} />

      <CTAArchetype archetype="tool" headline={c.ctaHeadline} subtitle={c.ctaSubtitle} ctaLabel={c.ctaLabel} ctaHref="/contact" />
    </>
  );
}
