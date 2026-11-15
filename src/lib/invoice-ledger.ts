/**
 * Atomic invoice and payment transitions.
 *
 * Cloudflare KV cannot compare-and-set an invoice together with a unique
 * payment event. D1 runs a batch in one SQLite transaction. Each transition
 * is a conditional UPDATE plus a unique event key, so concurrent workers and
 * replays cannot double-apply a capture or attach two PayPal orders.
 */
import {
  isInvoiceId,
  isPayPalResourceId,
  type StoredInvoice,
} from "@/lib/invoice-core";
import { usdMinorUnits } from "@/lib/payment-verification";

export type SqlValue = string | number | null;

export type SqlStatement = {
  sql: string;
  params: SqlValue[];
};

export type SqlBatchResult = {
  changes: number;
  rows: Array<Record<string, unknown>>;
};

export type InvoiceDatabase = {
  batch(statements: SqlStatement[]): Promise<SqlBatchResult[]>;
};

export type LedgerWrite =
  | { ok: true; idempotent: boolean }
  | { ok: false; reason: "storage" | "conflict" };

const EVENT_ID_MAX = 128;
const EVENT_TYPE_MAX = 64;
const DESCRIPTION_MIN = 3;
const DESCRIPTION_MAX = 127;

const INSERT_INVOICE = `
INSERT INTO invoices (
  id, amount_minor, currency, description, status, expires_at, created_at, company
) VALUES (?1, ?2, 'USD', ?3, 'unpaid', ?4, ?5, ?6)
`;

const SELECT_INVOICE = `
SELECT id, amount_minor, currency, description, status, expires_at, created_at,
       company, paypal_order_id, paypal_capture_id, paid_at
FROM invoices
WHERE id = ?1
`;

const SELECT_ORDER_ID = `
SELECT paypal_order_id
FROM invoices
WHERE id = ?1
`;

const ASSOCIATE_ORDER = `
UPDATE invoices
SET paypal_order_id = ?1
WHERE id = ?2
  AND status = 'unpaid'
  AND expires_at > ?3
  AND (paypal_order_id IS NULL OR paypal_order_id = ?1)
`;

const MARK_PAID_UPDATE = `
UPDATE invoices
SET status = 'paid',
    paypal_capture_id = ?4,
    paid_at = COALESCE(paid_at, ?5)
WHERE id = ?2
  AND paypal_order_id = ?3
  AND amount_minor = ?6
  AND currency = 'USD'
  AND status IN ('unpaid', 'paid')
  AND (paypal_capture_id IS NULL OR paypal_capture_id = ?4)
  AND NOT EXISTS (
    SELECT 1 FROM payment_events
    WHERE provider = 'paypal'
      AND event_id = ?1
      AND (
        outcome <> 'applied'
        OR invoice_id IS NOT ?2
        OR paypal_order_id IS NOT ?3
        OR paypal_capture_id IS NOT ?4
      )
  )
`;

const MARK_PAID_INSERT = `
INSERT INTO payment_events (
  provider, event_id, event_type, invoice_id, paypal_order_id, paypal_capture_id,
  amount_minor, currency, outcome, received_at
)
SELECT 'paypal', ?1, ?7, ?2, ?3, ?4, ?6, 'USD', 'applied', ?8
WHERE EXISTS (
  SELECT 1 FROM invoices
  WHERE id = ?2
    AND status = 'paid'
    AND paypal_capture_id = ?4
    AND paypal_order_id = ?3
    AND amount_minor = ?6
    AND currency = 'USD'
)
AND NOT EXISTS (
  SELECT 1 FROM payment_events
  WHERE provider = 'paypal' AND event_id = ?1
)
`;

const SELECT_EVENT = `
SELECT event_id, event_type, invoice_id, paypal_order_id, paypal_capture_id, outcome
FROM payment_events
WHERE provider = 'paypal' AND event_id = ?1
`;

const INSERT_UNAPPLIED = `
INSERT INTO payment_events (
  provider, event_id, event_type, invoice_id, paypal_order_id, paypal_capture_id,
  amount_minor, currency, outcome, received_at
) VALUES ('paypal', ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
ON CONFLICT (provider, event_id) DO NOTHING
`;

function isConstraintError(error: unknown): boolean {
  return error instanceof Error && /unique|constraint/i.test(error.message);
}

function text(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function integer(value: unknown): number | null {
  if (typeof value === "number" && Number.isSafeInteger(value)) return value;
  if (typeof value === "bigint" && value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
    return Number(value);
  }
  return null;
}

export function minorUnitsToUsd(minor: number): string {
  const whole = Math.trunc(minor / 100);
  const fraction = Math.abs(minor % 100);
  return `${whole}.${String(fraction).padStart(2, "0")}`;
}

function rowToInvoice(row: Record<string, unknown> | undefined): StoredInvoice | null {
  if (!row) return null;
  const id = text(row.id);
  const amountMinor = integer(row.amount_minor);
  const description = text(row.description);
  const status = text(row.status);
  const expiresAt = text(row.expires_at);
  const createdAt = text(row.created_at);
  const currency = text(row.currency);
  if (!id || amountMinor === null || !description || !expiresAt || !createdAt || currency !== "USD") return null;
  if (status !== "unpaid" && status !== "paid" && status !== "void") return null;
  const company = text(row.company);
  const paypalOrderId = text(row.paypal_order_id);
  const paypalCaptureId = text(row.paypal_capture_id);
  const paidAt = text(row.paid_at);
  return {
    id,
    amount: minorUnitsToUsd(amountMinor),
    currency: "USD",
    description,
    status,
    expiresAt,
    createdAt,
    ...(company ? { company } : {}),
    ...(paypalOrderId ? { paypalOrderId } : {}),
    ...(paypalCaptureId ? { paypalCaptureId } : {}),
    ...(paidAt ? { paidAt } : {}),
  };
}

async function runBatch(db: InvoiceDatabase, statements: SqlStatement[]): Promise<SqlBatchResult[] | null> {
  try {
    return await db.batch(statements);
  } catch (error) {
    if (isConstraintError(error)) throw error;
    return null;
  }
}

export async function createInvoiceRecord(db: InvoiceDatabase, invoice: StoredInvoice): Promise<LedgerWrite> {
  const amountMinor = usdMinorUnits(invoice.amount);
  if (
    !isInvoiceId(invoice.id) ||
    invoice.currency !== "USD" ||
    invoice.status !== "unpaid" ||
    amountMinor === null ||
    invoice.description.length < DESCRIPTION_MIN ||
    invoice.description.length > DESCRIPTION_MAX ||
    !Number.isFinite(Date.parse(invoice.expiresAt)) ||
    !Number.isFinite(Date.parse(invoice.createdAt)) ||
    invoice.paypalOrderId ||
    invoice.paypalCaptureId
  ) {
    return { ok: false, reason: "conflict" };
  }
  try {
    const results = await runBatch(db, [{
      sql: INSERT_INVOICE,
      params: [
        invoice.id,
        amountMinor,
        invoice.description,
        invoice.expiresAt,
        invoice.createdAt,
        invoice.company ?? null,
      ],
    }]);
    if (!results) return { ok: false, reason: "storage" };
    return results[0]?.changes === 1 ? { ok: true, idempotent: false } : { ok: false, reason: "conflict" };
  } catch (error) {
    return isConstraintError(error) ? { ok: false, reason: "conflict" } : { ok: false, reason: "storage" };
  }
}

export async function getInvoiceRecord(db: InvoiceDatabase, id: string): Promise<StoredInvoice | null> {
  if (!isInvoiceId(id)) return null;
  const results = await db.batch([{ sql: SELECT_INVOICE, params: [id] }]);
  return rowToInvoice(results[0]?.rows[0]);
}

export async function associatePayPalOrder(
  db: InvoiceDatabase,
  invoiceId: string,
  orderId: string,
  nowIso: string,
): Promise<LedgerWrite> {
  if (!isInvoiceId(invoiceId) || !isPayPalResourceId(orderId) || !Number.isFinite(Date.parse(nowIso))) {
    return { ok: false, reason: "conflict" };
  }
  try {
    const results = await runBatch(db, [
      { sql: SELECT_ORDER_ID, params: [invoiceId] },
      { sql: ASSOCIATE_ORDER, params: [orderId, invoiceId, nowIso] },
    ]);
    if (!results) return { ok: false, reason: "storage" };
    const already = results[0]?.rows[0]?.paypal_order_id;
    return results[1]?.changes === 1
      ? { ok: true, idempotent: already === orderId }
      : { ok: false, reason: "conflict" };
  } catch (error) {
    return isConstraintError(error) ? { ok: false, reason: "conflict" } : { ok: false, reason: "storage" };
  }
}

export type PaidTransition = {
  eventId: string;
  eventType: string;
  invoiceId: string;
  orderId: string;
  captureId: string;
  amount: string;
  paidAt: string;
  receivedAt: string;
};

function paidParams(input: PaidTransition, amountMinor: number): { update: SqlValue[]; insert: SqlValue[] } {
  const update = [
    input.eventId,
    input.invoiceId,
    input.orderId,
    input.captureId,
    input.paidAt,
    amountMinor,
  ];
  return {
    update,
    insert: [...update, input.eventType, input.receivedAt],
  };
}

function eventMatches(row: Record<string, unknown> | undefined, input: PaidTransition): boolean {
  return Boolean(
    row &&
    row.outcome === "applied" &&
    row.invoice_id === input.invoiceId &&
    row.paypal_order_id === input.orderId &&
    row.paypal_capture_id === input.captureId,
  );
}

export async function markInvoicePaid(db: InvoiceDatabase, input: PaidTransition): Promise<LedgerWrite> {
  const amountMinor = usdMinorUnits(input.amount);
  if (
    !isInvoiceId(input.invoiceId) ||
    !isPayPalResourceId(input.orderId) ||
    !isPayPalResourceId(input.captureId) ||
    amountMinor === null ||
    input.eventId.length < 1 ||
    input.eventId.length > EVENT_ID_MAX ||
    input.eventType.length < 1 ||
    input.eventType.length > EVENT_TYPE_MAX ||
    !Number.isFinite(Date.parse(input.paidAt)) ||
    !Number.isFinite(Date.parse(input.receivedAt))
  ) {
    return { ok: false, reason: "conflict" };
  }
  const params = paidParams(input, amountMinor);
  const statements: SqlStatement[] = [
    { sql: MARK_PAID_UPDATE, params: params.update },
    { sql: MARK_PAID_INSERT, params: params.insert },
    { sql: SELECT_EVENT, params: [input.eventId] },
  ];
  try {
    const results = await runBatch(db, statements);
    if (!results) return { ok: false, reason: "storage" };
    return interpretPaid(results, input);
  } catch (error) {
    if (!isConstraintError(error)) return { ok: false, reason: "storage" };
    const current = await runBatch(db, [{ sql: SELECT_EVENT, params: [input.eventId] }]);
    if (current && eventMatches(current[0]?.rows[0], input)) return { ok: true, idempotent: true };
    return { ok: false, reason: "conflict" };
  }
}

function interpretPaid(results: SqlBatchResult[], input: PaidTransition): LedgerWrite {
  const updated = results[0]?.changes ?? 0;
  const inserted = results[1]?.changes ?? 0;
  const event = results[2]?.rows[0];
  if (updated === 1 && inserted === 1 && eventMatches(event, input)) {
    return { ok: true, idempotent: false };
  }
  if (updated === 1 && inserted === 0 && eventMatches(event, input)) {
    return { ok: true, idempotent: true };
  }
  return { ok: false, reason: "conflict" };
}

export type UnappliedEvent = {
  eventId: string;
  eventType: string;
  invoiceId: string | null;
  orderId: string | null;
  captureId: string | null;
  amountMinor: number | null;
  currency: string | null;
  outcome: "ignored" | "rejected";
  receivedAt: string;
};

export async function recordUnappliedPaymentEvent(db: InvoiceDatabase, input: UnappliedEvent): Promise<LedgerWrite> {
  if (
    input.eventId.length < 1 ||
    input.eventId.length > EVENT_ID_MAX ||
    input.eventType.length < 1 ||
    input.eventType.length > EVENT_TYPE_MAX ||
    (input.invoiceId !== null && !isInvoiceId(input.invoiceId)) ||
    (input.orderId !== null && !isPayPalResourceId(input.orderId)) ||
    (input.captureId !== null && !isPayPalResourceId(input.captureId)) ||
    (input.amountMinor !== null && !Number.isSafeInteger(input.amountMinor)) ||
    !Number.isFinite(Date.parse(input.receivedAt))
  ) {
    return { ok: false, reason: "conflict" };
  }
  try {
    const results = await runBatch(db, [{
      sql: INSERT_UNAPPLIED,
      params: [
        input.eventId,
        input.eventType,
        input.invoiceId,
        input.orderId,
        input.captureId,
        input.amountMinor,
        input.currency,
        input.outcome,
        input.receivedAt,
      ],
    }]);
    if (!results) return { ok: false, reason: "storage" };
    const changes = results[0]?.changes ?? 0;
    if (changes === 1) return { ok: true, idempotent: false };
    if (changes === 0) return { ok: true, idempotent: true };
    return { ok: false, reason: "conflict" };
  } catch (error) {
    return isConstraintError(error) ? { ok: false, reason: "conflict" } : { ok: false, reason: "storage" };
  }
}
