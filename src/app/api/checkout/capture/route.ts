import { getInvoice, recordInvoicePayment } from "@/lib/invoices";
import { captureInvoiceOrder, invoiceIdForPayPalOrder, isPayPalOrderId } from "@/lib/paypal-order";

function destination(request: Request, path: string) {
  return Response.redirect(new URL(path, new URL(request.url).origin), 303);
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")?.toUpperCase() ?? "";
  if (!isPayPalOrderId(token)) return destination(request, "/pay?invoice=error#invoice");
  try {
    const association = await invoiceIdForPayPalOrder(token);
    if (association.status !== "ok") return destination(request, "/pay?invoice=error#invoice");

    const invoice = await getInvoice(association.invoiceId);
    if (!invoice || invoice.paypalOrderId !== token) {
      return destination(request, "/pay?invoice=error#invoice");
    }

    const result = await captureInvoiceOrder(token, invoice);
    if (result.status === "paid") {
      const now = new Date().toISOString();
      const persisted = await recordInvoicePayment({
        eventId: `capture:${result.captureId}`,
        eventType: "CHECKOUT.CAPTURE",
        invoiceId: invoice.id,
        orderId: token,
        captureId: result.captureId,
        amount: invoice.amount,
        paidAt: invoice.paidAt ?? now,
        receivedAt: now,
      });
      if (!persisted.ok) {
        console.error("PayPal capture verified but invoice state persistence failed", {
          invoiceId: invoice.id,
          orderIdPrefix: token.slice(0, 8),
          captureIdPrefix: result.captureId.slice(0, 8),
          reason: persisted.reason,
        });
        return destination(request, "/pay?invoice=error#invoice");
      }
      const value = encodeURIComponent(invoice.amount);
      return destination(request, `/pay/thanks?kind=invoice&status=paid&value=${value}`);
    }
    console.error("PayPal invoice capture unfinished", {
      tokenPrefix: token.slice(0, 8),
      result: result.status,
    });
  } catch (error) {
    console.error("PayPal invoice capture failed", {
      tokenPrefix: token.slice(0, 8),
      message: error instanceof Error ? error.message : "unknown",
    });
  }
  return destination(request, "/pay?invoice=error#invoice");
}
