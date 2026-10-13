/** Accept the form's option values and human-readable notification labels. */
export function isQualifiedLead(role: unknown, budget: unknown, timeline: unknown): boolean {
  if (typeof role !== "string" || role.trim().toLowerCase() !== "owner") return false;
  if (typeof budget !== "string" && typeof budget !== "number") return false;
  const amount = Number(String(budget).trim().replace(/^\$/, "").replace(/,/g, "").split(/[–—-]|\+/)[0]);
  if (!Number.isFinite(amount) || amount < 500) return false;
  if (typeof timeline !== "string") return false;
  return ["30-days", "next 30 days", "1-3-months", "1–3 months", "1-3 months"].includes(timeline.trim().toLowerCase());
}
