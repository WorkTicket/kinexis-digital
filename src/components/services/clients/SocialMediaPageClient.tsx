"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import CTAArchetype from "@/components/ui/CTAArchetype";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProofMetric from "@/components/ui/ProofMetric";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { socialMediaPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { SocialMediaContent } from "@/content/services/social-media";
import SocialMediaHeroViz from "@/components/services/hero-viz/SocialMediaHeroViz";
import { Share2, MessageCircle, Camera } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const platformIcons: Record<string, LucideIcon> = {
  linkedin: Share2,
  instagram: Camera,
  twitter: MessageCircle,
};

type Props = { content: SocialMediaContent };

export default function SocialMediaPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("social-media");

  return (
    <>
      <HeroArchetype
        archetype="showcase"
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
        visualization={<SocialMediaHeroViz platforms={c.platformData} />}
      />

      <ServiceSeoSections slug="social-media" locale={locale} />

      <ServicePillarSections content={socialMediaPillarContent} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.platformSection.title}
            subtitle={c.platformSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-3">
            {c.platformData.map((p) => {
              const Icon = platformIcons[p.id];
              return (
                <CardFamily key={p.id} family="glass">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                    <span className="text-lg font-bold">{p.platform}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/50">
                        {c.platformSection.labels.audience}
                      </span>
                      <p className="text-sm mt-0.5">{p.audience}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/50">
                        {c.platformSection.labels.cadence}
                      </span>
                      <p className="text-sm mt-0.5 text-muted">{p.freq}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/50">
                        {c.platformSection.labels.format}
                      </span>
                      <p className="text-sm mt-0.5 text-muted">{p.format}</p>
                    </div>
                    <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                      <span className="text-xs text-muted">{c.platformSection.labels.engagement}</span>
                      <span className="text-lg font-bold gradient-text">{p.eng}</span>
                    </div>
                  </div>
                </CardFamily>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.pillarSection.title}
            subtitle={c.pillarSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-4">
            {c.pillarContent.map((p) => (
              <CardFamily key={p.pillar} family="editorial">
                <div className="flex items-start gap-4">
                  <div className="h-2 w-2 rounded-full bg-neon-cyan mt-2 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm">{p.pillar}</h3>
                    <p className="mt-1 text-xs text-muted">{p.examples}</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-neon-cyan">
                      {p.roi}
                    </p>
                  </div>
                </div>
              </CardFamily>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.metricsSection.title}
            subtitle={c.metricsSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-3 items-stretch">
            {c.metricsSection.metrics.map((r) => (
              <CardFamily key={r.label} family="dashboard" className="h-full">
                <ProofMetric
                  size="lg"
                  value={
                    <AnimatedCounter
                      from={0}
                      to={r.value}
                      prefix={r.prefix}
                      suffix={r.suffix}
                      decimals={r.decimals}
                    />
                  }
                  label={r.label}
                  description={r.desc}
                />
              </CardFamily>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="B"
            title={c.processSection.title}
            subtitle={c.processSection.subtitle}
          />
          <ServicePhaseList phases={c.phases} />
        </div>
      </section>

      <ServicePageFooter slug="social-media" locale={locale} existingFaqs={c.faqs} />

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
