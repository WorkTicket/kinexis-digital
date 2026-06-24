/** Card link labels — specific CTAs instead of generic "Learn More". */
export function getServiceExploreLabel(href: string): string {
  const labels: Record<string, string> = {
    "/services/seo": "Explore SEO Strategy",
    "/services/ppc-management": "See PPC Approach",
    "/services/google-ads": "See Google Ads Approach",
    "/services/meta-ads": "See Meta Ads Approach",
    "/services/web-design": "Explore Web Design Process",
    "/services/funnels": "Explore Funnels & CRO",
    "/services/email-marketing": "Explore Email Strategy",
    "/services/social-media": "Explore Social Strategy",
    "/services/video-marketing": "Explore Video Strategy",
    "/services/branding": "Explore Branding Process",
    "/services/analytics": "Explore Analytics Setup",
    "/services/growth-consulting": "Explore Growth Consulting",
    "/services/paid-ads": "See Paid Ads Approach",
  };
  return labels[href] ?? "View service details";
}
