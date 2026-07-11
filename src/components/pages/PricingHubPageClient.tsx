"use client";

import { ArrowRight, DollarSign } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { m as motion } from "@/lib/framer";
import HeroArchetype from "@/components/ui/HeroArchetype";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import TwoLineText from "@/components/ui/TwoLineText";
import Section from "@/components/shared/services/Section";
import { cn } from "@/lib/utils";
import type { PricingHubPageContent } from "@/content/pricing/pricing-hub-page";
import type { PricingHubSection } from "@/lib/pricing-hub-data";

type Props = {
  content: PricingHubPageContent;
  sections: PricingHubSection[];
};

export default function PricingHubPageClient({ content: c, sections }: Props) {
  let surfaceIndex = 0;

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
        ctaLabel={c.hero.secondaryCtaLabel}
        ctaHref="/contact"
        secondaryCtaLabel={c.viewPricing}
        secondaryCtaHref="#pricing-services"
      />

      <Section id="pricing-intro" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-3xl">
          <SectionHeader title={c.intro.title} headingId="pricing-intro-heading" />
          <div className="section-content space-y-5 text-muted leading-relaxed type-body">
            {c.intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <div id="pricing-services">
        {sections.map((section) => (
          <Section
            key={section.key}
            id={`pricing-${section.key}`}
            surfaceIndex={surfaceIndex++}
          >
            <div className="container-site">
              <SectionHeader
                title={section.title}
                description={section.subtitle}
                headingId={`pricing-${section.key}-heading`}
              />

              <div
                className={cn(
                  "grid gap-5 sm:grid-cols-2",
                  section.cards.length === 2 ? "lg:grid-cols-2 lg:max-w-2xl lg:mx-auto" : "lg:grid-cols-3",
                )}
              >
                {section.cards.map((card, index) => (
                  <motion.div
                    key={card.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={card.href} className="group block h-full">
                      <Card className="flex h-full flex-col border-white/[0.06] transition-all duration-500 hover:border-neon-cyan/20 hover:shadow-[0_8px_30px_-8px_rgba(0,212,255,0.12)]">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neon-cyan/[0.12] bg-neon-cyan/[0.05] transition-colors duration-500 group-hover:border-neon-cyan/25 group-hover:bg-neon-cyan/[0.1]">
                            <DollarSign className="h-4 w-4 text-neon-cyan/60 transition-colors duration-500 group-hover:text-neon-cyan" aria-hidden />
                          </div>
                          <h3 className="type-subheader transition-colors duration-500 group-hover:text-neon-cyan">
                            <TwoLineText text={card.label} variant="subheader" />
                          </h3>
                        </div>
                        <p className="type-body flex-1 text-white/50">{card.description}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
                          <span className="text-xs font-semibold text-neon-cyan/75">
                            {c.startingFrom} {card.startingRange}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-white/40 transition-all duration-200 group-hover:text-neon-cyan">
                            {c.viewPricing}
                            <ArrowRight className="h-4 w-4 text-neon-cyan/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        ))}
      </div>

      <CTAArchetype
        archetype="story"
        headline={c.cta.headline}
        subtitle={c.cta.subtitle}
        ctaLabel={c.cta.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
