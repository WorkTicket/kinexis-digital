"use client";

import { m as motion } from "@/lib/framer";
import { Download, MousePointer2, Mail, GitBranch, Smartphone, RefreshCw } from "lucide-react";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProofMetric from "@/components/ui/ProofMetric";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import CaseStudyProof from "@/components/ui/CaseStudyProof";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { funnelsPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { FunnelsContent } from "@/content/services/funnels";
import { getServiceHeroTheme } from "@/lib/service-hero";
import { getServiceProof } from "@/lib/service-proofs";
import FunnelsHeroViz from "@/components/services/hero-viz/FunnelsHeroViz";

const flowStageIds = ["traffic", "landing", "lead", "nurture", "booking", "closed"] as const;
const flowStageRates = ["100%", "64%", "12%", "9%", "3.2%", "1.8%"] as const;
const flowStageColors = [
  "bg-white/10",
  "bg-blue-500/30",
  "bg-neon-cyan/30",
  "bg-neon-cyan/20",
  "bg-green-500/30",
  "bg-emerald-500/40",
] as const;

const resultNumbers: { value: number; prefix?: string; suffix: string }[] = [
  { value: 280, prefix: "+", suffix: "%" },
  { value: 42, suffix: "%" },
  { value: 150, prefix: "+", suffix: "%" },
];

const funnelComponentIcons = [Download, MousePointer2, Mail, GitBranch, Smartphone, RefreshCw] as const;


type Props = { content: FunnelsContent };

export default function FunnelsPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("funnels");
  const proof = getServiceProof("funnels");

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        theme={getServiceHeroTheme("funnels")}
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
        visualization={<FunnelsHeroViz stages={c.flowStages} />}
      />

      <ServiceSeoSections slug="funnels" locale={locale} />

      <ServicePillarSections content={funnelsPillarContent} />

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.leadFlow.title}
            subtitle={c.leadFlow.subtitle}
          />
          <div>
            <div className="rounded-xl border border-white/[0.06] overflow-hidden">
              {flowStageIds.map((id, i) => (
                <motion.div
                  key={id}
                  className="grid grid-cols-[120px_1fr_80px] items-center gap-4 px-6 py-4 border-b border-white/[0.04] last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <span className="text-sm font-medium">{c.flowStages[i].label}</span>
                  <div className="h-4 w-full rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${flowStageColors[i]}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: flowStageRates[i] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className="text-right text-sm font-mono text-neon-cyan">{flowStageRates[i]}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section--editorial">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.automation.title}
            subtitle={c.automation.subtitle}
          />
          <div className="overflow-hidden rounded-xl border border-white/[0.06]">
            <div className="grid grid-cols-[1fr_2fr_100px] gap-px bg-white/[0.06] text-xs md:text-sm">
              <div className="bg-bg px-5 py-4 font-semibold uppercase tracking-wider text-muted">{c.automation.headerTrigger}</div>
              <div className="bg-bg px-5 py-4 font-semibold uppercase tracking-wider text-muted">{c.automation.headerPath}</div>
              <div className="bg-bg px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.automation.headerDelay}</div>
              {c.automation.paths.map((path, i) => (
                <motion.div
                  key={i}
                  className="contents"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <div className="bg-bg-dark px-5 py-4 font-medium">{path.trigger}</div>
                  <div className="bg-bg-dark px-5 py-4 text-muted text-xs">{path.actions}</div>
                  <div className="bg-bg-dark px-5 py-4 text-right text-xs text-muted font-mono">{path.delay}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section--visual">
        <div className="container-site">
          <SectionHeader
            pattern="B"
            title={c.components.title}
            subtitle={c.components.subtitle}
          />
          <div className="section-content grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.components.items.map((item, i) => {
              const Icon = funnelComponentIcons[i];
              return (
                <motion.div
                  key={item.id}
                  className="group motion-card flex flex-col rounded-2xl border border-white/[0.06] bg-bg-dark p-7"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-neon-cyan/[0.08] transition-colors duration-300 group-hover:bg-neon-cyan/[0.12]">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <h3 className="mb-2 text-base font-bold">{item.label}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding section--proof">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.results.title}
            subtitle={c.results.subtitle}
          />
          {proof && (
            <div className="section-content-tight mb-12">
              <CaseStudyProof
                result={proof.result}
                client={proof.client}
                href={proof.href}
              />
            </div>
          )}
          <div className="section-content grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-3">
            {c.results.items.map((r, i) => (
              <div key={i} className="bg-bg-dark p-8 text-center md:p-10">
                <ProofMetric
                  size="lg"
                  value={
                    <AnimatedCounter
                      from={0}
                      to={resultNumbers[i].value}
                      prefix={resultNumbers[i].prefix}
                      suffix={resultNumbers[i].suffix}
                    />
                  }
                  label={r.label}
                  description={r.desc}
                  className="[&_.type-metric-label]:font-semibold"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader
            pattern="B"
            title={c.phases.title}
            subtitle={c.phases.subtitle}
          />
          <div className="section-content">
            <ServicePhaseList phases={c.phases.items} />
          </div>
        </div>
      </section>

      <ServicePageFooter slug="funnels" locale={locale} existingFaqs={c.faqs} />

      <CTAArchetype
        archetype="tool"
        headline={c.cta.headline}
        subtitle={c.cta.subtitle}
        ctaLabel={c.cta.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
