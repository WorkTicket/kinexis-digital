import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";
import { aboutContent } from "@/content/about";
import { contactContent } from "@/content/contact";
import { blogContent } from "@/content/blog";
import { caseStudiesContent } from "@/content/case-studies";
import { leadMagnetContent } from "@/content/lead-magnet";
import { servicesPageContent } from "@/content/services-page";

export function getAboutMetadata(locale: Locale): Metadata {
  const c = aboutContent[locale];
  return buildPageMetadata({
    locale,
    path: "/about",
    title: `About KINEXIS Digital | ${c.heroTitle} ${c.heroTitleHighlight}`,
    description: `${c.heroSubtitleLine1} ${c.heroSubtitleLine2}`,
  });
}

export function getContactMetadata(locale: Locale): Metadata {
  const c = contactContent[locale];
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: `Contact KINEXIS Digital | ${c.heroTitle}`,
    description: c.heroSubtitle,
  });
}

export function getBlogMetadata(locale: Locale): Metadata {
  const c = blogContent[locale];
  return buildPageMetadata({
    locale,
    path: "/blog",
    title: `${c.heroTitleLine1} ${c.heroTitleGradient} | KINEXIS Digital`,
    description: c.archiveDescription,
  });
}

export function getBlogPostsMetadata(locale: Locale): Metadata {
  const c = blogContent[locale];
  return buildPageMetadata({
    locale,
    path: "/blog/posts",
    title: `${c.postsHeroTitleLine1} ${c.postsHeroTitleGradient} | KINEXIS Digital`,
    description: c.postsHeroSubtitle.replace("|", " "),
  });
}

export function getCaseStudiesMetadata(locale: Locale): Metadata {
  const c = caseStudiesContent[locale];
  return buildPageMetadata({
    locale,
    path: "/case-studies",
    title: `Case Studies | ${c.heroTitleLine1} ${c.heroTitleGradient} | KINEXIS`,
    description: c.heroSubtitle,
  });
}

export function getLeadMagnetMetadata(locale: Locale): Metadata {
  const c = leadMagnetContent[locale];
  return buildPageMetadata({
    locale,
    path: "/lead-magnet",
    title: `${c.heroTitlePrefix} ${c.heroTitleAccent} | KINEXIS Digital`,
    description: c.heroSubtitle,
  });
}

export function getServicesHubMetadata(locale: Locale): Metadata {
  const c = servicesPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/services",
    title: `${c.hero.headlineLine1} ${c.hero.headlineLine2} | KINEXIS Digital`,
    description: c.hero.subtitle,
  });
}
