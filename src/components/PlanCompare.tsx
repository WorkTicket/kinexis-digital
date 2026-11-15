import {
  CATALOG_PLANS,
  PLAN_CHOOSER_BLURB,
  PLAN_COMPARISON,
} from "@/lib/plans-catalog";
import { PLAN_TEXTBACK_FOOTNOTE_ITEMS } from "@/lib/content";
import MobilePlanComparison from "@/components/MobilePlanComparison";
import OwnershipCompare from "@/components/OwnershipCompare";

function Cell({ value }: { value: string }) {
  if (value === "Yes") return <span className="yes" role="img" aria-label="Included">✓</span>;
  if (value === "—") return <span className="no" role="img" aria-label="Not included">—</span>;
  return <>{value}</>;
}

type Labels = {
  feature?: string;
  ownershipHeading?: string;
  ownershipMark?: string;
  mobileHint?: string;
  popularLabel?: string;
  /** @deprecated Featured Lead System card removed; kept for call-site compat. */
  heading?: string;
  mark?: string;
  sub?: string;
  featuredCta?: string;
  pricingCta?: string;
};

/**
 * Four-plan comparison detail — follows PlanOffer; no duplicate “recommended” card.
 */
export default function PlanCompare({
  showOwnership = true,
  labels = {},
}: {
  showOwnership?: boolean;
  labels?: Labels;
}) {
  const feature = labels.feature ?? "Feature";
  const priceRow = PLAN_COMPARISON.find((s) => s.group === "The deal")?.rows.find((r) => r[0] === "Price");

  return (
    <div className="plan-compare">
      <MobilePlanComparison
        plans={CATALOG_PLANS.map((plan, index) => ({
          slug: plan.slug,
          name: plan.name,
          price: priceRow?.[index + 1] ?? `${plan.priceLabel}${plan.suffix}`,
          popular: plan.popular,
        }))}
        sections={PLAN_COMPARISON}
        hint={labels.mobileHint ?? "Tap a plan to see everything included. Open two to compare."}
        popularLabel={labels.popularLabel ?? "Most Popular"}
      />

      <div className="table-scroll plan-compare__table-wrap pricing-comparison-table">
        <table className="plan-table plan-compare__table">
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">{feature}</span></th>
              <th scope="col">Website</th>
              <th scope="col" className="is-pop">Lead System</th>
              <th scope="col">Plus</th>
              <th scope="col">Own It</th>
            </tr>
          </thead>
          {PLAN_COMPARISON.map((section) => (
            <tbody key={section.group}>
              <tr className="plan-table__group">
                <th colSpan={5} scope="rowgroup"><span>{section.group}</span></th>
              </tr>
              {section.rows.map(([label, ...values]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {values.map((value, i) => (
                    <td className={i === 1 ? "is-pop" : undefined} key={`${label}-${i}`}>
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <aside className="plan-notes" aria-label="Plan guidance and text-back details">
        <p className="plan-notes__lead">{PLAN_CHOOSER_BLURB}</p>
        <div className="plan-notes__rule" aria-hidden="true" />
        <p className="plan-notes__label">Missed-call text-back</p>
        <div className="pricing-footnote pricing-footnote--bullets plan-notes__footnote">
          <ul>
            {PLAN_TEXTBACK_FOOTNOTE_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      {showOwnership ? (
        <OwnershipCompare
          heading={labels.ownershipHeading}
          mark={labels.ownershipMark ?? "monthly managed plans"}
        />
      ) : null}
    </div>
  );
}
