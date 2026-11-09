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

/** After reading the body, enforce a byte budget (Content-Length can be omitted). */
export function rejectReadOversize(byteLength: number, maximum: number): Response | null {
  if (byteLength > maximum) {
    return privateJson({ error: "That request is too large." }, { status: 413 });
  }
  return null;
}

export function hasContentType(request: Request, expected: string) {
  return request.headers.get("content-type")?.toLowerCase().startsWith(expected) ?? false;
}

const ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/gif",
]);

const ATTACHMENT_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
  ".gif",
]);

export function attachmentAllowed(file: File): boolean {
  const name = file.name.toLowerCase();
  const extension = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const type = (file.type || "").toLowerCase();
  if (type && ATTACHMENT_TYPES.has(type)) return true;
  if (extension && ATTACHMENT_EXTENSIONS.has(extension)) return true;
  return false;
}

/** Digits-only length for phone fields; allows common punctuation in the raw value. */
export function phoneLooksValid(phone: string, { minDigits = 7, maxChars = 40 } = {}) {
  if (phone.length > maxChars) return false;
  if (!/^[+\d().\-\s]+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= minDigits && digits.length <= 15;
}

/** FORM_ENDPOINT must be https and not point at localhost/private hosts. */
export function formEndpointAllowed(endpoint: string): boolean {
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".local") || host === "127.0.0.1" || host === "::1") return false;
    if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}
