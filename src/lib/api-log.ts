import "server-only";

/** Structured API error log without PII or secrets. */
export function logApiError(route: string, error: unknown) {
  const message = error instanceof Error ? error.message : "unknown";
  const name = error instanceof Error ? error.name : typeof error;
  console.error("API error", { route, name, message });
}
