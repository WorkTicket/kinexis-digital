import type { ServicePhase } from "@/components/ui/ServicePhaseList";

export type GenericRichServiceContent = {
  hero: { ctaLabel: string };
  processSection: { title: string; subtitle: string };
  processIntro: string;
  phases: ServicePhase[];
  capabilityBodies: Record<string, string>;
  cta: { headline: string; subtitle: string; ctaLabel: string };
  inlineCtaLabel: string;
  inlineCtaSubtitle: string;
};
