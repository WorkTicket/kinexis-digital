import type { LocationDetailContent } from "@/content/locations/location-details";
import type { LocationEntry } from "@/content/registry/locations";

export type FaqItem = { question: string; answer: string };

/** Shared FAQ source for location city hubs — must match JSON-LD and visible FAQSection. */
export function getLocationCityFaqs(
  location: LocationEntry,
  detail?: LocationDetailContent
): FaqItem[] {
  if (detail?.localFaqs?.length) return detail.localFaqs;

  return [
    {
      question: `Do you work with businesses in ${location.city}, ${location.state}?`,
      answer: `Yes. We serve businesses across ${location.city}, the ${location.region}, and surrounding areas with SEO, paid media, web design, and conversion optimization.`,
    },
    {
      question: "Is your content unique for each city?",
      answer:
        "Yes. Every location page includes local context, market-specific strategy, and relevant case studies. We do not publish city-name swap templates.",
    },
  ];
}

/** Shared FAQ source for location × service pages — must match JSON-LD and visible FAQSection. */
export function getLocationServiceFaqs(location: LocationEntry, service: string): FaqItem[] {
  const serviceLabel = service.replace(/-/g, " ");

  return [
    {
      question: `Do you offer ${serviceLabel} in ${location.city}?`,
      answer: `Yes. We build ${serviceLabel} campaigns specifically for the ${location.region} market.`,
    },
    {
      question: "How is local content different?",
      answer:
        "We include local market context, competition analysis, and geo-specific strategy. We never use duplicate templates.",
    },
  ];
}
