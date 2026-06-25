"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import { getServiceHeroTheme } from "@/lib/service-hero";
import type { PricingSlug } from "@/content/registry/site-routes";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { BreadcrumbItem } from "@/lib/schema";

type Props = {
  slug: PricingSlug;
  label: string;
  line1: string;
  line2: string;
  subtitle: string;
  ctaLabel: string;
  serviceHref: string;
  serviceLabel: string;
  breadcrumbs: BreadcrumbItem[];
};

export default function PricingHero({
  slug,
  label,
  line1,
  line2,
  subtitle,
  ctaLabel,
  serviceHref,
  serviceLabel,
  breadcrumbs,
}: Props) {
  const serviceSlug = slug as ServiceSeoSlug;

  return (
    <HeroArchetype
      archetype="showcase"
      theme={getServiceHeroTheme(serviceSlug)}
      label={label}
      headline={
        <>
          <span className="type-hero-line">{line1}</span>
          <span className="type-hero-line">{line2}</span>
        </>
      }
      subtitle={subtitle}
      ctaLabel={ctaLabel}
      ctaHref="/contact"
      secondaryCtaLabel={serviceLabel}
      secondaryCtaHref={serviceHref}
      breadcrumbs={breadcrumbs}
    />
  );
}
