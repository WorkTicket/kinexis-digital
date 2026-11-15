import "server-only";
import { SITE } from "@/lib/site";
import { PAYPAL_CLIENT_ID } from "@/lib/paypal";
import { usdMinorUnits, paypalInvoiceId, verifyCompletedCapture, verifyOrderBeforeCapture, type InvoicePaymentExpectation } from "@/lib/payment-verification";
import { INVOICE_MAX_AMOUNT_MINOR, INVOICE_MIN_AMOUNT_MINOR, isPayPalResourceId, type StoredInvoice } from "@/lib/invoice-core";

const PAYPAL_REQUEST_TIMEOUT_MS = 15_000;
const PAYPAL_API_HOSTS = ["api-m.paypal.com", "api-m.sandbox.paypal.com"] as const;

export type PayPalConfig = { id: string; secret: string; base: string; merchantId: string };

export type InvoiceInput = {
  amount: string;
  description: string;
  name: string;
  email: string;
  company?: string;
};

export function readPayPalConfig(): PayPalConfig | null {
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  const id = process.env.PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID;
  const merchantId = process.env.PAYPAL_MERCHANT_ID;
  if (!secret || !id || !merchantId) return null;

  const base = (process.env.PAYPAL_API_BASE || "https://api-m.paypal.com").replace(/\/$/, "");
  try {
    const url = new URL(base);
    if (url.protocol !== "https:" || !PAYPAL_API_HOSTS.some((host) => host === url.hostname)) return null;
    return { id, secret, base: url.origin, merchantId };
  } catch {
    return null;
  }
}

function clean(value: string, max: number) {
  return value.replace(/[\n\r\t\f\v]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function invoiceAmount(value: string): string | null {
  const raw = value.replace(/[$,\s]/g, "");
  if (!/^\d{1,5}(\.\d{1,2})?$/.test(raw)) return null;
  const [whole, fraction = ""] = raw.split(".");
  const minor = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isSafeInteger(minor) || minor < INVOICE_MIN_AMOUNT_MINOR || minor > INVOICE_MAX_AMOUNT_MINOR) return null;
  return `${Math.floor(minor / 100)}.${String(minor % 100).padStart(2, "0")}`;
}

export function parseInvoice(input: InvoiceInput): { error: string } | {
  amount: string;
  description: string;
  name: string;
  email: string;
  company: string;
} {
  const amount = invoiceAmount(input.amount);
  if (!amount) return { error: "Enter a USD amount from $1 to $75,000, with up to 2 decimals." };
  const description = clean(input.description, 127);
  const name = clean(input.name, 120);
  const email = clean(input.email, 200);
  const company = clean(input.company ?? "", 120);
  if (description.length < 3) return { error: "Say what this payment is for." };
  if (name.length < 2) return { error: "Add your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Add a valid email." };
  return { amount, description, name, email, company };
}

export async function payPalAccessToken(cfg: PayPalConfig, fetcher: typeof fetch): Promise<string | null> {
  try {
    const res = await fetcher(`${cfg.base}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${cfg.id}:${cfg.secret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      signal: AbortSignal.timeout(PAYPAL_REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const data: unknown = await res.json().catch(() => null);
    if (!data || typeof data !== "object" || !("access_token" in data)) return null;
    const token = data.access_token;
    return typeof token === "string" && token.length > 0 ? token : null;
  } catch {
    return null;
  }
}

function paypalUrl(href: string | undefined) {
  if (!href) return null;
  try {
    const url = new URL(href);
    if (url.protocol !== "https:" || !/(^|\.)paypal\.com$/.test(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function createInvoiceOrder(input: {
  amount: string;
  description: string;
  name: string;
  email: string;
  company: string;
  requestId: string;
  invoiceId: string;
}, fetcher: typeof fetch = fetch): Promise<{ url: string; orderId: string } | { error: string } | { unconfigured: true }> {
  const cfg = readPayPalConfig();
  if (!cfg) return { unconfigured: true };
  const amount = invoiceAmount(input.amount);
  const amountMinor = usdMinorUnits(amount ?? "");
  if (!amount || amountMinor === null || !/^[0-9a-f-]{8,64}$/i.test(input.invoiceId) || input.requestId !== input.invoiceId) {
    return { error: "The invoice could not be verified. Please contact us." };
  }
  if (!/^[\w-]{16,38}$/.test(input.requestId)) return { error: "The invoice could not be verified. Please contact us." };
  const token = await payPalAccessToken(cfg, fetcher);
  if (!token) return { error: "PayPal didn't accept the checkout. Call us and we'll send a payment link." };

  const description = clean(input.description, 127);
  let res: Response;
  try {
    res = await fetcher(`${cfg.base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": input.requestId,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        description,
        custom_id: input.invoiceId,
        invoice_id: input.invoiceId,
        soft_descriptor: "KINEXIS DIGITAL",
        amount: { currency_code: "USD", value: amount },
      }],
      application_context: {
        brand_name: SITE.name,
        locale: "en-US",
        landing_page: "NO_PREFERENCE",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: `${SITE.url}/api/checkout/capture`,
        cancel_url: `${SITE.url}/pay?invoice=cancelled#invoice`,
      },
    }),
    signal: AbortSignal.timeout(PAYPAL_REQUEST_TIMEOUT_MS),
  });
  } catch {
    return { error: "PayPal couldn't start that payment. Check the invoice and try again." };
  }
  const data: unknown = await res.json().catch(() => null);
  if (!res.ok || !isRecord(data)) return { error: "PayPal couldn't start that payment. Check the invoice and try again." };
  const orderId = typeof data.id === "string" ? data.id : "";
  const links = Array.isArray(data.links) ? data.links.filter(isRecord) : [];
  const approvalLink = links.find((link) => link.rel === "payer-action" || link.rel === "approve");
  const url = paypalUrl(typeof approvalLink?.href === "string" ? approvalLink.href : undefined);
  if (!isPayPalOrderId(orderId) || !url) {
    return { error: "PayPal didn't return a valid checkout link. Call us and we'll send one." };
  }
  return { url, orderId };
}

export function isPayPalOrderId(value: string) {
  return isPayPalResourceId(value);
}

type PayPalCall = { cfg: PayPalConfig; token: string; headers: HeadersInit };

async function connect(fetcher: typeof fetch): Promise<PayPalCall | { error: "unavailable" | "unconfigured" }> {
  const cfg = readPayPalConfig();
  if (!cfg) return { error: "unconfigured" };
  const token = await payPalAccessToken(cfg, fetcher);
  if (!token) return { error: "unavailable" };
  return {
    cfg,
    token,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  };
}

async function getOrder(call: PayPalCall, orderId: string, fetcher: typeof fetch): Promise<unknown | null> {
  try {
    const res = await fetcher(`${call.cfg.base}/v2/checkout/orders/${orderId}`, {
      headers: call.headers,
      signal: AbortSignal.timeout(PAYPAL_REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return await res.json() as unknown;
  } catch {
    return null;
  }
}

export type PayPalOrderLookup =
  | { status: "ok"; invoiceId: string }
  | { status: "failed" | "unavailable" | "unconfigured" };

/** Reads the candidate invoice ID only; callers must match it to persisted invoice state. */
export async function invoiceIdForPayPalOrder(orderId: string, fetcher: typeof fetch = fetch): Promise<PayPalOrderLookup> {
  if (!isPayPalOrderId(orderId)) return { status: "failed" };
  const call = await connect(fetcher);
  if ("error" in call) return { status: call.error };
  const order = await getOrder(call, orderId, fetcher);
  if (!order) return { status: "unavailable" };
  const invoiceId = paypalInvoiceId(orderId, order);
  return invoiceId ? { status: "ok", invoiceId } : { status: "failed" };
}

export type PayPalCaptureResult =
  | { status: "paid"; captureId: string }
  | { status: "failed" | "unavailable" | "unconfigured" };

export async function captureInvoiceOrder(orderId: string, invoice: StoredInvoice, fetcher: typeof fetch = fetch): Promise<PayPalCaptureResult> {
  if (!isPayPalOrderId(orderId) || invoice.paypalOrderId !== orderId) return { status: "failed" };
  const call = await connect(fetcher);
  if ("error" in call) return { status: call.error };

  const expected: InvoicePaymentExpectation = {
    invoiceId: invoice.id,
    orderId,
    amount: invoice.amount,
    currency: invoice.currency,
    merchantId: call.cfg.merchantId,
  };
  const initial = await getOrder(call, orderId, fetcher);
  if (!initial) return { status: "unavailable" };
  const beforeCapture = verifyOrderBeforeCapture(initial, expected);
  if (!beforeCapture.ok) return { status: "failed" };
  if (beforeCapture.status === "paid") {
    return { status: "paid", captureId: beforeCapture.captureId };
  }
  if (invoice.status !== "unpaid" || Date.parse(invoice.expiresAt) <= Date.now()) {
    return { status: "failed" };
  }

  let capture: Response;
  try {
    capture = await fetcher(`${call.cfg.base}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: { ...call.headers, "PayPal-Request-Id": `capture-${orderId}` },
      signal: AbortSignal.timeout(PAYPAL_REQUEST_TIMEOUT_MS),
    });
  } catch {
    return { status: "unavailable" };
  }
  if (!capture.ok) {
    // A concurrent/retried request may have captured the same order. Only the
    // authoritative GET below can establish that it is a valid completed payment.
    const afterConflict = await getOrder(call, orderId, fetcher);
    if (!afterConflict) return { status: "unavailable" };
    const completed = verifyCompletedCapture(afterConflict, expected);
    return completed.ok && completed.status === "paid"
      ? { status: "paid", captureId: completed.captureId }
      : { status: "failed" };
  }

  const capturedOrder = await getOrder(call, orderId, fetcher);
  if (!capturedOrder) return { status: "unavailable" };
  const completed = verifyCompletedCapture(capturedOrder, expected);
  return completed.ok && completed.status === "paid"
    ? { status: "paid", captureId: completed.captureId }
    : { status: "failed" };
}
