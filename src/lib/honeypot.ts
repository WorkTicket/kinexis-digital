/** Minimum time (ms) a human would take to fill and submit a form. */
const MIN_FORM_TIME_MS = 3000;

export interface HoneypotResult {
  blocked: boolean;
  reason?: "honeypot_filled" | "too_fast";
}

export function validateHoneypot(
  body: Record<string, unknown>,
  submittedAt?: number,
): HoneypotResult {
  if (body._hp && String(body._hp) !== "") {
    return { blocked: true, reason: "honeypot_filled" };
  }

  if (submittedAt !== undefined) {
    const elapsed = Date.now() - submittedAt;
    if (elapsed < MIN_FORM_TIME_MS) {
      return { blocked: true, reason: "too_fast" };
    }
  }

  return { blocked: false };
}
