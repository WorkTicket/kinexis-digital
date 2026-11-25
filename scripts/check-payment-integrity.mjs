/** Exercise the production PayPal response validators (not a test-side mirror). */
import assert from "node:assert/strict";
import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["src/lib/payment-verification.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source, "production payment verification bundle is emitted");
const payment = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

const expected = {
  invoiceId: "11111111-2222-3333-4444-555555555555",
  orderId: "5O190127TN364715T",
  amount: "2500.00",
  currency: "USD",
  merchantId: "KINEXISMERCHANT123",
};
const approved = {
  id: expected.orderId,
  status: "APPROVED",
  intent: "CAPTURE",
  purchase_units: [{
    invoice_id: expected.invoiceId,
    custom_id: expected.invoiceId,
    amount: { currency_code: "USD", value: "2500.00" },
    payee: { merchant_id: expected.merchantId },
  }],
};
const completed = {
  ...approved,
  status: "COMPLETED",
  purchase_units: [{
    ...approved.purchase_units[0],
    payments: {
      captures: [{
        id: "8MC585209K746392H",
        status: "COMPLETED",
        amount: { currency_code: "USD", value: "2500.00" },
      }],
    },
  }],
};

assert.deepEqual(payment.verifyOrderBeforeCapture(approved, expected), { ok: true, status: "ready" });
assert.deepEqual(payment.verifyOrderBeforeCapture(completed, expected), {
  ok: true,
  status: "paid",
  captureId: "8MC585209K746392H",
});
assert.equal(payment.paypalInvoiceId(expected.orderId, approved), expected.invoiceId);
assert.equal(payment.usdMinorUnits("2500.00"), 250000);
assert.equal(payment.usdMinorUnits("2500.001"), null);

const assertFailure = (order, reason) => {
  assert.deepEqual(payment.verifyOrderBeforeCapture(order, expected), { ok: false, reason });
};
assertFailure({ ...approved, id: "6O190127TN364715T" }, "order_mismatch");
assertFailure({ ...approved, purchase_units: [{ ...approved.purchase_units[0], invoice_id: "99999999-9999-9999-9999-999999999999" }] }, "invoice_mismatch");
assertFailure({ ...approved, purchase_units: [{ ...approved.purchase_units[0], custom_id: "99999999-9999-9999-9999-999999999999" }] }, "invoice_mismatch");
assertFailure({ ...approved, purchase_units: [{ ...approved.purchase_units[0], amount: { currency_code: "USD", value: "2499.99" } }] }, "amount_mismatch");
assertFailure({ ...approved, purchase_units: [{ ...approved.purchase_units[0], amount: { currency_code: "EUR", value: "2500.00" } }] }, "currency_mismatch");
assertFailure({ ...approved, purchase_units: [{ ...approved.purchase_units[0], payee: { merchant_id: "UNEXPECTED" } }] }, "merchant_mismatch");
assertFailure({ ...approved, status: "CREATED" }, "not_approved");
assertFailure({ ...approved, purchase_units: [{ ...approved.purchase_units[0], amount: { currency_code: "USD", value: "2500" } }] }, "amount_mismatch");

const assertCaptureFailure = (order, reason) => {
  assert.deepEqual(payment.verifyCompletedCapture(order, expected), { ok: false, reason });
};
assertCaptureFailure({ ...completed, purchase_units: [{ ...completed.purchase_units[0], payments: { captures: [{ ...completed.purchase_units[0].payments.captures[0], status: "PENDING" }] } }] }, "capture_incomplete");
assertCaptureFailure({ ...completed, purchase_units: [{ ...completed.purchase_units[0], payments: { captures: [{ ...completed.purchase_units[0].payments.captures[0], amount: { currency_code: "USD", value: "2499.99" } }] } }] }, "amount_mismatch");
assertCaptureFailure({ ...completed, purchase_units: [{ ...completed.purchase_units[0], payments: { captures: [{ ...completed.purchase_units[0].payments.captures[0], amount: { currency_code: "EUR", value: "2500.00" } }] } }] }, "currency_mismatch");
assertCaptureFailure({ ...completed, purchase_units: [{ ...completed.purchase_units[0], payments: { captures: [completed.purchase_units[0].payments.captures[0], completed.purchase_units[0].payments.captures[0]] } }] }, "capture_incomplete");
assert.equal(payment.paypalInvoiceId(expected.orderId, { ...approved, purchase_units: [{ ...approved.purchase_units[0], custom_id: "wrong" }] }), null);

console.log("Production PayPal order and capture integrity checks passed.");
