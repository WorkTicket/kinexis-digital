"use client";

import { useState, Fragment } from "react";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import CTAArchetype from "@/components/ui/CTAArchetype";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import TwoLineText from "@/components/ui/TwoLineText";
import {
  ArrowRight,
  Search,
  Globe,
  Megaphone,
  BarChart3,
  Palette,
  FileText,
  Mail,
  Share2,
  Video,
  Target,
  LineChart,
  Workflow,
  Users,
  GraduationCap,
  Gauge,
  ShieldCheck,
  Settings,
  Zap,
  MapPin,
  PenTool,
} from "lucide-react";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import Section from "@/components/shared/services/Section";
import SeoHeroViz from "@/components/services/hero-viz/SeoHeroViz";
import WebDesignHeroViz from "@/components/services/hero-viz/WebDesignHeroViz";
import PaidAdsHeroViz from "@/components/services/hero-viz/PaidAdsHeroViz";
import type { ServicesPageContent } from "@/content/services-page";

const serviceIcons: Record<string, typeof Search> = {
  seo: Search,
  localSeo: MapPin,
  ppcManagement: Megaphone,
  googleAds: Megaphone,
  metaAds: Share2,
  youtubeAds: Video,
  microsoftAds: Megaphone,
  webDesign: Globe,
  landingPages: Target,
  websiteMaintenance: ShieldCheck,
  websiteSpeed: Gauge,
  cro: LineChart,
  funnels: Workflow,
  email: Mail,
  branding: Palette,
  content: FileText,
  copywriting: PenTool,
  social: Share2,
  video: Video,
  analytics: BarChart3,
  consulting: Zap,
  marketingAudits: Settings,
  marketingAutomation: Workflow,
  fractionalCmo: Users,
  trainingWorkshops: GraduationCap,
};

const serviceHrefs: Record<string, string> = {
  seo: "/services/seo",
  localSeo: "/services/local-seo",
  paidAds: "/services/ppc-management",
  googleAds: "/services/ppc-management",
  metaAds: "/services/meta-ads",
  ppcManagement: "/services/ppc-management",
  youtubeAds: "/services/youtube-ads",
  microsoftAds: "/services/microsoft-ads",
  webDesign: "/services/web-design",
  landingPages: "/services/landing-pages",
  websiteMaintenance: "/services/website-maintenance",
  websiteSpeed: "/services/website-speed",
  cro: "/services/cro",
  funnels: "/services/funnels",
  email: "/services/email-marketing",
  branding: "/services/branding",
  content: "/services/content-marketing",
  copywriting: "/services/copywriting",
  social: "/services/social-media",
  video: "/services/video-marketing",
  analytics: "/services/analytics",
  consulting: "/services/growth-consulting",
  marketingAudits: "/services/marketing-audits",
  marketingAutomation: "/services/marketing-automation-crm",
  fractionalCmo: "/services/fractional-cmo",
  trainingWorkshops: "/services/training-workshops",
};

const pathwayConfig: Record<string, { href: string }> = {
  seo: { href: "/services/seo" },
  webDesign: { href: "/services/web-design" },
  paidAds: { href: "/services/ppc-management" },
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
      <Section id="services" surfaceIndex={0} className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/[0.02] blur-[160px] pointer-events-none" />
        <div className="container-site relative z-10">
          <SectionHeader
            title={c.capabilities.title} description={c.capabilities.subtitle}
            headingId="services-heading"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {c.capabilities.services.map((svc, i) => {
              const Icon = serviceIcons[svc.id] ?? Settings;
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={serviceHrefs[svc.id]} className="group block h-full">
                    <Card className="h-full flex flex-col border-white/[0.06] transition-all duration-500 hover:border-neon-cyan/20 hover:shadow-[0_8px_30px_-8px_rgba(0,212,255,0.12)]">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-neon-cyan/[0.1] bg-neon-cyan/[0.04] transition-colors duration-500 group-hover:border-neon-cyan/25 group-hover:bg-neon-cyan/[0.08]">
                        <Icon className="h-4 w-4 text-neon-cyan/50 transition-colors duration-500 group-hover:text-neon-cyan" aria-hidden />
                      </div>
                      <h3 className="type-subheader transition-colors duration-500 group-hover:text-neon-cyan">
                        <TwoLineText text={svc.label} variant="subheader" />
                      </h3>
                      <p className="mt-2 type-body text-white/45 flex-1">
                        {svc.description}
                      </p>
                      <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                        <span className="text-xs font-semibold text-neon-cyan/70">{svc.stat}</span>
                        <ArrowRight className="h-4 w-4 text-neon-cyan/30 group-hover:text-neon-cyan group-hover:translate-x-0.5 transition-all duration-200" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Service Pathways */}
      <Section id="service-pathways" surfaceIndex={1}>
        <div className="container-site">
          <SectionHeader
            badge={c.pathways.sectionLabel}
            title={c.pathways.title}
            description={c.pathways.subtitle}
            headingId="service-pathways-heading"
          />

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
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>
                  <h3 className="type-subheader"><TwoLineText text={p.headline} variant="subheader" /></h3>
                  <p className="mt-4 text-base leading-relaxed text-white/50">{p.description}</p>
                  <ul className="mt-6 space-y-3">
                    {p.results.map((r) => (
                      <li key={r} className="flex items-center gap-3 text-sm text-white/45">
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
      </Section>

      {/* How Services Work Together */}
      <Section id="service-integration" surfaceIndex={2} className="relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-neon-blue/[0.02] blur-[120px] pointer-events-none" />
        <div className="container-site relative z-10">
          <SectionHeader
            title={c.integration.title} description={c.integration.subtitle}
            headingId="service-integration-heading"
          />

          <motion.div
            className="rounded-3xl border border-white/[0.06] bg-white/[0.01] overflow-hidden"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
              {c.integration.phases.map((phase) => (
                  <motion.div key={phase.phase} variants={fadeIn} className="p-8 md:p-10">
                    <h3 className="type-subheader">{phase.phase}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/45 mb-6">{phase.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.services.map((s) => (
                        <span key={s} className="shrink-0 whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/40">
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
            className="section-cta-row text-sm text-white/35 max-w-2xl mx-auto"
          >
            {c.integration.footnote}
          </motion.p>
        </div>
      </Section>

      {/* Industry Solutions */}
      <Section id="industry-solutions" surfaceIndex={3}>
        <div className="container-site">
          <SectionHeader
            badge={c.industries.sectionLabel}
            title={c.industries.title}
            description={<TwoLineText text={c.industries.subtitle} variant="body" />}
            headingId="industry-solutions-heading"
          />

          <div className="section-content flex flex-wrap gap-2">
            {c.industries.items.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-500 border ${
                    activeIndustry === ind.id
                      ? "bg-neon-cyan text-bg-dark border-neon-cyan shadow-lg shadow-neon-cyan/20"
                      : "border-white/[0.08] text-white/45 hover:border-white/15 hover:text-white"
                  }`}
                >
                  {ind.label}
                </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              className="section-content grid gap-5 md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {c.industries.items.filter((i) => i.id === activeIndustry).map((ind) => (
                <Fragment key={ind.id}>
                  <Card className="!p-8 border-white/[0.06]">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{c.industries.panelServices}</span>
                    <ul className="mt-6 space-y-3">
                      {ind.services.map((s) => (
                        <li key={s} className="flex items-center gap-3 text-sm text-white/45">
                          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Card>
                  <Card className="!p-8 border-white/[0.06]">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{c.industries.panelStrategy}</span>
                    <p className="mt-6 text-sm leading-relaxed text-white/45">{ind.strategy}</p>
                  </Card>
                  <Card className="!p-8 border-white/[0.06]">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{c.industries.panelOutcomes}</span>
                    <ul className="mt-6 space-y-3">
                      {ind.outcomes.map((o) => (
                        <li key={o} className="flex items-center gap-3 text-sm text-white/45">
                          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60 flex-shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </Card>
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
      </Section>

      <CTAArchetype
        headline={c.cta.title}
        subtitle={c.cta.subtitle}
        ctaLabel={c.cta.button}
        ctaHref="/contact"
      />
    </>
  );
}
