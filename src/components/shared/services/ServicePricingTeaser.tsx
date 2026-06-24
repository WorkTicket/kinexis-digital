"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { PricingSlug } from "@/content/registry/site-routes";
import { pricingRoutes } from "@/content/registry/site-routes";

type Props = {
  slug: PricingSlug;
};

/** Optional pre-FAQ pricing link — same layout on every service page. */
export default function ServicePricingTeaser({ slug }: Props) {
  const pricingHref = pricingRoutes[slug];

  return (
    <div className="section-padding border-t border-white/[0.06] bg-bg-dark">
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-neon-cyan/10 bg-neon-cyan/[0.03] px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neon-cyan/60">Transparent Pricing</p>
            <p className="mt-1 text-base font-semibold text-white">See what&apos;s included at each tier.</p>
            <p className="mt-0.5 text-sm text-white/40">Fixed scope. No surprise fees on the invoice.</p>
          </div>
          <Link
            href={pricingHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-neon-cyan/20 bg-neon-cyan/10 px-5 py-2.5 text-sm font-semibold text-neon-cyan transition-colors duration-200 hover:bg-neon-cyan/20 whitespace-nowrap"
            style={{ borderRadius: "var(--btn-radius)" }}
          >
            See Pricing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
