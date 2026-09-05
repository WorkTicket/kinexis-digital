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
import { sendMetaCapiEvent } from "@/lib/analytics/meta-capi";
import { isWebsiteValue } from "@/lib/website-url";

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
      businessName,
      email,
      phone,
      website,
      websiteRequired,
      service,
      revenue,
      budget,
      need,
      goal,
      score,
      source,
      auditType,
      landingSlug,
      metaEventId,
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
    if (websiteRequired) {
      if (!website || !isWebsiteValue(String(website))) {
        return NextResponse.json(
          { error: "A valid website URL is required." },
          { status: 400 },
        );
      }
    } else if (website && String(website).trim() && !isWebsiteValue(String(website))) {
      return NextResponse.json(
        { error: "Enter a valid website URL." },
        { status: 400 },
      );
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
    if (need && String(need).length > 80) {
      return NextResponse.json({ error: "Need value is too long." }, { status: 400 });
    }
    if (businessName && String(businessName).length > 200) {
      return NextResponse.json(
        { error: "Business name is too long." },
        { status: 400 },
      );
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
    if (
      landingSlug &&
      !/^[a-z0-9-]{1,80}$/.test(String(landingSlug))
    ) {
      return NextResponse.json({ error: "Invalid landing page." }, { status: 400 });
    }

    const safeName = String(name);
    const safeEmail = String(email);
    const safePhone = phone ? String(phone).trim() : "";
    const safeWebsite = website ? String(website).trim() : "";
    const safeBusinessName = businessName ? String(businessName).trim() : "";
    const safeNeed = need ? String(need) : "";
    const safeLandingSlug =
      landingSlug && /^[a-z0-9-]{1,80}$/.test(String(landingSlug))
        ? String(landingSlug)
        : "";
    const leadData = {
      name: safeName,
      businessName: safeBusinessName || "Not specified",
      email: safeEmail,
      phone: safePhone || "Not specified",
      website: safeWebsite || "Not specified",
      service: service ? String(service) : auditType ? String(auditType) : "Not specified",
      landingPage: safeLandingSlug || "Not specified",
      revenue: revenue ? String(revenue) : "Not specified",
      budget: budget ? String(budget) : "Not specified",
      need: safeNeed || "Not specified",
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
      safeBusinessName ? emailRow("Business", safeBusinessName) : "",
      safePhone ? emailRow("Phone", safePhone) : "",
      emailRow(
        "Website",
        safeWebsite ||
          (String(source) === "landing-page" ? "New site (no URL yet)" : "Not specified"),
      ),
      emailRow("Service", leadData.service),
      safeLandingSlug ? emailRow("Landing page", `/lp/${safeLandingSlug}`) : "",
      emailRow("Revenue", leadData.revenue),
      emailRow("Budget", leadData.budget),
      safeNeed ? emailRow("Need", safeNeed) : "",
      emailRow("Goal", leadData.goal),
      emailRow("Score", leadData.score),
      emailRow("Source", leadData.source),
      attributionHtml,
    ].join("");

    const mail = await sendKinexisMail(
      {
        fromName: "KINEXIS Digital Leads",
        replyTo: leadData.email,
        subject: `New Lead: ${leadData.name}${safeLandingSlug ? ` \u2014 /lp/${safeLandingSlug}` : leadData.service !== "Not specified" ? ` \u2014 ${leadData.service}` : ""} (Score: ${leadData.score})`,
        title: "New Lead Captured",
        rows,
        footer: `Reply directly to this email to contact ${leadData.name} at ${leadData.email}.`,
        text: [
          `New Lead \u2014 KINEXIS Digital`,
          "",
          `Name: ${leadData.name}`,
          `Email: ${leadData.email}`,
          safeBusinessName ? `Business: ${safeBusinessName}` : "",
          safePhone ? `Phone: ${safePhone}` : "",
          `Website: ${safeWebsite || (String(source) === "landing-page" ? "New site (no URL yet)" : "Not specified")}`,
          `Service: ${leadData.service}`,
          safeLandingSlug ? `Landing page: /lp/${safeLandingSlug}` : "",
          `Revenue: ${leadData.revenue}`,
          `Budget: ${leadData.budget}`,
          safeNeed ? `Need: ${safeNeed}` : "",
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

    await sendMetaCapiEvent({
      eventName: "Lead",
      eventId: typeof metaEventId === "string" ? metaEventId : undefined,
      email: safeEmail,
      phone: safePhone || undefined,
      fbp: attribution.fbp,
      fbc: attribution.fbc,
      fbclid: attribution.fbclid,
      clientIp: ip,
      userAgent: request.headers.get("user-agent") ?? undefined,
      eventSourceUrl: attribution.landing_page,
      contentName: safeLandingSlug || leadData.service,
      contentCategory: String(source) === "landing-page" ? "landing-page" : "lead",
    });

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Lead capture error:", describeMailError(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
