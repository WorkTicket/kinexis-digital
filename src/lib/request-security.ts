import "server-only";

const NO_STORE = { "Cache-Control": "no-store" } as const;

export function privateJson(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", NO_STORE["Cache-Control"]);
  return Response.json(body, { ...init, headers });
}

export function rejectCrossSite(request: Request): Response | null {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return privateJson({ error: "Cross-site requests are not allowed." }, { status: 403 });
  }

  const origin = request.headers.get("origin");
  if (!origin) return null;
  try {
    if (new URL(origin).origin === new URL(request.url).origin) return null;
  } catch {
    // Invalid origins are rejected below.
  }
  return privateJson({ error: "Cross-site requests are not allowed." }, { status: 403 });
}

export function rejectOversize(request: Request, maximum: number): Response | null {
  const value = request.headers.get("content-length");
  if (!value) return null;
  if (!/^\d+$/.test(value) || Number(value) > maximum) {
    return privateJson({ error: "That request is too large." }, { status: 413 });
  }
  return null;
}

export function hasContentType(request: Request, expected: string) {
  return request.headers.get("content-type")?.toLowerCase().startsWith(expected) ?? false;
}
