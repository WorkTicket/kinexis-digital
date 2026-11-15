import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  evaluateStoredInvoice,
  isInvoiceId,
  signInvoiceToken,
  tokensMatch,
  type InvoiceGateError,
  type StoredInvoice,
} from "@/lib/invoice-core";
import { usdMinorUnits } from "@/lib/payment-verification";

export type { InvoiceGateError, InvoiceStatus, StoredInvoice } from "@/lib/invoice-core";

type KvEnv = CloudflareEnv & { REVIEWS?: KVNamespace };

const PREFIX = "invoice:v1:";
const memoryStore = new Map<string, string>();

function invoiceTestMemory() {
  return process.env.INVOICE_TEST_MEMORY === "1";
}

function kv(): KVNamespace | null {
  if (invoiceTestMemory()) return null;
  try {
    const env = getCloudflareContext().env as KvEnv;
    return env.REVIEWS ?? null;
  } catch {
    return null;
  }
}

function key(id: string) {
  return `${PREFIX}${id}`;
}

function linkSecrets() {
  return {
    current: process.env.INVOICE_LINK_SECRET || "",
    previous: process.env.INVOICE_LINK_SECRET_PREVIOUS || "",
  };
}

export function resetInvoiceTestStore() {
  memoryStore.clear();
}

export async function invoiceToken(id: string): Promise<string | null> {
  return signInvoiceToken(id, linkSecrets().current);
}

export async function verifyInvoiceToken(id: string, token: string): Promise<boolean> {
  const secrets = linkSecrets();
  return tokensMatch(id, token, secrets.current, secrets.previous);
}

function isInvoice(value: unknown): value is StoredInvoice {
  if (!value || typeof value !== "object") return false;
  const inv = value as StoredInvoice;
  return (
    typeof inv.id === "string" &&
    isInvoiceId(inv.id) &&
    typeof inv.amount === "string" &&
    usdMinorUnits(inv.amount) !== null &&
    inv.currency === "USD" &&
    typeof inv.description === "string" &&
    (inv.status === "unpaid" || inv.status === "paid" || inv.status === "void") &&
    typeof inv.expiresAt === "string" &&
    typeof inv.createdAt === "string" &&
    Number.isFinite(Date.parse(inv.createdAt)) &&
    Number.isFinite(Date.parse(inv.expiresAt)) &&
    (inv.paypalOrderId === undefined || (typeof inv.paypalOrderId === "string" && /^[A-Z0-9]{10,20}$/.test(inv.paypalOrderId))) &&
    (inv.paypalCaptureId === undefined || (typeof inv.paypalCaptureId === "string" && /^[A-Z0-9]{10,20}$/.test(inv.paypalCaptureId)))
  );
}

export async function getInvoice(id: string): Promise<StoredInvoice | null> {
  if (!isInvoiceId(id)) return null;
  if (invoiceTestMemory()) {
    const raw = memoryStore.get(key(id));
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as unknown;
      return isInvoice(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  const store = kv();
  if (!store) return null;
  const raw = await store.get(key(id), "json");
  return isInvoice(raw) ? raw : null;
}

export async function putInvoice(invoice: StoredInvoice): Promise<boolean> {
  if (invoiceTestMemory()) {
    memoryStore.set(key(invoice.id), JSON.stringify(invoice));
    return true;
  }
  const store = kv();
  if (!store) return false;
  await store.put(key(invoice.id), JSON.stringify(invoice));
  return true;
}

export async function loadPayableInvoice(
  id: string | null | undefined,
  token: string | null | undefined,
): Promise<{ invoice: StoredInvoice } | { error: InvoiceGateError }> {
  if (!id || !token) return { error: "missing" };
  if (!(await verifyInvoiceToken(id, token))) return { error: "token" };
  const invoice = await getInvoice(id);
  const storageAvailable = invoiceTestMemory() || Boolean(kv());
  return evaluateStoredInvoice(invoice, Date.now(), storageAvailable);
}

export function newInvoiceId() {
  return crypto.randomUUID();
}

export function defaultExpiryDays(days = 14) {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}
