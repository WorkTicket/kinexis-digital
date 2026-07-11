import { Link } from "@/i18n/navigation";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import type { PricingPageContent } from "@/content/pricing/pricing-pages";

type Props = {
  tiers: PricingPageContent["tiers"];
  section: NonNullable<PricingPageContent["tiersSection"]>;
  surfaceIndex: number;
};

export default function PricingTiersSection({ tiers, section, surfaceIndex }: Props) {
  const recommendedIndex = tiers.length - 1;

  return (
    <Section id="pricing-tiers" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader title={section.title} description={section.subtitle} />

        <Reveal stagger className="section-content grid gap-5 sm:grid-cols-3">
          {tiers.map((tier, index) => {
            const isRecommended = index === recommendedIndex;

            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-500",
                  isRecommended
                    ? "z-10 border-neon-cyan/25 bg-gradient-to-b from-neon-cyan/[0.1] via-bg-secondary/95 to-bg-dark shadow-[0_24px_80px_-24px_rgba(0,212,255,0.35)] lg:-translate-y-4 lg:scale-[1.03]"
                    : "border-white/[0.06] bg-bg-secondary/80",
                  "p-6 md:p-8"
                )}
              >
                {isRecommended && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-neon-blue/80 via-neon-cyan to-neon-blue/80" />
                    <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neon-cyan">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      Recommended
                    </span>
                  </>
                )}

                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <p className="mt-3 type-metric text-2xl text-neon-cyan">{tier.range}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/50">{tier.description}</p>
                <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-neon-cyan/60">
                  Best for
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{tier.bestFor}</p>

                <Link
                  href="/contact"
                  className={cn(
                    "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200",
                    isRecommended
                      ? "bg-neon-cyan text-bg-dark hover:bg-white shadow-lg shadow-neon-cyan/25"
                      : "border border-white/[0.1] bg-white/[0.04] text-white/65 hover:border-neon-cyan/25 hover:bg-neon-cyan/10 hover:text-white"
                  )}
                  style={{ borderRadius: "var(--btn-radius)" }}
                >
                  {isRecommended ? "Get Started" : "Contact Us"}
                  <Check className="h-4 w-4" />
                </Link>

                {isRecommended && (
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-neon-cyan/[0.08] blur-[40px]" aria-hidden />
                )}
              </div>
            );
          })}
        </Reveal>

        {section.note && (
          <p className="section-content mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-white/35">
            {section.note}
          </p>
        )}
      </div>
    </Section>
  );
}
