"use client";

import { m as motion } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { EASE_OUT } from "@/lib/motion-config";
import Button from "@/components/ui/Button";
import HeroBackdrop, { type HeroTheme } from "@/components/ui/HeroBackdrop";
import TwoLineText from "@/components/ui/TwoLineText";
import ProofMetric from "@/components/ui/ProofMetric";
import type { BreadcrumbItem } from "@/lib/schema";

type Archetype = "dashboard" | "diagram" | "showcase" | "story" | "conversion" | "article";

type Props = {
  archetype: Archetype;
  label?: string;
  headline: React.ReactNode;
  subtitle?: string;
  subtitleLineClassName?: string;
  outcome?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  visualization?: React.ReactNode;
  visualizationClassName?: string;
  visualizationWrapperClassName?: string;
  metrics?: { label: string; value: string }[];
  theme?: HeroTheme;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  compact?: boolean;
};

function HeroBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { popUp } = useMotionVariants();
  if (items.length <= 1) return null;

  return (
    <motion.nav aria-label="Breadcrumb" variants={popUp} className="hero__breadcrumbs">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted/70">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={crumb.url ?? crumb.name} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/15" aria-hidden>/</span>}
              {isLast || !crumb.url ? (
                <span className={isLast ? "text-neon-cyan/80" : ""}>{crumb.name}</span>
              ) : (
                <Link href={crumb.url} className="hover:text-white transition-colors duration-500">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}

export default function HeroArchetype({
  archetype,
  label,
  headline,
  subtitle,
  subtitleLineClassName,
  outcome,
  ctaLabel,
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
  visualization,
  visualizationClassName,
  visualizationWrapperClassName,
  metrics,
  theme = "default",
  breadcrumbs,
  className,
  compact = false,
}: Props) {
  const { fadeUp, blurFadeUp, popUp, stagger } = useMotionVariants();
  const baseSection = cn(
    "hero",
    compact ? "hero--compact" : "hero--page",
    theme !== "default" && `hero--theme-${theme}`
  );

  const gradientBg = (
    <div className="hero-gradient-animated" aria-hidden="true">
      <div className="hero-gradient-animated__orb" />
    </div>
  );

  const backdrop = <HeroBackdrop theme={theme} />;

  const bgGlow = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(100%,42rem)] h-72 rounded-full bg-neon-cyan/[0.022] blur-[140px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/25 via-transparent to-charcoal/50" />
    </div>
  );

  const labelEl = label && (
    <motion.span variants={popUp} className="hero-label">
      {label}
    </motion.span>
  );

  const headlineEl = (
    <motion.h1
      className={cn(
        archetype === "showcase" ? "type-hero type-hero--split" :
        archetype === "story" ? "type-section type-section--center" :
        "type-hero",
        "font-bold tracking-tight text-balance"
      )}
      variants={blurFadeUp}
    >
      {headline}
    </motion.h1>
  );

  const subtitleEl = subtitle && (
    <motion.p variants={fadeUp} className={cn(archetype === "showcase" ? "hero__subtitle" : "section-intro-lg mt-8", archetype !== "showcase" && "section-intro-lg--center")}>
      <TwoLineText text={subtitle} variant="body" className={subtitleLineClassName} />
    </motion.p>
  );

  const outcomeEl = outcome && (
    <motion.p variants={fadeUp} className="hero__outcome">
      {outcome}
    </motion.p>
  );

  const hasCta = Boolean(ctaLabel || secondaryCtaLabel);

  const ctaEl = hasCta ? (
    <motion.div variants={fadeUp} className="hero__cta cta-stack">
      {ctaLabel && (
        <Button href={ctaHref} variant="primary" fullWidthMobile>
          {ctaLabel}
        </Button>
      )}
      {secondaryCtaLabel && secondaryCtaHref && (
        <Button href={secondaryCtaHref} variant="secondary" fullWidthMobile>
          {secondaryCtaLabel}
        </Button>
      )}
    </motion.div>
  ) : null;

  // --- DASHBOARD HERO ---
  if (archetype === "dashboard") {
    const hasVisualization = Boolean(visualization);

    return (
      <section className={cn(baseSection, className)}>
        {gradientBg}
        {backdrop}
        {bgGlow}
        <div className="container-site hero__container relative z-10">
          <motion.div
            className={cn(
              "grid items-center gap-grid-lg",
              hasVisualization && "md:grid-cols-1 lg:grid-cols-2"
            )}
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <div className="min-w-0">
              {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
              {labelEl}
              {headlineEl}
              {subtitleEl}
              {outcomeEl}
              {ctaEl}
            </div>
            {hasVisualization && (
              <motion.div variants={fadeUp} className="relative min-w-0 overflow-safe lg:pl-4">
                {visualization}
              </motion.div>
            )}
          </motion.div>

          {!hasVisualization && metrics && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE_OUT }}
              className="mt-12 md:mt-16"
            >
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl max-w-3xl">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
                  {metrics.map((m) => (
                    <ProofMetric
                      key={m.label}
                      value={m.value}
                      label={m.label}
                      align="left"
                      className="text-center sm:text-left"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // --- DIAGRAM HERO ---
  if (archetype === "diagram") {
    return (
      <section className={cn(baseSection, "hero--centered", className)}>
        {gradientBg}
        {backdrop}
        {bgGlow}
        <div className="container-site hero__container relative z-10">
          <motion.div
            className="text-center"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
            {labelEl}
            <motion.div className="section-header" variants={fadeUp}>
              {headlineEl}
            </motion.div>
            {subtitleEl}
            {outcomeEl}
            <motion.div variants={fadeUp} className="mt-16">
              {visualization}
            </motion.div>
            {ctaEl}
          </motion.div>
        </div>
      </section>
    );
  }

  // --- SHOWCASE HERO ---
  if (archetype === "showcase") {
    const hasVisualization = Boolean(visualization);
    const isServicePageViz = visualizationClassName?.includes("hero__viz-inner--service-page");

    return (
      <section className={cn(baseSection, "hero--split overflow-x-clip", className)}>
        {gradientBg}
        {backdrop}
        {bgGlow}
        <div className="container-site hero__container relative z-10">
          <motion.div
            className={cn(
              "grid items-center gap-grid-lg",
              hasVisualization &&
                (isServicePageViz
                  ? "md:grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-x-12 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] xl:gap-x-14"
                  : "md:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1fr)] lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.1fr)] xl:gap-x-16")
            )}
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <div className={cn("hero__content min-w-0", isServicePageViz ? "relative lg:pr-4" : "relative z-10 lg:pr-2 xl:pr-6")}>
              {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
              {labelEl}
              {headlineEl}
              {subtitleEl}
              {outcomeEl}
              {ctaEl}
            </div>
            {hasVisualization && (
              <motion.div
                variants={fadeUp}
                className={cn("hero__viz", visualizationWrapperClassName)}
              >
                <div className={cn("hero__viz-inner", visualizationClassName)}>
                  <div className="hero__viz-content">{visualization}</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // --- STORY HERO ---
  if (archetype === "story") {
    return (
      <section className={cn(baseSection, "hero--centered", className)}>
        {gradientBg}
        {backdrop}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(100%,36rem)] h-64 rounded-full bg-neon-cyan/[0.018] blur-[160px]" />
        </div>
        <div className="container-site hero__container relative z-10">
          <motion.div
            className="section-header"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
            {labelEl}
            {headlineEl}
            {subtitleEl}
            {outcomeEl}
            {ctaEl}
          </motion.div>
        </div>
      </section>
    );
  }

  // --- ARTICLE HERO (blog/case-study detail — standard page height, centered) ---
  if (archetype === "article") {
    return (
      <section className={cn(baseSection, "hero--centered", className)}>
        {gradientBg}
        {backdrop}
        {bgGlow}
        <div className="container-site hero__container relative z-10">
          <motion.div
            className="section-header"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
            {labelEl}
            <motion.h1
              className="mt-4 type-hero type-hero--center type-hero--article text-balance"
              variants={fadeUp}
            >
              {headline}
            </motion.h1>
            {subtitle && (
              <motion.p variants={fadeUp} className="mt-3 text-sm text-muted">
                {subtitle}
              </motion.p>
            )}
            {outcomeEl}
            {ctaEl}
          </motion.div>
        </div>
      </section>
    );
  }

  // --- CONVERSION HERO ---
  if (archetype === "conversion") {
    return (
      <section className={cn(baseSection, "hero--centered", className)}>
        {gradientBg}
        {backdrop}
        {bgGlow}
        <div className="container-site hero__container relative z-10">
          <motion.div
            className="section-header"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
            {labelEl}
            <motion.h1
              className="mt-6 type-hero type-hero--center text-balance"
              variants={fadeUp}
            >
              {headline}
            </motion.h1>
            {subtitle && <motion.p variants={fadeUp} className="section-intro-lg section-intro-lg--center"><TwoLineText text={subtitle} variant="body" /></motion.p>}
            {ctaEl}
          </motion.div>
        </div>
      </section>
    );
  }

  return null;
}
