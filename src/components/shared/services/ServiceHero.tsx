"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import type { ServiceHeroData, ServiceSeoSlug } from "@/content/services/architecture/types";
import type { BreadcrumbItem } from "@/lib/schema";
import { getServiceHeroTheme } from "@/lib/service-hero";

type Props = ServiceHeroData & {
  slug: ServiceSeoSlug;
  breadcrumbs: BreadcrumbItem[];
};

export default function ServiceHero({
  slug,
  label,
  line1,
  line2,
  subtitle,
  ctaLabel,
  breadcrumbs,
}: Props) {
  return (
    <HeroArchetype
      archetype="showcase"
      className="hero--service-page"
      theme={getServiceHeroTheme(slug)}
      label={label}
      headline={
        <>
          <span className="type-hero-line hero-intentional-hero-line">{line1}</span>
          <span className="type-hero-line hero-intentional-hero-line">{line2}</span>
        </>
      }
      subtitle={subtitle}
      subtitleLineClassName="hero-intentional-subtitle-line"
      ctaLabel={ctaLabel}
      ctaHref="/contact"
      breadcrumbs={breadcrumbs}
    />
  );
}
