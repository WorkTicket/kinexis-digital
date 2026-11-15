import "server-only";
import { isInvoiceId, isPayPalResourceId, PAYPAL_WEBHOOK_MAX_BYTES } from "@/lib/invoice-core";
import { usdMinorUnits } from "@/lib/payment-verification";
import { payPalAccessToken, readPayPalConfig } from "@/lib/paypal-order";

const CERT_HOST = /(^|\.)paypal\.com$/;
const WEBHOOK_ID_PATTERN = /^[A-Za-z0-9]{10,40}$/;
const AUTH_ALGO = "SHA256withRSA";
const TRANSMISSION_ID_MAX = 128;
const SIGNATURE_MAX = 2048;
const TRANSMISSION_TIME_MAX = 64;
const AUTH_ALGO_MAX = 40;
const EVENT_ID_MAX = 128;
const EVENT_TYPE_MAX = 64;
const PAYPAL_VERIFY_TIMEOUT_MS = 15_000;

export type WebhookHeaders = {
  authAlgo: string;
  certUrl: string;
  transmissionId: string;
  transmissionSig: string;
  transmissionTime: string;
};

export type CaptureNotification = {
  eventId: string;
  eventType: "PAYMENT.CAPTURE.COMPLETED";
  captureId: string;
  orderId: string;
  invoiceId: string;
  amount: string;
  currency: string;
};

export type ParsedPayPalEvent =
  | { kind: "capture"; notification: CaptureNotification }
  | { kind: "other"; eventId: string; eventType: string }
  | { kind: "invalid" };

export function readPayPalWebhookId(): string | null {
  const id = (process.env.PAYPAL_WEBHOOK_ID || "").trim();
  return WEBHOOK_ID_PATTERN.test(id) ? id : null;
}

export function readWebhookHeaders(request: Request): WebhookHeaders | null {
  const authAlgo = request.headers.get("paypal-auth-algo")?.trim() ?? "";
  const certUrl = request.headers.get("paypal-cert-url")?.trim() ?? "";
  const transmissionId = request.headers.get("paypal-transmission-id")?.trim() ?? "";
  const transmissionSig = request.headers.get("paypal-transmission-sig")?.trim() ?? "";
  const transmissionTime = request.headers.get("paypal-transmission-time")?.trim() ?? "";
  if (
    !authAlgo ||
    !certUrl ||
    !transmissionId ||
    !transmissionSig ||
    !transmissionTime ||
    authAlgo.length > AUTH_ALGO_MAX ||
    transmissionId.length > TRANSMISSION_ID_MAX ||
    transmissionSig.length > SIGNATURE_MAX ||
    transmissionTime.length > TRANSMISSION_TIME_MAX ||
    authAlgo !== AUTH_ALGO
  ) {
    return null;
  }
  try {
    const url = new URL(certUrl);
    if (url.protocol !== "https:" || !CERT_HOST.test(url.hostname)) return null;
  } catch {
    return null;
  }
  return { authAlgo, certUrl, transmissionId, transmissionSig, transmissionTime };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function record(value: unknown): Record<string, unknown> | null {
  return isRecord(value) ? value : null;
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export function parsePayPalEvent(event: unknown): ParsedPayPalEvent {
  const payload = record(event);
  const eventId = text(payload?.id, EVENT_ID_MAX);
  const eventType = text(payload?.event_type, EVENT_TYPE_MAX);
  if (!payload || !eventId || !eventType) return { kind: "invalid" };
  if (eventType !== "PAYMENT.CAPTURE.COMPLETED") return { kind: "other", eventId, eventType };

  const resource = record(payload.resource);
  const amount = record(resource?.amount);
  const related = record(record(resource?.supplementary_data)?.related_ids);
  const captureId = text(resource?.id, 20);
  const orderId = text(related?.order_id, 20);
  const invoiceId = text(resource?.invoice_id, 64);
  const customId = text(resource?.custom_id, 64);
  const currency = text(amount?.currency_code, 3);
  const value = text(amount?.value, 16);
  if (
    !resource ||
    resource.status !== "COMPLETED" ||
    !captureId ||
    !isPayPalResourceId(captureId) ||
    !orderId ||
    !isPayPalResourceId(orderId) ||
    !invoiceId ||
    !isInvoiceId(invoiceId) ||
    invoiceId !== customId ||
    !currency ||
    !value ||
    usdMinorUnits(value) === null
  ) {
    return { kind: "invalid" };
  }
  return {
    kind: "capture",
    notification: {
      eventId,
      eventType: "PAYMENT.CAPTURE.COMPLETED",
      captureId,
      orderId,
      invoiceId,
      amount: value,
      currency,
    },
  };
}

export async function verifyPayPalWebhookSignature(
  headers: WebhookHeaders,
  event: unknown,
  fetcher: typeof fetch = fetch,
): Promise<"success" | "failure" | "unconfigured" | "unavailable"> {
  const cfg = readPayPalConfig();
  const webhookId = readPayPalWebhookId();
  if (!cfg || !webhookId) return "unconfigured";
  const token = await payPalAccessToken(cfg, fetcher);
  if (!token) return "unavailable";
  try {
    const res = await fetcher(`${cfg.base}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: headers.authAlgo,
        cert_url: headers.certUrl,
        transmission_id: headers.transmissionId,
        transmission_sig: headers.transmissionSig,
        transmission_time: headers.transmissionTime,
        webhook_id: webhookId,
        webhook_event: event,
      }),
      signal: AbortSignal.timeout(PAYPAL_VERIFY_TIMEOUT_MS),
    });
    if (!res.ok) return "unavailable";
    const data: unknown = await res.json().catch(() => null);
    const status = record(data)?.verification_status;
    if (status === "SUCCESS") return "success";
    if (status === "FAILURE") return "failure";
    return "unavailable";
  } catch {
    return "unavailable";
  }
}

export function webhookBodyTooLarge(byteLength: number) {
  return byteLength > PAYPAL_WEBHOOK_MAX_BYTES;
}
