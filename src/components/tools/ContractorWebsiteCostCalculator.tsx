"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEFAULT_MONTHLY_PLAN,
  DEFAULT_MONTHS,
  MAX_MONTHS,
  MIN_MONTHS,
  MONTHLY_PLAN_OPTIONS,
  PERIOD_PRESETS,
  clampMonths,
  compareTotals,
  formatUsd,
  type MonthlyPlanSlug,
} from "@/lib/contractor-website-cost";
import { CATALOG_PLANS, OWN_IT_INCLUDED_HOSTING_MONTHS, TEXTBACK_MATRIX } from "@/lib/plans-catalog";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ContractorWebsiteCostCalculator() {
  const [monthlyPlan, setMonthlyPlan] = useState<MonthlyPlanSlug>(DEFAULT_MONTHLY_PLAN);
  const [months, setMonths] = useState(DEFAULT_MONTHS);
  const [siteCare, setSiteCare] = useState(false);

  const totals = useMemo(
    () => compareTotals({ monthlyPlan, months, siteCare }),
    [monthlyPlan, months, siteCare],
  );

  const planLabel = MONTHLY_PLAN_OPTIONS.find((p) => p.slug === monthlyPlan)?.label ?? "Website";

  function trackCompare() {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "tool_calculate", {
        tool: "contractor_website_cost",
        plan: monthlyPlan,
        months: totals.months,
        site_care: siteCare,
      });
    }
  }

  return (
    <div className="missed-call-calc contractor-cost-calc" id="cost-calculator">
      <div className="missed-call-calc__grid">
        <label>
          Monthly plan
          <select
            value={monthlyPlan}
            onChange={(e) => setMonthlyPlan(e.target.value as MonthlyPlanSlug)}
          >
            {MONTHLY_PLAN_OPTIONS.map((option) => {
              const amount = CATALOG_PLANS.find((p) => p.slug === option.slug)?.amount ?? 0;
              return (
                <option key={option.slug} value={option.slug}>
                  {option.label} ({formatUsd(amount)}/mo)
                </option>
              );
            })}
          </select>
        </label>

        <fieldset className="contractor-cost-calc__period">
          <legend>Period</legend>
          <div className="contractor-cost-calc__presets" role="group" aria-label="Period presets">
            {PERIOD_PRESETS.map((preset) => (
              <button
                key={preset.months}
                type="button"
                className={`btn btn--sm${months === preset.months ? " btn--primary" : " btn--ghost"}`}
                aria-pressed={months === preset.months}
                onClick={() => setMonths(preset.months)}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <label>
            Or months (12–60)
            <input
              type="number"
              min={MIN_MONTHS}
              max={MAX_MONTHS}
              step={1}
              value={months}
              onChange={(e) => setMonths(clampMonths(Number(e.target.value)))}
            />
          </label>
        </fieldset>

        <label className="contractor-cost-calc__toggle">
          <input
            type="checkbox"
            checked={siteCare}
            onChange={(e) => setSiteCare(e.target.checked)}
          />
          <span>
            Optional Site Care after year one ({formatUsd(totals.siteCareRate)}/mo on Own It)
          </span>
        </label>
      </div>

      <div className="missed-call-calc__results" aria-live="polite">
        <p>
          <strong>{planLabel} over {totals.months} months:</strong> {formatUsd(totals.monthlyTotal)}
        </p>
        <p>
          <strong>Own It over {totals.months} months:</strong> {formatUsd(totals.ownItTotal)}
          {siteCare
            ? ` (includes Site Care after month ${OWN_IT_INCLUDED_HOSTING_MONTHS})`
            : " (Site Care off)"}
        </p>
        <p className="muted small">
          Headline totals exclude add-ons and tax. Text-back is not in these totals: Website and Own It
          {" "}{TEXTBACK_MATRIX.website}; Lead System {TEXTBACK_MATRIX.leadSystem}; Plus {TEXTBACK_MATRIX.plus}.
        </p>
      </div>

      <p className="missed-call-calc__formula">
        This is a cost comparison, not an equivalent-service comparison. Lead System and Plus include
        follow-up tools Own It does not; Own It includes site-file ownership from launch that monthly
        plans do not unless you buy out in writing ($1,497). Monthly plans are month-to-month—cancel
        anytime; the site stays live through the paid period, then hosting ends unless you buy out or
        move to Own It first. 30-day money-back on every plan. 60-day lead guarantee only on Lead
        System and Plus. Current published prices for illustration only.
      </p>

      <p className="btn-row">
        <button type="button" className="btn btn--primary" onClick={trackCompare}>
          Refresh totals
        </button>
        <Link className="btn btn--ghost" href="/contact" prefetch={false}>
          Get a free homepage preview
        </Link>
      </p>
    </div>
  );
}
