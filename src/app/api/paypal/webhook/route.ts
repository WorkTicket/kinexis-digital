import { captureInvoiceOrder } from "@/lib/paypal-order";
import { getInvoice, recordInvoicePayment, recordUnappliedInvoiceEvent } from "@/lib/invoices";
import { usdMinorUnits } from "@/lib/payment-verification";
import {
  parsePayPalEvent,
  readWebhookHeaders,
  verifyPayPalWebhookSignature,
  webhookBodyTooLarge,
  type CaptureNotification,
} from "@/lib/paypal-webhook";
import { privateJson, rejectCrossSite, rejectOversize } from "@/lib/request-security";
import { PAYPAL_WEBHOOK_MAX_BYTES } from "@/lib/invoice-core";

function json(body: Record<string, boolean | string>, status: number) {
  return privateJson(body, { status });
}

async function remember(
  eventId: string,
  eventType: string,
  outcome: "ignored" | "rejected",
  notification?: Partial<CaptureNotification>,
) {
  const amountMinor = notification?.amount ? usdMinorUnits(notification.amount) : null;
  return recordUnappliedInvoiceEvent({
    eventId,
    eventType,
    invoiceId: notification?.invoiceId ?? null,
    orderId: notification?.orderId ?? null,
    captureId: notification?.captureId ?? null,
    amountMinor,
    currency: notification?.currency ?? null,
    outcome,
    receivedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    return await handleWebhook(request);
  } catch (error) {
    console.error("PayPal webhook failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return json({ error: "storage" }, 503);
  }
}

async function handleWebhook(request: Request) {
  const rejected = rejectCrossSite(request) || rejectOversize(request, PAYPAL_WEBHOOK_MAX_BYTES);
  if (rejected) return rejected;

  const raw = await request.text();
  if (webhookBodyTooLarge(new TextEncoder().encode(raw).byteLength)) {
    return json({ error: "payload too large" }, 413);
  }

  let event: unknown;
  try {
    event = JSON.parse(raw) as unknown;
  } catch {
    return json({ error: "invalid json" }, 400);
  }

  const headers = readWebhookHeaders(request);
  if (!headers) return json({ error: "invalid signature headers" }, 400);

  const verification = await verifyPayPalWebhookSignature(headers, event);
  if (verification === "unconfigured" || verification === "unavailable") {
    return json({ error: "verification unavailable" }, 503);
  }
  if (verification !== "success") return json({ error: "invalid signature" }, 400);

  const parsed = parsePayPalEvent(event);
  if (parsed.kind === "invalid") return json({ error: "invalid event" }, 400);
  if (parsed.kind === "other") {
    const stored = await remember(parsed.eventId, parsed.eventType, "ignored");
    if (!stored.ok && stored.reason === "storage") return json({ error: "storage" }, 503);
    return json({ ok: true }, 200);
  }

  const notification = parsed.notification;
  const invoice = await getInvoice(notification.invoiceId);
  const amountMinor = usdMinorUnits(notification.amount);
  const storedMinor = invoice ? usdMinorUnits(invoice.amount) : null;
  const matchesInvoice = Boolean(
    invoice &&
    invoice.paypalOrderId === notification.orderId &&
    invoice.currency === "USD" &&
    notification.currency === "USD" &&
    amountMinor !== null &&
    storedMinor !== null &&
    amountMinor === storedMinor,
  );
  if (!invoice || !matchesInvoice) {
    const stored = await remember(notification.eventId, notification.eventType, "rejected", notification);
    if (!stored.ok && stored.reason === "storage") return json({ error: "storage" }, 503);
    return json({ ok: true }, 200);
  }

  const captured = await captureInvoiceOrder(notification.orderId, invoice);
  if (captured.status === "unconfigured" || captured.status === "unavailable") {
    return json({ error: "provider unavailable" }, 503);
  }
  if (captured.status !== "paid" || captured.captureId !== notification.captureId) {
    const stored = await remember(notification.eventId, notification.eventType, "rejected", notification);
    if (!stored.ok && stored.reason === "storage") return json({ error: "storage" }, 503);
    return json({ ok: true }, 200);
  }

  const now = new Date().toISOString();
  const recorded = await recordInvoicePayment({
    eventId: notification.eventId,
    eventType: notification.eventType,
    invoiceId: invoice.id,
    orderId: notification.orderId,
    captureId: captured.captureId,
    amount: invoice.amount,
    paidAt: invoice.paidAt ?? now,
    receivedAt: now,
  });
  if (!recorded.ok && recorded.reason === "storage") return json({ error: "storage" }, 503);
  if (!recorded.ok) {
    console.error("PayPal webhook did not change invoice state", {
      invoiceId: invoice.id,
      eventType: notification.eventType,
    });
  }
  return json({ ok: true }, 200);
}
