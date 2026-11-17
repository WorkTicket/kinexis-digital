import {
  CATALOG_PLANS,
  PLAN_CHOOSER_BLURB,
  PLAN_COMPARISON,
} from "@/lib/plans-catalog";
import { PLAN_TEXTBACK_FOOTNOTE_ITEMS } from "@/lib/content";
import MobilePlanComparison from "@/components/MobilePlanComparison";
import OwnershipCompare from "@/components/OwnershipCompare";
import type { ComparisonSection, OwnershipCompareData } from "@/i18n/spanish-plan-compare";
import { EN_OWNERSHIP } from "@/i18n/spanish-plan-compare";

function Cell({ value }: { value: string }) {
  if (value === "Yes" || value === "Sí") {
    return <span className="yes" role="img" aria-label={value === "Sí" ? "Incluido" : "Included"}>✓</span>;
  }
  if (value === "—") return <span className="no" role="img" aria-label="Not included">—</span>;
  return <>{value}</>;
}

type Labels = {
  feature?: string;
  ownershipHeading?: string;
  ownershipMark?: string;
  mobileHint?: string;
  popularLabel?: string;
  notesAria?: string;
  textbackLabel?: string;
  comparisonAria?: string;
  /** @deprecated Featured Lead System card removed; kept for call-site compat. */
  heading?: string;
  mark?: string;
  sub?: string;
  featuredCta?: string;
  pricingCta?: string;
};

type PlanCol = { slug: string; name: string; priceLabel: string; suffix: string; popular?: boolean };

/**
 * Four-plan comparison detail — follows PlanOffer; no duplicate “recommended” card.
 */
export default function PlanCompare({
  showOwnership = true,
  labels = {},
  comparison = PLAN_COMPARISON as ComparisonSection[],
  ownership = EN_OWNERSHIP,
  chooserBlurb = PLAN_CHOOSER_BLURB,
  textbackItems = PLAN_TEXTBACK_FOOTNOTE_ITEMS,
  plans,
  includedLabel,
  hideStickers = false,
}: {
  showOwnership?: boolean;
  labels?: Labels;
  comparison?: ComparisonSection[];
  ownership?: OwnershipCompareData;
  chooserBlurb?: string;
  textbackItems?: readonly string[];
  plans?: PlanCol[];
  /** Mobile card: replace "Yes"/"Sí" display */
  includedLabel?: string;
  hideStickers?: boolean;
}) {
  const feature = labels.feature ?? "Feature";
  const cols = plans ?? CATALOG_PLANS.map((plan) => ({
    slug: plan.slug,
    name: plan.name,
    priceLabel: plan.priceLabel,
    suffix: plan.suffix,
    popular: plan.popular,
  }));
  const priceRow = comparison.find((s) => /deal|acuerdo/i.test(s.group))?.rows.find((r) => /price|precio/i.test(r[0]));

  return (
    <div className="plan-compare">
      <MobilePlanComparison
        plans={cols.map((plan, index) => ({
          slug: plan.slug,
          name: plan.name,
          price: priceRow?.[index + 1] ?? `${plan.priceLabel}${plan.suffix}`,
          popular: plan.popular,
        }))}
        sections={comparison}
        hint={labels.mobileHint ?? "Tap a plan to see everything included. Open two to compare."}
        popularLabel={labels.popularLabel ?? "Most Popular"}
        includedLabel={includedLabel}
        hideStickers={hideStickers}
      />

      <div
        className="table-scroll plan-compare__table-wrap pricing-comparison-table"
        role="region"
        aria-label={labels.comparisonAria ?? "Plan feature comparison"}
        tabIndex={0}
      >
        <table className="plan-table plan-compare__table">
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">{feature}</span></th>
              {cols.map((plan) => (
                <th scope="col" className={plan.popular ? "is-pop" : undefined} key={plan.slug}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          {comparison.map((section) => (
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

      <aside className="plan-notes" aria-label={labels.notesAria ?? "Plan guidance and text-back details"}>
        <p className="plan-notes__lead">{chooserBlurb}</p>
        <div className="plan-notes__rule" aria-hidden="true" />
        <p className="plan-notes__label">{labels.textbackLabel ?? "Missed-call text-back"}</p>
        <div className="pricing-footnote pricing-footnote--bullets plan-notes__footnote">
          <ul>
            {textbackItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      {showOwnership ? (
        <OwnershipCompare
          heading={labels.ownershipHeading ?? ownership.headline}
          mark={labels.ownershipMark ?? "monthly managed plans"}
          data={ownership}
        />
      ) : null}
    </div>
  );
}
