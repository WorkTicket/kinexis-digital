import { NextResponse } from "next/server";
import { describeMailError, sendKinexisMail } from "@/lib/email";
import { validateOrigin } from "@/lib/csrf";
import { validateHoneypot } from "@/lib/honeypot";
import { formatIntakeMail, parseIntakeAnswers } from "@/lib/intake-submission";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (await isRateLimited(`intake:${ip}`)) {
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

    const serialized = JSON.stringify(body?.answers ?? null);
    if (serialized.length > 100_000) {
      return NextResponse.json(
        { error: "This questionnaire is too long to send. Shorten a few answers and try again." },
        { status: 400 },
      );
    }

    const parsed = parseIntakeAnswers(body?.answers);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const mailBody = formatIntakeMail(parsed.submission);
    const mail = await sendKinexisMail(
      {
        fromName: "KINEXIS Digital Intake",
        replyTo: parsed.submission.email,
        subject: mailBody.subject,
        title: "Website Intake Questionnaire",
        rows: mailBody.rows,
        text: mailBody.text,
        footer: `Reply directly to this email to reach ${parsed.submission.contactName} at ${parsed.submission.email}.`,
      },
      "Client intake",
    );

    if (!mail.ok) {
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 },
      );
    }

    if (!mail.sent && process.env.ENABLE_DEV_FORM_LOGGING === "1") {
      console.log("[DEV] Intake questionnaire received:", {
        company: parsed.submission.companyName,
        email: parsed.submission.email,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Intake form error:", describeMailError(error));
    return NextResponse.json(
      { error: "Failed to send the questionnaire. Please try again." },
      { status: 500 },
    );
  }
}
