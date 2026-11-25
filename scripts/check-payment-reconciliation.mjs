/** Fixture tests for offline payment ledger reconciliation. */
import assert from "node:assert/strict";
import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["src/lib/payment-reconciliation.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source, "payment reconciliation bundle is emitted");
const recon = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);

const now = "2026-11-16T12:00:00.000Z";
const cleanInvoice = {
  id: "11111111-2222-3333-4444-555555555555",
  status: "paid",
  amount_minor: 250000,
  currency: "USD",
  expires_at: "2099-01-01T00:00:00.000Z",
  paypal_order_id: "5O190127TN364715T",
  paypal_capture_id: "8MC585209K746392H",
  paid_at: now,
};
const cleanEvent = {
  event_id: "capture:8MC585209K746392H",
  event_type: "CHECKOUT.CAPTURE",
  invoice_id: cleanInvoice.id,
  paypal_order_id: cleanInvoice.paypal_order_id,
  paypal_capture_id: cleanInvoice.paypal_capture_id,
  amount_minor: 250000,
  currency: "USD",
  outcome: "applied",
  received_at: now,
};

const clean = recon.reconcilePaymentLedger([cleanInvoice], [cleanEvent], now);
assert.equal(clean.findings.length, 0);
assert.equal(recon.reconHasAlerts(clean), false);

const missingCapture = recon.reconcilePaymentLedger(
  [{ ...cleanInvoice, paypal_capture_id: null }],
  [cleanEvent],
  now,
);
assert.ok(missingCapture.findings.some((f) => f.code === "paid_missing_capture"));
assert.equal(recon.reconHasAlerts(missingCapture), true);

const noApplied = recon.reconcilePaymentLedger([cleanInvoice], [], now);
assert.ok(noApplied.findings.some((f) => f.code === "paid_without_applied_event"));

const rejected = recon.reconcilePaymentLedger(
  [],
  [
    {
      ...cleanEvent,
      event_id: "WH-BAD",
      outcome: "rejected",
    },
  ],
  now,
);
assert.ok(rejected.findings.some((f) => f.code === "rejected_capture_event"));

const expired = recon.reconcilePaymentLedger(
  [
    {
      id: "22222222-2222-3333-4444-555555555555",
      status: "unpaid",
      amount_minor: 9700,
      currency: "USD",
      expires_at: "2020-01-01T00:00:00.000Z",
      paypal_order_id: "6O190127TN364715T",
      paypal_capture_id: null,
      paid_at: null,
    },
  ],
  [],
  now,
);
assert.ok(expired.findings.some((f) => f.code === "unpaid_past_expiry_with_order"));
assert.equal(recon.reconHasAlerts(expired), false);

const text = recon.formatReconReport(missingCapture);
assert.match(text, /paid_missing_capture/);

console.log("Payment reconciliation fixture checks passed.");
