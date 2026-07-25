/**
 * Paths disallowed for general crawlers.
 * Paid landing pages (/lp/*, /thank-you*) use noindex metadata instead of robots
 * disallow so AdsBot-Google can still crawl them for landing-page quality checks.
 */
export function getRobotsDisallowPaths(): string[] {
  return ["/api/"];
}
