/**
 * First-party RUM payload validation (no PII, no third-party SDK).
 * Metrics are logged by /api/rum for Workers Observability — no paid APM.
 */

export const RUM_MAX_BYTES = 2 * 1024;

export type RumMetricName = "LCP" | "INP" | "CLS" | "TTFB" | "FCP";

export type RumMetric = {
  name: RumMetricName;
  value: number;
  id: string;
  navigationType?: string;
};

export type RumPayload = {
  path: string;
  metrics: RumMetric[];
  sample?: number;
};

const NAMES = new Set<RumMetricName>(["LCP", "INP", "CLS", "TTFB", "FCP"]);

function isMetricName(value: unknown): value is RumMetricName {
  return typeof value === "string" && NAMES.has(value as RumMetricName);
}

/** Path only — no query string, no host. */
export function sanitizeRumPath(raw: unknown): string | null {
  if (typeof raw !== "string" || raw.length < 1 || raw.length > 200) return null;
  if (!raw.startsWith("/")) return null;
  if (raw.includes("?") || raw.includes("#") || raw.includes("\\") || raw.includes("//")) return null;
  if (!/^\/[A-Za-z0-9\-._/~%]*$/.test(raw)) return null;
  return raw;
}

export function parseRumPayload(body: unknown): RumPayload | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const path = sanitizeRumPath(record.path);
  if (!path) return null;
  if (!Array.isArray(record.metrics) || record.metrics.length < 1 || record.metrics.length > 8) {
    return null;
  }
  const metrics: RumMetric[] = [];
  for (const item of record.metrics) {
    if (!item || typeof item !== "object") return null;
    const m = item as Record<string, unknown>;
    if (!isMetricName(m.name)) return null;
    if (typeof m.value !== "number" || !Number.isFinite(m.value) || m.value < 0 || m.value > 1e7) {
      return null;
    }
    if (typeof m.id !== "string" || m.id.length < 1 || m.id.length > 64) return null;
    const metric: RumMetric = { name: m.name, value: m.value, id: m.id };
    if (typeof m.navigationType === "string" && m.navigationType.length <= 32) {
      metric.navigationType = m.navigationType;
    }
    metrics.push(metric);
  }
  const sample =
    typeof record.sample === "number" && Number.isFinite(record.sample) && record.sample >= 0 && record.sample <= 1
      ? record.sample
      : undefined;
  return sample === undefined ? { path, metrics } : { path, metrics, sample };
}
