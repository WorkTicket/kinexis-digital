import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import {
  createMailTransporter,
  emailMessageRow,
  emailRow,
  getEmailCredentials,
  wrapKinexisEmailHtml,
} from "@/lib/email";
import { escapeHtml } from "@/lib/sanitize";
import { validateOrigin } from "@/lib/csrf";

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid origin." },
        { status: 403 },
      );
    }

    const ip = getClientIp(request);
    if (isRateLimited(`contact:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, company, phone, service, message } = body;

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

    const creds = getEmailCredentials();
    const isDev = process.env.NODE_ENV === "development";

    if (!creds) {
      if (!isDev) {
        console.error("Contact form: email credentials not configured");
        return NextResponse.json(
          { error: "Server configuration error. Please try again later." },
          { status: 500 },
        );
      }
      console.log("\n[DEV] Contact form submission (no email sent):", { name, email });
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const safeName = String(name);
    const safeEmail = String(email);
    const rows = [
      emailRow("Name", safeName),
      emailRow("Email", safeEmail, true),
      company ? emailRow("Company", String(company)) : "",
      phone ? emailRow("Phone", String(phone)) : "",
      service ? emailRow("Service", String(service)) : "",
      message ? emailMessageRow(String(message)) : "",
    ].join("");

    const transporter = createMailTransporter(creds);

    await transporter.sendMail({
      from: `"KINEXIS Digital Contact" <${creds.gmailUser}>`,
      to: creds.toEmail,
      replyTo: safeEmail,
      subject: `New Inquiry from ${safeName}${company ? ` \u2014 ${company}` : ""}`,
      html: wrapKinexisEmailHtml(
        "New Contact Form Submission",
        rows,
        `Reply directly to this email to respond to <strong style="color:#fff;">${escapeHtml(safeName)}</strong>.`,
      ),
      text: [
        "New Contact Form Submission \u2014 KINEXIS Digital",
        "",
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        company ? `Company: ${company}` : "",
        phone ? `Phone: ${phone}` : "",
        service ? `Service Interest: ${service}` : "",
        message ? `\nMessage:\n${message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
