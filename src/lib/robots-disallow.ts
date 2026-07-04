

/**
 * Paths that must not be crawled — unprefixed legacy URLs that redirect to /en/ or /es/
 * equivalents, plus paid-traffic-only lead-magnet pages.
 */
export function getRobotsDisallowPaths(): string[] {
  return ["/api/", "/lead-magnet", "/en/lead-magnet", "/es/lead-magnet"];
}
