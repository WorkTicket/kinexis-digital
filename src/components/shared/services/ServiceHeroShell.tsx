import HeroBreadcrumbsStatic from "@/components/ui/HeroBreadcrumbsStatic";
import HeroCtaLinks from "@/components/ui/HeroCtaLinks";
import { HeroBgGlow, HeroGradientBg, HeroThemeBackdrop, heroPageSectionClass } from "@/components/ui/HeroShellDecorations";
import TwoLineText from "@/components/ui/TwoLineText";
import type { ServiceHeroData, ServiceSeoSlug } from "@/content/services/architecture/types";
import { getServiceHeroTheme } from "@/lib/service-hero";
import type { BreadcrumbItem } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Props = ServiceHeroData & {
  slug: ServiceSeoSlug;
  breadcrumbs: BreadcrumbItem[];
  secondaryCtaLabel: string;
  secondaryCtaHref?: string;
};

export default function ServiceHeroShell({
  slug,
  label,
  line1,
  line2,
  subtitle,
  ctaLabel,
  breadcrumbs,
  secondaryCtaLabel,
  secondaryCtaHref = "/case-studies",
}: Props) {
  const theme = getServiceHeroTheme(slug);

  return (
    <section className={heroPageSectionClass(theme, "hero--service-page hero--split overflow-x-clip")}>
      <HeroGradientBg />
      <HeroThemeBackdrop theme={theme} />
      <HeroBgGlow />

      <div className="container-site hero__container relative z-10">
        <div className="grid items-center gap-grid-lg md:grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-x-12 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] xl:gap-x-14">
          <div className="hero__content min-w-0 relative lg:pr-4">
            <HeroBreadcrumbsStatic items={breadcrumbs} />
            {label && <span className="hero-label">{label}</span>}
            <h1
              className="type-hero type-hero--split font-bold tracking-tight text-balance"
              {...({ fetchPriority: "high" } as Record<string, string>)}
            >
              <span className="type-hero-line hero-intentional-hero-line">{line1}</span>
              <span className="type-hero-line hero-intentional-hero-line">{line2}</span>
            </h1>
            {subtitle && (
              <p className={cn("hero__subtitle")} {...({ fetchPriority: "high" } as Record<string, string>)}>
                <TwoLineText
                  text={subtitle}
                  variant="body"
                  className="hero-intentional-subtitle-line"
                />
              </p>
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
