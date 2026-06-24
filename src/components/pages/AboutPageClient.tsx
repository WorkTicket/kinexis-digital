"use client";

import { m as motion } from "@/lib/framer";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import AboutArchitectureMap from "@/components/pages/AboutArchitectureMap";
import CTAArchetype from "@/components/ui/CTAArchetype";
import HeroArchetype from "@/components/ui/HeroArchetype";
import PhaseDot from "@/components/ui/PhaseDot";
import PhaseTag from "@/components/ui/PhaseTag";
import type { AboutContent } from "@/content/about";
import TwoLineText from "@/components/ui/TwoLineText";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = { content: AboutContent };

export default function AboutPageClient({ content: c }: Props) {
  const { fadeUp, stagger } = useMotionVariants();
  return (
    <>
      <HeroArchetype
        archetype="showcase"
        label={c.heroTag}
        headline={
          <>
            <span className="type-hero-line hero-intentional-hero-line">{c.heroTitle}</span>
            <span className="type-hero-line hero-intentional-hero-line gradient-text">{c.heroTitleHighlight}</span>
          </>
        }
        subtitle={c.heroSubtitleLine2 ? `${c.heroSubtitleLine1}|${c.heroSubtitleLine2}` : c.heroSubtitleLine1}
        subtitleLineClassName="hero-intentional-subtitle-line"
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
      />

      {/* SECTION 2: Why KINEXIS Exists — Editorial */}
      <section className="section-padding relative overflow-hidden border-t border-white/[0.06] bg-bg-dark">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-neon-cyan/[0.04] blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-neon-blue/[0.03] blur-[100px]"
          aria-hidden
        />

        <div className="container-site relative z-10">
          {/* Section header — same pattern as every other section */}
          <motion.div
            className="section-header section-header--left"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span variants={fadeUp} className="section-label">
              {c.whyWeExistTag}
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-4">
              <TwoLineText text={c.whyWeExistAside} variant="section" />
            </motion.h2>
          </motion.div>

          {/* Editorial body */}
          <motion.div
            className="section-content grid gap-12 lg:grid-cols-12 lg:gap-20"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Left sticky aside */}
            <motion.div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start" variants={fadeUp}>
              <div className="h-px w-14 bg-gradient-to-r from-neon-cyan/50 via-neon-cyan/20 to-transparent" />
              <p className="mt-6 section-intro section-intro--left">
                {c.whyParagraph1}
              </p>

            </motion.div>

            {/* Right content */}
            <motion.div className="lg:col-span-8 space-y-10 lg:space-y-12" variants={fadeUp}>
              <blockquote className="relative overflow-hidden rounded-3xl border border-surface bg-gradient-to-br from-white/[0.045] via-bg-secondary/90 to-bg-dark/80 p-8 shadow-panel-lg md:p-10 lg:p-12">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/[0.04] via-transparent to-transparent"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-serif text-[7rem] leading-none text-white/[0.03] md:text-[9rem]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <div className="relative border-l-2 border-neon-cyan/40 pl-6 md:pl-8">
                  <p className="text-2xl font-bold leading-[1.15] tracking-tight text-balance md:text-3xl lg:text-4xl">
                    <TwoLineText text={c.whyQuote} variant="section" className="gradient-text" />
                  </p>
                </div>
              </blockquote>

              <div className="space-y-6 border-t border-white/[0.06] pt-10 lg:pt-12">
                <p className="type-body-lg leading-[1.75] text-muted">{c.whyParagraph2}</p>
                <p className="type-body-lg leading-[1.75] text-muted">{c.whyParagraph2b}</p>
                <p className="type-body-lg leading-[1.75] text-white/85">{c.whyParagraph3}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: The KINEXIS Method */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neon-blue/[0.02] blur-[120px] pointer-events-none" />
        <div className="container-site relative z-10">
          <motion.div className="section-header section-header--left" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">{c.methodTag}</motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-4">
              <TwoLineText text={`${c.methodTitleLine1}|${c.methodTitleLine2}`} variant="section" />
            </motion.h2>
          </motion.div>

          <div className="section-content relative">
            <div className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-neon-cyan/30 via-white/10 to-transparent hidden lg:block" />
            <div className="space-y-0">
              {c.methodPhases.map((phase, i) => (
                <motion.div
                  key={phase.title}
                  className="group relative lg:pl-12 pb-16 last:pb-0"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.12 }}
                >
                  <div className="hidden lg:flex absolute left-0 top-8 items-center justify-center">
                    <PhaseDot active className="group-hover:shadow-glow-sm transition-shadow duration-premium" />
                  </div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 md:p-10 group-hover:border-white/[0.1] transition-all duration-500">
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                      <PhaseDot active />
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan/60">{phase.title}</span>
                    </div>
                    <h3 className="type-subheader"><TwoLineText text={phase.title} variant="subheader" /></h3>
                    <p className="mt-4 section-intro section-intro--left text-base md:text-lg">{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Inside The System — Architecture Map */}
      <section className="section-padding relative overflow-hidden border-t border-white/[0.06] bg-bg-dark">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/[0.15] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-blue/[0.05] blur-[140px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-32 top-1/4 h-72 w-72 rounded-full bg-neon-cyan/[0.03] blur-[100px]"
          aria-hidden
        />

        <div className="container-site relative z-10">
          {/* Centered editorial header */}
          <motion.div
            className="mx-auto mb-16 max-w-3xl text-center lg:mb-20"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {c.architectureTag}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="section-title mt-5 text-center"
            >
              {c.architectureTitle}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="section-intro mt-5 text-center mx-auto max-w-xl"
            >
              {c.architectureSubtitle.replace("|", " ")}
            </motion.p>
          </motion.div>

          {/* Bento grid — cells animate individually via useInView inside the component */}
          <div className="mx-auto max-w-6xl">
            <AboutArchitectureMap nodes={c.architectureNodes} caption={c.architectureCaption} />
          </div>

          {/* CTA */}
          <motion.div
            className="mx-auto mt-12 flex flex-col items-center gap-3 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-sm text-muted/60">
              See every channel, every deliverable, every outcome.
            </p>
            <Button href="/services" variant="secondary">
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Principles - Editorial */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-neon-cyan/[0.02] blur-[120px] pointer-events-none" />
        <div className="container-site relative z-10">
          <motion.div className="section-header section-header--left" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">{c.principlesTag}</motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-4">
              <TwoLineText text={c.principlesTitle} variant="section" />
            </motion.h2>
          </motion.div>

          <div className="section-content space-y-grid-lg">
            {c.principles.map((p) => (
              <motion.div
                key={p.statement}
                className="grid gap-grid-lg md:grid-cols-5"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div className="md:col-span-2 flex items-start" variants={fadeUp}>
                  <PhaseTag label={p.accent} size="watermark" />
                </motion.div>
                <motion.div className="md:col-span-3" variants={fadeUp}>
                  <h3 className="type-section section-title--left mt-0">
                    <TwoLineText text={p.statement} variant="section" />
                  </h3>
                  <div className="mt-4 h-px w-12 bg-neon-cyan/30" />
                  <p className="mt-6 section-intro section-intro--left text-lg">{p.explanation}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Future Vision */}
      <section className="section-padding bg-bg-dark relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/3 right-0 w-[480px] h-[480px] rounded-full bg-neon-blue/[0.025] blur-[140px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/4 w-[360px] h-[360px] rounded-full bg-neon-cyan/[0.02] blur-[120px]"
          aria-hidden
        />

        <div className="container-site relative z-10">
          <motion.div
            className="section-header section-header--left"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span variants={fadeUp} className="section-label">
              {c.roadmapTag}
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-4">
              <TwoLineText text={c.roadmapTitle} variant="section" />
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle section-subtitle--left mt-4">
              <TwoLineText text={c.roadmapSubtitle} variant="body" />
            </motion.p>
          </motion.div>

          <div className="section-content grid gap-4 md:grid-cols-4 md:gap-5 lg:gap-6 items-stretch">
            {c.futureMilestones.map((m, i) => {
              const now = new Date().getFullYear();
              const milestoneYear = parseInt(m.year); // handles "2028+" → 2028
              const isCurrent = milestoneYear === now;
              const isPast = milestoneYear < now;
              return (
                <motion.div
                  key={m.year}
                  className="flex flex-col"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className={cn(
                      "relative flex flex-col flex-1 rounded-2xl border p-6 lg:p-7 overflow-hidden transition-all duration-500",
                      isCurrent
                        ? "border-neon-cyan/22 bg-gradient-to-b from-neon-cyan/[0.07] to-transparent shadow-[0_0_64px_-20px_rgba(0,212,255,0.22),inset_0_1px_0_rgba(0,212,255,0.1)]"
                        : "border-white/[0.06] bg-white/[0.025] hover:border-white/[0.1] hover:bg-white/[0.035]"
                    )}
                  >
                    {/* Top inset glow line — current only */}
                    {isCurrent && (
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-neon-cyan/70 via-neon-cyan/30 to-transparent"
                        aria-hidden
                      />
                    )}

                    {/* Phase label + status */}
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className={cn(
                          "text-[9px] font-bold uppercase tracking-[0.22em]",
                          isCurrent ? "text-neon-cyan/70" : "text-white/25"
                        )}
                      >
                        {m.title}
                      </span>
                      <span
                        className={cn(
                          "flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em]",
                          isCurrent ? "text-neon-cyan/60" : isPast ? "text-white/22" : "text-white/16"
                        )}
                      >
                        {isCurrent ? (
                          <>
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                            </span>
                            Now
                          </>
                        ) : isPast ? "Done" : "Soon"}
                      </span>
                    </div>

                    {/* Year — large hero number */}
                    <p
                      className={cn(
                        "text-[2.75rem] font-bold leading-none tracking-tight mb-5",
                        isCurrent ? "gradient-text" : isPast ? "text-white/[0.16]" : "text-white/28"
                      )}
                    >
                      {m.year}
                    </p>

                    {/* Divider */}
                    <div
                      className={cn(
                        "h-px mb-5",
                        isCurrent ? "bg-neon-cyan/[0.18]" : "bg-white/[0.05]"
                      )}
                    />

                    {/* Items — each locked to exactly 2 lines */}
                    <ul className="space-y-4 flex-1">
                      {m.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              "mt-[0.38rem] h-1 w-1 shrink-0 rounded-full",
                              isCurrent ? "bg-neon-cyan/55" : "bg-white/[0.18]"
                            )}
                          />
                          <p className="text-[0.8125rem] leading-[1.55] text-muted/65 line-clamp-2 min-h-[2.5rem]">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTAArchetype
        headline={c.ctaTitle}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaButton}
        ctaHref="/contact"
      />
    </>
  );
}
