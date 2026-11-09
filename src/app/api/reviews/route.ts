import { SITE } from "@/lib/site";
import { REVIEW_QUOTE_MAX, REVIEW_QUOTE_MIN } from "@/lib/review-limits";
import { clientIp } from "@/lib/client-ip";
import {
  EMAIL_PATTERN,
  contactEmailBinding,
  contactRecipients,
} from "@/lib/contact-mail";
import { isRateLimited } from "@/lib/rate-limit";
import { moderationLinks, queueSiteReview } from "@/lib/site-reviews";
import { hasContentType, privateJson, rejectCrossSite, rejectOversize } from "@/lib/request-security";

const MAX_REQUEST = 32_000;

function visitorError(message: string, status: number) {
  return privateJson({ error: message }, { status });
}

async function notifyTeam(review: {
  name: string;
  email: string;
  stars: number;
  quote: string;
  approve: string;
  reject: string;
}) {
  try {
    const mail = contactEmailBinding();
    if (!mail) return;
    await mail.send({
      from: { email: SITE.email, name: SITE.name },
      to: contactRecipients(),
      replyTo: { email: review.email, name: review.name },
      subject: `Review pending approval from ${review.name}`,
      text: [
        `Name: ${review.name}`,
        `Email: ${review.email}`,
        `Stars: ${review.stars}/5`,
        "",
        review.quote,
        "",
        `Approve: ${review.approve}`,
        `Reject: ${review.reject}`,
      ].join("\n"),
      attachments: [],
    });
  } catch {
    // Notification is best-effort; the review is already queued.
  }
}

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request) || rejectOversize(request, MAX_REQUEST);
  if (rejected) return rejected;
  if (!hasContentType(request, "multipart/form-data") && !hasContentType(request, "application/x-www-form-urlencoded")) {
    return visitorError("That form could not be read. Please try again.", 415);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return visitorError("That form could not be read. Please try again.", 400);
  }

  if (String(form.get("_gotcha") ?? "").trim()) return privateJson({ ok: true });

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const quote = String(form.get("quote") ?? "").trim();
  const starsRaw = Number(String(form.get("stars") ?? "").trim());
  const stars = Number.isFinite(starsRaw) ? Math.round(starsRaw) : 0;

  if (!name || name.length > 80) return visitorError("Please add your name.", 400);
  if (!email || email.length > 200 || !EMAIL_PATTERN.test(email)) {
    return visitorError("Please add a valid email.", 400);
  }
  if (!quote || quote.length < REVIEW_QUOTE_MIN || quote.length > REVIEW_QUOTE_MAX) {
    return visitorError(`Please keep your review between ${REVIEW_QUOTE_MIN} and ${REVIEW_QUOTE_MAX} characters.`, 400);
  }
  if (stars < 1 || stars > 5) return visitorError("Please choose a star rating.", 400);

  const ip = clientIp(request);
  if (await isRateLimited("review", ip, 3600)) {
    return visitorError("Please wait a bit before posting another review.", 429);
  }

  const saved = await queueSiteReview({
    name: name.replace(/[\r\n]+/g, " ").slice(0, 80),
    email,
    quote: quote.replace(/\s+/g, " ").trim(),
    stars,
  });
  if (!saved) {
    return visitorError("Reviews are temporarily unavailable. Please try Trustpilot, or try again later.", 503);
  }

  const links = moderationLinks(saved, new URL(request.url).origin);
  void notifyTeam({
    name: saved.name,
    email,
    stars: saved.stars,
    quote: saved.quote,
    approve: links.approve,
    reject: links.reject,
  });

  return privateJson({ ok: true, pending: true });
}
