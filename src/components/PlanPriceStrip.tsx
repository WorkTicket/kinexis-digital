import Link from "next/link";
import { CATALOG_PLANS } from "@/lib/plans-catalog";

/** Compact price strip — numbers only from plans-catalog.ts. */
export default function PlanPriceStrip({
  heading = "Plans (from the live catalog)",
  locale = "en",
}: {
  heading?: string;
  locale?: "en" | "es";
}) {
  if (locale !== "en") return null;
  const pricingHref = "/pricing";
  return (
    <aside className="plan-price-strip" aria-label={heading}>
      <p className="plan-price-strip__head muted small">{heading}</p>
      <ul className="plan-price-strip__list">
        {CATALOG_PLANS.map((plan) => (
          <li key={plan.slug}>
            <Link href={`${pricingHref}#${plan.slug}`} prefetch={false}>
              <strong>{plan.name}</strong>
              <span>
                {plan.priceLabel}
                {plan.monthly ? plan.suffix : plan.suffix === "one-time" ? " once" : ` ${plan.suffix}`}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="muted small">
        $0 down on monthly plans · free homepage preview in 2 business days ·{" "}
        <Link href={pricingHref} prefetch={false}>
          full plan details
        </Link>
      </p>
    </aside>
  );
}
