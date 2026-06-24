import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import {
  createMailTransporter,
  emailRow,
  getEmailCredentials,
  wrapKinexisEmailHtml,
} from "@/lib/email";
import { escapeHtml } from "@/lib/sanitize";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`lead:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, service, revenue, budget, goal, score, source, auditType } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const safeName = String(name);
    const safeEmail = String(email);
    const leadData = {
      name: safeName,
      email: safeEmail,
      service: service ? String(service) : auditType ? String(auditType) : "Not specified",
      revenue: revenue ? String(revenue) : "Not specified",
      budget: budget ? String(budget) : "Not specified",
      goal: goal ? String(goal) : "Not specified",
      score: score ? String(score) : "unscored",
      source: source ? String(source) : auditType ? "lead-magnet" : "website",
      capturedAt: new Date().toISOString(),
    };

    const creds = getEmailCredentials();
    const isDev = process.env.NODE_ENV === "development";

    if (!creds) {
      if (!isDev) {
        console.error("Lead capture: email credentials not configured");
        return NextResponse.json(
          { error: "Server configuration error. Please try again later." },
          { status: 500 },
        );
      }
      console.log("[DEV] Lead captured:", leadData);
      return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
    }

    const rows = [
      emailRow("Name", leadData.name),
      emailRow("Email", leadData.email, true),
      emailRow("Service", leadData.service),
      emailRow("Revenue", leadData.revenue),
      emailRow("Budget", leadData.budget),
      emailRow("Goal", leadData.goal),
      emailRow("Score", leadData.score),
      emailRow("Source", leadData.source),
    ].join("");

    const transporter = createMailTransporter(creds);

    await transporter.sendMail({
      from: `"KINEXIS Digital Leads" <${creds.gmailUser}>`,
      to: creds.toEmail,
      replyTo: leadData.email,
      subject: `New Lead: ${leadData.name}${leadData.service !== "Not specified" ? ` — ${leadData.service}` : ""} (Score: ${leadData.score})`,
      html: wrapKinexisEmailHtml(
        "New Lead Captured",
        rows,
        `Reply directly to this email to contact <strong style="color:#fff;">${escapeHtml(leadData.name)}</strong> at <a href="mailto:${escapeHtml(leadData.email)}" style="color:#00d4ff;">${escapeHtml(leadData.email)}</a>.`,
      ),
      text: `New Lead — KINEXIS Digital\n\nName: ${leadData.name}\nEmail: ${leadData.email}\nService: ${leadData.service}\nRevenue: ${leadData.revenue}\nBudget: ${leadData.budget}\nGoal: ${leadData.goal}\nScore: ${leadData.score}\nSource: ${leadData.source}\nCaptured: ${leadData.capturedAt}`,
    });

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
