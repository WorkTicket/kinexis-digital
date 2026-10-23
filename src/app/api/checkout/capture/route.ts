import { NextResponse } from "next/server";
import { captureInvoiceOrder, isPayPalOrderId } from "@/lib/paypal-order";

function destination(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, new URL(request.url).origin), 303);
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")?.toUpperCase() ?? "";
  if (!isPayPalOrderId(token)) return destination(request, "/pay?invoice=error#invoice");
  try {
    const result = await captureInvoiceOrder(token);
    if (result === "paid") return destination(request, "/pay/thanks?kind=invoice&status=paid");
  } catch {
    /* fall through to the retry screen */
  }
  return destination(request, "/pay?invoice=error#invoice");
}
