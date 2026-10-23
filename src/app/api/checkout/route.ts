import { createInvoiceOrder, parseInvoice } from "@/lib/paypal-order";
import { hasContentType, privateJson, rejectCrossSite, rejectOversize } from "@/lib/request-security";
import { SITE } from "@/lib/site";

function fail(message: string, status: number) {
  return privateJson({ error: message }, { status });
}

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request) || rejectOversize(request, 16 * 1024);
  if (rejected) return rejected;
  if (!hasContentType(request, "application/json")) {
    return fail("That form could not be read. Please try again.", 415);
  }

  let body: {
    amount?: unknown;
    description?: unknown;
    name?: unknown;
    email?: unknown;
    company?: unknown;
    _hp?: unknown;
    idempotencyKey?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return fail("That form could not be read. Please try again.", 400);
  }

  if (String(body._hp ?? "").trim()) return Response.json({ ok: true });

  const parsed = parseInvoice({
    amount: String(body.amount ?? ""),
    description: String(body.description ?? ""),
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    company: String(body.company ?? ""),
  });
  if ("error" in parsed) return fail(parsed.error, 400);

  const requestId = typeof body.idempotencyKey === "string" && /^[0-9a-f-]{16,80}$/i.test(body.idempotencyKey)
    ? body.idempotencyKey
    : crypto.randomUUID();

  try {
    const order = await createInvoiceOrder({
      ...parsed,
      requestId,
    });
    if ("unconfigured" in order) {
      return fail(`Online invoice checkout isn’t set up yet. Call ${SITE.phone} or email ${SITE.email} and we’ll send a payment link.`, 503);
    }
    if ("error" in order) return fail(order.error, 502);
    return privateJson({ url: order.url });
  } catch {
    return fail("Something went wrong. Please try again, or call us.", 502);
  }
}
