"use client";

import CaseStudyProof from "@/components/ui/CaseStudyProof";
import type { PricingPageContent } from "@/content/pricing/pricing-pages";

type Props = {
  proof: NonNullable<PricingPageContent["tierProof"]>;
};

export default function PricingTierProof({ proof }: Props) {
  return (
    <div className="section-content mx-auto mb-8 max-w-3xl">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
        {proof.tierName} {proof.sectionLabel ?? "tier in practice"}
      </p>
      <CaseStudyProof result={proof.result} client={proof.client} href={proof.href} />
    </div>
  );
}
