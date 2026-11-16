import { clientIp } from "@/lib/client-ip";
import { isRateLimited } from "@/lib/rate-limit";
import {
  hasContentType,
  privateJson,
  rejectCrossSite,
  rejectOversize,
  rejectReadOversize,
} from "@/lib/request-security";
import { parseRumPayload, RUM_MAX_BYTES } from "@/lib/rum";

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request) || rejectOversize(request, RUM_MAX_BYTES);
  if (rejected) return rejected;
  if (!hasContentType(request, "application/json")) {
    return privateJson({ error: "unsupported" }, { status: 415 });
  }

  if (await isRateLimited("rum", clientIp(request), 60, 40)) {
    return privateJson({ error: "rate" }, { status: 429 });
  }

  let json: unknown;
  try {
    const text = await request.text();
    const over = rejectReadOversize(new TextEncoder().encode(text).byteLength, RUM_MAX_BYTES);
    if (over) return over;
    json = JSON.parse(text) as unknown;
  } catch {
    return privateJson({ error: "invalid" }, { status: 400 });
  }

  const payload = parseRumPayload(json);
  if (!payload) return privateJson({ error: "invalid" }, { status: 400 });

  // Structured log only — Cloudflare Workers Observability (free tier). No PII.
  console.info("rum_metric", {
    kind: "rum",
    path: payload.path,
    sample: payload.sample ?? null,
    metrics: payload.metrics.map((m) => ({
      name: m.name,
      value: Math.round(m.value * 1000) / 1000,
      id: m.id,
      navigationType: m.navigationType ?? null,
    })),
  });

  return privateJson({ ok: true });
}

export async function GET() {
  return privateJson({ error: "method" }, { status: 405 });
}
