import { NextResponse } from "next/server";
import { getInvoice, putInvoice } from "@/lib/invoices";
import { captureInvoiceOrder, invoiceIdForPayPalOrder, isPayPalOrderId } from "@/lib/paypal-order";

function destination(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, new URL(request.url).origin), 303);
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
      if (invoice.status !== "paid" || !invoice.paypalCaptureId) {
        const persisted = await putInvoice({
          ...invoice,
          status: "paid",
          paidAt: invoice.paidAt ?? new Date().toISOString(),
          paypalCaptureId: result.captureId,
        });
        if (!persisted) {
          console.error("PayPal capture verified but invoice state persistence failed", {
            invoiceId: invoice.id,
            orderIdPrefix: token.slice(0, 8),
            captureIdPrefix: result.captureId.slice(0, 8),
          });
          return destination(request, "/pay?invoice=error#invoice");
        }
      }
      return destination(request, "/pay/thanks?kind=invoice&status=paid");
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
