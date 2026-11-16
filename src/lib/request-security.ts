import "server-only";

const NO_STORE = { "Cache-Control": "no-store" } as const;

export function privateJson(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", NO_STORE["Cache-Control"]);
  return Response.json(body, { ...init, headers });
}

/**
 * Same-site guard for first-party POSTs (contact, RUM, etc.).
 *
 * Prefer the browser Origin against both `request.url` and the `Host` header.
 * Next may rewrite `request.url` to `localhost` while Chromium still sends
 * `Origin: http://127.0.0.1:…` (and the reverse). That mismatch 403'd
 * `sendBeacon(/api/rum)` and failed Lighthouse `errors-in-console` / BP ~0.96
 * on ~20% sampled page views. `Sec-Fetch-Site: cross-site` stays a hard deny.
 */
export function rejectCrossSite(request: Request): Response | null {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return privateJson({ error: "Cross-site requests are not allowed." }, { status: 403 });
  }

  const origin = request.headers.get("origin");
  if (!origin) return null;
  try {
    const originUrl = new URL(origin);
    if (originUrl.origin === new URL(request.url).origin) return null;
    // Match Origin to the Host the client actually used (port included).
    const host = request.headers.get("host")?.trim();
    if (host && `${originUrl.protocol}//${host}` === originUrl.origin) return null;
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

/** Approximate FormData payload size after parse (files by byte size, fields by string length). */
export function formDataByteLength(form: FormData) {
  let total = 0;
  for (const [key, value] of form.entries()) {
    total += key.length;
    if (value instanceof File) total += value.size;
    else total += String(value).length;
  }
  return total;
}

/** Approximate JSON body size after parse. */
export function jsonByteLength(value: unknown) {
  try {
    return new TextEncoder().encode(JSON.stringify(value)).byteLength;
  } catch {
    return Number.POSITIVE_INFINITY;
  }
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

/** MIME values allowed for a given extension (empty type is ok if magic matches). */
const EXTENSION_MIME: Record<string, ReadonlySet<string>> = {
  ".pdf": new Set(["application/pdf"]),
  ".doc": new Set(["application/msword", "application/octet-stream"]),
  ".docx": new Set([
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
    "application/octet-stream",
  ]),
  ".txt": new Set(["text/plain", "application/octet-stream"]),
  ".jpg": new Set(["image/jpeg"]),
  ".jpeg": new Set(["image/jpeg"]),
  ".png": new Set(["image/png"]),
  ".webp": new Set(["image/webp"]),
  ".gif": new Set(["image/gif"]),
  ".heic": new Set(["image/heic", "image/heif", "application/octet-stream"]),
  ".heif": new Set(["image/heif", "image/heic", "application/octet-stream"]),
};

function startsWith(bytes: Uint8Array, sig: number[], offset = 0) {
  if (bytes.length < offset + sig.length) return false;
  return sig.every((b, i) => bytes[offset + i] === b);
}

function asciiAt(bytes: Uint8Array, offset: number, text: string) {
  if (bytes.length < offset + text.length) return false;
  for (let i = 0; i < text.length; i++) {
    if (bytes[offset + i] !== text.charCodeAt(i)) return false;
  }
  return true;
}

/** Detect content family from magic bytes. */
export function detectAttachmentKind(bytes: Uint8Array):
  | "pdf"
  | "jpeg"
  | "png"
  | "gif"
  | "webp"
  | "heic"
  | "docx"
  | "doc"
  | "txt"
  | null {
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46])) return "pdf"; // %PDF
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "jpeg";
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  if (startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x37, 0x61]) || startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x39, 0x61])) {
    return "gif";
  }
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && asciiAt(bytes, 8, "WEBP")) return "webp";
  // ISO BMFF (HEIC/HEIF): ....ftyp + brand
  if (bytes.length >= 12 && asciiAt(bytes, 4, "ftyp")) {
    const brand = String.fromCharCode(...bytes.slice(8, 12)).toLowerCase();
    if (["heic", "heix", "hevc", "hevx", "mif1", "msf1", "heif"].includes(brand)) return "heic";
  }
  // ZIP container (DOCX)
  if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]) || startsWith(bytes, [0x50, 0x4b, 0x05, 0x06])) return "docx";
  // OLE Compound File (legacy .doc)
  if (startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) return "doc";
  // Plain text: no NUL in the first chunk and mostly printable / whitespace
  if (bytes.length > 0) {
    let suspicious = 0;
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      if (b === 0) return null;
      const printable = b === 0x09 || b === 0x0a || b === 0x0d || (b >= 0x20 && b <= 0x7e) || b >= 0x80;
      if (!printable) suspicious += 1;
    }
    if (suspicious / bytes.length <= 0.05) return "txt";
  }
  return null;
}

const KIND_EXTENSIONS: Record<NonNullable<ReturnType<typeof detectAttachmentKind>>, ReadonlySet<string>> = {
  pdf: new Set([".pdf"]),
  jpeg: new Set([".jpg", ".jpeg"]),
  png: new Set([".png"]),
  gif: new Set([".gif"]),
  webp: new Set([".webp"]),
  heic: new Set([".heic", ".heif"]),
  docx: new Set([".docx"]),
  doc: new Set([".doc"]),
  txt: new Set([".txt"]),
};

/**
 * Attachments must pass extension allowlist, magic-byte kind, and MIME agreement.
 * MIME alone or extension alone is not enough (SEC-03).
 */
export async function attachmentAllowed(file: File): Promise<boolean> {
  const name = file.name.toLowerCase();
  const extension = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  if (!extension || !ATTACHMENT_EXTENSIONS.has(extension)) return false;

  const type = (file.type || "").toLowerCase();
  if (type) {
    if (!ATTACHMENT_TYPES.has(type)) return false;
    const allowedForExt = EXTENSION_MIME[extension];
    if (!allowedForExt?.has(type)) return false;
  }

  const head = new Uint8Array(await file.slice(0, 64).arrayBuffer());
  if (head.byteLength === 0) return false;
  const kind = detectAttachmentKind(head);
  if (!kind) return false;
  if (!KIND_EXTENSIONS[kind].has(extension)) return false;
  return true;
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
    if (host === "169.254.169.254" || host === "metadata.google.internal") return false;
    if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.|169\.254\.)/.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}
