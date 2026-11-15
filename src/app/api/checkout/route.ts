import { clientIp } from "@/lib/client-ip";
import { rejectClientAmount } from "@/lib/invoice-core";
import { associateInvoiceOrder, loadPayableInvoice } from "@/lib/invoices";
import { createInvoiceOrder } from "@/lib/paypal-order";
import { isRateLimited } from "@/lib/rate-limit";
import { logApiError } from "@/lib/api-log";
import { hasContentType, jsonByteLength, privateJson, rejectCrossSite, rejectOversize, rejectReadOversize } from "@/lib/request-security";
import { SITE } from "@/lib/site";

const MAX_REQUEST = 16 * 1024;

function fail(message: string, status: number) {
  return privateJson({ error: message }, { status });
}

function gateMessage(error: string) {
  switch (error) {
    case "missing":
    case "token":
    case "not_found":
      return "That payment link is invalid. Use the link from your invoice email, or contact us.";
    case "expired":
      return "That invoice link has expired. Contact us for a new payment link.";
    case "paid":
      return "This invoice is already paid.";
    case "void":
      return "This invoice is no longer payable. Contact us if you need a new link.";
    case "storage":
      return `Online invoice checkout isn’t available right now. Call ${SITE.phone} or email ${SITE.email}.`;
    default:
      return "That payment link could not be verified.";
  }
}

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request) || rejectOversize(request, MAX_REQUEST);
  if (rejected) return rejected;
  if (!hasContentType(request, "application/json")) {
    return fail("That form could not be read. Please try again.", 415);
  }

  if (await isRateLimited("checkout", clientIp(request), 60)) {
    return fail("Please wait a moment before trying checkout again.", 429);
  }

  let body: {
    invoiceId?: unknown;
    token?: unknown;
    amount?: unknown;
    description?: unknown;
    name?: unknown;
    email?: unknown;
    company?: unknown;
    _hp?: unknown;
  };
  try {
    body = await request.json();
  } catch (error) {
    logApiError("checkout", error);
    return fail("That form could not be read. Please try again.", 400);
  }

  const oversized = rejectReadOversize(jsonByteLength(body), MAX_REQUEST);
  if (oversized) return oversized;

  if (String(body._hp ?? "").trim()) return privateJson({ ok: true });

  // Reject free-form amount payments — amount must come from a server invoice.
  if (rejectClientAmount(body.amount)) {
    return fail("Open your invoice payment link to pay. Amounts cannot be entered manually.", 400);
  }

  let gated: Awaited<ReturnType<typeof loadPayableInvoice>>;
  try {
    gated = await loadPayableInvoice(
      typeof body.invoiceId === "string" ? body.invoiceId : null,
      typeof body.token === "string" ? body.token : null,
    );
  } catch (error) {
    logApiError("checkout", error);
    return fail(gateMessage("storage"), 503);
  }
  if ("error" in gated) return fail(gateMessage(gated.error), gated.error === "storage" ? 503 : 400);

  const { invoice } = gated;
  const name = String(body.name ?? "").replace(/[\n\r\t\f\v]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
  const email = String(body.email ?? "").replace(/[\n\r\t\f\v]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 200);
  const company = String(body.company ?? "").replace(/[\n\r\t\f\v]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
  if (name.length < 2) return fail("Add your name.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Add a valid email.", 400);

  try {
    const order = await createInvoiceOrder({
      amount: invoice.amount,
      description: invoice.description.slice(0, 127),
      name,
      email,
      company,
      // Stable per invoice: a retry after a lost response cannot create an
      // unrelated second PayPal order for the same invoice.
      requestId: invoice.id,
      invoiceId: invoice.id,
    });
    if ("unconfigured" in order) {
      return fail(`Online invoice checkout isn’t set up yet. Call ${SITE.phone} or email ${SITE.email} and we’ll send a payment link.`, 503);
    }
    if ("error" in order) return fail(order.error, 502);

    // Link the PayPal order only if this invoice is still unpaid and does not
    // already point at a different order. The ledger update is conditional.
    const linked = await associateInvoiceOrder(invoice.id, order.orderId);
    if (!linked.ok) {
      return fail(`Online invoice checkout isn’t available right now. Call ${SITE.phone} or email ${SITE.email}.`, 503);
    }

    return privateJson({ url: order.url });
  } catch (error) {
    logApiError("checkout", error);
    return fail("Something went wrong. Please try again, or call us.", 502);
  }
}
