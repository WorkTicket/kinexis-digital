import { NextResponse } from "next/server";
import { emailRow, sendKinexisMail } from "@/lib/email";
import { getPayPalConfig, parsePayPalIpn, verifyPayPalIpn } from "@/lib/paypal-checkout";

function sameEmail(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export async function POST(request: Request) {
  const payload = await request.text();
  const paypal = await getPayPalConfig();
  if (!paypal) {
    return NextResponse.json({ error: "PayPal is not configured." }, { status: 503 });
  }

  const verified = await verifyPayPalIpn(payload, paypal.sandbox);
  if (!verified) {
    return NextResponse.json({ error: "Invalid notification." }, { status: 400 });
  }

  const notice = parsePayPalIpn(payload);
  if (notice.status !== "Completed") {
    return NextResponse.json({ received: true });
  }
  if (!sameEmail(notice.receiverEmail, paypal.email)) {
    console.error("checkout ipn: receiver did not match the configured PayPal account");
    return NextResponse.json({ received: true });
  }

  const amount = notice.amount ? `${notice.currency} ${notice.amount}` : "Unknown";
  const email = notice.payerEmail || "unknown";
  const rows = [
    emailRow("Amount", amount),
    emailRow("For", notice.itemName),
    emailRow("Name", notice.payerName),
    emailRow("Email", email, email.includes("@")),
    ...(notice.company ? [emailRow("Company", notice.company)] : []),
    ...(notice.txnId ? [emailRow("PayPal txn", notice.txnId)] : []),
  ].join("");

  const text = [
    `Amount: ${amount}`,
    `For: ${notice.itemName}`,
    `Name: ${notice.payerName}`,
    `Email: ${email}`,
    notice.company ? `Company: ${notice.company}` : "",
    notice.txnId ? `PayPal txn: ${notice.txnId}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const mail = await sendKinexisMail(
    {
      fromName: "KINEXIS Payments",
      replyTo: email.includes("@") ? email : "hello@kinexisdigital.com",
      subject: `PayPal payment: ${amount} from ${notice.payerName}`,
      title: "PayPal payment received",
      rows,
      text,
      footer:
        "PayPal confirmed this payment. Withdraw it to the bank account linked on the PayPal account, including Chime.",
    },
    "PayPal",
  );

  if (!mail.ok) {
    return NextResponse.json({ error: "Notification failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
