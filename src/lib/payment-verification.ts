/** Pure validation of PayPal's untrusted order and capture response payloads. */

export type InvoicePaymentExpectation = {
  invoiceId: string;
  orderId: string;
  amount: string;
  currency: "USD";
  merchantId: string;
};

export type PaymentVerificationFailure =
  | "invalid_order"
  | "order_mismatch"
  | "invoice_mismatch"
  | "amount_mismatch"
  | "currency_mismatch"
  | "merchant_mismatch"
  | "not_approved"
  | "capture_incomplete";

export type PaymentVerification =
  | { ok: true; status: "ready" }
  | { ok: true; status: "paid"; captureId: string }
  | { ok: false; reason: PaymentVerificationFailure };

type JsonObject = Record<string, unknown>;

function isRecord(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function record(value: unknown): JsonObject | null {
  return isRecord(value) ? value : null;
}

function string(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

/** Parses canonical PayPal USD decimal strings without floating-point arithmetic. */
export function usdMinorUnits(value: unknown): number | null {
  if (typeof value !== "string" || !/^(0|[1-9]\d*)\.\d{2}$/.test(value)) return null;
  const [whole, fraction] = value.split(".");
  const minor = Number(whole) * 100 + Number(fraction);
  return Number.isSafeInteger(minor) ? minor : null;
}

function purchaseUnit(order: unknown): JsonObject | null {
  const units = record(order)?.purchase_units;
  if (!Array.isArray(units) || units.length !== 1) return null;
  return record(units[0]);
}

function verifyOrderFields(
  order: unknown,
  expected: InvoicePaymentExpectation,
): { unit: JsonObject; status: string } | PaymentVerification {
  const payload = record(order);
  const unit = purchaseUnit(order);
  if (!payload || !unit || payload.intent !== "CAPTURE" || typeof payload.status !== "string") {
    return { ok: false, reason: "invalid_order" };
  }
  if (payload.id !== expected.orderId) return { ok: false, reason: "order_mismatch" };
  if (unit.invoice_id !== expected.invoiceId || unit.custom_id !== expected.invoiceId) {
    return { ok: false, reason: "invoice_mismatch" };
  }

  const amount = record(unit.amount);
  if (amount && amount.currency_code !== expected.currency) {
    return { ok: false, reason: "currency_mismatch" };
  }
  if (
    !amount ||
    usdMinorUnits(amount.value) === null ||
    usdMinorUnits(amount.value) !== usdMinorUnits(expected.amount)
  ) {
    return { ok: false, reason: "amount_mismatch" };
  }

  const payee = record(unit.payee);
  if (!payee || payee.merchant_id !== expected.merchantId) {
    return { ok: false, reason: "merchant_mismatch" };
  }
  return { unit, status: payload.status };
}

/** Validates order identity and economics before any capture request is made. */
export function verifyOrderBeforeCapture(
  order: unknown,
  expected: InvoicePaymentExpectation,
): PaymentVerification {
  const fields = verifyOrderFields(order, expected);
  if ("ok" in fields) return fields;
  if (fields.status === "COMPLETED") return verifyCompletedCapture(order, expected);
  if (fields.status !== "APPROVED") return { ok: false, reason: "not_approved" };
  return { ok: true, status: "ready" };
}

/** A completed PayPal order is paid only when one full, completed capture exists. */
export function verifyCompletedCapture(
  order: unknown,
  expected: InvoicePaymentExpectation,
): PaymentVerification {
  const fields = verifyOrderFields(order, expected);
  if ("ok" in fields) return fields;
  if (fields.status !== "COMPLETED") return { ok: false, reason: "capture_incomplete" };

  const payments = record(fields.unit.payments);
  const captures = payments?.captures;
  if (!Array.isArray(captures) || captures.length !== 1) {
    return { ok: false, reason: "capture_incomplete" };
  }
  const capture = record(captures[0]);
  const amount = record(capture?.amount);
  if (!capture || capture.status !== "COMPLETED" || typeof capture.id !== "string") {
    return { ok: false, reason: "capture_incomplete" };
  }
  if (amount && amount.currency_code !== expected.currency) {
    return { ok: false, reason: "currency_mismatch" };
  }
  if (
    !amount ||
    usdMinorUnits(amount.value) === null ||
    usdMinorUnits(amount.value) !== usdMinorUnits(expected.amount)
  ) {
    return { ok: false, reason: "amount_mismatch" };
  }
  return { ok: true, status: "paid", captureId: capture.id };
}

/** Extracts only the provider invoice identifier; it is not trusted until matched to storage. */
export function paypalInvoiceId(orderId: string, order: unknown): string | null {
  const payload = record(order);
  const unit = purchaseUnit(order);
  if (payload?.id !== orderId || !unit) return null;
  const invoiceId = string(unit.invoice_id);
  const customId = string(unit.custom_id);
  if (!invoiceId || invoiceId !== customId || !/^[0-9a-f-]{8,64}$/i.test(invoiceId)) return null;
  return invoiceId;
}
