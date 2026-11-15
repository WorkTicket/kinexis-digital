/**
 * PayPal invoice/order verification.
 *
 * Without PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET:
 *   - runs local capture / duplicate-reject logic mirrors only
 *
 * With credentials (prefer PAYPAL_API_BASE=https://api-m.sandbox.paypal.com):
 *   - OAuth token
 *   - create CAPTURE order
 *   - GET order
 *   - refuse capture of non-APPROVED order (no live customer payment)
 *   - positive path: sandbox card order create+capture (or capture a
 *     pre-approved order via PAYPAL_SANDBOX_APPROVED_ORDER_ID)
 *
 * Never charges a live customer. Sandbox is required for create/capture demos.
 *
 * Usage: node scripts/check-paypal-sandbox.mjs
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function loadEnvFiles() {
  for (const file of [".env.local", ".dev.vars"]) {
    try {
      const text = readFileSync(file, "utf8");
      for (const line of text.split(/\r?\n/)) {
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq < 1) continue;
        const key = line.slice(0, eq).trim();
        let value = line.slice(eq + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!(key in process.env) || process.env[key] === "") process.env[key] = value;
      }
    } catch {
      /* optional */
    }
  }
}

loadEnvFiles();

/** Mirror of captureInvoiceOrder duplicate handling. */
function interpretCapturePayload(data) {
  if (data.status === "COMPLETED") return "paid";
  if (data.details?.some((detail) => detail.issue === "ORDER_ALREADY_CAPTURED")) return "paid";
  return "failed";
}

assert.equal(interpretCapturePayload({ status: "COMPLETED" }), "paid");
assert.equal(
  interpretCapturePayload({ details: [{ issue: "ORDER_ALREADY_CAPTURED" }] }),
  "paid",
  "duplicate capture must count as paid (idempotent)",
);
assert.equal(interpretCapturePayload({ status: "APPROVED" }), "failed");
assert.equal(interpretCapturePayload({ status: "CREATED" }), "failed");
console.log("OK  local capture / duplicate-reject logic");

function isPayPalOrderId(value) {
  return /^[A-Z0-9]{10,20}$/.test(value);
}
assert.equal(isPayPalOrderId("5O190127TN364715T"), true);
assert.equal(isPayPalOrderId("bad"), false);
console.log("OK  order id shape checks");

function isSubscriptionId(value) {
  return /^I-[A-Z0-9]{6,}$/.test(value);
}
assert.equal(isSubscriptionId("I-1AB2CD3EF4GH"), true);
assert.equal(isSubscriptionId("SUB-1"), false);
console.log("OK  subscription id shape checks");

const clientId = (process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "").trim();
const secret = (process.env.PAYPAL_CLIENT_SECRET || "").trim();
const apiBase = (process.env.PAYPAL_API_BASE || "https://api-m.paypal.com").replace(/\/$/, "");
const isSandbox = apiBase.includes("sandbox.paypal.com");

if (!clientId || !secret) {
  console.log("SKIP live PayPal API — set PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET (sandbox preferred).");
  console.log("    Local logic checks passed. Wire sandbox secrets to exercise create/capture.");
  process.exit(0);
}

if (!isSandbox) {
  console.log(`WARN API base is ${apiBase} (not sandbox). Refusing create/capture against live API.`);
  console.log("    Set PAYPAL_API_BASE=https://api-m.sandbox.paypal.com for safe order tests.");
  // Still verify OAuth against the configured API so misconfig is visible.
}

async function accessToken() {
  const res = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(15_000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`OAuth ${res.status}: ${data.error || data.error_description || "failed"}`);
  }
  return data.access_token;
}

const token = await accessToken();
assert.ok(token, "oauth token");
console.log(`OK  PayPal OAuth against ${apiBase}`);

if (!isSandbox) {
  console.log("SKIP order create/capture — non-sandbox API.");
  process.exit(0);
}

const createRes = await fetch(`${apiBase}/v2/checkout/orders`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "PayPal-Request-Id": `kinexis-verify-${Date.now()}`,
  },
  body: JSON.stringify({
    intent: "CAPTURE",
    purchase_units: [{
      description: "Kinexis sandbox verification (do not pay)",
      soft_descriptor: "KINEXIS DIGITAL",
      amount: { currency_code: "USD", value: "1.00" },
    }],
    application_context: {
      brand_name: "Kinexis Digital",
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
      return_url: "https://www.kinexisdigital.com/api/checkout/capture",
      cancel_url: "https://www.kinexisdigital.com/pay?invoice=cancelled",
    },
  }),
  signal: AbortSignal.timeout(15_000),
});
const order = await createRes.json().catch(() => ({}));
if (!createRes.ok || !order.id) {
  console.error("FAIL create order", createRes.status, order);
  process.exit(1);
}
assert.ok(isPayPalOrderId(String(order.id).toUpperCase()) || typeof order.id === "string");
console.log(`OK  sandbox order created (${order.id}, status=${order.status})`);

const getRes = await fetch(`${apiBase}/v2/checkout/orders/${order.id}`, {
  headers: { Authorization: `Bearer ${token}` },
  signal: AbortSignal.timeout(15_000),
});
const got = await getRes.json().catch(() => ({}));
assert.equal(getRes.ok, true, "GET order");
assert.equal(got.status, "CREATED", "unpaid sandbox order stays CREATED");
console.log("OK  GET unpaid order stays CREATED (capture correctly refused until APPROVED)");

const captureRes = await fetch(`${apiBase}/v2/checkout/orders/${order.id}/capture`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "PayPal-Request-Id": `capture-${order.id}`,
  },
  signal: AbortSignal.timeout(15_000),
});
const captured = await captureRes.json().catch(() => ({}));
const interpreted = interpretCapturePayload(captured);
assert.equal(interpreted, "failed", "capture of CREATED order must fail (no fake paid)");
console.log("OK  capture of non-APPROVED order rejected (no charge)");

/** Positive path: capture a buyer-approved sandbox order, or create+capture via sandbox test card. */
const preApproved = (process.env.PAYPAL_SANDBOX_APPROVED_ORDER_ID || "").trim();
if (preApproved) {
  const approvedCapture = await fetch(`${apiBase}/v2/checkout/orders/${preApproved}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": `capture-approved-${preApproved}`,
    },
    signal: AbortSignal.timeout(20_000),
  });
  const approvedBody = await approvedCapture.json().catch(() => ({}));
  const approvedStatus = interpretCapturePayload(approvedBody);
  assert.equal(approvedStatus, "paid", `approved order capture must complete (got ${approvedCapture.status})`);
  console.log(`OK  positive capture of APPROVED order ${preApproved} → paid`);
} else {
  const cardCreate = await fetch(`${apiBase}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": `kinexis-card-${Date.now()}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        description: "Kinexis sandbox approved-capture proof ($1)",
        soft_descriptor: "KINEXIS DIGITAL",
        amount: { currency_code: "USD", value: "1.00" },
      }],
      payment_source: {
        card: {
          number: "4111111111111111",
          expiry: "2030-01",
          security_code: "123",
          name: "Sandbox Buyer",
          billing_address: {
            address_line_1: "2211 N First St",
            admin_area_2: "San Jose",
            admin_area_1: "CA",
            postal_code: "95131",
            country_code: "US",
          },
        },
      },
    }),
    signal: AbortSignal.timeout(20_000),
  });
  const cardOrder = await cardCreate.json().catch(() => ({}));
  if (!cardCreate.ok || !cardOrder.id) {
    console.error("FAIL sandbox card order create", cardCreate.status, cardOrder);
    console.error("    Enable Advanced Credit/Debit Card in the PayPal sandbox app,");
    console.error("    or set PAYPAL_SANDBOX_APPROVED_ORDER_ID to a buyer-approved sandbox order.");
    process.exit(1);
  }

  let cardStatus = cardOrder.status;
  let cardCaptureBody = cardOrder;
  if (cardStatus !== "COMPLETED") {
    const cardCapture = await fetch(`${apiBase}/v2/checkout/orders/${cardOrder.id}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": `capture-card-${cardOrder.id}`,
      },
      signal: AbortSignal.timeout(20_000),
    });
    cardCaptureBody = await cardCapture.json().catch(() => ({}));
    cardStatus = cardCaptureBody.status || cardStatus;
    if (!cardCapture.ok && interpretCapturePayload(cardCaptureBody) !== "paid") {
      console.error("FAIL sandbox card capture", cardCapture.status, cardCaptureBody);
      process.exit(1);
    }
  }

  const paid = interpretCapturePayload(cardCaptureBody) === "paid" || cardStatus === "COMPLETED";
  assert.equal(paid, true, "sandbox card path must produce a completed capture");
  console.log(`OK  positive sandbox capture (${cardOrder.id}, status=${cardStatus})`);
}

console.log("\nPayPal sandbox checks passed (negative + positive capture paths).");
process.exit(0);
