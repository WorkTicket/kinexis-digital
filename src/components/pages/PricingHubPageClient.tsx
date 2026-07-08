"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { m as motion } from "@/lib/framer";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import TwoLineText from "@/components/ui/TwoLineText";
import { pageSectionClasses } from "@/lib/page-section-surface";
import type { PricingHubPageContent } from "@/content/pricing/pricing-hub-page";
import type { PricingHubSection } from "@/lib/pricing-hub-data";

type Props = {
  content: PricingHubPageContent;
  sections: PricingHubSection[];
};

export default function PricingHubPageClient({ content: c, sections }: Props) {
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

      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-site max-w-3xl">
          <SectionHeader pattern="B" title={c.intro.title} />
          <div className="section-content space-y-5 text-muted leading-relaxed type-body">
            {c.intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <div id="pricing-services">
        {sections.map((section, sectionIndex) => (
          <section
            key={section.key}
            className={pageSectionClasses(sectionIndex, {
              className: "border-t border-white/[0.06]",
            })}
          >
            <div className="container-site">
              <SectionHeader pattern="C" title={section.title} subtitle={section.subtitle} />

              <div className="grid gap-grid-sm sm:grid-cols-2 lg:grid-cols-3">
                {section.cards.map((card, index) => (
                  <motion.div
                    key={card.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={card.href} className="group block h-full">
                      <div className="service-card flex h-full flex-col hover:border-neon-cyan/20 hover:bg-neon-cyan/[0.03]">
                        <h3 className="type-subheader group-hover:text-neon-cyan transition-colors duration-500">
                          <TwoLineText text={card.label} variant="subheader" />
                        </h3>
                        <p className="mt-2 type-body flex-1 text-muted">{card.description}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                          <span className="text-xs font-semibold text-neon-cyan/80">
                            {c.startingFrom} {card.startingRange}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-semibold text-white/50 transition-colors group-hover:text-neon-cyan">
                            {c.viewPricing}
                            <ArrowRight className="h-4 w-4 text-neon-cyan/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
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
