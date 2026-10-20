import { hasAcceptedWebsiteConsent } from "@/lib/analytics/server-consent";
import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { validateOrigin } from "@/lib/csrf";
import { sanitizeAttributionFromBody } from "@/lib/analytics/click-ids";
import {
  sanitizeMetaEventId,
  sendMetaCapiEvent,
} from "@/lib/analytics/meta-capi";

/**
 * Server half of the Meta Contact event for phone / call-link taps.
 * The browser fires fbq('track','Contact',{},{eventID}) with the same id, so
 * Events Manager counts it once (Browser + Server, deduplicated). Never Lead.
 * Failure to reach Meta must never surface to the visitor.
 */
export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (await isRateLimited(`meta-contact:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;
    const eventId = sanitizeMetaEventId(body.metaEventId);
    if (!eventId || !eventId.startsWith("Contact.")) {
      return NextResponse.json({ error: "Invalid event id." }, { status: 400 });
    }

    const attribution = sanitizeAttributionFromBody(body);
    const cookies = new Map(
      (request.headers.get("cookie") ?? "").split(";").map((cookie) => {
        const index = cookie.indexOf("=");
        return [cookie.slice(0, index).trim(), cookie.slice(index + 1).trim()];
      }),
    );

    if (hasAcceptedWebsiteConsent(request)) await sendMetaCapiEvent({
      eventName: "Contact",
      eventId,
      fbp: cookies.get("_fbp") || attribution.fbp,
      fbc: cookies.get("_fbc") || attribution.fbc,
      fbclid: attribution.fbclid,
      clientIp: ip,
      userAgent: request.headers.get("user-agent") ?? undefined,
      eventSourceUrl:
        attribution.landing_page ||
        request.headers.get("referer") ||
        request.url,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    // A tracking failure must never block the call tap.
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
