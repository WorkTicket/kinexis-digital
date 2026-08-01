import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import {
  describeMailError,
  emailMessageRow,
  emailRow,
  sendKinexisMail,
} from "@/lib/email";
import { validateOrigin } from "@/lib/csrf";
import { validateHoneypot } from "@/lib/honeypot";
import {
  attributionEmailRows,
  attributionTextLines,
  sanitizeAttributionFromBody,
} from "@/lib/analytics/click-ids";

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid origin." },
        { status: 403 },
      );
    }

    const ip = getClientIp(request);
    if (await isRateLimited(`contact:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, company, phone, service, message, _hp, _ts } = body;
    const attribution = sanitizeAttributionFromBody(body);

    const honeypot = validateHoneypot(
      { _hp },
      typeof _ts === "number" ? _ts : undefined,
    );
    if (honeypot.blocked) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(String(email))) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (String(name).length > 200) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (company && String(company).length > 200) {
      return NextResponse.json({ error: "Company name is too long." }, { status: 400 });
    }
    if (phone && String(phone).length > 50) {
      return NextResponse.json({ error: "Phone number is too long." }, { status: 400 });
    }
    if (service && String(service).length > 200) {
      return NextResponse.json({ error: "Service value is too long." }, { status: 400 });
    }
    if (message && String(message).length > 5000) {
      return NextResponse.json({ error: "Message is too long (max 5000 characters)." }, { status: 400 });
    }

    const safeName = String(name);
    const safeEmail = String(email);
    const attributionHtml = attributionEmailRows(attribution, emailRow);
    const attributionText = attributionTextLines(attribution);
    const rows = [
      emailRow("Name", safeName),
      emailRow("Email", safeEmail, true),
      company ? emailRow("Company", String(company)) : "",
      phone ? emailRow("Phone", String(phone)) : "",
      service ? emailRow("Service", String(service)) : "",
      message ? emailMessageRow(String(message)) : "",
      attributionHtml,
    ].join("");

    const mail = await sendKinexisMail(
      {
        fromName: "KINEXIS Digital Contact",
        replyTo: safeEmail,
        subject: `New Inquiry from ${safeName}${company ? ` \u2014 ${company}` : ""}`,
        title: "New Contact Form Submission",
        rows,
        footer: `Reply directly to this email to respond to ${safeName}.`,
        text: [
          "New Contact Form Submission \u2014 KINEXIS Digital",
          "",
          `Name: ${safeName}`,
          `Email: ${safeEmail}`,
          company ? `Company: ${company}` : "",
          phone ? `Phone: ${phone}` : "",
          service ? `Service Interest: ${service}` : "",
          message ? `\nMessage:\n${message}` : "",
          attributionText.length ? ["", "Attribution:", ...attributionText].join("\n") : "",
        ]
          .filter(Boolean)
          .join("\n"),
      },
      "Contact form",
    );

    if (!mail.ok) {
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 },
      );
    }

    if (!mail.sent && process.env.ENABLE_DEV_FORM_LOGGING === "1") {
      console.log("\n[DEV] Contact form submission (no email sent):", {
        name: safeName,
        email: safeEmail,
        attribution,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", describeMailError(error));
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
