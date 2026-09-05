import { getLandingPage } from "@/content/registry/landing-pages";

export function landingSlugFromPath(pathname: string): string | undefined {
  const match = pathname.match(/\/lp\/([^/?#]+)/);
  return match?.[1];
}

/** Paid landers and thank-you — no cookie bar over the form or confirmation. */
export function isCookieBannerExemptPath(pathname: string): boolean {
  return /\/lp\//.test(pathname) || /\/thank-you(\/|$)/.test(pathname);
}

export function getLandingChrome(pathname: string) {
  const slug = landingSlugFromPath(pathname);
  if (!slug) return null;
  const page = getLandingPage(slug);
  if (!page) return null;

  const slim = slug === "dallas-website-audit";
  if (page.siteNav && !slim) return null;

  return {
    ctaLabel: page.stickyCtaLabel,
    headerCtaLabel: page.heroCtaLabel ?? page.stickyCtaLabel,
    formHref: "#lp-form" as const,
    closingTitle: page.closingTitle ?? page.formTitle,
    closingCopy: page.closingCopy ?? page.formFootnote,
    slim,
  };
}
