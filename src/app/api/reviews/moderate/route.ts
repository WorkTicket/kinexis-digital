import { approvePendingReview, rejectPendingReview } from "@/lib/site-reviews";
import { privateJson } from "@/lib/request-security";
import { revalidatePath } from "next/cache";

function resultPage(title: string, message: string, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>body{font-family:system-ui,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1.25rem;line-height:1.5;color:#0b1f3a}a{color:#e85d04}</style></head>
<body><h1>${title}</h1><p>${message}</p><p><a href="/reviews">Back to reviews</a></p></body></html>`;
  return new Response(html, {
    status,
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action")?.trim();
  const id = url.searchParams.get("id")?.trim() ?? "";
  const key = url.searchParams.get("key")?.trim() ?? "";

  if ((action !== "approve" && action !== "reject") || !id || !key) {
    return resultPage("Invalid link", "That moderation link is incomplete.", 400);
  }

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
}
