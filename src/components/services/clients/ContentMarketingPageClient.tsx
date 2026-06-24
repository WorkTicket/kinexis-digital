"use client";

import { m as motion } from "@/lib/framer";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import CTAArchetype from "@/components/ui/CTAArchetype";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import { FileText, BookOpen, Mail, Share2 } from "lucide-react";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { contentMarketingPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { ContentMarketingContent } from "@/content/services/content-marketing";
import ContentMarketingHeroViz from "@/components/services/hero-viz/ContentMarketingHeroViz";

const contentTypeIcons = {
  blogPosts: BookOpen,
  leadMagnets: FileText,
  emailSequences: Mail,
  repurposedAssets: Share2,
} as const;

type Props = { content: ContentMarketingContent };

export default function ContentMarketingPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("content-marketing");

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
        visualization={
          <ContentMarketingHeroViz
            labels={c.production.contentTypes.map((ct) => ({ id: ct.id, vizLabel: ct.vizLabel }))}
          />
        }
      />

      <ServiceSeoSections slug="content-marketing" locale={locale} />

      <ServicePillarSections content={contentMarketingPillarContent} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.funnel.title}
            subtitle={c.funnel.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-4">
            {c.funnel.stages.map((stage, i) => (
              <motion.div
                key={stage.id}
                className="rounded-xl border border-white/[0.06] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-neon-cyan/10 px-5 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{stage.stage}</span>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/50">{c.funnel.formatLabel}</span>
                    <p className="text-sm mt-0.5">{stage.format}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/50">{c.funnel.goalLabel}</span>
                    <p className="text-sm mt-0.5 text-muted">{stage.goal}</p>
                  </div>
                  <div className="pt-2 border-t border-white/[0.04]">
                    <span className="text-lg font-bold gradient-text">{stage.conversion}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.production.title}
            subtitle={c.production.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-4">
            {c.production.contentTypes.map((ct) => {
              const Icon = contentTypeIcons[ct.id as keyof typeof contentTypeIcons];
              return (
                <CardFamily key={ct.id} family="dashboard">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">{ct.label}</span>
                  </div>
                  <div className="text-lg font-bold gradient-text">{ct.output}</div>
                  <div className="mt-1 text-xs text-muted/60">{ct.impact}</div>
                </CardFamily>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader
            pattern="B"
            title={c.process.title}
            subtitle={c.process.subtitle}
          />
          <ServicePhaseList phases={c.process.phases} />
        </div>
      </section>

      <ServicePageFooter slug="content-marketing" locale={locale} existingFaqs={c.faqs} />

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
