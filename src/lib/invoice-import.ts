/**
 * Map production KV invoice records into the D1 ledger.
 * KV is read-only here. A second run does not overwrite a row that already exists.
 */
import { isInvoiceId, isPayPalResourceId } from "@/lib/invoice-core";
import { usdMinorUnits } from "@/lib/payment-verification";
import type { InvoiceDatabase } from "@/lib/invoice-ledger";

export const INVOICE_KV_PREFIX = "invoice:v1:";

const DESCRIPTION_MIN = 3;
const DESCRIPTION_MAX = 127;
const COMPANY_MAX = 120;

export type MappedInvoice = {
  id: string;
  amount: string;
  amountMinor: number;
  currency: "USD";
  description: string;
  status: "unpaid" | "paid" | "void";
  expiresAt: string;
  createdAt: string;
  company: string | null;
  paypalOrderId: string | null;
  paypalCaptureId: string | null;
  paidAt: string | null;
};

export type MapFailure = { ok: false; key: string; reason: string };
export type MapSuccess = { ok: true; row: MappedInvoice };
export type MapResult = MapSuccess | MapFailure;

export type StoredLedgerRow = {
  id: string;
  amountMinor: number;
  currency: string;
  status: string;
  paypalOrderId: string | null;
  paypalCaptureId: string | null;
};

const INSERT_SQL = `
INSERT OR IGNORE INTO invoices (
  id, amount_minor, currency, description, status, expires_at, created_at,
  company, paypal_order_id, paypal_capture_id, paid_at
) VALUES (?1, ?2, 'USD', ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
`;

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max || trimmed.includes("\0")) return null;
  return trimmed;
}

function optionalId(value: unknown): { ok: true; id: string | null } | { ok: false } {
  if (value == null || value === "") return { ok: true, id: null };
  if (typeof value !== "string" || !isPayPalResourceId(value)) return { ok: false };
  return { ok: true, id: value };
}

export function mapInvoiceKvEntry(key: string, raw: string): MapResult {
  if (!key.startsWith(INVOICE_KV_PREFIX)) return { ok: false, key, reason: "unexpected-key" };
  const keyId = key.slice(INVOICE_KV_PREFIX.length);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return { ok: false, key, reason: "invalid-json" };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, key, reason: "not-an-object" };
  }
  const record = parsed as Record<string, unknown>;
  const id = text(record.id, 64);
  if (!id || !isInvoiceId(id) || id !== keyId) return { ok: false, key, reason: "id-mismatch" };
  if (record.currency !== "USD") return { ok: false, key, reason: "currency" };
  const amount = typeof record.amount === "string" ? record.amount : "";
  const amountMinor = usdMinorUnits(amount);
  if (amountMinor === null) return { ok: false, key, reason: "amount" };
  const description = text(record.description, DESCRIPTION_MAX);
  if (!description || description.length < DESCRIPTION_MIN) return { ok: false, key, reason: "description" };
  const status = record.status;
  if (status !== "unpaid" && status !== "paid" && status !== "void") {
    return { ok: false, key, reason: "status" };
  }
  const expiresAt = text(record.expiresAt, 40);
  const createdAt = text(record.createdAt, 40);
  if (!expiresAt || !createdAt || !Number.isFinite(Date.parse(expiresAt)) || !Number.isFinite(Date.parse(createdAt))) {
    return { ok: false, key, reason: "dates" };
  }
  let company: string | null = null;
  if (record.company != null && record.company !== "") {
    company = text(record.company, COMPANY_MAX);
    if (!company) return { ok: false, key, reason: "company" };
  }
  const order = optionalId(record.paypalOrderId);
  const capture = optionalId(record.paypalCaptureId);
  if (!order.ok || !capture.ok) return { ok: false, key, reason: "paypal-id" };
  let paidAt: string | null = null;
  if (record.paidAt != null && record.paidAt !== "") {
    paidAt = text(record.paidAt, 40);
    if (!paidAt || !Number.isFinite(Date.parse(paidAt))) return { ok: false, key, reason: "paid-at" };
  }
  return {
    ok: true,
    row: {
      id,
      amount,
      amountMinor,
      currency: "USD",
      description,
      status,
      expiresAt,
      createdAt,
      company,
      paypalOrderId: order.id,
      paypalCaptureId: capture.id,
      paidAt,
    },
  };
}

export function publicSample(row: MappedInvoice) {
  return {
    idPrefix: row.id.slice(0, 8),
    amount: row.amount,
    currency: row.currency,
    status: row.status,
    hasPayPalOrder: row.paypalOrderId !== null,
    hasCapture: row.paypalCaptureId !== null,
  };
}

export function sqlLiteral(value: string | null): string {
  if (value === null) return "NULL";
  return `'${value.replaceAll("'", "''")}'`;
}

/**
 * SQL for a non-empty import. An empty list returns null so the caller does not
 * hand wrangler an empty file (`d1 execute --file` crashes on that on Windows).
 */
export function statementsForImport(rows: MappedInvoice[]): string | null {
  if (rows.length === 0) return null;
  return rows.map((row) => insertIgnoreSql(row)).join("\n");
}

/** One idempotent statement. A conflicting primary key is left untouched. */
export function insertIgnoreSql(row: MappedInvoice): string {
  const values = [
    sqlLiteral(row.id),
    String(row.amountMinor),
    sqlLiteral(row.description),
    sqlLiteral(row.status),
    sqlLiteral(row.expiresAt),
    sqlLiteral(row.createdAt),
    sqlLiteral(row.company),
    sqlLiteral(row.paypalOrderId),
    sqlLiteral(row.paypalCaptureId),
    sqlLiteral(row.paidAt),
  ];
  return `INSERT OR IGNORE INTO invoices (
  id, amount_minor, currency, description, status, expires_at, created_at,
  company, paypal_order_id, paypal_capture_id, paid_at
) VALUES (${values[0]}, ${values[1]}, 'USD', ${values[2]}, ${values[3]}, ${values[4]}, ${values[5]}, ${values[6]}, ${values[7]}, ${values[8]}, ${values[9]});`;
}

export async function applyMappedInvoices(db: InvoiceDatabase, rows: MappedInvoice[]): Promise<{ inserted: number; alreadyPresent: number }> {
  let inserted = 0;
  let alreadyPresent = 0;
  for (const row of rows) {
    const [result] = await db.batch([{
      sql: INSERT_SQL,
      params: [
        row.id,
        row.amountMinor,
        row.description,
        row.status,
        row.expiresAt,
        row.createdAt,
        row.company,
        row.paypalOrderId,
        row.paypalCaptureId,
        row.paidAt,
      ],
    }]);
    if ((result?.changes ?? 0) === 1) inserted += 1;
    else alreadyPresent += 1;
  }
  return { inserted, alreadyPresent };
}

export type VerifyMismatch = {
  idPrefix: string;
  field: "missing" | "amount" | "currency" | "status" | "order" | "capture";
};

export function verifyMappedInvoices(expected: MappedInvoice[], actual: StoredLedgerRow[]): {
  matched: number;
  mismatches: VerifyMismatch[];
} {
  const byId = new Map(actual.map((row) => [row.id, row]));
  const mismatches: VerifyMismatch[] = [];
  let matched = 0;
  for (const row of expected) {
    const found = byId.get(row.id);
    const idPrefix = row.id.slice(0, 8);
    if (!found) {
      mismatches.push({ idPrefix, field: "missing" });
      continue;
    }
    if (found.amountMinor !== row.amountMinor) mismatches.push({ idPrefix, field: "amount" });
    else if (found.currency !== row.currency) mismatches.push({ idPrefix, field: "currency" });
    else if (found.status !== row.status) mismatches.push({ idPrefix, field: "status" });
    else if ((found.paypalOrderId ?? null) !== row.paypalOrderId) mismatches.push({ idPrefix, field: "order" });
    else if ((found.paypalCaptureId ?? null) !== row.paypalCaptureId) mismatches.push({ idPrefix, field: "capture" });
    else matched += 1;
  }
  return { matched, mismatches };
}
