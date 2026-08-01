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
import {
  BOOKING_DURATION_MINUTES,
  formatBookingSlotLabel,
  validateBookingSlot,
} from "@/lib/booking";
import { reserveBookingSlot } from "@/lib/booking-store";

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (await isRateLimited(`booking:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, date, time, notes, _hp, _ts } = body;
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
    if (notes && String(notes).length > 2000) {
      return NextResponse.json({ error: "Notes are too long." }, { status: 400 });
    }

    const slot = validateBookingSlot(date, time);
    if (!slot.ok) {
      return NextResponse.json({ error: slot.error }, { status: 400 });
    }

    const reserved = await reserveBookingSlot(slot.date, slot.time);
    if (!reserved.ok) {
      return NextResponse.json(
        {
          error:
            reserved.reason === "taken"
              ? "That time was just booked. Please choose another slot."
              : "That time slot is not available.",
        },
        { status: 409 },
      );
    }

    const safeName = String(name);
    const safeEmail = String(email);
    const slotLabel = formatBookingSlotLabel(slot.date, slot.time);
    const service = "Strategy Call";
    const message = [
      `Requested time: ${slotLabel}`,
      `Duration: ${BOOKING_DURATION_MINUTES} minutes`,
      notes ? `\nNotes:\n${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const attributionHtml = attributionEmailRows(attribution, emailRow);
    const attributionText = attributionTextLines(attribution);
    const rows = [
      emailRow("Name", safeName),
      emailRow("Email", safeEmail, true),
      emailRow("Service", service),
      emailRow("When", slotLabel),
      notes ? emailMessageRow(String(notes)) : "",
      attributionHtml,
    ].join("");

    // Same Cloudflare Email Service path as the contact form.
    const mail = await sendKinexisMail(
      {
        fromName: "KINEXIS Digital Contact",
        replyTo: safeEmail,
        subject: `New Inquiry from ${safeName} \u2014 ${service}`,
        title: "New Contact Form Submission",
        rows,
        footer: `Reply directly to this email to respond to ${safeName}.`,
        text: [
          "New Contact Form Submission \u2014 KINEXIS Digital",
          "",
          `Name: ${safeName}`,
          `Email: ${safeEmail}`,
          `Service Interest: ${service}`,
          `When: ${slotLabel}`,
          `\nMessage:\n${message}`,
          attributionText.length ? ["", "Attribution:", ...attributionText].join("\n") : "",
        ]
          .filter(Boolean)
          .join("\n"),
      },
      "Booking form",
    );

    if (!mail.ok) {
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 },
      );
    }

    if (!mail.sent && process.env.ENABLE_DEV_FORM_LOGGING === "1") {
      console.log("\n[DEV] Strategy call booking (no email sent):", {
        name: safeName,
        email: safeEmail,
        date: slot.date,
        time: slot.time,
        slotLabel,
        attribution,
      });
    }

    return NextResponse.json(
      { success: true, slotLabel, date: slot.date, time: slot.time },
      { status: 200 },
    );
  } catch (error) {
    console.error("Booking form error:", describeMailError(error));
    return NextResponse.json(
      { error: "Failed to book the call. Please try again." },
      { status: 500 },
    );
  }
}
