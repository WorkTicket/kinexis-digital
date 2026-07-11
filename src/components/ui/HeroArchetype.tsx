"use client";

/**
 * Hero decision tree — pick one entry point per page type:
 *
 * Homepage           → HeroShell (client, LCP-optimized)
 * SSR service pages  → StaticHeroShell (no client JS for hero)
 * Hub/detail pages   → HeroArchetype (client, archetype-driven)
 * Contact            → StaticHeroShell compact variant
 * Blog/case study    → StaticHeroShell article variant
 *
 * Shared text primitives: @/components/ui/hero/HeroContent (+ HeroContentMotion for animation)
 */
import { m as motion } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { EASE_OUT } from "@/lib/motion-config";
import { cardClasses } from "@/lib/card-styles";
import Button from "@/components/ui/Button";
import HeroBackdrop, { type HeroTheme } from "@/components/ui/HeroBackdrop";
import "@/styles/components/hero-decorative.css";
import ProofMetric from "@/components/ui/ProofMetric";
import {
  MotionHeroLabel,
  MotionHeroSubtitle,
  MotionHeroTitle,
} from "@/components/ui/hero/HeroContentMotion";
import type { HeroSubtitleVariant, HeroTitleVariant } from "@/components/ui/hero/HeroContent";
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
      <div className="hero-glow-orb absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(100%,42rem)] h-72 rounded-full bg-neon-cyan/[0.022] blur-[140px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/25 via-transparent to-charcoal/50" />
    </div>
  );

  const titleVariant: HeroTitleVariant =
    archetype === "showcase" ? "split" : archetype === "story" ? "section" : "default";

  const subtitleVariant: HeroSubtitleVariant =
    archetype === "showcase" ? "hero" : "intro-center";

  const labelEl = label && (
    <MotionHeroLabel variants={popUp}>{label}</MotionHeroLabel>
  );

  const headlineEl = (
    <MotionHeroTitle variant={titleVariant} variants={blurFadeUp}>
      {headline}
    </MotionHeroTitle>
  );

  const subtitleEl = subtitle && (
    <MotionHeroSubtitle variants={fadeUp} variant={subtitleVariant} text={subtitle} lineClassName={subtitleLineClassName} />
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
            initial={false}
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
              <div className={cardClasses({ surface: "glass", hover: false, className: "!p-6 md:!p-8 max-w-3xl" })}>
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
            initial={false}
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
            initial={false}
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
          <div className="hero-glow-orb absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(100%,36rem)] h-64 rounded-full bg-neon-cyan/[0.018] blur-[160px]" />
        </div>
        <div className="container-site hero__container relative z-10">
          <motion.div
            className="section-header"
            variants={stagger}
            initial={false}
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
            initial={false}
            animate="visible"
          >
            {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
            {labelEl}
            <MotionHeroTitle variant="article" className="mt-4" variants={fadeUp}>
              {headline}
            </MotionHeroTitle>
            {subtitle && (
              <MotionHeroSubtitle variant="meta" variants={fadeUp}>
                {subtitle}
              </MotionHeroSubtitle>
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
            initial={false}
            animate="visible"
          >
            {breadcrumbs && <HeroBreadcrumbs items={breadcrumbs} />}
            {labelEl}
            <MotionHeroTitle variant="center" className="mt-6" variants={fadeUp}>
              {headline}
            </MotionHeroTitle>
            {subtitle && (
              <MotionHeroSubtitle variant="intro-center" variants={fadeUp} text={subtitle} />
            )}
            {ctaEl}
          </motion.div>
        </div>
      </section>
    );
  }

  return null;
}
