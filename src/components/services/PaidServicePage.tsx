"use client";

import dynamic from "next/dynamic";
import { m as motion } from "@/lib/framer";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
const DataStoryPanel = dynamic(() => import("@/components/ui/DataViz/DataStoryPanel"));
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { getServiceSeoContent } from "@/content/service-seo";
import type { PaidAdsContent } from "@/content/services/paid-ads";
import {
  ppcPillarContent,
  googleAdsPillarContent,
  metaAdsPillarContent,
  type PaidServiceVariant,
} from "@/content/services/paid-service-pillar";
import type { Locale } from "@/i18n/routing";
import type { ServiceSlug } from "@/content/registry/site-routes";
import { getServiceHeroTheme } from "@/lib/service-hero";
import PaidAdsHeroViz from "@/components/services/hero-viz/PaidAdsHeroViz";
import { serviceLabels } from "@/content/registry/site-routes";
import type { BreadcrumbItem } from "@/lib/schema";

const channelNumbers = [
  { spend: 45, roas: 4.2, conv: 3.8, statusKey: "scaling" as const },
  { spend: 25, roas: 3.6, conv: 2.9, statusKey: "optimizing" as const },
  { spend: 20, roas: 5.1, conv: 4.2, statusKey: "scaling" as const },
  { spend: 10, roas: 2.8, conv: 1.5, statusKey: "testing" as const },
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

const pillarMap = {
  ppc: ppcPillarContent,
  "google-ads": googleAdsPillarContent,
  "meta-ads": metaAdsPillarContent,
};

export default function PaidServicePage({
  variant,
  locale,
  content: c,
  slug,
}: {
  variant: PaidServiceVariant;
  locale: Locale;
  content: PaidAdsContent;
  slug: ServiceSlug;
}) {
  const seoHero = getServiceSeoContent(slug, locale).hero;
  const hero = {
    label: seoHero.label,
    line1: seoHero.line1,
    line2: seoHero.line2,
    subtitle: seoHero.subtitle,
  };
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: serviceLabels[slug] ?? seoHero.label },
  ];
  const pillar = pillarMap[variant];

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        theme={getServiceHeroTheme(variant === "ppc" ? "ppc-management" : variant)}
        label={hero.label}
        headline={
          <>
            <span className="type-hero-line">{hero.line1}</span>
            <span className="type-hero-line">{hero.line2}</span>
          </>
        }
        subtitle={hero.subtitle}
        ctaLabel={c.hero.ctaLabel}
        ctaHref="/contact"
        breadcrumbs={breadcrumbs}
        visualizationClassName="hero__viz-inner--service-page"
        visualization={<PaidAdsHeroViz variant={variant} channelLabels={c.channels} />}
      />

      <ServiceSeoSections slug={slug} locale={locale} />

      <ServicePillarSections content={pillar} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader pattern="C" title={c.roasDashboard.title} subtitle={c.roasDashboard.subtitle} />
          <div className="overflow-hidden rounded-xl border border-white/[0.06]">
            <div className="grid grid-cols-[1fr_100px_100px_120px] gap-px bg-white/[0.06] text-xs md:text-sm">
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">{c.roasDashboard.headerChannel}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.roasDashboard.headerSpend}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.roasDashboard.headerRoas}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.roasDashboard.headerStatus}</div>
              {channelNumbers.map((num, i) => (
                <motion.div key={i} className="contents" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}>
                  <div className="bg-bg px-5 py-4 font-medium flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-neon-cyan" />
                    {c.channels[i].channel}
                  </div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-muted">{num.spend}%</div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-neon-cyan font-semibold">{num.roas}x</div>
                  <div className="bg-bg px-5 py-4 text-right">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass(num.statusKey)}`}>{c.channels[i].status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader pattern="B" title={c.phases.title} subtitle={c.phases.subtitle} />
          <ServicePhaseList phases={c.phases.items} />
        </div>
      </section>

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader pattern="C" title={c.results.title} subtitle={c.results.subtitle} />
          <div className="space-y-8">
            {c.results.panels.map((panel, i) => (
              <DataStoryPanel
                key={panel.label}
                label={panel.label}
                headline={panel.headline}
                description={panel.description}
                chartType={i === 0 ? "revenue" : i === 1 ? "growth" : "growth"}
                data={i === 0 ? roasChartData : i === 1 ? cplChartData : convChartData}
                labels={monthLabels}
                metric={panel.metric}
              />
            ))}
          </div>
        </div>
      </section>

      <ServicePageFooter slug={slug} locale={locale} />

      <CTAArchetype archetype="tool" headline={c.cta.headline} subtitle={c.cta.subtitle} ctaLabel={c.cta.ctaLabel} ctaHref="/contact" />
    </>
  );
}
