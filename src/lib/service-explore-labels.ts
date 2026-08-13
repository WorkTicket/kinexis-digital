/** Card link labels: specific CTAs instead of generic "Learn More". */
export function getServiceExploreLabel(href: string): string {
  const labels: Record<string, string> = {
    "/services/seo": "See SEO Approach",
    "/services/ppc-management": "See PPC & Google Ads Approach",
    "/services/meta-ads": "See Meta Ads Approach",
    "/services/web-design": "See Web Design Process",
    "/services/funnels": "See Funnels & CRO",
    "/services/email-marketing": "See Email Strategy",
    "/services/social-media": "See Social Strategy",
    "/services/video-marketing": "See Video Strategy",
    "/services/branding": "See Branding Process",
    "/services/analytics": "See Analytics Setup",
    "/services/growth-consulting": "See Growth Consulting",
  };
  return labels[href] ?? "View service details";
}
