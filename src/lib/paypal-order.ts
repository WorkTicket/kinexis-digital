import "server-only";
import { SITE } from "@/lib/site";
import { PAYPAL_CLIENT_ID } from "@/lib/paypal";

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 75_000;

type PayPalConfig = { id: string; secret: string; base: string };

type PayPalLink = { href?: string; rel?: string };

export type InvoiceInput = {
  amount: string;
  description: string;
  name: string;
  email: string;
  company?: string;
};

function config(): PayPalConfig | null {
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!secret) return null;
  const id = process.env.PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID;
  const base = (process.env.PAYPAL_API_BASE || "https://api-m.paypal.com").replace(/\/$/, "");
  try {
    const url = new URL(base);
    if (url.protocol !== "https:" || !["api-m.paypal.com", "api-m.sandbox.paypal.com"].includes(url.hostname)) return null;
    return { id, secret, base: url.origin };
  } catch {
    return null;
  }
}

function clean(value: string, max: number) {
  return value.replace(/[\n\r\t\f\v]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export function parseInvoice(input: InvoiceInput): { error: string } | {
  amount: string;
  description: string;
  name: string;
  email: string;
  company: string;
} {
  const raw = input.amount.replace(/[$,\s]/g, "");
  if (!/^\d{1,5}(\.\d{1,2})?$/.test(raw)) {
    return { error: "Enter a USD amount from $1 to $75,000, with up to 2 decimals." };
  }
  const value = Number(raw);
  if (value < MIN_AMOUNT || value > MAX_AMOUNT) {
    return { error: "Enter a USD amount from $1 to $75,000." };
  }
  const description = clean(input.description, 127);
  const name = clean(input.name, 120);
  const email = clean(input.email, 200);
  const company = clean(input.company ?? "", 120);
  if (description.length < 3) return { error: "Say what this payment is for." };
  if (name.length < 2) return { error: "Add your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Add a valid email." };
  return { amount: value.toFixed(2), description, name, email, company };
}

async function accessToken(cfg: PayPalConfig): Promise<string | null> {
  const res = await fetch(`${cfg.base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${cfg.id}:${cfg.secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) return null;
  const data = await res.json() as { access_token?: string };
  return data.access_token ?? null;
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

export async function createInvoiceOrder(input: {
  amount: string;
  description: string;
  name: string;
  email: string;
  company: string;
  requestId: string;
}): Promise<{ url: string } | { error: string } | { unconfigured: true }> {
  const cfg = config();
  if (!cfg) return { unconfigured: true };
  const token = await accessToken(cfg);
  if (!token) return { error: "PayPal didn't accept the checkout. Call us and we'll send a payment link." };

  const custom = clean([input.name, input.company, input.email].filter(Boolean).join(" | "), 127);
  const res = await fetch(`${cfg.base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": input.requestId,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        description: input.description,
        custom_id: custom,
        soft_descriptor: "KINEXIS DIGITAL",
        amount: { currency_code: "USD", value: input.amount },
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
    signal: AbortSignal.timeout(15_000),
  });
  const data = await res.json().catch(() => ({})) as { links?: PayPalLink[] };
  if (!res.ok) return { error: "PayPal couldn't start that payment. Check the amount and try again." };
  const url = paypalUrl(data.links?.find((link) => link.rel === "payer-action" || link.rel === "approve")?.href);
  if (!url) return { error: "PayPal didn't return a checkout link. Call us and we'll send one." };
  return { url };
}

export function isPayPalOrderId(value: string) {
  return /^[A-Z0-9]{10,20}$/.test(value);
}

export async function captureInvoiceOrder(orderId: string): Promise<"paid" | "failed" | "unconfigured"> {
  const cfg = config();
  if (!cfg) return "unconfigured";
  const token = await accessToken(cfg);
  if (!token) return "failed";

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const existing = await fetch(`${cfg.base}/v2/checkout/orders/${orderId}`, { headers, signal: AbortSignal.timeout(15_000) });
  const order = await existing.json().catch(() => ({})) as {
    status?: string;
    purchase_units?: { amount?: { currency_code?: string } }[];
  };
  if (!existing.ok) return "failed";
  if (order.purchase_units?.[0]?.amount?.currency_code !== "USD") return "failed";
  if (order.status === "COMPLETED") return "paid";
  if (order.status !== "APPROVED") return "failed";

  const res = await fetch(`${cfg.base}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: { ...headers, "PayPal-Request-Id": `capture-${orderId}` },
    signal: AbortSignal.timeout(15_000),
  });
  const data = await res.json().catch(() => ({})) as { status?: string; details?: { issue?: string }[] };
  if (data.status === "COMPLETED" || data.details?.some((detail) => detail.issue === "ORDER_ALREADY_CAPTURED")) return "paid";
  return "failed";
}
