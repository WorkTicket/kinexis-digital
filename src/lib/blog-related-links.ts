import type { Locale } from "@/i18n/routing";
import { getClusterPost } from "@/content/blog-clusters";
import { getServiceRelatedLinks } from "@/lib/service-related-links";
import type { ServiceSeoSlug } from "@/content/service-seo/types";

const blogToService: Record<string, ServiceSeoSlug> = {
  "technical-seo-guide": "seo",
  "internal-linking-guide": "seo",
  "seo-audit-framework": "seo",
  "link-building-strategies": "seo",
  "local-seo-checklist": "local-seo",
  "quality-score-guide": "google-ads",
  "negative-keywords-guide": "ppc-management",
  "landing-page-best-practices": "funnels",
  "roas-calculations": "analytics",
  "heatmap-analysis": "funnels",
  "conversion-psychology": "funnels",
  "ab-testing-framework": "funnels",
  "landing-page-optimization": "funnels",
  "lifecycle-marketing": "email-marketing",
  "automated-nurture-sequences": "email-marketing",
  "email-segmentation": "email-marketing",
  "attribution-models": "analytics",
  "ga4-reporting": "analytics",
  "marketing-dashboards": "analytics",
};

type RelatedLink = { href: string; label: string };

export function getBlogRelatedLinks(
  slug: string,
  locale: Locale,
): { serviceLinks: RelatedLink[]; blogLinks: RelatedLink[] } {
  const cluster = getClusterPost(slug, locale);
  const serviceLinks: RelatedLink[] = [];
  const blogLinks: RelatedLink[] = [];

  if (cluster) {
    serviceLinks.push({
      href: cluster.parentServicePath,
      label: cluster.category === "SEO" ? "SEO Services" : `${cluster.category} Services`,
    });

    const siblings = [
      "technical-seo-guide",
      "internal-linking-guide",
      "seo-audit-framework",
      "link-building-strategies",
      "local-seo-checklist",
      "quality-score-guide",
      "negative-keywords-guide",
      "landing-page-best-practices",
      "conversion-psychology",
      "ab-testing-framework",
      "landing-page-optimization",
      "heatmap-analysis",
      "email-segmentation",
      "automated-nurture-sequences",
      "ga4-reporting",
      "attribution-models",
    ]
      .filter((s) => s !== slug)
      .map((s) => getClusterPost(s, locale))
      .filter(Boolean)
      .filter((p) => p!.category === cluster.category)
      .slice(0, 2);

    for (const post of siblings) {
      blogLinks.push({ href: `/blog/${post!.slug}`, label: post!.title });
    }
  }

  const serviceSlug = blogToService[slug];
  if (serviceSlug) {
    const related = getServiceRelatedLinks(serviceSlug);
    if (serviceLinks.length === 0) {
      serviceLinks.push({
        href: `/services/${serviceSlug}`,
        label: related.services[0]?.label ?? "Related Services",
      });
    }
    for (const link of related.blog.filter((b) => !b.href.endsWith(slug)).slice(0, 2)) {
      if (!blogLinks.some((b) => b.href === link.href)) blogLinks.push(link);
    }
    blogLinks.push({ href: "/blog/posts", label: "All Blog Posts" });
    for (const link of related.services.slice(0, 1)) {
      if (!serviceLinks.some((s) => s.href === link.href)) serviceLinks.push(link);
    }
  }

  return { serviceLinks, blogLinks };
}
