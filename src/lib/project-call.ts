/** Decision-makers who can book a project call on the contractor lander. */
const DECISION_ROLES = new Set(["owner", "partner", "manager"]);

/** Start windows that count as "within 3 months." */
const NEAR_TERM = new Set(["30-days", "1-3-months"]);

/**
 * Owners, partners, and managers who want to start within 3 months
 * see the calendar. Employees and people who are only researching do not.
 */
export function qualifiesForProjectCall(role: string, timeline: string): boolean {
  return DECISION_ROLES.has(role) && NEAR_TERM.has(timeline);
}
