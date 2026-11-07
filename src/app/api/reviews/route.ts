import { SITE } from "@/lib/site";
import { REVIEW_QUOTE_MAX, REVIEW_QUOTE_MIN } from "@/lib/review-limits";
import { addSiteReview, reviewRateLimited } from "@/lib/site-reviews";
import { hasContentType, privateJson, rejectCrossSite, rejectOversize } from "@/lib/request-security";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { revalidatePath } from "next/cache";

const MAX_REQUEST = 32_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactEmailBinding = {
  send(message: {
    from: { email: string; name: string };
    to: string[];
    replyTo: { email: string; name: string };
    subject: string;
    text: string;
    attachments: Array<{
      filename: string;
      content: ArrayBuffer;
      type: string;
      disposition: "attachment";
    }>;
  }): Promise<unknown>;
};

function visitorError(message: string, status: number) {
  return privateJson({ error: message }, { status });
}

function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    ""
  );
}

function contactRecipients() {
  const configured = process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || SITE.email;
  const recipients = configured
    .split(/[;,]/)
    .map((address) => address.trim().toLowerCase())
    .filter((address, index, all) => EMAIL_PATTERN.test(address) && all.indexOf(address) === index);
  return recipients.length > 0 ? recipients : [SITE.email];
}

async function notifyTeam(review: { name: string; email: string; stars: number; quote: string }) {
  try {
    const env = getCloudflareContext().env as CloudflareEnv & { CONTACT_EMAIL?: ContactEmailBinding };
    const mail = env.CONTACT_EMAIL;
    if (!mail) return;
    await mail.send({
      from: { email: SITE.email, name: SITE.name },
      to: contactRecipients(),
      replyTo: { email: review.email, name: review.name },
      subject: `New website review from ${review.name}`,
      text: [`Name: ${review.name}`, `Email: ${review.email}`, `Stars: ${review.stars}/5`, "", review.quote].join("\n"),
      attachments: [],
    });
  } catch {
    // Notification is best-effort; the review is already saved.
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
  if (await reviewRateLimited(ip)) {
    return visitorError("Please wait a bit before posting another review.", 429);
  }

  const saved = await addSiteReview({
    name: name.replace(/[\r\n]+/g, " ").slice(0, 80),
    quote: quote.replace(/\s+/g, " ").trim(),
    stars,
  });
  if (!saved) {
    return visitorError("Reviews are temporarily unavailable. Please try Trustpilot, or try again later.", 503);
  }

  void notifyTeam({ name: saved.name, email, stars: saved.stars, quote: saved.quote });

  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/es");
  revalidatePath("/es/reviews");
  revalidatePath("/es-es");
  revalidatePath("/es-es/reviews");

  return privateJson({ ok: true, review: saved });
}
