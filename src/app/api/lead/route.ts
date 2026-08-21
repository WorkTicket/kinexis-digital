import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import {
  describeMailError,
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
    if (await isRateLimited(`lead:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      website,
      service,
      revenue,
      budget,
      goal,
      score,
      source,
      auditType,
      _hp,
      _ts,
    } = body;
    const attribution = sanitizeAttributionFromBody(body);

    const honeypot = validateHoneypot(
      { _hp },
      typeof _ts === "number" ? _ts : undefined,
    );
    if (honeypot.blocked) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(String(email))) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (String(name).length > 200) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (phone && String(phone).length > 50) {
      return NextResponse.json({ error: "Phone number is too long." }, { status: 400 });
    }
    if (website && String(website).length > 500) {
      return NextResponse.json({ error: "Website URL is too long." }, { status: 400 });
    }
    if (service && String(service).length > 200) {
      return NextResponse.json({ error: "Service value is too long." }, { status: 400 });
    }
    if (revenue && String(revenue).length > 50) {
      return NextResponse.json({ error: "Revenue value is too long." }, { status: 400 });
    }
    if (budget && String(budget).length > 50) {
      return NextResponse.json({ error: "Budget value is too long." }, { status: 400 });
    }
    if (goal && String(goal).length > 1000) {
      return NextResponse.json({ error: "Goal is too long." }, { status: 400 });
    }
    if (score && !/^\d{1,3}$/.test(String(score))) {
      return NextResponse.json({ error: "Invalid score value." }, { status: 400 });
    }
    if (source && !["website", "lead-magnet", "landing-page", "referral", "other"].includes(String(source))) {
      return NextResponse.json({ error: "Invalid source value." }, { status: 400 });
    }
    if (auditType && String(auditType).length > 100) {
      return NextResponse.json({ error: "Audit type value is too long." }, { status: 400 });
    }

    const safeName = String(name);
    const safeEmail = String(email);
    const safePhone = phone ? String(phone).trim() : "";
    const safeWebsite = website ? String(website).trim() : "";
    const leadData = {
      name: safeName,
      email: safeEmail,
      phone: safePhone || "Not specified",
      website: safeWebsite || "Not specified",
      service: service ? String(service) : auditType ? String(auditType) : "Not specified",
      revenue: revenue ? String(revenue) : "Not specified",
      budget: budget ? String(budget) : "Not specified",
      goal: goal ? String(goal) : "Not specified",
      score: score ? String(score) : "unscored",
      source: source ? String(source) : auditType ? "lead-magnet" : "website",
      capturedAt: new Date().toISOString(),
    };

    const attributionHtml = attributionEmailRows(attribution, emailRow);
    const attributionText = attributionTextLines(attribution);
    const rows = [
      emailRow("Name", leadData.name),
      emailRow("Email", leadData.email, true),
      safePhone ? emailRow("Phone", safePhone) : "",
      safeWebsite ? emailRow("Website", safeWebsite) : "",
      emailRow("Service", leadData.service),
      emailRow("Revenue", leadData.revenue),
      emailRow("Budget", leadData.budget),
      emailRow("Goal", leadData.goal),
      emailRow("Score", leadData.score),
      emailRow("Source", leadData.source),
      attributionHtml,
    ].join("");

    const mail = await sendKinexisMail(
      {
        fromName: "KINEXIS Digital Leads",
        replyTo: leadData.email,
        subject: `New Lead: ${leadData.name}${leadData.service !== "Not specified" ? ` \u2014 ${leadData.service}` : ""} (Score: ${leadData.score})`,
        title: "New Lead Captured",
        rows,
        footer: `Reply directly to this email to contact ${leadData.name} at ${leadData.email}.`,
        text: [
          `New Lead \u2014 KINEXIS Digital`,
          "",
          `Name: ${leadData.name}`,
          `Email: ${leadData.email}`,
          safePhone ? `Phone: ${safePhone}` : "",
          safeWebsite ? `Website: ${safeWebsite}` : "",
          `Service: ${leadData.service}`,
          `Revenue: ${leadData.revenue}`,
          `Budget: ${leadData.budget}`,
          `Goal: ${leadData.goal}`,
          `Score: ${leadData.score}`,
          `Source: ${leadData.source}`,
          `Captured: ${leadData.capturedAt}`,
          ...(attributionText.length ? ["", "Attribution:", ...attributionText] : []),
        ]
          .filter(Boolean)
          .join("\n"),
      },
      "Lead capture",
    );

    if (!mail.ok) {
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 },
      );
    }

    if (!mail.sent && process.env.ENABLE_DEV_FORM_LOGGING === "1") {
      console.log("[DEV] Lead captured:", { ...leadData, attribution });
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Lead capture error:", describeMailError(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
