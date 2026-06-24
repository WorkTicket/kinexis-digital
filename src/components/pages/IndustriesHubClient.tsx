"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import IndustryCard from "@/components/ui/IndustryCard";
import Button from "@/components/ui/Button";
import { industryCategories } from "@/content/registry/industries";
import type { Locale } from "@/i18n/routing";
import type { industriesHubContent } from "@/content/industries/detail";

type IndustriesHubContent = (typeof industriesHubContent)[Locale];
type Props = { content: IndustriesHubContent };

export default function IndustriesHubClient({ content: c }: Props) {

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        label={c.hero.label}
        headline={
          <>
            <span className="type-hero-line">{c.hero.headlineLine1}</span>
            <span className="type-hero-line">{c.hero.headlineLine2}</span>
          </>
        }
        subtitle={c.hero.subtitle}
        subtitleLineClassName="hero-industries-subtitle-line"
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
        secondaryCtaLabel="See how we work"
        secondaryCtaHref="/digital-marketing-agency"
      />

      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-site max-w-3xl">
          <SectionHeader pattern="B" title={c.intro.title} />
          <div className="section-content space-y-5 text-muted leading-relaxed type-body">
            {c.intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="section-cta-row text-left sm:text-left">
            <Button href="/contact" variant="secondary" fullWidthMobile>
              {c.intro.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      {industryCategories.map((category, ci) => (
        <section key={category.id} className={`section-padding ${ci % 2 === 0 ? "bg-bg-dark" : ""} border-t border-white/[0.06]`}>
          <div className="container-site">
            <SectionHeader pattern="C" title={category.label} subtitle={category.description} />
            <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {category.industries.map((industry, i) => (
                <IndustryCard
                  key={industry.slug}
                  href={`/industries/${category.id}/${industry.slug}`}
                  label={industry.label}
                  description={industry.shortDescription}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTAArchetype
        archetype="story"
        headline="Don't see your industry?"
        subtitle="We work with businesses across dozens of verticals. Book a strategy call and we'll outline an approach tailored to your market."
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
      />
    </>
  );
}
