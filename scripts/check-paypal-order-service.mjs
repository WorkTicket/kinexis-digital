/** Test the production PayPal service with HTTP mocked at the provider boundary. */
import assert from "node:assert/strict";
import { build } from "esbuild";

process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID = "test-client-id";
process.env.PAYPAL_CLIENT_SECRET = "test-client-secret";
process.env.PAYPAL_MERCHANT_ID = "KINEXISMERCHANT123";
process.env.PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";

const bundle = await build({
  entryPoints: ["src/lib/paypal-order.ts"],
  absWorkingDir: process.cwd(),
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
  alias: {
    "@/lib/site": "./src/lib/site.ts",
    "@/lib/paypal": "./src/lib/paypal.ts",
    "@/lib/payment-verification": "./src/lib/payment-verification.ts",
    "@/lib/invoice-core": "./src/lib/invoice-core.ts",
  },
  plugins: [{
    name: "server-only-test-boundary",
    setup(esbuild) {
      esbuild.onResolve({ filter: /^server-only$/ }, () => ({ path: "server-only", namespace: "test" }));
      esbuild.onLoad({ filter: /.*/, namespace: "test" }, () => ({ contents: "", loader: "js" }));
    },
  }],
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source, "production PayPal service bundle is emitted");
const paypal = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
assert.equal(paypal.isPayPalOrderId("5O190127TN364715T"), true);
assert.equal(paypal.isPayPalOrderId("bad"), false);

const invoiceId = "11111111-2222-3333-4444-555555555555";
const orderId = "5O190127TN364715T";
const captureId = "8MC585209K746392H";
const invoice = {
  id: invoiceId,
  amount: "2500.00",
  currency: "USD",
  description: "Site deposit",
  status: "unpaid",
  expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
  createdAt: new Date().toISOString(),
  paypalOrderId: orderId,
};
const order = (status, captures = []) => ({
  id: orderId,
  status,
  intent: "CAPTURE",
  purchase_units: [{
    invoice_id: invoiceId,
    custom_id: invoiceId,
    amount: { currency_code: "USD", value: "2500.00" },
    payee: { merchant_id: "KINEXISMERCHANT123" },
    ...(captures.length ? { payments: { captures } } : {}),
  }],
});
const completedCapture = {
  id: captureId,
  status: "COMPLETED",
  amount: { currency_code: "USD", value: "2500.00" },
};
const response = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json" },
});
const tokenResponse = () => response({ access_token: "test-access-token" });

function queuedFetch(responses) {
  const calls = [];
  const fetcher = async (input, init = {}) => {
    calls.push({ url: String(input), method: init.method ?? "GET", headers: new Headers(init.headers), body: init.body });
    const next = responses.shift();
    assert.ok(next, `unexpected provider request ${String(input)}`);
    return next;
  };
  return { fetcher, calls, remaining: () => responses.length };
}

// Approved order: capture, then independently GET and validate final details.
{
  const fixture = queuedFetch([
    tokenResponse(),
    response(order("APPROVED")),
    response({ status: "COMPLETED" }),
    response(order("COMPLETED", [completedCapture])),
  ]);
  const result = await paypal.captureInvoiceOrder(orderId, invoice, fixture.fetcher);
  assert.deepEqual(result, { status: "paid", captureId });
  assert.equal(fixture.calls.length, 4);
  assert.equal(fixture.calls[2].method, "POST");
  assert.equal(fixture.calls[2].headers.get("PayPal-Request-Id"), `capture-${orderId}`);
}

// Wrong invoice/order amount/currency/merchant must stop before capture POST.
for (const mutate of [
  (snapshot) => ({ ...snapshot, id: "6O190127TN364715T" }),
  (snapshot) => ({ ...snapshot, purchase_units: [{ ...snapshot.purchase_units[0], invoice_id: "99999999-9999-9999-9999-999999999999" }] }),
  (snapshot) => ({ ...snapshot, purchase_units: [{ ...snapshot.purchase_units[0], amount: { currency_code: "USD", value: "1.00" } }] }),
  (snapshot) => ({ ...snapshot, purchase_units: [{ ...snapshot.purchase_units[0], amount: { currency_code: "EUR", value: "2500.00" } }] }),
  (snapshot) => ({ ...snapshot, purchase_units: [{ ...snapshot.purchase_units[0], payee: { merchant_id: "WRONGMERCHANT" } }] }),
]) {
  const fixture = queuedFetch([tokenResponse(), response(mutate(order("APPROVED")))]);
  assert.deepEqual(await paypal.captureInvoiceOrder(orderId, invoice, fixture.fetcher), { status: "failed" });
  assert.equal(fixture.calls.some((call) => call.url.endsWith("/capture")), false, "invalid order never gets captured");
  assert.equal(fixture.remaining(), 0);
}

// A completed order is idempotently accepted only after validating the capture.
{
  const fixture = queuedFetch([tokenResponse(), response(order("COMPLETED", [completedCapture]))]);
  assert.deepEqual(await paypal.captureInvoiceOrder(orderId, invoice, fixture.fetcher), { status: "paid", captureId });
  assert.equal(fixture.calls.some((call) => call.url.endsWith("/capture")), false);
}

// An API conflict is not itself proof of payment; a fresh verified GET is.
{
  const fixture = queuedFetch([
    tokenResponse(),
    response(order("APPROVED")),
    response({ name: "ORDER_ALREADY_CAPTURED" }, 422),
    response(order("COMPLETED", [completedCapture])),
  ]);
  assert.deepEqual(await paypal.captureInvoiceOrder(orderId, invoice, fixture.fetcher), { status: "paid", captureId });
}

// Partial/pending capture, wrong stored order link, and expired approval are refused.
{
  const fixture = queuedFetch([tokenResponse(), response(order("COMPLETED", [{ ...completedCapture, amount: { currency_code: "USD", value: "2499.99" } }]))]);
  assert.deepEqual(await paypal.captureInvoiceOrder(orderId, invoice, fixture.fetcher), { status: "failed" });
}
{
  const fixture = queuedFetch([]);
  assert.deepEqual(await paypal.captureInvoiceOrder(orderId, { ...invoice, paypalOrderId: "6O190127TN364715T" }, fixture.fetcher), { status: "failed" });
  assert.equal(fixture.calls.length, 0);
}
{
  const fixture = queuedFetch([tokenResponse(), response(order("APPROVED"))]);
  assert.deepEqual(await paypal.captureInvoiceOrder(orderId, { ...invoice, expiresAt: new Date(0).toISOString() }, fixture.fetcher), { status: "failed" });
  assert.equal(fixture.calls.some((call) => call.url.endsWith("/capture")), false);
}

// Stable invoice identity is sent as PayPal's request id and both correlation IDs.
{
  const fixture = queuedFetch([
    tokenResponse(),
    response({ id: orderId, links: [{ rel: "payer-action", href: "https://www.paypal.com/checkoutnow?token=abc" }] }, 201),
  ]);
  const result = await paypal.createInvoiceOrder({
    amount: "2500.00",
    description: "Site deposit",
    name: "Test Buyer",
    email: "buyer@example.test",
    company: "Example LLC",
    requestId: invoiceId,
    invoiceId,
  }, fixture.fetcher);
  assert.deepEqual(result, { url: "https://www.paypal.com/checkoutnow?token=abc", orderId });
  assert.equal(fixture.calls[1].headers.get("PayPal-Request-Id"), invoiceId);
  const requestBody = JSON.parse(fixture.calls[1].body);
  assert.equal(requestBody.purchase_units[0].invoice_id, invoiceId);
  assert.equal(requestBody.purchase_units[0].custom_id, invoiceId);
  assert.equal(requestBody.purchase_units[0].amount.value, "2500.00");
}

console.log("Production PayPal order service mocked-boundary integration checks passed.");
