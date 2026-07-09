import { Check } from "lucide-react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import type { PricingIncludedItem } from "@/content/pricing/pricing-pages";

type Props = {
  title: string;
  subtitle: string;
  items: PricingIncludedItem[];
  surfaceIndex: number;
};

export default function PricingIncludedSection({ title, subtitle, items, surfaceIndex }: Props) {
  return (
    <Section id="pricing-included" variant="dark" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader title={title} description={subtitle} />

        <Reveal className="section-content relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-surface bg-gradient-to-br from-white/[0.05] via-bg-secondary/90 to-bg-dark shadow-panel">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent"
            aria-hidden
          />

          <div className="relative border-b border-surface px-6 py-5 md:px-10 md:py-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Scope of work
              </span>
              <div className="flex items-center gap-2" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
            </div>
          </div>

          <Reveal as="ul" stagger className="relative grid gap-px bg-surface-hover md:grid-cols-2">
            {items.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 bg-bg-secondary/90 px-6 py-6 md:px-8 md:py-7"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.1]">
                  <Check className="h-2.5 w-2.5 text-neon-cyan" strokeWidth={2.5} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </Reveal>
        </Reveal>
      </div>
    </Section>
  );
}
