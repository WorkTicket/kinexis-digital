import { hasAcceptedWebsiteConsent } from "@/lib/analytics/server-consent";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isQualifiedLead } from "@/lib/analytics/qualified-lead";
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
import { LEAD_LIMITS, LEAD_MESSAGES, normalizeEmail, normalizePhone, isValidEmail } from "@/lib/lead-validation";

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
      timeline,
      role,
      industry,
      websiteStatus,
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
      // `code: "spam"` lets clients show a friendly, retryable message instead
      // of a scary server error. Fast (but human) submits pass after a moment.
      return NextResponse.json(
        { error: "Please wait a moment and try again.", code: "spam" },
        { status: 400 },
      );
    }

    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: LEAD_MESSAGES.name, field: "name" }, { status: 400 });
    }
    const normalizedEmail = normalizeEmail(String(email ?? ""));
    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: LEAD_MESSAGES.email, field: "email" }, { status: 400 });
    }
    const normalizedPhone = phone ? normalizePhone(String(phone)) : null;
    if (phone && !normalizedPhone) {
      return NextResponse.json({ error: LEAD_MESSAGES.phone, field: "phone" }, { status: 400 });
    }

    if (String(name).length > LEAD_LIMITS.name) {
      return NextResponse.json({ error: "Name is too long.", field: "name" }, { status: 400 });
    }
    if (phone && String(phone).length > LEAD_LIMITS.phone) {
      return NextResponse.json({ error: "Phone number is too long.", field: "phone" }, { status: 400 });
    }
    if (website && String(website).length > LEAD_LIMITS.website) {
      return NextResponse.json({ error: "Website URL is too long.", field: "website" }, { status: 400 });
    }
    if (websiteRequired) {
      if (!website || !isWebsiteValue(String(website))) {
        return NextResponse.json(
          { error: "A valid website URL is required.", field: "website" },
          { status: 400 },
        );
      }
    } else if (website && String(website).trim() && !isWebsiteValue(String(website))) {
      return NextResponse.json(
        { error: "Enter a valid website URL.", field: "website" },
        { status: 400 },
      );
    }
    if (service && String(service).length > 200) {
      return NextResponse.json({ error: "Service value is too long.", field: "service" }, { status: 400 });
    }
    if (revenue && String(revenue).length > 50) {
      return NextResponse.json({ error: "Revenue value is too long.", field: "revenue" }, { status: 400 });
    }
    if (budget && String(budget).length > LEAD_LIMITS.budget) {
      return NextResponse.json({ error: "Budget value is too long.", field: "budget" }, { status: 400 });
    }
    if (need && String(need).length > 80) {
      return NextResponse.json({ error: "Need value is too long.", field: "need" }, { status: 400 });
    }
    if (timeline && String(timeline).length > LEAD_LIMITS.timeline) {
      return NextResponse.json({ error: "Timeline value is too long.", field: "timeline" }, { status: 400 });
    }
    if (role && String(role).length > LEAD_LIMITS.role) {
      return NextResponse.json({ error: "Role value is too long.", field: "role" }, { status: 400 });
    }
    if (industry && String(industry).length > LEAD_LIMITS.industry) {
      return NextResponse.json({ error: "Industry value is too long.", field: "industry" }, { status: 400 });
    }
    if (websiteStatus && String(websiteStatus).length > LEAD_LIMITS.websiteStatus) {
      return NextResponse.json(
        { error: "Website status is too long.", field: "websiteStatus" },
        { status: 400 },
      );
    }
    if (businessName && String(businessName).length > LEAD_LIMITS.businessName) {
      return NextResponse.json(
        { error: "Business name is too long.", field: "businessName" },
        { status: 400 },
      );
    }
    if (goal && String(goal).length > 1000) {
      return NextResponse.json({ error: "Goal is too long.", field: "goal" }, { status: 400 });
    }
    if (score && !/^\d{1,3}$/.test(String(score))) {
      return NextResponse.json({ error: "Invalid score value.", field: "score" }, { status: 400 });
    }
    if (source && !["website", "lead-magnet", "landing-page", "referral", "other"].includes(String(source))) {
      return NextResponse.json({ error: "Invalid source value.", field: "source" }, { status: 400 });
    }
    if (auditType && String(auditType).length > 100) {
      return NextResponse.json({ error: "Audit type value is too long.", field: "auditType" }, { status: 400 });
    }
    if (
      landingSlug &&
      !/^[a-z0-9-]{1,80}$/.test(String(landingSlug))
    ) {
      return NextResponse.json({ error: "Invalid landing page.", field: "landingSlug" }, { status: 400 });
    }

    const safeName = String(name).trim();
    const safeEmail = normalizedEmail;
    const safePhone = normalizedPhone ? normalizedPhone.e164 + (normalizedPhone.ext ? ` ext ${normalizedPhone.ext}` : "") : "";
    const safeWebsite = website ? String(website).trim() : "";
    const safeBusinessName = businessName ? String(businessName).trim() : "";
    const safeNeed = need ? String(need) : "";
    const safeBudget = budget ? String(budget) : "";
    const safeTimeline = timeline ? String(timeline) : "";
    const safeRole = role ? String(role) : "";
    const safeIndustry = industry ? String(industry) : "";
    const safeWebsiteStatus = websiteStatus ? String(websiteStatus) : "";
    const safeLandingSlug =
      landingSlug && /^[a-z0-9-]{1,80}$/.test(String(landingSlug))
        ? String(landingSlug)
        : "";
    const leadData = {
      name: safeName,
      businessName: safeBusinessName || "Not provided",
      email: safeEmail,
      phone: safePhone || "Not specified",
      website: safeWebsite || "Not provided",
      service: service ? String(service) : auditType ? String(auditType) : "Not specified",
      landingPage: safeLandingSlug || "Not specified",
      revenue: revenue ? String(revenue) : "Not specified",
      budget: budget ? String(budget) : "Not specified",
      need: safeNeed || "Not specified",
      timeline: safeTimeline || "Not specified",
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
      emailRow("Phone", safePhone || "Not provided"),
      // Budget and timeline sit near the top so they are seen before calling.
      emailRow("Budget", safeBudget || "Not provided"),
      emailRow("Timeline", safeTimeline || "Not provided"),
      emailRow("Business", safeBusinessName || "Not provided"),
      emailRow("Website", safeWebsite || "Not provided"),
      emailRow("Service", leadData.service),
      safeLandingSlug ? emailRow("Landing page", `/lp/${safeLandingSlug}`) : "",
      emailRow("Role", safeRole || "Not provided"),
      emailRow("Type of work", safeIndustry || "Not provided"),
      emailRow("Current website", safeWebsiteStatus || "Not provided"),
      emailRow("Revenue", leadData.revenue),
      emailRow("Need", safeNeed || "Not provided"),
      emailRow("Goal", leadData.goal),
      emailRow("Score", leadData.score),
      emailRow("Source", leadData.source),
      attributionHtml,
    ].join("");

    const mail = await sendKinexisMail(
      {
        fromName: "Kinexis Digital Leads",
        replyTo: leadData.email,
        subject: `New Lead: ${leadData.name}${safeLandingSlug ? ` \u2014 /lp/${safeLandingSlug}` : leadData.service !== "Not specified" ? ` \u2014 ${leadData.service}` : ""} (Score: ${leadData.score})`,
        title: "New Lead Captured",
        rows,
        footer: `Reply directly to this email to contact ${leadData.name} at ${leadData.email}.`,
        text: [
          `New Lead \u2014 Kinexis Digital`,
          "",
          `Name: ${leadData.name}`,
          `Email: ${leadData.email}`,
          `Phone: ${safePhone || "Not provided"}`,
          `Budget: ${safeBudget || "Not provided"}`,
          `Timeline: ${safeTimeline || "Not provided"}`,
          `Business: ${safeBusinessName || "Not provided"}`,
          `Website: ${safeWebsite || "Not provided"}`,
          `Service: ${leadData.service}`,
          safeLandingSlug ? `Landing page: /lp/${safeLandingSlug}` : "",
          `Role: ${safeRole || "Not provided"}`,
          `Type of work: ${safeIndustry || "Not provided"}`,
          `Current website: ${safeWebsiteStatus || "Not provided"}`,
          `Revenue: ${leadData.revenue}`,
          `Need: ${safeNeed || "Not provided"}`,
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

    const nameParts = safeName.trim().split(/\s+/);
    const cookies = new Map((request.headers.get("cookie") ?? "").split(";").map((cookie) => {
      const index = cookie.indexOf("=");
      return [cookie.slice(0, index).trim(), cookie.slice(index + 1).trim()];
    }));
    const metaInput = {
      eventName: "Lead",
      eventId: typeof metaEventId === "string" ? metaEventId : undefined,
      email: safeEmail,
      phone: safePhone || undefined,
      firstName: nameParts[0],
      lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined,
      fbp: cookies.get("_fbp") || attribution.fbp,
      fbc: cookies.get("_fbc") || attribution.fbc,
      fbclid: attribution.fbclid,
      clientIp: ip,
      userAgent: request.headers.get("user-agent") ?? undefined,
      eventSourceUrl:
        attribution.landing_page ||
        (safeLandingSlug ? `/lp/${safeLandingSlug}` : request.headers.get("referer") || request.url),
      contentName: safeLandingSlug || leadData.service,
      contentCategory: String(source) === "landing-page" ? "landing-page" : "lead",
      value: 0,
      currency: "USD",
    } as const;
    if (hasAcceptedWebsiteConsent(request)) await sendMetaCapiEvent(metaInput);
    if (isQualifiedLead(safeRole, safeBudget, safeTimeline, safeLandingSlug)) {
      if (hasAcceptedWebsiteConsent(request)) await sendMetaCapiEvent({
        ...metaInput,
        eventName: "QualifiedLead",
        eventId: `QualifiedLead.${randomUUID()}`,
      });
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Lead capture error:", describeMailError(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
