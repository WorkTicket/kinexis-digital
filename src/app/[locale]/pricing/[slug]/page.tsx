import { notFound, redirect } from "next/navigation";
import { createPricingMetadata, createPricingPage } from "@/lib/create-pricing-page";
import {
  activePricingSlugs,
  pricingRoutes,
  pricingSlugCanonical,
  resolvePricingSlug,
  type PricingSlug,
} from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

const pricingPages = Object.fromEntries(
  activePricingSlugs.map((slug) => [slug, createPricingPage(slug)]),
) as Record<PricingSlug, ReturnType<typeof createPricingPage>>;

const pricingMetadata = Object.fromEntries(
  activePricingSlugs.map((slug) => [slug, createPricingMetadata(slug)]),
) as Record<PricingSlug, ReturnType<typeof createPricingMetadata>>;

export function generateStaticParams() {
  return activePricingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const canonical = pricingSlugCanonical[slug as PricingSlug];
  if (canonical) {
    return pricingMetadata[canonical]({ params: Promise.resolve({ locale }) });
  }
  if (!activePricingSlugs.includes(slug as PricingSlug)) {
    return {};
  }

  return pricingMetadata[slug as PricingSlug]({ params: Promise.resolve({ locale }) });
}

export default async function PricingPage({ params }: Props) {
  const { locale, slug } = await params;
  const pricingSlug = slug as PricingSlug;

  const canonical = pricingSlugCanonical[pricingSlug];
  if (canonical) {
    redirect(`/${locale}${pricingRoutes[resolvePricingSlug(pricingSlug)]}`);
  }

  if (!activePricingSlugs.includes(pricingSlug)) {
    notFound();
  }

  return pricingPages[pricingSlug]({ params: Promise.resolve({ locale }) });
}
