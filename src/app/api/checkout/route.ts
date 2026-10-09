import { NextResponse } from "next/server";
import { validateOrigin } from "@/lib/csrf";
import { validateHoneypot } from "@/lib/honeypot";
import { getSiteUrl } from "@/lib/metadata";
import { parseUsdToCents } from "@/lib/payment-amount";
import { buildPayPalCheckoutUrl, getPayPalConfig } from "@/lib/paypal-checkout";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVOICE_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function cleanLine(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function checkoutOrigin(request: Request): string {
  const origin = request.headers.get("origin");
  if (origin && origin !== "null") {
    try {
      return new URL(origin).origin;
    } catch {
      // Fall through to the public site URL.
    }
  }
  return getSiteUrl();
}

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (await isRateLimited(`checkout:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const honeypot = validateHoneypot(
      { _hp: body?._hp },
      typeof body?._ts === "number" ? body._ts : undefined,
    );
    if (honeypot.blocked) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const amountCents = parseUsdToCents(String(body?.amount ?? ""));
    if (amountCents == null) {
      return NextResponse.json(
        { error: "Enter a USD amount between $1 and $75,000." },
        { status: 400 },
      );
    }

    const description = cleanLine(body?.description, 127);
    if (description.length < 3) {
      return NextResponse.json(
        { error: "Say what this payment is for." },
        { status: 400 },
      );
    }

    const name = cleanLine(body?.name, 120);
    if (name.length < 2) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const email = cleanLine(body?.email, 200);
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const company = cleanLine(body?.company, 120);
    const invoiceId = INVOICE_RE.test(String(body?.idempotencyKey ?? ""))
      ? String(body.idempotencyKey)
      : crypto.randomUUID();

    const paypal = await getPayPalConfig();
    if (!paypal) {
      return NextResponse.json(
        {
          error:
            "Online payments aren't set up yet. Email hello@kinexisdigital.com and we'll send another way to pay.",
        },
        { status: 503 },
      );
    }

    const origin = checkoutOrigin(request);
    const url = buildPayPalCheckoutUrl(paypal, {
      amountCents,
      description,
      name,
      email,
      company: company || undefined,
      returnUrl: `${origin}/pay/success`,
      cancelUrl: `${origin}/pay/cancelled`,
      notifyUrl: `${getSiteUrl()}/api/checkout/webhook`,
      invoiceId,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("checkout:", error instanceof Error ? error.message : "failed");
    return NextResponse.json(
      { error: "We couldn't open PayPal. Please try again." },
      { status: 502 },
    );
  }
}
