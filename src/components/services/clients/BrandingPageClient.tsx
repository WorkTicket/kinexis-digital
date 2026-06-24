"use client";

import { useState } from "react";
import { m as motion } from "@/lib/framer";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import CaseStudyProof from "@/components/ui/CaseStudyProof";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { brandingPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { BrandingContent } from "@/content/services/branding";
import { getServiceHeroTheme } from "@/lib/service-hero";
import { getServiceProof } from "@/lib/service-proofs";
import BrandingHeroViz from "@/components/services/hero-viz/BrandingHeroViz";

const LAYER_ABBREVS = ["Type", "Color", "Image", "Layout", "Digital", "Guide"] as const;

type Props = { content: BrandingContent };

export default function BrandingPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("branding");
  const proof = getServiceProof("branding");
  const [activePhase, setActivePhase] = useState(0);

  const evolutionPhaseColors = [
    "from-gray-500 to-gray-400",
    "from-gray-400 to-blue-500",
    "from-blue-500 to-neon-cyan",
    "from-neon-cyan to-teal-400",
  ];

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        theme={getServiceHeroTheme("branding")}
        label={seo.hero.label}
        headline={
          <>
            <span className="type-hero-line">{seo.hero.line1}</span>
            <span className="type-hero-line">{seo.hero.line2}</span>
          </>
        }
        subtitle={seo.hero.subtitle}
        ctaLabel={c.hero.ctaLabel}
        ctaHref="/contact"
  breadcrumbs={breadcrumbs}
        visualizationClassName="hero__viz-inner--service-page"
        visualization={<BrandingHeroViz />}
      />

      <ServiceSeoSections slug="branding" locale={locale} />

      <ServicePillarSections content={brandingPillarContent} />

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.evolution.title}
            subtitle={c.evolution.subtitle}
          />
          <div>
            <div className="flex flex-wrap gap-2 mb-10">
              {c.evolution.phases.map((p, i) => (
                <button
                  key={p.phase}
                  onClick={() => setActivePhase(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activePhase === i
                      ? "bg-neon-cyan text-bg-dark"
                      : "border border-white/[0.1] text-muted hover:border-white/20"
                  }`}
                >
                  {p.phase}
                </button>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-bg p-8 md:p-12">
              <div className="flex items-start gap-6">
                <motion.div
                  key={activePhase}
                  className={`h-16 w-1 rounded-full bg-gradient-to-b ${evolutionPhaseColors[activePhase]}`}
                  initial={{ height: 0 }}
                  animate={{ height: 64 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="flex-1">
                  <motion.span
                    key={`label-${activePhase}`}
                    className="text-xs font-semibold uppercase tracking-widest text-neon-cyan"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {c.evolution.phases[activePhase].label}
                  </motion.span>
                  <motion.p
                    key={`desc-${activePhase}`}
                    className="mt-4 text-lg leading-relaxed text-muted max-w-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {c.evolution.phases[activePhase].desc}
                  </motion.p>
                  <motion.div
                    key={`meta-${activePhase}`}
                    className="mt-8 flex items-center gap-4 text-sm text-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <span className="text-neon-cyan font-semibold">{c.evolution.phases[activePhase].phase}</span>
                    <span className="text-white/20">|</span>
                    <span>{c.evolution.durationLabel} {c.evolution.phases[activePhase].duration}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section--editorial">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.identitySystem.title}
            subtitle={c.identitySystem.subtitle}
          />
          {proof && (
            <div className="section-content-tight mb-10">
              <CaseStudyProof
                result={proof.result}
                client={proof.client}
                href={proof.href}
              />
            </div>
          )}
          <div className="section-content space-y-0 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {c.identitySystem.layers.map((layer, i) => (
              <motion.div
                key={layer.id}
                className="grid gap-grid-sm py-8 md:grid-cols-[100px_1fr] md:items-start md:gap-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan/60">
                  {LAYER_ABBREVS[i]}
                </span>
                <div>
                  <h3 className="text-lg font-bold md:text-xl">{layer.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted max-w-2xl">{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section--visual">
        <div className="container-site">
          <SectionHeader
            pattern="B"
            title={c.process.title}
            subtitle={c.process.subtitle}
          />
          <div className="section-content">
            <ServicePhaseList phases={c.process.phases} />
          </div>
        </div>
      </section>

      <ServicePageFooter slug="branding" locale={locale} existingFaqs={c.faqs} />

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
