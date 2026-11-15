import { clientIp } from "@/lib/client-ip";
import {
  defaultExpiryDays,
  invoiceToken,
  newInvoiceId,
  putInvoice,
  type StoredInvoice,
} from "@/lib/invoices";
import { parseInvoice } from "@/lib/paypal-order";
import { isRateLimited } from "@/lib/rate-limit";
import { logApiError } from "@/lib/api-log";
import { hasContentType, jsonByteLength, privateJson, rejectCrossSite, rejectOversize, rejectReadOversize } from "@/lib/request-security";
import { SITE } from "@/lib/site";

const MAX_REQUEST = 16 * 1024;

/**
 * Staff-only invoice creation. Requires header `x-invoice-admin: <INVOICE_ADMIN_SECRET>`.
 * Returns a payment path only (no secrets). Do not log amounts with customer PII together.
 */
export async function POST(request: Request) {
  const rejected = rejectCrossSite(request) || rejectOversize(request, MAX_REQUEST);
  if (rejected) return rejected;
  if (!hasContentType(request, "application/json")) {
    return privateJson({ error: "Unsupported media type." }, { status: 415 });
  }

  const admin = process.env.INVOICE_ADMIN_SECRET;
  if (!admin || admin.length < 16) {
    return privateJson({ error: "Invoice admin is not configured." }, { status: 503 });
  }
  if (request.headers.get("x-invoice-admin") !== admin) {
    return privateJson({ error: "Unauthorized." }, { status: 401 });
  }

  if (await isRateLimited("invoice-admin", clientIp(request), 30)) {
    return privateJson({ error: "Rate limited." }, { status: 429 });
  }

  let body: {
    amount?: unknown;
    description?: unknown;
    company?: unknown;
    expiresInDays?: unknown;
  };
  try {
    body = await request.json();
  } catch (error) {
    logApiError("invoices", error);
    return privateJson({ error: "Invalid JSON." }, { status: 400 });
  }

  const oversized = rejectReadOversize(jsonByteLength(body), MAX_REQUEST);
  if (oversized) return oversized;

  const parsed = parseInvoice({
    amount: String(body.amount ?? ""),
    description: String(body.description ?? ""),
    name: "Invoice",
    email: "invoice@kinexisdigital.com",
    company: String(body.company ?? ""),
  });
  if ("error" in parsed) return privateJson({ error: parsed.error }, { status: 400 });

  const days = typeof body.expiresInDays === "number" && body.expiresInDays >= 1 && body.expiresInDays <= 90
    ? body.expiresInDays
    : 14;

  const id = newInvoiceId();
  const token = await invoiceToken(id);
  if (!token) {
    return privateJson({ error: "INVOICE_LINK_SECRET (or PAYPAL_CLIENT_SECRET) is required to sign links." }, { status: 503 });
  }

  const invoice: StoredInvoice = {
    id,
    amount: parsed.amount,
    currency: "USD",
    description: parsed.description,
    status: "unpaid",
    expiresAt: defaultExpiryDays(days),
    createdAt: new Date().toISOString(),
    company: parsed.company || undefined,
  };

  const saved = await putInvoice(invoice);
  if (!saved) {
    return privateJson({ error: "KV storage unavailable." }, { status: 503 });
  }

  const path = `/pay?inv=${encodeURIComponent(id)}&t=${encodeURIComponent(token)}#invoice`;
  return privateJson({
    id,
    path,
    url: `${SITE.url}${path}`,
    expiresAt: invoice.expiresAt,
  });
}
