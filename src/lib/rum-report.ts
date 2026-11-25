import type { Metric } from "web-vitals";

export type RumMetricRecord = {
  name: Metric["name"];
  value: number;
  id: string;
  navigationType: string;
  path: string;
};

/** Map a web-vitals result to the endpoint's privacy-minimized route/metric fields. */
export function toRumMetricRecord(metric: Metric, fallbackPath: string, origin: string): RumMetricRecord | null {
  if (!Number.isFinite(metric.value) || metric.value < 0 || typeof metric.id !== "string" || !metric.id) {
    return null;
  }
  let path = fallbackPath;
  if (metric.navigationURL) {
    try {
      const url = new URL(metric.navigationURL, origin);
      if (url.origin === origin) path = url.pathname;
    } catch {
      // Keep the caller's route when the library omits or malformed the navigation URL.
    }
  }
  if (!path.startsWith("/") || path.includes("?") || path.includes("#") || path.includes("\\")) return null;
  return {
    name: metric.name,
    value: metric.value,
    id: metric.id.slice(0, 64),
    navigationType: metric.navigationType,
    path: path.slice(0, 200),
  };
}
