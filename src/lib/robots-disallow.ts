import {
  comparisonRoutes,
  serviceRoutes,
  staticPageRoutes,
} from "@/content/registry/site-routes";

/**
 * Paths that must not be crawled — unprefixed legacy URLs that redirect to /en/ or /es/
 * equivalents, plus paid-traffic-only lead-magnet pages.
 */
export function getRobotsDisallowPaths(): string[] {
  const paths = new Set<string>([
    "/api/",
    "/lead-magnet",
    "/en/lead-magnet",
    "/es/lead-magnet",
  ]);

  for (const route of staticPageRoutes) {
    if (route !== "/") paths.add(route);
  }

  for (const route of Object.values(comparisonRoutes)) {
    paths.add(route);
  }

  for (const route of Object.values(serviceRoutes)) {
    paths.add(route);
  }

  for (const prefix of [
    "/services/",
    "/blog/",
    "/industries/",
    "/locations/",
    "/pricing/",
    "/solutions/",
    "/case-studies/",
    "/team/",
  ]) {
    paths.add(prefix);
  }

  return Array.from(paths).sort();
}
