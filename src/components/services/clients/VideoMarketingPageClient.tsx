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
import { videoMarketingPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { VideoMarketingContent } from "@/content/services/video-marketing";
import VideoMarketingHeroViz from "@/components/services/hero-viz/VideoMarketingHeroViz";
import { Video, Film, Clapperboard, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const productionPhaseIcons: Record<string, LucideIcon> = {
  pre: Clapperboard,
  prod: Video,
  post: Film,
  dist: Play,
};

type Props = { content: VideoMarketingContent };

export default function VideoMarketingPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("video-marketing");

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
        visualization={<VideoMarketingHeroViz labels={c.heroVizLabels} />}
      />

      <ServiceSeoSections slug="video-marketing" locale={locale} />

      <ServicePillarSections content={videoMarketingPillarContent} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.productionSection.title}
            subtitle={c.productionSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-4">
            {c.productionPhases.map((p) => {
              const Icon = productionPhaseIcons[p.id];
              return (
                <CardFamily key={p.id} family="glass">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">{p.phase}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{p.tasks}</p>
                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[10px] text-muted/50">{c.productionSection.durationLabel}</span>
                    <span className="text-sm font-bold gradient-text">{p.duration}</span>
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
            title={c.formatsSection.title}
            subtitle={c.formatsSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-2">
            {c.videoTypes.map((vt) => (
              <CardFamily key={vt.type} family="glass">
                <h3 className="text-base font-bold mb-6">{vt.type}</h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-muted/50 uppercase tracking-wider shrink-0">{c.formatsSection.lengthLabel}</span>
                    <span className="text-sm font-mono font-semibold text-muted">{vt.length}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-muted/50 uppercase tracking-wider shrink-0 pt-0.5">{c.formatsSection.platformLabel}</span>
                    <span className="text-sm text-muted leading-snug text-right">{vt.platform}</span>
                  </div>
                  <div className="pt-5 border-t border-white/[0.06]">
                    <span className="text-xs font-semibold uppercase tracking-widest text-neon-cyan">{vt.goal}</span>
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
                    <AnimatedCounter from={0} to={r.value} prefix={r.prefix} suffix={r.suffix} />
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

      <ServicePageFooter slug="video-marketing" locale={locale} existingFaqs={c.faqs} />

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
