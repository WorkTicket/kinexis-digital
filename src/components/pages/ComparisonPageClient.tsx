"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import ComparisonTable from "@/components/sections/seo/ComparisonTable";
import FAQSection from "@/components/sections/FAQSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import type { ComparisonPageContent } from "@/content/comparisons/comparison-pages";

type Props = { content: ComparisonPageContent };

export default function ComparisonPageClient({ content: c }: Props) {
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

      <AnswerBlock text={c.answerBlock} />

      {c.sections.map((section) => (
        <section key={section.title} className="section-padding bg-bg-dark">
          <div className="container-site max-w-3xl">
            <SectionHeader pattern="B" title={section.title} />
            <p className="mt-6 text-muted leading-relaxed">{section.body}</p>
          </div>
        </section>
      ))}

      <ComparisonTable
        title={c.table.title}
        subtitle={c.table.subtitle}
        columns={c.table.columns}
        rows={c.table.rows}
      />

      <FAQSection items={c.faqs} />

      <RelatedLinks serviceLinks={c.relatedLinks} agencyHub />

      <CTAArchetype archetype="tool" headline={c.ctaHeadline} subtitle={c.ctaSubtitle} ctaLabel={c.ctaLabel} ctaHref="/contact" />
    </>
  );
}
