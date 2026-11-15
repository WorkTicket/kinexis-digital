/** Pure invoice helpers — safe to unit-test without Cloudflare KV. */

export type InvoiceStatus = "unpaid" | "paid" | "void";

export type StoredInvoice = {
  id: string;
  amount: string;
  currency: "USD";
  description: string;
  status: InvoiceStatus;
  expiresAt: string;
  createdAt: string;
  company?: string;
  paypalOrderId?: string;
  paidAt?: string;
};

export type InvoiceGateError =
  | "missing"
  | "token"
  | "not_found"
  | "expired"
  | "paid"
  | "void"
  | "storage";

export function isInvoiceId(id: string) {
  return /^[0-9a-f-]{8,64}$/i.test(id);
}

export function isInvoiceTokenShape(token: string) {
  return /^[0-9a-f]{32,128}$/i.test(token);
}

export async function signInvoiceToken(id: string, secret: string): Promise<string | null> {
  if (!secret || secret.length < 16) return null;
  const keyBytes = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", keyBytes, new TextEncoder().encode(`invoice:${id}`));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function tokensMatch(id: string, token: string, secret: string): Promise<boolean> {
  if (!isInvoiceTokenShape(token)) return false;
  const expected = await signInvoiceToken(id, secret);
  if (!expected || expected.length !== token.length) return false;
  let ok = 0;
  for (let i = 0; i < expected.length; i++) ok |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  return ok === 0;
}

export function evaluateStoredInvoice(
  invoice: StoredInvoice | null,
  nowMs = Date.now(),
  storageAvailable = true,
): { invoice: StoredInvoice } | { error: InvoiceGateError } {
  if (!invoice) return { error: storageAvailable ? "not_found" : "storage" };
  if (invoice.status === "paid") return { error: "paid" };
  if (invoice.status === "void") return { error: "void" };
  if (Date.parse(invoice.expiresAt) <= nowMs) return { error: "expired" };
  if (invoice.currency !== "USD") return { error: "void" };
  return { invoice };
}

/** Public checkout must never accept a client-supplied amount. */
export function rejectClientAmount(amount: unknown): boolean {
  return amount != null && String(amount).trim() !== "";
}

export function parseConsentCookie(raw: string | null | undefined): {
  decided: boolean;
  analytics: boolean;
  ads: boolean;
} {
  if (!raw) return { decided: false, analytics: false, ads: false };
  try {
    const v = decodeURIComponent(raw);
    if (!v.startsWith("v1|")) return { decided: false, analytics: false, ads: false };
    return {
      decided: true,
      analytics: /(?:^|\|)a=1(?:\||$)/.test(v),
      ads: /(?:^|\|)d=1(?:\||$)/.test(v),
    };
  } catch {
    return { decided: false, analytics: false, ads: false };
  }
}

export function formatConsentCookie(analytics: boolean, ads: boolean) {
  return `v1|a=${analytics ? 1 : 0}|d=${ads ? 1 : 0}`;
}
