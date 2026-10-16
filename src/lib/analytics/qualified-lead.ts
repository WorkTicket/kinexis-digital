/** Landing page whose single-step form no longer captures a role. */
const GET_A_WEBSITE_SLUG = "get-a-website";

/** Start windows that count as "within 3 months." */
const NEAR_TERM = new Set([
  "30-days",
  "next 30 days",
  "1-3-months",
  "1–3 months",
  "1-3 months",
]);

/**
 * Lowest real-project tier /lp/get-a-website sells: Basic websites start at
 * $500 and Custom starts at $2,000, so every budget chip on that page
 * (500-1999, 2000-4999, 5000-plus) is at or above this floor.
 */
const LOWEST_PROJECT_BUDGET = 500;

/** Read a budget's lower bound from a budget option value or notification label. */
function budgetFloor(budget: unknown): number | null {
  if (typeof budget !== "string" && typeof budget !== "number") return null;
  const lower = String(budget).trim().split(/[–—-]|\+/)[0];
  const digits = lower.replace(/[^\d]/g, "");
  if (!digits) return null;
  const amount = Number(digits);
  return Number.isFinite(amount) ? amount : null;
}

/**
 * QualifiedLead rule for the Meta CAPI event.
 *
 * On /lp/get-a-website the form only collects name, phone and email plus an
 * optional budget and timeline, so a role is no longer required: a lead
 * counts when a budget is given at or above the lowest real-project tier
 * ($500). Every other caller keeps the original owner + near-term rule.
 */
export function isQualifiedLead(
  role: unknown,
  budget: unknown,
  timeline: unknown,
  landingSlug?: unknown,
): boolean {
  const amount = budgetFloor(budget);
  if (amount === null || amount < LOWEST_PROJECT_BUDGET) return false;

  if (landingSlug === GET_A_WEBSITE_SLUG) return true;

  if (typeof role !== "string" || role.trim().toLowerCase() !== "owner") return false;
  if (typeof timeline !== "string") return false;
  return NEAR_TERM.has(timeline.trim().toLowerCase());
}
