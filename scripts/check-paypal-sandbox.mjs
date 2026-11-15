/**
 * PayPal invoice/order verification.
 *
 * Production response validation is exercised by check-payment-integrity.mjs.
 * This script only validates the external sandbox provider flow.
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

function isSubscriptionId(value) {
  return /^I-[A-Z0-9]{6,}$/.test(value);
}
assert.equal(isSubscriptionId("I-1AB2CD3EF4GH"), true);
assert.equal(isSubscriptionId("SUB-1"), false);
console.log("OK  subscription id shape checks");

function mockResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function runMockedProviderContract() {
  const calls = [];
  const fetcher = async (input, init = {}) => {
    const url = String(input);
    const method = init.method ?? "GET";
    calls.push({ url, method });
    if (url.endsWith("/v1/oauth2/token")) return mockResponse({ access_token: "mock-token" });
    if (url.endsWith("/v2/checkout/orders") && method === "POST") {
      return mockResponse({ id: "5O190127TN364715T", status: "CREATED" }, 201);
    }
    if (url.endsWith("/v2/checkout/orders/5O190127TN364715T") && method === "GET") {
      return mockResponse({ id: "5O190127TN364715T", status: "CREATED" });
    }
    if (url.endsWith("/capture")) return mockResponse({ name: "ORDER_NOT_APPROVED" }, 422);
    if (url.endsWith("/v1/notifications/verify-webhook-signature")) {
      const body = JSON.parse(String(init.body));
      assert.equal(body.webhook_id, "WHID1234567890");
      assert.equal(body.webhook_event.id, "WH-MOCK");
      return mockResponse({ verification_status: body.transmission_id === "good" ? "SUCCESS" : "FAILURE" });
    }
    throw new Error(`unexpected mock request ${method} ${url}`);
  };
  const tokenRes = await fetcher("https://api-m.sandbox.paypal.com/v1/oauth2/token", { method: "POST" });
  assert.equal((await tokenRes.json()).access_token, "mock-token");
  const created = await fetcher("https://api-m.sandbox.paypal.com/v2/checkout/orders", { method: "POST" });
  const order = await created.json();
  assert.equal(order.status, "CREATED");
  const fetched = await fetcher(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${order.id}`);
  assert.equal((await fetched.json()).status, "CREATED");
  const capture = await fetcher(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${order.id}/capture`, { method: "POST" });
  assert.equal(capture.ok, false);
  const verified = await fetcher("https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature", {
    method: "POST",
    body: JSON.stringify({
      webhook_id: "WHID1234567890",
      transmission_id: "good",
      webhook_event: { id: "WH-MOCK" },
    }),
  });
  assert.equal((await verified.json()).verification_status, "SUCCESS");
  const rejected = await fetcher("https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature", {
    method: "POST",
    body: JSON.stringify({
      webhook_id: "WHID1234567890",
      transmission_id: "bad",
      webhook_event: { id: "WH-MOCK" },
    }),
  });
  assert.equal((await rejected.json()).verification_status, "FAILURE");
  assert.equal(calls.length, 6);
  console.log("MOCKED provider contract PASS (not sandbox evidence).");
}

await runMockedProviderContract();

const clientId = (process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "").trim();
const secret = (process.env.PAYPAL_CLIENT_SECRET || "").trim();
const apiBase = (process.env.PAYPAL_API_BASE || "https://api-m.paypal.com").replace(/\/$/, "");
const isSandbox = apiBase.includes("sandbox.paypal.com");

if (!clientId || !secret || process.env.PAYPAL_SANDBOX_CONFIRM !== "1") {
  console.log("SANDBOX EVIDENCE: NOT RUN");
  console.log("    Set sandbox PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_BASE=https://api-m.sandbox.paypal.com, and PAYPAL_SANDBOX_CONFIRM=1.");
  console.log("    Mocked results above are not sandbox evidence.");
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
assert.equal(typeof order.id, "string");
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
  assert.notEqual(captured.status, "COMPLETED", "capture of CREATED order must fail (no fake paid)");
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
  assert.equal(approvedBody.status, "COMPLETED", `approved order capture must complete (got ${approvedCapture.status})`);
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
    if (!cardCapture.ok && cardStatus !== "COMPLETED") {
      console.error("FAIL sandbox card capture", cardCapture.status, cardCaptureBody);
      process.exit(1);
    }
  }

  const paid = cardCaptureBody.status === "COMPLETED" || cardStatus === "COMPLETED";
  assert.equal(paid, true, "sandbox card path must produce a completed capture");
  console.log(`OK  positive sandbox capture (${cardOrder.id}, status=${cardStatus})`);
}

console.log("\nPayPal sandbox checks passed (negative + positive capture paths).");
process.exit(0);
