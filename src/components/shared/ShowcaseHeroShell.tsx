import HeroBreadcrumbsStatic from "@/components/ui/HeroBreadcrumbsStatic";
import HeroCtaLinks from "@/components/ui/HeroCtaLinks";
import { HeroBgGlow, HeroGradientBg, HeroThemeBackdrop, heroPageSectionClass } from "@/components/ui/HeroShellDecorations";
import TwoLineText from "@/components/ui/TwoLineText";
import type { BreadcrumbItem } from "@/lib/schema";

type Props = {
  label: string;
  line1: string;
  line2: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export default function ShowcaseHeroShell({
  label,
  line1,
  line2,
  subtitle,
  breadcrumbs,
  ctaLabel,
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref = "/case-studies",
}: Props) {
  return (
    <section className={heroPageSectionClass("default", "hero--split overflow-x-clip")}>
      <HeroGradientBg />
      <HeroThemeBackdrop />
      <HeroBgGlow />
      <div className="container-site hero__container relative z-10">
        <div className="grid items-center gap-grid-lg md:grid-cols-1">
          <div className="hero__content min-w-0 relative z-10">
            {breadcrumbs && <HeroBreadcrumbsStatic items={breadcrumbs} />}
            <span className="hero-label">{label}</span>
            <h1
              className="type-hero type-hero--split font-bold tracking-tight text-balance"
              {...({ fetchPriority: "high" } as Record<string, string>)}
            >
              <span className="type-hero-line">{line1}</span>
              <span className="type-hero-line">{line2}</span>
            </h1>
            <p className="hero__subtitle" {...({ fetchPriority: "high" } as Record<string, string>)}>
              <TwoLineText text={subtitle} variant="body" />
            </p>
            {(ctaLabel || secondaryCtaLabel) && (
              <HeroCtaLinks
                primary={ctaLabel ? { label: ctaLabel, href: ctaHref } : undefined}
                secondary={secondaryCtaLabel ? { label: secondaryCtaLabel, href: secondaryCtaHref } : undefined}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
