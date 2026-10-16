/**
 * Minimum time (ms) a human would take to fill and submit a form.
 * Kept deliberately low: the timing value is client-supplied and a real bot
 * can backdate it, so this only catches naive instant posts. A high value
 * (3s+) mostly false-positives fast users and autofill, so we keep it well
 * under the time needed to type three required fields.
 */
const MIN_FORM_TIME_MS = 1500;

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

  // Bots that POST JSON and skip unknown fields omit _ts. Require it.
  if (typeof submittedAt !== "number" || !Number.isFinite(submittedAt)) {
    return { blocked: true, reason: "too_fast" };
  }

  const elapsed = Date.now() - submittedAt;
  if (elapsed >= 0 && elapsed < MIN_FORM_TIME_MS) {
    return { blocked: true, reason: "too_fast" };
  }

  return { blocked: false };
}
