/**
 * Stash lead details before redirecting to a thank-you page so Enhanced
 * Conversions can fire once on the destination without putting PII in the URL.
 */

const PENDING_KEY = "kinexis-pending-conversion";

export type PendingConversion = {
  type: "lead" | "audit";
  email: string;
  phone?: string;
  serviceInterest?: string;
  formType?: "contact" | "lead-magnet" | "landing-page";
  /** When true, conversion already fired on submit (e.g. booking) — thank-you only sets user_data. */
  conversionAlreadyFired?: boolean;
  storedAt: number;
};

const MAX_AGE_MS = 30 * 60 * 1000; // 30 minutes

export function stashPendingConversion(
  data: Omit<PendingConversion, "storedAt">,
): void {
  if (typeof window === "undefined") return;
  try {
    const payload: PendingConversion = { ...data, storedAt: Date.now() };
    window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage failures
  }
}

export function consumePendingConversion(
  expectedType?: PendingConversion["type"],
): PendingConversion | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(PENDING_KEY);
    const parsed = JSON.parse(raw) as PendingConversion;
    if (!parsed?.email || !parsed?.type) return null;
    if (Date.now() - parsed.storedAt > MAX_AGE_MS) return null;
    if (expectedType && parsed.type !== expectedType) return null;
    return parsed;
  } catch {
    return null;
  }
}
