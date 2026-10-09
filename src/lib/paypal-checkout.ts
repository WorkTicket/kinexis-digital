import { getCloudflareContext } from "@opennextjs/cloudflare";

export type PayPalConfig = {
  email: string;
  sandbox: boolean;
};

export type PayPalCheckoutInput = {
  amountCents: number;
  description: string;
  name: string;
  email: string;
  company?: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  invoiceId: string;
};

type PayPalEnv = {
  PAYPAL_BUSINESS_EMAIL?: string;
  PAYPAL_ENV?: string;
};

function readSandbox(value: string | undefined, fallback: boolean): boolean {
  if (value === "sandbox") return true;
  if (value === "live") return false;
  return fallback;
}

/** PayPal account that receives the payment. Visible in the checkout URL. */
export async function getPayPalConfig(): Promise<PayPalConfig | null> {
  let email = "";
  let sandbox = readSandbox(process.env.PAYPAL_ENV, false);

  try {
    const { env } = await getCloudflareContext({ async: true });
    const paypal = env as PayPalEnv;
    email = paypal.PAYPAL_BUSINESS_EMAIL?.trim() || "";
    sandbox = readSandbox(paypal.PAYPAL_ENV, sandbox);
  } catch {
    // Local Next.js without the Workers binding.
  }

  if (!email) email = process.env.PAYPAL_BUSINESS_EMAIL?.trim() || "";
  if (!email.includes("@")) return null;
  return { email, sandbox };
}

function customField(name: string, email: string, company?: string): string {
  return [name, email, company ?? ""]
    .map((part) => part.replaceAll("|", " "))
    .join("|")
    .slice(0, 255);
}

/**
 * PayPal Website Payments Standard. The buyer pays on PayPal.
 * Works with the email on a personal PayPal account. No REST app.
 */
export function buildPayPalCheckoutUrl(config: PayPalConfig, input: PayPalCheckoutInput): string {
  const host = config.sandbox
    ? "https://www.sandbox.paypal.com/cgi-bin/webscr"
    : "https://www.paypal.com/cgi-bin/webscr";
  const params = new URLSearchParams();
  params.set("cmd", "_xclick");
  params.set("business", config.email);
  params.set("item_name", input.description.slice(0, 127));
  params.set("amount", (input.amountCents / 100).toFixed(2));
  params.set("currency_code", "USD");
  params.set("no_shipping", "1");
  params.set("no_note", "1");
  params.set("charset", "utf-8");
  params.set("rm", "1");
  params.set("return", input.returnUrl);
  params.set("cancel_return", input.cancelUrl);
  params.set("notify_url", input.notifyUrl);
  params.set("invoice", input.invoiceId.slice(0, 127));
  params.set("email", input.email);
  params.set("custom", customField(input.name, input.email, input.company));
  return `${host}?${params.toString()}`;
}

export type PayPalNotice = {
  amount: string;
  currency: string;
  itemName: string;
  payerEmail: string;
  payerName: string;
  company?: string;
  txnId: string;
  status: string;
  receiverEmail: string;
};

export function parsePayPalIpn(body: string): PayPalNotice {
  const params = new URLSearchParams(body);
  const [customName = "", customEmail = "", company = ""] = (params.get("custom") ?? "").split("|");
  const paypalName = `${params.get("first_name") ?? ""} ${params.get("last_name") ?? ""}`.trim();
  return {
    amount: params.get("mc_gross") ?? "",
    currency: (params.get("mc_currency") ?? "USD").toUpperCase(),
    itemName: params.get("item_name") || "Payment",
    payerEmail: params.get("payer_email") || customEmail,
    payerName: customName || paypalName || "Unknown",
    company: company.trim() || undefined,
    txnId: params.get("txn_id") ?? "",
    status: params.get("payment_status") ?? "",
    receiverEmail: params.get("receiver_email") || params.get("business") || "",
  };
}

/** Handshake the raw IPN body back to PayPal. True only when PayPal answers VERIFIED. */
export async function verifyPayPalIpn(body: string, sandbox: boolean): Promise<boolean> {
  const endpoint = sandbox
    ? "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr"
    : "https://ipnpb.paypal.com/cgi-bin/webscr";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "KINEXIS-PayPal-IPN",
    },
    body: `cmd=_notify-validate&${body}`,
  });
  const text = (await response.text()).trim();
  return text === "VERIFIED";
}
