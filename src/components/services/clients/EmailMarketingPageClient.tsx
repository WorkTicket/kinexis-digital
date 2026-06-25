"use client";

import { m as motion } from "@/lib/framer";
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
import { emailMarketingPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { EmailMarketingContent } from "@/content/services/email-marketing";
import EmailMarketingHeroViz from "@/components/services/hero-viz/EmailMarketingHeroViz";
import { Mail, MessageSquare, Zap, GitBranch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const automationIcons: Record<string, LucideIcon> = {
  welcome: Mail,
  nurture: MessageSquare,
  abandoned: Zap,
  lifecycle: GitBranch,
};

type Props = { content: EmailMarketingContent };

export default function EmailMarketingPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("email-marketing");

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
        visualization={<EmailMarketingHeroViz sequence={c.sequenceMap} />}
      />

      <ServiceSeoSections slug="email-marketing" locale={locale} />

      <ServicePillarSections content={emailMarketingPillarContent} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.sequenceSection.title}
            subtitle={c.sequenceSection.subtitle}
          />
          <div className="overflow-hidden rounded-xl border border-white/[0.06]">
            <div className="grid grid-cols-[80px_1fr_100px_100px] gap-px bg-white/[0.06] text-xs md:text-sm">
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">
                {c.sequenceSection.tableHeaders.timing}
              </div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">
                {c.sequenceSection.tableHeaders.email}
              </div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">
                {c.sequenceSection.tableHeaders.open}
              </div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">
                {c.sequenceSection.tableHeaders.click}
              </div>
              {c.sequenceMap.map((s, i) => (
                <motion.div
                  key={s.day}
                  className="contents"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <div className="bg-bg px-5 py-4 font-mono text-muted">{s.day}</div>
                  <div className="bg-bg px-5 py-4 text-muted">{s.action}</div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-neon-cyan">{s.open}</div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-emerald-400">{s.click}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.automationSection.title}
            subtitle={c.automationSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-4">
            {c.automationTypes.map((at) => {
              const Icon = automationIcons[at.id];
              return (
                <CardFamily key={at.id} family="editorial">
                  <div className="flex items-start gap-4">
                    <Icon className="h-5 w-5 text-neon-cyan mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold">{at.label}</h3>
                      <p className="mt-2 text-xs text-muted leading-relaxed">{at.desc}</p>
                    </div>
                  </div>
                </CardFamily>
              );
            })}
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

      <ServicePageFooter slug="email-marketing" locale={locale} existingFaqs={c.faqs} />

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
