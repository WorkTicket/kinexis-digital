/**
 * Hero decision tree — pick one entry point per page type:
 *
 * Homepage           → HeroShell (SSR, LCP-optimized)
 * SSR service pages  → StaticHeroShell (no client JS for hero) ← you are here
 * Hub/detail pages   → HeroArchetype (client, archetype-driven)
 * Contact            → StaticHeroShell compact variant
 * Blog/case study    → StaticHeroShell article variant
 *
 * Shared text primitives: @/components/ui/hero/HeroContent (+ HeroContentMotion for animation)
 */
import HeroBreadcrumbsStatic from "@/components/ui/HeroBreadcrumbsStatic";
import HeroCtaLinks from "@/components/ui/HeroCtaLinks";
import type { HeroTheme } from "@/components/ui/HeroBackdrop";
import {
  HeroBgGlow,
  HeroGradientBg,
  HeroThemeBackdrop,
  heroPageSectionClass,
} from "@/components/ui/HeroShellDecorations";
import { HeroLabel, HeroSubtitle, HeroTitle } from "@/components/ui/hero/HeroContent";
import TwoLineText from "@/components/ui/TwoLineText";
import type { ServiceSeoSlug } from "@/content/services/architecture/types";
import { getServiceHeroTheme } from "@/lib/service-hero";
import type { BreadcrumbItem } from "@/lib/schema";
import { cn } from "@/lib/utils";

const highPriority = { fetchPriority: "high" } as Record<string, string>;

type ArticleVariant = {
  variant: "article";
  label: string;
  headline: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

type ShowcaseVariant = {
  variant: "showcase";
  label?: string;
  line1: string;
  line2: string;
  line2ClassName?: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  theme?: HeroTheme;
};

type ConversionVariant = {
  variant: "conversion";
  label: string;
  headline: string;
  subtitle: string;
};

type ServiceVariant = {
  variant: "service";
  slug: ServiceSeoSlug;
  label?: string;
  line1: string;
  line2: string;
  subtitle: string;
  ctaLabel?: string;
  breadcrumbs: BreadcrumbItem[];
  secondaryCtaLabel: string;
  secondaryCtaHref?: string;
};

type Props = ArticleVariant | ShowcaseVariant | ConversionVariant | ServiceVariant;

function SplitHeadline({
  line1,
  line2,
  line2ClassName,
  servicePage = false,
}: {
  line1: string;
  line2: string;
  line2ClassName?: string;
  servicePage?: boolean;
}) {
  const lineClass = servicePage ? "hero-intentional-hero-line" : undefined;

  return (
    <HeroTitle variant="split" {...highPriority}>
      <span className={cn("type-hero-line", lineClass)}>{line1}</span>
      <span className={cn("type-hero-line", lineClass, line2ClassName)}>{line2}</span>
    </HeroTitle>
  );
}

function HeroCtas({
  ctaLabel,
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref = "/case-studies",
}: {
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}) {
  if (!ctaLabel && !secondaryCtaLabel) return null;

  return (
    <HeroCtaLinks
      primary={ctaLabel ? { label: ctaLabel, href: ctaHref } : undefined}
      secondary={secondaryCtaLabel ? { label: secondaryCtaLabel, href: secondaryCtaHref } : undefined}
    />
  );
}

/** SSR hero shell — no client JS. Pairs with HeroArchetype for animated pages. */
export default function StaticHeroShell(props: Props) {
  if (props.variant === "conversion") {
    const { label, headline, subtitle } = props;

    return (
      <section className={cn("hero hero--compact hero--centered hero--ssr overflow-hidden bg-gradient-glow")}>
        <HeroGradientBg />
        <HeroThemeBackdrop />
        <HeroBgGlow />
        <div className="container-site hero__container relative z-10">
          <div className="section-header">
            <HeroLabel>{label}</HeroLabel>
            <HeroTitle variant="center" className="mt-6" {...highPriority}>
              {headline}
            </HeroTitle>
            <HeroSubtitle variant="intro-center" {...highPriority}>
              <TwoLineText text={subtitle} variant="body" />
            </HeroSubtitle>
          </div>
        </div>
      </section>
    );
  }

  if (props.variant === "article") {
    const { label, headline, subtitle, breadcrumbs, ctaLabel, ctaHref = "/contact" } = props;

    return (
      <section className={heroPageSectionClass("default", "hero--centered")}>
        <HeroGradientBg />
        <HeroThemeBackdrop />
        <HeroBgGlow />
        <div className="container-site hero__container relative z-10">
          <div className="section-header">
            <HeroBreadcrumbsStatic items={breadcrumbs} />
            <HeroLabel>{label}</HeroLabel>
            <HeroTitle variant="article" className="mt-4" {...highPriority}>
              {headline}
            </HeroTitle>
            {subtitle && (
              <HeroSubtitle variant="meta" {...highPriority}>
                {subtitle}
              </HeroSubtitle>
            )}
            <HeroCtas ctaLabel={ctaLabel} ctaHref={ctaHref} />
          </div>
        </div>
      </section>
    );
  }

  if (props.variant === "service") {
    const {
      slug,
      label,
      line1,
      line2,
      subtitle,
      ctaLabel,
      breadcrumbs,
      secondaryCtaLabel,
      secondaryCtaHref = "/case-studies",
    } = props;
    const theme = getServiceHeroTheme(slug);

    return (
      <section className={heroPageSectionClass(theme, "hero--service-page hero--split overflow-x-clip")}>
        <HeroGradientBg />
        <HeroThemeBackdrop theme={theme} />
        <HeroBgGlow />
        <div className="container-site hero__container relative z-10">
          <div className="grid items-center gap-grid-lg md:grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-x-12 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] xl:gap-x-14">
            <div className="hero__content relative min-w-0 lg:pr-4">
              <HeroBreadcrumbsStatic items={breadcrumbs} />
              {label && <HeroLabel>{label}</HeroLabel>}
              <SplitHeadline line1={line1} line2={line2} servicePage />
              {subtitle && (
                <HeroSubtitle
                  text={subtitle}
                  lineClassName="hero-intentional-subtitle-line"
                  {...highPriority}
                />
              )}
              <HeroCtaLinks
                primary={ctaLabel ? { label: ctaLabel, href: "/contact" } : undefined}
                secondary={{ label: secondaryCtaLabel, href: secondaryCtaHref }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const {
    label,
    line1,
    line2,
    line2ClassName,
    subtitle,
    breadcrumbs,
    ctaLabel,
    ctaHref = "/contact",
    secondaryCtaLabel,
    secondaryCtaHref = "/case-studies",
    theme = "default",
  } = props;

  return (
    <section className={heroPageSectionClass(theme, "hero--split overflow-x-clip")}>
      <HeroGradientBg />
      <HeroThemeBackdrop theme={theme} />
      <HeroBgGlow />
      <div className="container-site hero__container relative z-10">
        <div className="grid items-center gap-grid-lg md:grid-cols-1">
          <div className="hero__content relative z-10 min-w-0">
            {breadcrumbs && <HeroBreadcrumbsStatic items={breadcrumbs} />}
            {label && <HeroLabel>{label}</HeroLabel>}
            <SplitHeadline line1={line1} line2={line2} line2ClassName={line2ClassName} />
            <HeroSubtitle text={subtitle} {...highPriority} />
            <HeroCtas
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              secondaryCtaLabel={secondaryCtaLabel}
              secondaryCtaHref={secondaryCtaHref}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
