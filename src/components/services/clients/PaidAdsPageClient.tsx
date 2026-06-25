"use client";

import dynamic from "next/dynamic";
import { m as motion } from "@/lib/framer";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
const DataStoryPanel = dynamic(() => import("@/components/ui/DataViz/DataStoryPanel"));
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { paidAdsPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { PaidAdsContent } from "@/content/services/paid-ads";
import { getServiceHeroTheme } from "@/lib/service-hero";
import PaidAdsHeroViz from "@/components/services/hero-viz/PaidAdsHeroViz";
import ProofMetric from "@/components/ui/ProofMetric";

const channelNumbers = [
  { spend: 45, roas: 4.2, conv: 3.8, statusKey: "scaling" as const },
  { spend: 25, roas: 3.6, conv: 2.9, statusKey: "optimizing" as const },
  { spend: 20, roas: 5.1, conv: 4.2, statusKey: "scaling" as const },
  { spend: 10, roas: 2.8, conv: 1.5, statusKey: "testing" as const },
];

const budgetNumbers = [
  { pct: 45, color: "from-neon-cyan to-neon-blue" },
  { pct: 25, color: "from-neon-blue to-[#007aa3]" },
  { pct: 18, color: "from-[#007aa3] to-[#005f80]" },
  { pct: 12, color: "from-[#005f80] to-[#003d52]" },
];

const roasChartData = [1.8, 2.4, 3.1, 3.6, 4.0, 4.3, 4.5];
const cplChartData = [85, 72, 58, 48, 38, 32, 28];
const convChartData = [1.2, 1.8, 2.4, 3.1, 3.8, 4.5, 5.2];
const monthLabels = ["M1", "M2", "M3", "M4", "M5", "M6", "M7"];

function statusClass(statusKey: "scaling" | "optimizing" | "testing") {
  if (statusKey === "scaling") return "bg-green-500/10 text-green-400";
  if (statusKey === "optimizing") return "bg-yellow-500/10 text-yellow-400";
  return "bg-blue-500/10 text-blue-400";
}

type Props = { content: PaidAdsContent };

export default function PaidAdsPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("paid-ads");

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        theme={getServiceHeroTheme("paid-ads")}
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
        visualization={<PaidAdsHeroViz variant="paid-ads" channelLabels={c.channels} />}
      />

      <ServiceSeoSections slug="paid-ads" locale={locale} />

      <ServicePillarSections content={paidAdsPillarContent} />

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.roasDashboard.title}
            subtitle={c.roasDashboard.subtitle}
          />
          <div className="section-content overflow-hidden rounded-xl border border-white/[0.06]">
            <div className="grid grid-cols-[1fr_100px_100px_120px] gap-px bg-white/[0.06] text-xs md:text-sm">
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">{c.roasDashboard.headerChannel}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.roasDashboard.headerSpend}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.roasDashboard.headerRoas}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.roasDashboard.headerStatus}</div>
              {channelNumbers.map((num, i) => (
                <motion.div
                  key={i}
                  className="contents"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <div className="bg-bg px-5 py-4 font-medium flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-neon-cyan" />
                    {c.channels[i].channel}
                  </div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-muted">{num.spend}%</div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-neon-cyan font-semibold">{num.roas}x</div>
                  <div className="bg-bg px-5 py-4 text-right">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass(num.statusKey)}`}>
                      {c.channels[i].status}
                    </span>
                  </div>
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
            title={c.budget.title}
            subtitle={c.budget.subtitle}
          />
          <div className="section-content space-y-5 max-w-2xl">
            {budgetNumbers.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{c.budget.sources[i].source}</span>
                  <span className="text-sm font-mono text-muted">{item.pct}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section--visual">
        <div className="container-site">
          <SectionHeader
            pattern="B"
            title={c.conversion.title}
            subtitle={c.conversion.subtitle}
          />
          <div className="section-content divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {c.conversion.cards.map((item, i) => (
              <motion.div
                key={i}
                className="grid gap-grid-sm py-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-end md:gap-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <h3 className="text-xl font-bold md:text-2xl">{item.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted max-w-xl">{item.desc}</p>
                </div>
                <div className="md:text-right">
                  <ProofMetric value={item.metric} size="lg" align="right" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section--editorial">
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

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.results.title}
            subtitle={c.results.subtitle}
          />
          <div className="section-content space-y-8">
            <DataStoryPanel
              label={c.results.panels[0].label}
              headline={c.results.panels[0].headline}
              description={c.results.panels[0].description}
              chartType="revenue"
              data={roasChartData}
              labels={monthLabels}
              metric={c.results.panels[0].metric}
            />
            <DataStoryPanel
              label={c.results.panels[1].label}
              headline={c.results.panels[1].headline}
              description={c.results.panels[1].description}
              chartType="ranking"
              data={cplChartData}
              labels={monthLabels}
              metric={c.results.panels[1].metric}
            />
            <DataStoryPanel
              label={c.results.panels[2].label}
              headline={c.results.panels[2].headline}
              description={c.results.panels[2].description}
              chartType="growth"
              data={convChartData}
              labels={monthLabels}
              metric={c.results.panels[2].metric}
            />
          </div>
        </div>
      </section>

      <ServicePageFooter slug="paid-ads" locale={locale} existingFaqs={c.faqs} />

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
