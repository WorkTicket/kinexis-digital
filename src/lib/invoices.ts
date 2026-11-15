import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  evaluateStoredInvoice,
  INVOICE_DEFAULT_EXPIRY_DAYS,
  isInvoiceId,
  MS_PER_DAY,
  signInvoiceToken,
  tokensMatch,
  type InvoiceGateError,
  type InvoiceTokenVerifyOptions,
  type StoredInvoice,
} from "@/lib/invoice-core";
import {
  associatePayPalOrder,
  createInvoiceRecord,
  getInvoiceRecord,
  markInvoicePaid,
  recordUnappliedPaymentEvent,
  type InvoiceDatabase,
  type LedgerWrite,
  type PaidTransition,
  type UnappliedEvent,
} from "@/lib/invoice-ledger";

export type { InvoiceGateError, InvoiceStatus, StoredInvoice } from "@/lib/invoice-core";
export type { InvoiceDatabase, LedgerWrite } from "@/lib/invoice-ledger";

type BoundStatement = object;

type D1Like = {
  prepare(query: string): {
    bind(...values: Array<string | number | null>): BoundStatement;
  };
  batch(statements: BoundStatement[]): Promise<Array<{
    results?: Array<Record<string, unknown>>;
    meta?: { changes?: number };
  }>>;
};

let testDatabase: InvoiceDatabase | null = null;

function invoiceTestMemory() {
  return process.env.INVOICE_TEST_MEMORY === "1";
}

/**
 * Route tests inject a database that speaks the same batch transaction API as D1.
 * The flag is required so a production isolate cannot be pointed at the test double.
 */
export function setInvoiceTestDatabase(db: InvoiceDatabase | null) {
  if (!invoiceTestMemory()) {
    throw new Error("Invoice test database requires INVOICE_TEST_MEMORY=1");
  }
  testDatabase = db;
}

function cloudflareDatabase(): InvoiceDatabase | null {
  try {
    const env: unknown = getCloudflareContext().env;
    if (!env || typeof env !== "object" || !("INVOICE_DB" in env)) return null;
    const binding = (env as { INVOICE_DB?: unknown }).INVOICE_DB;
    if (!binding || typeof binding !== "object" || !("prepare" in binding) || !("batch" in binding)) return null;
    const d1 = binding as D1Like;
    return {
      async batch(statements) {
        const bound = statements.map((statement) => d1.prepare(statement.sql).bind(...statement.params));
        const results = await d1.batch(bound);
        return results.map((result) => ({
          changes: result.meta?.changes ?? 0,
          rows: result.results ?? [],
        }));
      },
    };
  } catch {
    return null;
  }
}

function database(): InvoiceDatabase | null {
  if (invoiceTestMemory()) return testDatabase;
  return cloudflareDatabase();
}

function linkSecrets() {
  return {
    current: process.env.INVOICE_LINK_SECRET || "",
    previous: process.env.INVOICE_LINK_SECRET_PREVIOUS || "",
  };
}

/** Missing or blank means the previous key stays valid until it is removed. An unparseable value closes it. */
function previousValidUntilMs(): number | null {
  const raw = (process.env.INVOICE_LINK_SECRET_PREVIOUS_UNTIL || "").trim();
  if (!raw) return null;
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function verifyOptions(nowMs = Date.now()): InvoiceTokenVerifyOptions {
  return { nowMs, previousValidUntilMs: previousValidUntilMs() };
}

export async function invoiceToken(id: string): Promise<string | null> {
  return signInvoiceToken(id, linkSecrets().current);
}

export async function verifyInvoiceToken(id: string, token: string): Promise<boolean> {
  const secrets = linkSecrets();
  return tokensMatch(id, token, secrets.current, secrets.previous, verifyOptions());
}

export async function getInvoice(id: string): Promise<StoredInvoice | null> {
  if (!isInvoiceId(id)) return null;
  const db = database();
  if (!db) return null;
  return getInvoiceRecord(db, id);
}

export async function createStoredInvoice(invoice: StoredInvoice): Promise<LedgerWrite> {
  const db = database();
  if (!db) return { ok: false, reason: "storage" };
  return createInvoiceRecord(db, invoice);
}

export async function associateInvoiceOrder(invoiceId: string, orderId: string): Promise<LedgerWrite> {
  const db = database();
  if (!db) return { ok: false, reason: "storage" };
  return associatePayPalOrder(db, invoiceId, orderId, new Date().toISOString());
}

export async function recordInvoicePayment(input: PaidTransition): Promise<LedgerWrite> {
  const db = database();
  if (!db) return { ok: false, reason: "storage" };
  return markInvoicePaid(db, input);
}

export async function recordUnappliedInvoiceEvent(input: UnappliedEvent): Promise<LedgerWrite> {
  const db = database();
  if (!db) return { ok: false, reason: "storage" };
  return recordUnappliedPaymentEvent(db, input);
}

export async function loadPayableInvoice(
  id: string | null | undefined,
  token: string | null | undefined,
): Promise<{ invoice: StoredInvoice } | { error: InvoiceGateError }> {
  if (!id || !token) return { error: "missing" };
  if (!(await verifyInvoiceToken(id, token))) return { error: "token" };
  const storageAvailable = database() !== null;
  const invoice = await getInvoice(id);
  return evaluateStoredInvoice(invoice, Date.now(), storageAvailable);
}

export function newInvoiceId() {
  return crypto.randomUUID();
}

export function defaultExpiryDays(days = INVOICE_DEFAULT_EXPIRY_DAYS) {
  return new Date(Date.now() + days * MS_PER_DAY).toISOString();
}
