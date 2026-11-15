/**
 * Deep-clone JSON and strip Conferbot visitor fields that must never be stored or logged.
 * Drops: visitor.ip, visitor.location (entire object), visitor.isp, visitor.device.userAgent.
 */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function redactVisitor(visitor: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = { ...visitor };
  delete next.ip;
  delete next.location;
  delete next.isp;
  if (isPlainObject(next.device)) {
    const device = { ...next.device };
    delete device.userAgent;
    next.device = device;
  }
  return next;
}

function walk(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(walk);
  if (!isPlainObject(value)) return value;
  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === "visitor" && isPlainObject(child)) {
      out[key] = redactVisitor(child);
      continue;
    }
    out[key] = walk(child);
  }
  return out;
}

/** Returns a deep-cloned redacted structure safe to persist or log (still may contain lead PII). */
export function redactConferbotPayload<T = unknown>(payload: T): T {
  try {
    const cloned = JSON.parse(JSON.stringify(payload)) as unknown;
    return walk(cloned) as T;
  } catch {
    return payload;
  }
}
