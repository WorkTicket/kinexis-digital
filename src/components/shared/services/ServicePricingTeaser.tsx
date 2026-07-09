import { ArrowRight, Receipt, Shield, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import type { PricingSlug } from "@/content/registry/site-routes";
import { pricingRoutes, resolvePricingSlug } from "@/content/registry/site-routes";
import Section from "@/components/shared/services/Section";
import Reveal from "@/components/ui/Reveal";

type Props = {
  slug: PricingSlug;
  surfaceIndex?: number;
};

export default function ServicePricingTeaser({ slug, surfaceIndex = 0 }: Props) {
  const pricingSlug = resolvePricingSlug(slug);
  const pricingHref = pricingRoutes[pricingSlug];

  return (
    <Section id="pricing-teaser" surfaceIndex={surfaceIndex} compact>
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-2xl border border-neon-cyan/[0.12] bg-gradient-to-br from-neon-cyan/[0.05] via-bg-secondary/80 to-bg-dark px-6 py-8 md:px-10 md:py-10">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon-cyan/[0.06] blur-[80px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-neon-blue/[0.04] blur-[60px]"
            aria-hidden
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neon-cyan/70">
                <Receipt className="h-3 w-3" aria-hidden />
                Transparent Pricing
              </span>
              <h3 className="text-xl font-bold text-white md:text-2xl">
                Fixed scope. No surprise fees.
              </h3>
              <p className="text-sm leading-relaxed text-white/45 md:text-base">
                See exactly what&apos;s included at each tier before you commit. Our pricing is built on defined deliverables, not vague retainers.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Shield className="h-3.5 w-3.5 text-neon-cyan/50" aria-hidden />
                  No hidden fees
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Sparkles className="h-3.5 w-3.5 text-neon-cyan/50" aria-hidden />
                  Month to month
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              href={pricingHref}
              className="shrink-0"
            >
              See Pricing Plans
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
