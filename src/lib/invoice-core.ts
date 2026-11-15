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
  paypalCaptureId?: string;
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

/** USD $1.00. Invoice amounts below this are rejected. */
export const INVOICE_MIN_AMOUNT_MINOR = 100;
/** USD $75,000.00. Matches the existing invoice amount ceiling. */
export const INVOICE_MAX_AMOUNT_MINOR = 7_500_000;
/** New v2 links require a dedicated signing key of at least this many UTF-8 bytes. */
export const INVOICE_SIGNING_KEY_MIN_BYTES = 32;
/** Legacy unversioned links may verify with a shorter historical key during rotation. */
export const INVOICE_LEGACY_KEY_MIN_BYTES = 16;
/** SHA-256 HMAC digest rendered as lowercase hex. */
export const INVOICE_TOKEN_DIGEST_HEX_LENGTH = 64;
/** PayPal order and capture ids used on invoice records. */
export const PAYPAL_RESOURCE_ID_PATTERN = /^[A-Z0-9]{10,20}$/;
export const MS_PER_DAY = 86_400_000;
export const INVOICE_DEFAULT_EXPIRY_DAYS = 14;
export const INVOICE_MIN_EXPIRY_DAYS = 1;
export const INVOICE_MAX_EXPIRY_DAYS = 90;
/** PayPal webhook bodies above this size are rejected before signature verification. */
export const PAYPAL_WEBHOOK_MAX_BYTES = 256 * 1024;

export function isInvoiceId(id: string) {
  return /^[0-9a-f-]{8,64}$/i.test(id);
}

export function isPayPalResourceId(value: string) {
  return PAYPAL_RESOURCE_ID_PATTERN.test(value);
}

export function isInvoiceTokenShape(token: string) {
  return new RegExp(`^(?:v2\\.)?[0-9a-f]{${INVOICE_TOKEN_DIGEST_HEX_LENGTH}}$`, "i").test(token);
}

async function invoiceDigest(id: string, secret: string, minimumKeyBytes: number): Promise<string | null> {
  if (!secret || new TextEncoder().encode(secret).byteLength < minimumKeyBytes || !isInvoiceId(id)) return null;
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

export async function signInvoiceToken(id: string, secret: string): Promise<string | null> {
  const digest = await invoiceDigest(id, secret, INVOICE_SIGNING_KEY_MIN_BYTES);
  return digest ? `v2.${digest}` : null;
}

function constantTimeHexMatch(expected: string, supplied: string): boolean {
  const normalized = supplied.toLowerCase();
  if (expected.length !== normalized.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index++) {
    difference |= expected.charCodeAt(index) ^ normalized.charCodeAt(index);
  }
  return difference === 0;
}

export type InvoiceTokenVerifyOptions = {
  nowMs?: number;
  /**
   * Epoch millis when the previous key stops being accepted.
   * Null or omitted keeps the previous key active until it is removed.
   * A non-finite value closes the previous key immediately.
   */
  previousValidUntilMs?: number | null;
};

/**
 * Verifies a v2 or legacy invoice token.
 * The current key always signs new links. The previous key is accepted only
 * during the rotation window: while it is configured and, if
 * `previousValidUntilMs` is set, while `nowMs` is still before that instant.
 */
export async function tokensMatch(
  id: string,
  token: string,
  currentSecret: string,
  previousSecret = "",
  options: InvoiceTokenVerifyOptions = {},
): Promise<boolean> {
  if (!isInvoiceTokenShape(token)) return false;
  const versioned = token.toLowerCase().startsWith("v2.");
  const suppliedDigest = versioned ? token.slice(3) : token;
  const nowMs = options.nowMs ?? Date.now();
  const until = options.previousValidUntilMs;
  const previousOpen = until == null || (Number.isFinite(until) && nowMs < until);
  const candidates = previousOpen ? [currentSecret, previousSecret] : [currentSecret];
  let matched = false;
  for (const secret of candidates) {
    const expectedDigest = await invoiceDigest(
      id,
      secret,
      versioned ? INVOICE_SIGNING_KEY_MIN_BYTES : INVOICE_LEGACY_KEY_MIN_BYTES,
    );
    if (expectedDigest) matched = constantTimeHexMatch(expectedDigest, suppliedDigest) || matched;
  }
  return matched;
}

export function evaluateStoredInvoice(
  invoice: StoredInvoice | null,
  nowMs = Date.now(),
  storageAvailable = true,
): { invoice: StoredInvoice } | { error: InvoiceGateError } {
  if (!invoice) return { error: storageAvailable ? "not_found" : "storage" };
  if (invoice.status === "paid") return { error: "paid" };
  if (invoice.status === "void") return { error: "void" };
  const expiresAt = Date.parse(invoice.expiresAt);
  if (!Number.isFinite(expiresAt) || expiresAt <= nowMs) return { error: "expired" };
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
