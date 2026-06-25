import { notFound } from "next/navigation";
import { createPricingMetadata, createPricingPage, pricingSlugs } from "@/lib/create-pricing-page";
import type { PricingSlug } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

const pricingPages = Object.fromEntries(
  pricingSlugs.map((slug) => [slug, createPricingPage(slug)]),
) as Record<PricingSlug, ReturnType<typeof createPricingPage>>;

const pricingMetadata = Object.fromEntries(
  pricingSlugs.map((slug) => [slug, createPricingMetadata(slug)]),
) as Record<PricingSlug, ReturnType<typeof createPricingMetadata>>;

export function generateStaticParams() {
  return pricingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!pricingSlugs.includes(slug as PricingSlug)) {
    return {};
  }

  return pricingMetadata[slug as PricingSlug]({ params: Promise.resolve({ locale }) });
}

export default async function PricingPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!pricingSlugs.includes(slug as PricingSlug)) {
    notFound();
  }

  return pricingPages[slug as PricingSlug]({ params: Promise.resolve({ locale }) });
}
