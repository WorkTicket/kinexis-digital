"use client";

import { m as motion } from "@/lib/framer";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import HeroArchetype from "@/components/ui/HeroArchetype";
import CTAArchetype from "@/components/ui/CTAArchetype";
import ProofMetric from "@/components/ui/ProofMetric";
import TwoLineText from "@/components/ui/TwoLineText";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { cn } from "@/lib/utils";
import type { ResourceCategory, Resource, ResourceBadge, ResourcesPageMeta, KinexisGuide } from "@/content/resources";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  meta: ResourcesPageMeta;
  categories: ResourceCategory[];
  guides: KinexisGuide[];
  guidesTitle: string;
  guidesSubtitle: string;
  introLabel: string;
  keyLabel: string;
  categoryNavLabel: string;
  badgeLabels: Record<ResourceBadge, string>;
  visitToolLabel: string;
};

// ── Badge pill ──────────────────────────────────────────────────────────────
// Free = cyan tint  |  Free + Paid = muted cyan  |  Paid = plain white
const badgePillStyles: Record<ResourceBadge, string> = {
  "Free":         "text-neon-cyan/70  bg-neon-cyan/[0.07]  border-neon-cyan/[0.15]",
  "Free + Paid":  "text-white/45      bg-white/[0.04]      border-white/[0.08]",
  "Paid":         "text-white/30      bg-white/[0.02]      border-white/[0.05]",
};

function BadgePill({ badge, label }: { badge: ResourceBadge; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]",
        badgePillStyles[badge]
      )}
    >
      {label}
    </span>
  );
}

function ResourceCard({
  resource,
  badgeLabels,
  visitToolLabel,
}: {
  resource: Resource;
  badgeLabels: Record<ResourceBadge, string>;
  visitToolLabel: string;
}) {
  const { fadeUp } = useMotionVariants();
  const isFree = resource.badge === "Free";

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "motion-card group relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-xl",
        isFree
          ? "border-neon-cyan/[0.14] bg-neon-cyan/[0.025]"
          : "border-white/[0.06] bg-white/[0.03]"
      )}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Inset top line — free tools only */}
      {isFree && (
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-neon-cyan/50 via-neon-cyan/20 to-transparent"
          aria-hidden
        />
      )}

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        {/* Name row */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3
            className={cn(
              "text-[0.9375rem] font-bold leading-tight tracking-tight transition-colors duration-300",
              isFree ? "text-white" : "text-white/70 group-hover:text-white"
            )}
          >
            {resource.name}
          </h3>
          <ArrowUpRight
            className={cn(
              "h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              isFree
                ? "text-neon-cyan/40 group-hover:text-neon-cyan/70"
                : "text-white/15   group-hover:text-white/45"
            )}
          />
        </div>

        {/* Description */}
        <p
          className={cn(
            "flex-1 text-[0.8125rem] leading-[1.65] transition-colors duration-300",
            isFree
              ? "text-white/55 group-hover:text-white/70"
              : "text-muted/45 group-hover:text-muted/60"
          )}
        >
          {resource.description}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/[0.05] pt-4">
          <BadgePill badge={resource.badge} label={badgeLabels[resource.badge]} />
          <span
            className={cn(
              "flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-300",
              isFree
                ? "text-neon-cyan/35 group-hover:text-neon-cyan/65"
                : "text-white/15    group-hover:text-white/40"
            )}
          >
            {visitToolLabel}
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

// ── Category section ────────────────────────────────────────────────────────
function CategorySection({
  category,
  dark,
  badgeLabels,
  visitToolLabel,
}: {
  category: ResourceCategory;
  dark: boolean;
  badgeLabels: Record<ResourceBadge, string>;
  visitToolLabel: string;
}) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <section
      id={category.id}
      className={cn(
        "section-padding relative overflow-hidden border-t border-white/[0.06]",
        dark && "bg-bg-dark"
      )}
    >
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-neon-cyan/[0.022] blur-[140px]"
        aria-hidden
      />
      {dark && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:28px_28px] opacity-50"
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
        aria-hidden
      />

      <div className="container-site relative z-10">
        {/* Section header — identical to every other page */}
        <motion.div
          className="section-header section-header--left"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span variants={fadeUp} className="section-label">
            {category.label}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="section-title section-title--left mt-4"
          >
            {category.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="section-subtitle section-subtitle--left mt-4 max-w-xl"
          >
            {category.subtitle}
          </motion.p>
        </motion.div>

        {/* Card grid */}
        <div
          className={cn(
            "section-content grid gap-4 md:gap-5 items-stretch",
            category.resources.length === 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {category.resources.map((resource) => (
            <ResourceCard
              key={resource.name}
              resource={resource}
              badgeLabels={badgeLabels}
              visitToolLabel={visitToolLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Stat strip ──────────────────────────────────────────────────────────────
function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-bg-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/[0.022] blur-[120px]"
        aria-hidden
      />
      <div className="container-site relative z-10 section-padding-sm">
        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/[0.06]"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center px-4 text-center md:px-8"
              variants={fadeUp}
            >
              <ProofMetric
                value={stat.value}
                label={stat.label}
                size="lg"
                labelVariant="stat"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Category quick-jump nav ─────────────────────────────────────────────────
function CategoryNav({ categories, categoryNavLabel }: { categories: ResourceCategory[]; categoryNavLabel: string }) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/[0.06] bg-bg/90 backdrop-blur-xl">
      <div className="container-site">
        <nav
          aria-label={categoryNavLabel}
          className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none"
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="shrink-0 rounded-lg border border-transparent px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/30 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white/70"
            >
              {cat.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ── Page root ───────────────────────────────────────────────────────────────
export default function ResourcesPageClient({
  meta: m,
  categories,
  guides,
  guidesTitle,
  guidesSubtitle,
  introLabel,
  keyLabel,
  categoryNavLabel,
  badgeLabels,
  visitToolLabel,
}: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <>
      {/* ── HERO ── */}
      <HeroArchetype
        archetype="showcase"
        label={m.heroTag}
        headline={
          <>
            <span className="type-hero-line">{m.heroTitle}</span>
            <span className="type-hero-line gradient-text">{m.heroTitleHighlight}</span>
          </>
        }
        subtitle={m.heroSubtitle}
        ctaLabel={m.heroCtaLabel}
        ctaHref="/contact"
        secondaryCtaLabel={m.heroSecondaryCtaLabel}
        secondaryCtaHref={m.heroSecondaryCtaHref}
      />

      {/* ── STAT STRIP ── */}
      <StatStrip stats={m.stats} />

      {/* ── INTRO ── */}
      <section className="section-padding relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-neon-blue/[0.03] blur-[120px]"
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
              {introLabel}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-title section-title--left mt-4 !max-w-[min(100%,52rem)]"
            >
              <TwoLineText text={m.introTitle} variant="section" />
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="section-subtitle section-subtitle--left mt-4"
            >
              {m.introBody}
            </motion.p>

            {/* Legend + category jump links */}
            <motion.div variants={fadeUp} className="mt-8 space-y-5">
              {/* Badge legend */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">
                  {keyLabel}
                </span>
                {(["Free", "Free + Paid", "Paid"] as ResourceBadge[]).map((b) => (
                  <span
                    key={b}
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]",
                      badgePillStyles[b]
                    )}
                  >
                    {badgeLabels[b]}
                  </span>
                ))}
              </div>

              {/* Category jump links */}
              <div className="flex flex-wrap items-center gap-2.5">
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="inline-flex items-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-muted/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white/75"
                  >
                    {cat.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-bg-dark border-y border-white/[0.06]">
        <div className="container-site">
          <SectionHeader pattern="C" title={guidesTitle} subtitle={guidesSubtitle} />
          <div className="section-content grid gap-grid-sm md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-6 hover:border-white/[0.12] transition-colors"
              >
                <h3 className="font-bold">{guide.title}</h3>
                <p className="mt-2 text-sm text-muted">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY CATEGORY NAV ── */}
      <CategoryNav categories={categories} categoryNavLabel={categoryNavLabel} />

      {/* ── CATEGORY SECTIONS ── */}
      {categories.map((category, i) => (
        <CategorySection
          key={category.id}
          category={category}
          dark={i % 2 !== 0}
          badgeLabels={badgeLabels}
          visitToolLabel={visitToolLabel}
        />
      ))}

      {/* ── BOTTOM CTA ── */}
      <CTAArchetype
        archetype="default"
        headline={m.ctaTitle}
        subtitle={m.ctaSubtitle}
        ctaLabel={m.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
