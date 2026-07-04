import HeroBreadcrumbsStatic from "@/components/ui/HeroBreadcrumbsStatic";
import HeroCtaLinks from "@/components/ui/HeroCtaLinks";
import { HeroBgGlow, HeroGradientBg, HeroThemeBackdrop, heroPageSectionClass } from "@/components/ui/HeroShellDecorations";
import type { BreadcrumbItem } from "@/lib/schema";

type Props = {
  label: string;
  headline: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ArticleHeroShell({
  label,
  headline,
  subtitle,
  breadcrumbs,
  ctaLabel,
  ctaHref = "/contact",
}: Props) {
  return (
    <section className={heroPageSectionClass("default", "hero--centered")}>
      <HeroGradientBg />
      <HeroThemeBackdrop />
      <HeroBgGlow />
      <div className="container-site hero__container relative z-10">
        <div className="section-header">
          <HeroBreadcrumbsStatic items={breadcrumbs} />
          <span className="hero-label">{label}</span>
          <h1
            className="mt-4 type-hero type-hero--center type-hero--article text-balance"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          >
            {headline}
          </h1>
          {subtitle && (
            <p className="mt-3 text-sm text-muted" {...({ fetchpriority: "high" } as Record<string, string>)}>
              {subtitle}
            </p>
          )}
          {ctaLabel && (
            <HeroCtaLinks primary={{ label: ctaLabel, href: ctaHref }} />
          )}
        </div>
      </div>
    </section>
  );
}
