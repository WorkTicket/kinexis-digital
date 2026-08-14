/** Card link labels: specific CTAs instead of generic "Learn More". */
export function getServiceExploreLabel(href: string): string {
  const labels: Record<string, string> = {
    "/services#seo": "See SEO Approach",
    "/services#paid-media": "See PPC & Google Ads Approach",
    "/services#web-design": "See Web Design Process",
    "/services#content-marketing": "See Email Strategy",
    "/services#branding": "See Branding Process",
    "/services": "See Growth Consulting",
  };
  return labels[href] ?? "View service details";
}
