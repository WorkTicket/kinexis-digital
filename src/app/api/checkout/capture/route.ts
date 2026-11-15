import { NextResponse } from "next/server";
import { getInvoice, putInvoice } from "@/lib/invoices";
import { captureInvoiceOrder, isPayPalOrderId } from "@/lib/paypal-order";

function destination(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, new URL(request.url).origin), 303);
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")?.toUpperCase() ?? "";
  if (!isPayPalOrderId(token)) return destination(request, "/pay?invoice=error#invoice");
  try {
    const result = await captureInvoiceOrder(token);
    if (result.status === "paid") {
      if (result.invoiceId && /^[0-9a-f-]{8,64}$/i.test(result.invoiceId)) {
        const invoice = await getInvoice(result.invoiceId);
        if (invoice && invoice.status === "unpaid") {
          await putInvoice({
            ...invoice,
            status: "paid",
            paidAt: new Date().toISOString(),
            paypalOrderId: token,
          });
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
