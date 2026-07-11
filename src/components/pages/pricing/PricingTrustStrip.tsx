import { trustStripContent } from "@/content/pricing/generated-pricing-localized";
import type { Locale } from "@/i18n/routing";
import Reveal from "@/components/ui/Reveal";

type Props = {
  locale: Locale;
};

export default function PricingTrustStrip({ locale }: Props) {
  const TRUST_ITEMS = trustStripContent[locale];

  return (
    <Reveal
      stagger
      className="section-content mx-auto mb-10 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-6"
      aria-label="Pricing trust signals"
    >
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-surface bg-surface-base px-5 py-4 text-center"
        >
          <p className="text-sm font-bold text-white">{item.value}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{item.label}</p>
        </div>
      ))}
    </Reveal>
  );
}
