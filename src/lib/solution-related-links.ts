import { solutions } from "@/content/registry/solutions";

const tradesSolutionSlugs = ["seo-for-hvac-companies", "google-ads-for-roofers"];

export function getSolutionRelatedLinks(
  currentSlug: string,
  limit = 4,
): { href: string; label: string }[] {
  const current = solutions.find((s) => s.slug === currentSlug);
  if (!current) return [];

  let matches = solutions.filter(
    (s) =>
      s.slug !== currentSlug &&
      (s.serviceSlug === current.serviceSlug || s.industrySlug === current.industrySlug),
  );

  if (matches.length < 3 && tradesSolutionSlugs.includes(currentSlug)) {
    const tradesPeers = solutions.filter(
      (s) => s.slug !== currentSlug && tradesSolutionSlugs.includes(s.slug),
    );
    matches = [...matches, ...tradesPeers.filter((p) => !matches.some((m) => m.slug === p.slug))];
  }

  return matches.slice(0, limit).map((s) => ({
    href: `/solutions/${s.slug}`,
    label: s.title,
  }));
}
