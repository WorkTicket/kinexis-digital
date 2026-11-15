/** Apply the invoice migration to local SQLite and exercise the production ledger statements. */
import assert from "node:assert/strict";
import { openInvoiceLedger } from "./invoice-sql-adapter.mjs";
import { bundleServer } from "./bundle-server.mjs";

const ledger = await bundleServer("src/lib/invoice-ledger.ts", ".tmp-invoice-ledger.mjs");
const db = openInvoiceLedger();
const now = "2026-11-15T12:00:00.000Z";
const later = "2099-01-01T00:00:00.000Z";
const created = "2026-01-01T00:00:00.000Z";
const orderId = "5O190127TN364715T";
const otherOrderId = "6O190127TN364715T";
const captureId = "8MC585209K746392H";
const otherCaptureId = "9MC585209K746392H";

function invoice(id, amount = "2500.00") {
  return {
    id,
    amount,
    currency: "USD",
    description: "Site deposit",
    status: "unpaid",
    expiresAt: later,
    createdAt: created,
    company: "Example LLC",
  };
}

const firstId = "11111111-2222-3333-4444-555555555555";
const secondId = "22222222-2222-3333-4444-555555555555";
assert.deepEqual(await ledger.createInvoiceRecord(db, invoice(firstId)), { ok: true, idempotent: false });
assert.equal((await ledger.getInvoiceRecord(db, firstId))?.amount, "2500.00");
assert.deepEqual(await ledger.createInvoiceRecord(db, invoice(firstId)), { ok: false, reason: "conflict" });
assert.deepEqual(await ledger.createInvoiceRecord(db, invoice(secondId, "10.00")), { ok: true, idempotent: false });

assert.deepEqual(await ledger.associatePayPalOrder(db, firstId, orderId, now), { ok: true, idempotent: false });
assert.deepEqual(await ledger.associatePayPalOrder(db, firstId, orderId, now), { ok: true, idempotent: true });
assert.deepEqual(await ledger.associatePayPalOrder(db, firstId, otherOrderId, now), { ok: false, reason: "conflict" });
assert.equal((await ledger.getInvoiceRecord(db, firstId))?.paypalOrderId, orderId);
assert.deepEqual(await ledger.associatePayPalOrder(db, secondId, otherOrderId, now), { ok: true, idempotent: false });

const paid = {
  eventId: `capture:${captureId}`,
  eventType: "CHECKOUT.CAPTURE",
  invoiceId: firstId,
  orderId,
  captureId,
  amount: "2500.00",
  paidAt: now,
  receivedAt: now,
};
assert.deepEqual(await ledger.markInvoicePaid(db, paid), { ok: true, idempotent: false });
assert.deepEqual(await ledger.markInvoicePaid(db, paid), { ok: true, idempotent: true });
assert.equal((await ledger.getInvoiceRecord(db, firstId))?.status, "paid");
assert.equal((await ledger.getInvoiceRecord(db, firstId))?.paypalCaptureId, captureId);
assert.equal((await ledger.getInvoiceRecord(db, firstId))?.paidAt, now);

assert.deepEqual(await ledger.markInvoicePaid(db, {
  ...paid,
  eventId: `capture:${otherCaptureId}`,
  captureId: otherCaptureId,
}), { ok: false, reason: "conflict" });
assert.equal((await ledger.getInvoiceRecord(db, firstId))?.paypalCaptureId, captureId);

assert.deepEqual(await ledger.markInvoicePaid(db, {
  ...paid,
  eventId: "WH-AMOUNT-TAMPER",
  amount: "1.00",
}), { ok: false, reason: "conflict" });

assert.deepEqual(await ledger.markInvoicePaid(db, {
  ...paid,
  eventId: paid.eventId,
  invoiceId: secondId,
  orderId: otherOrderId,
}), { ok: false, reason: "conflict" });
assert.equal((await ledger.getInvoiceRecord(db, secondId))?.status, "unpaid");

const rejected = await ledger.recordUnappliedPaymentEvent(db, {
  eventId: "WH-REJECTED-1",
  eventType: "PAYMENT.CAPTURE.COMPLETED",
  invoiceId: secondId,
  orderId: otherOrderId,
  captureId: otherCaptureId,
  amountMinor: 100,
  currency: "EUR",
  outcome: "rejected",
  receivedAt: now,
});
assert.deepEqual(rejected, { ok: true, idempotent: false });
assert.deepEqual(await ledger.recordUnappliedPaymentEvent(db, {
  eventId: "WH-REJECTED-1",
  eventType: "PAYMENT.CAPTURE.COMPLETED",
  invoiceId: secondId,
  orderId: otherOrderId,
  captureId: otherCaptureId,
  amountMinor: 100,
  currency: "EUR",
  outcome: "rejected",
  receivedAt: now,
}), { ok: true, idempotent: true });
assert.deepEqual(await ledger.markInvoicePaid(db, {
  eventId: "WH-REJECTED-1",
  eventType: "PAYMENT.CAPTURE.COMPLETED",
  invoiceId: secondId,
  orderId: otherOrderId,
  captureId: otherCaptureId,
  amount: "10.00",
  paidAt: now,
  receivedAt: now,
}), { ok: false, reason: "conflict" });
assert.equal((await ledger.getInvoiceRecord(db, secondId))?.status, "unpaid");

const events = db.sqlite.prepare("SELECT event_id, outcome FROM payment_events").all();
assert.deepEqual(events.map((row) => row.event_id).sort(), [`capture:${captureId}`, "WH-REJECTED-1"].sort());
assert.equal(events.filter((row) => row.outcome === "applied").length, 1);

console.log("Invoice ledger migration and atomic transition checks passed.");
