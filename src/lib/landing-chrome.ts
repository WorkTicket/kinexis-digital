import { getLandingPage } from "@/content/registry/landing-pages";

export function landingSlugFromPath(pathname: string): string | undefined {
  const match = pathname.match(/\/lp\/([^/?#]+)/);
  return match?.[1];
}

export function getLandingChrome(pathname: string) {
  const slug = landingSlugFromPath(pathname);
  if (!slug) return null;
  const page = getLandingPage(slug);
  if (!page) return null;

  return {
    ctaLabel: page.stickyCtaLabel,
    formHref: "#lp-form" as const,
    closingTitle: page.closingTitle ?? page.formTitle,
    closingCopy: page.formFootnote,
  };
}
