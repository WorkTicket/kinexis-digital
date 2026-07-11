import type { HeroTheme } from "@/components/ui/HeroBackdrop";
import type { ServiceSeoSlug } from "@/content/service-seo/types";

const SERVICE_THEMES: Record<ServiceSeoSlug, HeroTheme> = {
  seo: "seo",
  "local-seo": "seo",
  "paid-ads": "ppc",
  "ppc-management": "ppc",
  "google-ads": "ppc",
  "meta-ads": "ppc",
  "youtube-ads": "ppc",
  "microsoft-ads": "ppc",
  "web-design": "web-design",
  funnels: "automation",
  branding: "branding",
  cro: "default",
  "email-marketing": "default",
  "content-marketing": "default",
  copywriting: "default",
  "social-media": "default",
  "video-marketing": "default",
  analytics: "default",
  "growth-consulting": "default",
  "marketing-audits": "default",
  "marketing-automation-crm": "automation",
  "fractional-cmo": "default",
  "training-workshops": "default",
  "landing-pages": "web-design",
  "website-maintenance": "web-design",
  "website-speed": "web-design",
};

export function getServiceHeroTheme(slug: ServiceSeoSlug): HeroTheme {
  return SERVICE_THEMES[slug] ?? "default";
}
