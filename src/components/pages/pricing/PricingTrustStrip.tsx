"use client";

import { trustStripContent } from "@/content/pricing/generated-pricing-localized";
import type { Locale } from "@/i18n/routing";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { m as motion } from "@/lib/framer";

type Props = {
  locale: Locale;
};

export default function PricingTrustStrip({ locale }: Props) {
  const TRUST_ITEMS = trustStripContent[locale];
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <motion.div
      className="section-content mx-auto mb-10 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-6"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      aria-label="Pricing trust signals"
    >
      {TRUST_ITEMS.map((item) => (
        <motion.div
          key={item.label}
          variants={fadeUp}
          className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-5 py-4 text-center"
        >
          <p className="text-sm font-bold text-white">{item.value}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
