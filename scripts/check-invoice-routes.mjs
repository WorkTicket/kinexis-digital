/**
 * Route-handler integration tests. PayPal HTTP is mocked at the provider boundary.
 * These are not live sandbox evidence.
 */
import assert from "node:assert/strict";
import { bundleServer } from "./bundle-server.mjs";
import { openInvoiceLedger } from "./invoice-sql-adapter.mjs";

const secret = "test-invoice-link-secret-32chars!!";
process.env.INVOICE_TEST_MEMORY = "1";
process.env.INVOICE_LINK_SECRET = secret;
process.env.INVOICE_LINK_SECRET_PREVIOUS = "previous-invoice-link-secret-32chars!";
process.env.INVOICE_ADMIN_SECRET = "invoice-admin-secret";
process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID = "test-client-id";
process.env.PAYPAL_CLIENT_ID = "test-client-id";
process.env.PAYPAL_CLIENT_SECRET = "test-client-secret";
process.env.PAYPAL_MERCHANT_ID = "KINEXISMERCHANT123";
process.env.PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";
process.env.PAYPAL_WEBHOOK_ID = "WHID1234567890";

const routes = await bundleServer("scripts/invoice-route-harness.ts", ".tmp-invoice-routes.mjs");
const ledger = openInvoiceLedger();
routes.setInvoiceTestDatabase(ledger);

const origin = "http://localhost:3000";
const state = {
  orderId: "5O190127TN364701",
  captureId: "8MC585209K746301",
  invoiceId: "",
  amount: "2500.00",
  currency: "USD",
  status: "APPROVED",
  verification: "SUCCESS",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function orderPayload() {
  const completed = state.status === "COMPLETED";
  return {
    id: state.orderId,
    status: state.status,
    intent: "CAPTURE",
    purchase_units: [{
      invoice_id: state.invoiceId,
      custom_id: state.invoiceId,
      amount: { currency_code: state.currency, value: state.amount },
      payee: { merchant_id: "KINEXISMERCHANT123" },
      ...(completed ? {
        payments: {
          captures: [{
            id: state.captureId,
            status: "COMPLETED",
            amount: { currency_code: state.currency, value: state.amount },
          }],
        },
      } : {}),
    }],
  };
}

const calls = [];
globalThis.fetch = async (input, init = {}) => {
  const url = String(input);
  const method = init.method ?? "GET";
  calls.push({ url, method, body: typeof init.body === "string" ? init.body : "" });
  if (url.endsWith("/v1/oauth2/token")) return jsonResponse({ access_token: "test-access-token" });
  if (url.endsWith("/v1/notifications/verify-webhook-signature") && method === "POST") {
    return jsonResponse({ verification_status: state.verification });
  }
  if (url.endsWith("/v2/checkout/orders") && method === "POST") {
    return jsonResponse({
      id: state.orderId,
      links: [{ rel: "payer-action", href: `https://www.sandbox.paypal.com/checkoutnow?token=${state.orderId}` }],
    }, 201);
  }
  if (url.endsWith(`/v2/checkout/orders/${state.orderId}`) && method === "GET") return jsonResponse(orderPayload());
  if (url.endsWith(`/v2/checkout/orders/${state.orderId}/capture`) && method === "POST") {
    state.status = "COMPLETED";
    return jsonResponse({ status: "COMPLETED" });
  }
  throw new Error(`unexpected PayPal request ${method} ${url}`);
};

function post(path, body, headers = {}) {
  return new Request(`${origin}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin,
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

async function createInvoice(amount = "2500.00") {
  const response = await routes.invoicePost(post("/api/invoices", {
    amount,
    description: "Site deposit",
    company: "Example LLC",
  }, { "x-invoice-admin": process.env.INVOICE_ADMIN_SECRET }));
  assert.equal(response.status, 200);
  const payload = await response.json();
  const url = new URL(payload.path, origin);
  return {
    id: payload.id,
    token: url.searchParams.get("t"),
  };
}

async function checkout(invoice, extra = {}) {
  return routes.checkoutPost(post("/api/checkout", {
    invoiceId: invoice.id,
    token: invoice.token,
    name: "Test Buyer",
    email: "buyer@example.test",
    ...extra,
  }));
}

function assignOrder(invoice, orderId, captureId) {
  state.invoiceId = invoice.id;
  state.orderId = orderId;
  state.captureId = captureId;
  state.amount = "2500.00";
  state.currency = "USD";
  state.status = "APPROVED";
  state.verification = "SUCCESS";
}

const callsBeforeAmount = calls.length;
const amountTamper = await routes.checkoutPost(post("/api/checkout", {
  amount: "1.00",
  invoiceId: "11111111-2222-3333-4444-555555555555",
  token: "0".repeat(64),
  name: "Test Buyer",
  email: "buyer@example.test",
}));
assert.equal(amountTamper.status, 400);
assert.equal(calls.length, callsBeforeAmount, "client amount is rejected before PayPal");

const forged = await checkout({ id: "11111111-2222-3333-4444-555555555555", token: "ab".repeat(32) });
assert.equal(forged.status, 400);

const invoice = await createInvoice();
assert.ok(invoice.token?.startsWith("v2."));
const expired = await createInvoice();
ledger.sqlite.prepare("UPDATE invoices SET expires_at = ? WHERE id = ?").run("2000-01-01T00:00:00.000Z", expired.id);
const expiredResponse = await checkout(expired);
assert.equal(expiredResponse.status, 400);
const expiredBody = await expiredResponse.json();
assert.match(expiredBody.error, /expired/i);

assignOrder(invoice, "5O190127TN364701", "8MC585209K746301");
const started = await checkout(invoice);
assert.equal(started.status, 200);
const startedBody = await started.json();
assert.equal(startedBody.url, "https://www.sandbox.paypal.com/checkoutnow?token=5O190127TN364701");
const createCall = calls.find((call) => call.url.endsWith("/v2/checkout/orders") && call.method === "POST");
assert.ok(createCall);
assert.equal(JSON.parse(createCall.body).purchase_units[0].amount.value, "2500.00");
const replay = await checkout(invoice);
assert.equal(replay.status, 200);
assert.equal((await routes.getInvoice(invoice.id))?.paypalOrderId, state.orderId);
assert.equal(ledger.sqlite.prepare("SELECT COUNT(*) AS n FROM invoices WHERE paypal_order_id = ?").get(state.orderId).n, 1);

const captureUrl = `${origin}/api/checkout/capture?token=${state.orderId}`;
const firstCapture = await routes.captureGet(new Request(captureUrl));
assert.equal(firstCapture.status, 303);
assert.match(firstCapture.headers.get("location") ?? "", /\/pay\/thanks\?kind=invoice&status=paid$/);
assert.equal((await routes.getInvoice(invoice.id))?.status, "paid");
assert.equal((await routes.getInvoice(invoice.id))?.paypalCaptureId, state.captureId);
const secondCapture = await routes.captureGet(new Request(captureUrl));
assert.equal(secondCapture.status, 303);
assert.match(secondCapture.headers.get("location") ?? "", /\/pay\/thanks\?kind=invoice&status=paid$/);
assert.equal(ledger.sqlite.prepare("SELECT COUNT(*) AS n FROM payment_events WHERE paypal_capture_id = ? AND outcome = 'applied'").get(state.captureId).n, 1);

const malformed = await routes.captureGet(new Request(`${origin}/api/checkout/capture?token=not-an-order`));
assert.equal(malformed.status, 303);
assert.match(malformed.headers.get("location") ?? "", /invoice=error/);

async function payableInvoice() {
  const createdInvoice = await createInvoice();
  const suffix = String(ledger.sqlite.prepare("SELECT COUNT(*) AS n FROM invoices").get().n).padStart(2, "0");
  assignOrder(createdInvoice, `5O190127TN3647${suffix}`, `8MC585209K7463${suffix}`);
  const response = await checkout(createdInvoice);
  assert.equal(response.status, 200);
  return createdInvoice;
}

const tamperedAmount = await payableInvoice();
state.amount = "1.00";
const capturesBeforeAmount = calls.filter((call) => call.url.endsWith("/capture")).length;
const amountCapture = await routes.captureGet(new Request(`${origin}/api/checkout/capture?token=${state.orderId}`));
assert.match(amountCapture.headers.get("location") ?? "", /invoice=error/);
assert.equal((await routes.getInvoice(tamperedAmount.id))?.status, "unpaid");
assert.equal(calls.filter((call) => call.url.endsWith("/capture")).length, capturesBeforeAmount);

const tamperedCurrency = await payableInvoice();
state.currency = "EUR";
const capturesBeforeCurrency = calls.filter((call) => call.url.endsWith("/capture")).length;
const currencyCapture = await routes.captureGet(new Request(`${origin}/api/checkout/capture?token=${state.orderId}`));
assert.match(currencyCapture.headers.get("location") ?? "", /invoice=error/);
assert.equal((await routes.getInvoice(tamperedCurrency.id))?.status, "unpaid");
assert.equal(calls.filter((call) => call.url.endsWith("/capture")).length, capturesBeforeCurrency);

function webhookRequest(event, transmissionId) {
  return new Request(`${origin}/api/paypal/webhook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin,
      "paypal-auth-algo": "SHA256withRSA",
      "paypal-cert-url": "https://api.sandbox.paypal.com/v1/notifications/certs/CERT",
      "paypal-transmission-id": transmissionId,
      "paypal-transmission-sig": "c2lnbmF0dXJl",
      "paypal-transmission-time": "2026-11-15T12:00:00Z",
    },
    body: JSON.stringify(event),
  });
}

function captureEvent(invoiceId, orderId, captureId, amount = "2500.00", currency = "USD") {
  return {
    id: `WH${captureId}`,
    event_type: "PAYMENT.CAPTURE.COMPLETED",
    resource: {
      id: captureId,
      status: "COMPLETED",
      invoice_id: invoiceId,
      custom_id: invoiceId,
      amount: { currency_code: currency, value: amount },
      supplementary_data: { related_ids: { order_id: orderId } },
    },
  };
}

const webhookInvoice = await payableInvoice();
const webhookOrder = state.orderId;
const webhookCapture = state.captureId;
state.verification = "FAILURE";
const forgedWebhook = await routes.webhookPost(webhookRequest(
  captureEvent(webhookInvoice.id, webhookOrder, webhookCapture),
  "forged-transmission",
));
assert.equal(forgedWebhook.status, 400);
assert.equal((await routes.getInvoice(webhookInvoice.id))?.status, "unpaid");

state.verification = "SUCCESS";
state.amount = "2500.00";
state.currency = "USD";
state.status = "APPROVED";
const event = captureEvent(webhookInvoice.id, webhookOrder, webhookCapture);
const accepted = await routes.webhookPost(webhookRequest(event, "good-transmission"));
assert.equal(accepted.status, 200);
assert.equal((await routes.getInvoice(webhookInvoice.id))?.status, "paid");
const replayed = await routes.webhookPost(webhookRequest(event, "good-transmission-replay"));
assert.equal(replayed.status, 200);
assert.equal(ledger.sqlite.prepare("SELECT COUNT(*) AS n FROM payment_events WHERE event_id = ?").get(event.id).n, 1);

const mismatch = await payableInvoice();
const mismatchEvent = captureEvent(mismatch.id, state.orderId, state.captureId, "1.00");
const beforeCapturePosts = calls.filter((call) => call.url.endsWith("/capture")).length;
const mismatchResponse = await routes.webhookPost(webhookRequest(mismatchEvent, "mismatch-transmission"));
assert.equal(mismatchResponse.status, 200);
assert.equal((await routes.getInvoice(mismatch.id))?.status, "unpaid");
assert.equal(calls.filter((call) => call.url.endsWith("/capture")).length, beforeCapturePosts);
assert.equal(ledger.sqlite.prepare("SELECT outcome FROM payment_events WHERE event_id = ?").get(mismatchEvent.id).outcome, "rejected");

console.log("Invoice checkout, capture, and webhook route checks passed (PayPal HTTP mocked; sandbox NOT RUN).");
