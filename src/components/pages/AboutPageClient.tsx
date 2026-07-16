"use client";

import { m as motion } from "@/lib/framer";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import AboutArchitectureMap from "@/components/pages/AboutArchitectureMap";
import CTAArchetype from "@/components/ui/CTAArchetype";
import HeroArchetype from "@/components/ui/HeroArchetype";
import PhaseDot from "@/components/ui/PhaseDot";
import PhaseTag from "@/components/ui/PhaseTag";
import type { Locale } from "@/i18n/routing";
import type { AboutContent } from "@/content/about";
import SectionHeader from "@/components/ui/SectionHeader";
import TwoLineText from "@/components/ui/TwoLineText";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { cardClasses } from "@/lib/card-styles";
import Section from "@/components/shared/services/Section";
import { SectionGlow, SectionDivider, SectionGridOverlay } from "@/components/ui/SectionDecorations";

type Props = { content: AboutContent; locale: Locale };

export default function AboutPageClient({ content: c, locale: _locale }: Props) {
  const { fadeUp, stagger } = useMotionVariants();
  let surfaceIndex = 0;
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
      <Section id="why-we-exist" surfaceIndex={surfaceIndex++} className="relative overflow-hidden">
        <SectionGridOverlay />
        <SectionDivider />
        <SectionGlow color="cyan" size="lg" position={{ right: "-96px", top: "33%" }} />
        <SectionGlow color="blue" size="sm" opacity={0.03} blur={100} position={{ left: "-128px", bottom: "0" }} />

        <div className="container-site relative z-10">
          <SectionHeader
            badge={c.whyWeExistTag}
            title={c.whyWeExistAside}
            align="left"
            headingId="why-we-exist-heading"
          />

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
                  <p className="type-pull-quote">
                    <TwoLineText text={c.whyQuote} variant="section" className="gradient-text" />
                  </p>
                </div>
              </blockquote>

              <div className="space-y-6 border-t border-surface pt-10 lg:pt-12">
                <p className="type-body-lg leading-[1.75] text-muted">{c.whyParagraph2}</p>
                <p className="type-body-lg leading-[1.75] text-muted">{c.whyParagraph2b}</p>
                <p className="type-body-lg leading-[1.75] text-white/85">{c.whyParagraph3}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 3: The KINEXIS Method */}
      <Section id="kinexis-method" surfaceIndex={surfaceIndex++} className="relative overflow-hidden">
        <SectionGlow color="blue" size="xl" opacity={0.02} position={{ top: "50%", right: "0", transform: "translateY(-50%)" }} />
        <div className="container-site relative z-10">
          <SectionHeader
            badge={c.methodTag}
            title={`${c.methodTitleLine1}|${c.methodTitleLine2}`}
            align="left"
            headingId="kinexis-method-heading"
          />

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
                  <div className={cn(cardClasses({ surface: "default", hover: false }), "p-8 md:p-10 transition-all duration-500 group-hover:border-strong")}>
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
      </Section>

      {/* SECTION 4: Inside The System — Architecture Map */}
      <Section id="inside-system" surfaceIndex={surfaceIndex++} className="relative overflow-hidden">
        <SectionGridOverlay cellSize={32} opacity={0.5} />
        <SectionDivider color="cyan" />
        <SectionGlow color="blue" width={768} height={768} opacity={0.05} blur={140} position={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        <SectionGlow color="cyan" size="sm" opacity={0.03} blur={100} position={{ right: "-128px", top: "25%" }} />

        <div className="container-site relative z-10">
          <SectionHeader
            badge={c.architectureTag}
            title={c.architectureTitle}
            description={c.architectureSubtitle.replace("|", " ")}
            headingId="inside-system-heading"
          />

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
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 5: Principles - Editorial */}
      <Section id="principles" surfaceIndex={surfaceIndex++} className="relative overflow-hidden">
        <SectionGlow color="cyan" size="md" opacity={0.02} position={{ bottom: "0", left: "0" }} />
        <div className="container-site relative z-10">
          <SectionHeader
            badge={c.principlesTag}
            title={c.principlesTitle}
            align="left"
            headingId="principles-heading"
          />

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
                  <h3 className="type-section mx-0 mt-0 text-left">
                    <TwoLineText text={p.statement} variant="section" />
                  </h3>
                  <div className="mt-4 h-px w-12 bg-neon-cyan/30" />
                  <p className="mt-6 section-intro section-intro--left text-lg">{p.explanation}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 6: Future Vision */}
      <Section id="future-vision" surfaceIndex={surfaceIndex++} className="relative overflow-hidden">
        <SectionGridOverlay cellSize={32} opacity={0.4} />
        <SectionGlow color="blue" size="lg" opacity={0.025} blur={140} position={{ top: "33%", right: "0" }} />
        <SectionGlow color="cyan" width={360} height={360} opacity={0.02} position={{ bottom: "0", left: "25%" }} />

        <div className="container-site relative z-10">
          <SectionHeader
            badge={c.roadmapTag}
            title={c.roadmapTitle}
            description={<TwoLineText text={c.roadmapSubtitle} variant="body" />}
            align="left"
            headingId="future-vision-heading"
          />

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
                        : cardClasses({ surface: "elevated", hover: false, className: "p-6 lg:p-7 hover:border-strong hover:bg-surface-raised" })
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
                        "type-display-stat mb-5",
                        isCurrent ? "gradient-text" : isPast ? "text-white/[0.16]" : "text-white/28"
                      )}
                    >
                      {m.year}
                    </p>

                    {/* Divider */}
                    <div
                      className={cn(
                        "h-px mb-5",
                        isCurrent ? "bg-neon-cyan/[0.18]" : "bg-surface-hover"
                      )}
                    />

                    {/* Items — each locked to exactly 2 lines */}
                    <ul className="space-y-4 flex-1">
                      {m.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              "mt-[0.38rem] h-1 w-1 shrink-0 rounded-full",
                              isCurrent ? "bg-neon-cyan/55" : "bg-white/20"
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
      </Section>

      <CTAArchetype
        headline={c.ctaTitle}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaButton}
        ctaHref="/contact"
      />
    </>
  );
}
