/**
 * Rules-based pre-qualification flags (plan 11.2).
 * Transparent, no ML, no invented thresholds.
 * Form flags are PRE-qualification hints — sales confirms on the call.
 */

export const SERVED_TRADES = [
  "Plumbing",
  "Landscaping",
  "Roofing",
  "Tree service",
] as const;

export type LeadQualityInput = {
  trade?: string | null;
  decisionMaker?: string | null;
  hasWebsite?: string | null;
  startTimeline?: string | null;
  planInterest?: string | null;
  spamSuspect?: boolean | null;
};

export type LeadQualityFlags = {
  served_trade: boolean;
  decision_maker: boolean;
  has_or_wants_site: boolean;
  /** Self-reported or plan interest; remains unknown until asked on the call unless clearly indicated. */
  budget_fit: boolean | "unknown";
  start_within_90_days: boolean;
  spam_suspect: boolean;
  /** All five CALL-qualification flags true (budget_fit must be true, not unknown). PRE-qual hint only. */
  qualified_hint: boolean;
  /** 0–5 = count of true flags among the five checklist items (budget_fit true counts; unknown does not). */
  hint_score: number;
};

function norm(value: string | null | undefined) {
  return String(value || "").trim().toLowerCase();
}

export function deriveLeadQuality(input: LeadQualityInput): LeadQualityFlags {
  const trade = String(input.trade || "").trim();
  const served_trade = (SERVED_TRADES as readonly string[]).includes(trade)
    || /plumbing|landscap|roof|tree\s*service/i.test(trade);

  const dm = norm(input.decisionMaker);
  const decision_maker = dm === "yes" || dm === "helps"
    || dm === "yes, i decide" || dm === "i help decide"
    || dm === "owner" || dm === "helps decide";

  const site = norm(input.hasWebsite);
  const has_or_wants_site = site === "yes" || site === "want" || site === "wants" || site === "want one"
    || site.startsWith("yes") || site.startsWith("want");

  const start = norm(input.startTimeline);
  const start_within_90_days = start.includes("30") || start.includes("1–3") || start.includes("1-3")
    || start.includes("within 30") || start.includes("1 to 3") || start === "asap";

  const plan = norm(input.planInterest);
  let budget_fit: boolean | "unknown" = "unknown";
  if (plan.includes("own it") || plan.includes("lead system") || plan.includes("plus")
    || plan.includes("current plan") || plan.includes("approved pilot") || plan.includes("website")) {
    budget_fit = true;
  } else if (plan.includes("too expensive") || plan.includes("no budget")) {
    budget_fit = false;
  }

  const spam_suspect = Boolean(input.spamSuspect);

  const five = [
    served_trade,
    decision_maker,
    has_or_wants_site,
    budget_fit === true,
    start_within_90_days,
  ];
  const hint_score = five.filter(Boolean).length;
  const qualified_hint = five.every(Boolean) && !spam_suspect;

  return {
    served_trade,
    decision_maker,
    has_or_wants_site,
    budget_fit,
    start_within_90_days,
    spam_suspect,
    qualified_hint,
    hint_score,
  };
}
