"use client";

import { useState, Fragment } from "react";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import CTAArchetype from "@/components/ui/CTAArchetype";
import Button from "@/components/ui/Button";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import TwoLineText from "@/components/ui/TwoLineText";
import {
  ArrowRight,
} from "lucide-react";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { pageSectionClasses } from "@/lib/page-section-surface";
import SeoHeroViz from "@/components/services/hero-viz/SeoHeroViz";
import WebDesignHeroViz from "@/components/services/hero-viz/WebDesignHeroViz";
import PaidAdsHeroViz from "@/components/services/hero-viz/PaidAdsHeroViz";
import type { ServicesPageContent } from "@/content/services-page";


const serviceHrefs: Record<string, string> = {
  seo: "/services/seo",
  localSeo: "/services/local-seo",
  paidAds: "/services/paid-ads",
  googleAds: "/services/google-ads",
  metaAds: "/services/meta-ads",
  ppcManagement: "/services/ppc-management",
  webDesign: "/services/web-design",
  cro: "/services/funnels",
  funnels: "/services/funnels",
  email: "/services/email-marketing",
  branding: "/services/branding",
  content: "/services/content-marketing",
  social: "/services/social-media",
  video: "/services/video-marketing",
  analytics: "/services/analytics",
  consulting: "/services/growth-consulting",
};

const pathwayConfig: Record<string, { href: string }> = {
  seo: { href: "/services/seo" },
  webDesign: { href: "/services/web-design" },
  paidAds: { href: "/services/paid-ads" },
};

function getPathwayHeroViz(id: string, c: ServicesPageContent) {
  switch (id) {
    case "seo":
      return <SeoHeroViz labels={{ rankings: c.pathways.seoVisual.chartTitle }} />;
    case "webDesign":
      return <WebDesignHeroViz />;
    case "paidAds":
      return <PaidAdsHeroViz variant="paid-ads" />;
    default:
      return null;
  }
}

type Props = { content: ServicesPageContent };

export default function ServicesHubClient({ content: c }: Props) {
  const { fadeUp, stagger, fadeIn } = useMotionVariants();
  const [activeIndustry, setActiveIndustry] = useState("saas");

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
        ctaLabel={c.hero.ctaLabel}
        ctaHref="/contact"
        secondaryCtaLabel={c.hero.secondaryCtaLabel}
        secondaryCtaHref="#services"
      />

      {/* Full-Service Capabilities */}
      <section id="services" className={pageSectionClasses(0, { className: "relative overflow-hidden" })}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/[0.02] blur-[160px] pointer-events-none" />
        <div className="container-site relative z-10">
          <SectionHeader
            pattern="C"
            title={c.capabilities.title}
            subtitle={c.capabilities.subtitle}
          />

          <div className="grid gap-grid-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {c.capabilities.services.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={serviceHrefs[svc.id]} className="group block h-full">
                    <div className="service-card h-full flex flex-col hover:border-neon-cyan/20 hover:bg-neon-cyan/[0.03]">
                      <h3 className="type-subheader group-hover:text-neon-cyan transition-colors duration-500">
                        <TwoLineText text={svc.label} variant="subheader" />
                      </h3>
                      <p className="mt-2 type-body text-muted flex-1">
                        {svc.description}
                      </p>
                      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-xs font-semibold text-neon-cyan/80">{svc.stat}</span>
                        <ArrowRight className="h-4 w-4 text-neon-cyan/40 group-hover:text-neon-cyan group-hover:translate-x-0.5 transition-all duration-200" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Pathways */}
      <section className={pageSectionClasses(1)}>
        <div className="container-site">
          <motion.div className="service-section-header mx-auto max-w-6xl" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">{c.pathways.sectionLabel}</motion.span>
            <motion.h2 variants={fadeUp} className="type-section mt-4 whitespace-nowrap leading-[1.1]">
              {c.pathways.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="service-section-subtitle !ml-0">
              {c.pathways.subtitle}
            </motion.p>
          </motion.div>

          <div className="section-content space-y-24">
            {c.pathways.items.map((p, idx) => (
              <motion.div
                key={p.id}
                className={`grid gap-grid-lg items-center ${idx % 2 === 0 ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]"} ${idx % 2 !== 0 ? "md:direction-rtl" : ""}`}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div variants={fadeUp} className={idx % 2 !== 0 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-neon-cyan">{p.label}</span>
                    <span className="h-px flex-1 bg-white/[0.06]" />
                  </div>
                  <h3 className="type-subheader"><TwoLineText text={p.headline} variant="subheader" /></h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">{p.description}</p>
                  <ul className="mt-6 space-y-2">
                    {p.results.map((r) => (
                      <li key={r} className="flex items-center gap-2 text-sm text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button href={pathwayConfig[p.id].href} variant="secondary">
                      {p.exploreLink}
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className={`pathway-viz ${idx % 2 !== 0 ? "md:order-1" : ""}`}
                >
                  <div className="hero__viz-inner hero__viz-inner--service-page">
                    <div className="hero__viz-content">{getPathwayHeroViz(p.id, c)}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Services Work Together */}
      <section className={pageSectionClasses(2, { className: "relative overflow-hidden" })}>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-neon-blue/[0.02] blur-[120px] pointer-events-none" />
        <div className="container-site relative z-10">
          <SectionHeader
            pattern="B"
            title={c.integration.title}
            subtitle={c.integration.subtitle}
            className="section-header"
          />

          <motion.div
            className="rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
              {c.integration.phases.map((phase) => (
                  <motion.div key={phase.phase} variants={fadeIn} className="p-8 md:p-10">
                    <h3 className="text-xl font-bold">{phase.phase}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted mb-6">{phase.description}</p>
                    <div className="flex flex-nowrap gap-1.5">
                      {phase.services.map((s) => (
                        <span key={s} className="shrink-0 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-cta-row text-sm text-muted/60 max-w-2xl mx-auto"
          >
            {c.integration.footnote}
          </motion.p>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className={pageSectionClasses(3)}>
        <div className="container-site">
          <motion.div className="section-header section-header--left" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">{c.industries.sectionLabel}</motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-4">
              <TwoLineText text={c.industries.title} variant="section" />
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle section-subtitle--left mt-4">
              <TwoLineText text={c.industries.subtitle} variant="body" />
            </motion.p>
          </motion.div>

          <div className="section-content flex flex-wrap gap-2">
            {c.industries.items.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-500 ${
                    activeIndustry === ind.id
                      ? "bg-neon-cyan text-bg-dark shadow-lg shadow-neon-cyan/20"
                      : "border border-white/[0.08] text-muted hover:border-white/20 hover:text-white"
                  }`}
                >
                  {ind.label}
                </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              className="section-content grid gap-grid-lg md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {c.industries.items.filter((i) => i.id === activeIndustry).map((ind) => (
                <Fragment key={ind.id}>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{c.industries.panelServices}</span>
                    <ul className="mt-6 space-y-3">
                      {ind.services.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{c.industries.panelStrategy}</span>
                    <p className="mt-6 text-sm leading-relaxed text-muted">{ind.strategy}</p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{c.industries.panelOutcomes}</span>
                    <ul className="mt-6 space-y-3">
                      {ind.outcomes.map((o) => (
                        <li key={o} className="flex items-center gap-2 text-sm text-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60 flex-shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Fragment>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="section-cta-row">
            <Button href="/industries" variant="secondary" fullWidthMobile>
              {c.industries.viewAllLabel}
            </Button>
          </div>
        </div>
      </section>

      <CTAArchetype
        headline={c.cta.title}
        subtitle={c.cta.subtitle}
        ctaLabel={c.cta.button}
        ctaHref="/contact"
      />
    </>
  );
}
