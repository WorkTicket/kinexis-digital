import { approvePendingReview, rejectPendingReview } from "@/lib/site-reviews";
import { clientIp } from "@/lib/client-ip";
import { isRateLimited } from "@/lib/rate-limit";
import { privateJson } from "@/lib/request-security";
import { logApiError } from "@/lib/api-log";
import { revalidatePath } from "next/cache";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resultPage(title: string, message: string, status = 200) {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${safeTitle}</title>
<style>body{font-family:system-ui,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1.25rem;line-height:1.5;color:#0b1f3a}a{color:#e85d04}button,.btn{appearance:none;font:inherit;font-weight:700;cursor:pointer;border:0;border-radius:10px;padding:.85rem 1.25rem;background:#ff6a00;color:#031b4e}form{margin:1.5rem 0}</style></head>
<body><h1>${safeTitle}</h1><p>${safeMessage}</p><p><a href="/reviews">Back to reviews</a></p></body></html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function confirmPage(action: "approve" | "reject", id: string, key: string) {
  const verb = action === "approve" ? "Publish this review" : "Reject this review";
  const detail = action === "approve"
    ? "This posts the review live on the site. Email link previews will not publish it until you confirm."
    : "This discards the pending review. Email link previews will not reject it until you confirm.";
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(verb)}</title>
<style>body{font-family:system-ui,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1.25rem;line-height:1.5;color:#0b1f3a}a{color:#e85d04}button{appearance:none;font:inherit;font-weight:700;cursor:pointer;border:0;border-radius:10px;padding:.85rem 1.25rem;background:#ff6a00;color:#031b4e}form{margin:1.5rem 0}</style></head>
<body>
<h1>${escapeHtml(verb)}?</h1>
<p>${escapeHtml(detail)}</p>
<form method="post" action="/api/reviews/moderate">
  <input type="hidden" name="action" value="${escapeHtml(action)}">
  <input type="hidden" name="id" value="${escapeHtml(id)}">
  <input type="hidden" name="key" value="${escapeHtml(key)}">
  <button type="submit">${escapeHtml(verb)}</button>
</form>
<p><a href="/reviews">Cancel</a></p>
</body></html>`;
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function revalidateReviewPaths() {
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/es");
  revalidatePath("/es/reviews");
  revalidatePath("/es-es");
  revalidatePath("/es-es/reviews");
}

async function applyModeration(action: "approve" | "reject", id: string, key: string) {
  try {
    const outcome = action === "approve"
      ? await approvePendingReview(id, key)
      : await rejectPendingReview(id, key);

    if (outcome === "ok") {
      if (action === "approve") revalidateReviewPaths();
      return resultPage(
        action === "approve" ? "Review published" : "Review rejected",
        action === "approve"
          ? "The review is now live on the site."
          : "The pending review was discarded.",
      );
    }
    if (outcome === "missing") {
      return resultPage("Already handled", "That review is no longer pending. It may already have been approved or rejected.", 404);
    }
    if (outcome === "bad-key") {
      return resultPage("Invalid key", "That moderation link is not valid.", 403);
    }
    return privateJson({ error: "Reviews are temporarily unavailable." }, { status: 503 });
  } catch (error) {
    logApiError("reviews/moderate", error);
    return privateJson({ error: "Reviews are temporarily unavailable." }, { status: 503 });
  }
}

/** GET only shows a confirm step — mail scanners prefetching links must not mutate state. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action")?.trim();
  const id = url.searchParams.get("id")?.trim() ?? "";
  const key = url.searchParams.get("key")?.trim() ?? "";

  if ((action !== "approve" && action !== "reject") || !id || !key) {
    return resultPage("Invalid link", "That moderation link is incomplete.", 400);
  }

  return confirmPage(action, id, key);
}

export async function POST(request: Request) {
  if (await isRateLimited("review-moderate", clientIp(request), 60)) {
    return resultPage("Too many attempts", "Please wait a moment before trying again.", 429);
  }

  let action = "";
  let id = "";
  let key = "";
  try {
    const form = await request.formData();
    action = String(form.get("action") ?? "").trim();
    id = String(form.get("id") ?? "").trim();
    key = String(form.get("key") ?? "").trim();
  } catch (error) {
    logApiError("reviews/moderate", error);
    return resultPage("Invalid request", "That moderation form could not be read.", 400);
  }

  if ((action !== "approve" && action !== "reject") || !id || !key) {
    return resultPage("Invalid link", "That moderation link is incomplete.", 400);
  }

  return applyModeration(action, id, key);
}
