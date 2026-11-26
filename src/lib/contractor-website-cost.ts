/**
 * Illustrative contractor website cost totals from published catalog amounts.
 * Cost comparison only — not an equivalent-service comparison or a quote.
 */

import {
  CATALOG_PLANS,
  OWN_IT_INCLUDED_HOSTING_MONTHS,
  SITE_CARE_MONTHLY_USD,
  type PlanSlug,
} from "@/lib/plans-catalog";

export type MonthlyPlanSlug = Extract<PlanSlug, "website" | "lead-system" | "plus">;

export const MONTHLY_PLAN_OPTIONS: { slug: MonthlyPlanSlug; label: string }[] = [
  { slug: "website", label: "Website" },
  { slug: "lead-system", label: "Lead System" },
  { slug: "plus", label: "Plus" },
];

export const PERIOD_PRESETS = [
  { months: 12, label: "1 year" },
  { months: 36, label: "3 years" },
  { months: 60, label: "5 years" },
] as const;

export const DEFAULT_MONTHLY_PLAN: MonthlyPlanSlug = "website";
export const DEFAULT_MONTHS = 36;
export const MIN_MONTHS = 12;
export const MAX_MONTHS = 60;

function planAmount(slug: PlanSlug): number {
  const plan = CATALOG_PLANS.find((p) => p.slug === slug);
  if (!plan) throw new Error(`Unknown plan slug: ${slug}`);
  return plan.amount;
}

/** Monthly plan total = published monthly price × months. Add-ons and tax excluded. */
export function monthlyPlanTotal(slug: MonthlyPlanSlug, months: number): number {
  const m = clampMonths(months);
  return planAmount(slug) * m;
}

/**
 * Own It = $1,497 + optional Site Care × max(0, months − included hosting months).
 * Site Care is off by default in the UI.
 */
export function ownItTotal(months: number, siteCare: boolean): number {
  const m = clampMonths(months);
  const base = planAmount("own-it");
  if (!siteCare) return base;
  const careMonths = Math.max(0, m - OWN_IT_INCLUDED_HOSTING_MONTHS);
  return base + SITE_CARE_MONTHLY_USD * careMonths;
}

export function clampMonths(months: number): number {
  if (!Number.isFinite(months)) return DEFAULT_MONTHS;
  return Math.min(MAX_MONTHS, Math.max(MIN_MONTHS, Math.round(months)));
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function compareTotals(input: {
  monthlyPlan: MonthlyPlanSlug;
  months: number;
  siteCare: boolean;
}) {
  const months = clampMonths(input.months);
  return {
    months,
    monthlyPlan: input.monthlyPlan,
    monthlyTotal: monthlyPlanTotal(input.monthlyPlan, months),
    ownItTotal: ownItTotal(months, input.siteCare),
    siteCare: input.siteCare,
    monthlyRate: planAmount(input.monthlyPlan),
    ownItBase: planAmount("own-it"),
    siteCareRate: SITE_CARE_MONTHLY_USD,
  };
}
