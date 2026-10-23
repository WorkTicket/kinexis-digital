import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/content";
import { INDUSTRIES } from "@/data/industries";
import { portfolioFile, PROJECTS } from "@/data/portfolio";
import { hreflangLanguages, isMirrored, withLocale, type Locale } from "@/lib/i18n";
import { PAGES, type PageMeta } from "@/lib/pages";
import { SITE } from "@/lib/site";

const updated = new Date(`${SITE.updated}T00:00:00.000Z`);
const LOCALES: Locale[] = ["en", "es-419", "es-ES"];

function absolute(path: string) {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;
}

function languagesFor(path: string) {
  const languages = hreflangLanguages(path);
  if (!languages) return undefined;
  return Object.fromEntries(Object.entries(languages).map(([code, href]) => [code, absolute(href)]));
}

function localized<T extends { url: string }>(path: string, entry: T): T[] {
  const languages = languagesFor(path);
  const withLang = languages ? { ...entry, alternates: { languages } } : entry;
  if (!isMirrored(path)) return [withLang];
  return LOCALES.map((locale) => {
    const localizedPath = withLocale(locale, path);
    return { ...withLang, url: absolute(localizedPath) };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.values(PAGES) as PageMeta[])
    .filter((page) => page.indexable)
    .flatMap((page) => localized(page.path, {
      url: absolute(page.path),
      lastModified: updated,
      changeFrequency: page.changeFrequency ?? "monthly",
      priority: page.priority ?? 0.6,
      ...(page.path === "/" ? { images: [`${SITE.url}${SITE.ogImage}`] } : {}),
    }));

  const industries = INDUSTRIES.flatMap((industry) => localized(`/industries/${industry.slug}`, {
    url: `${SITE.url}/industries/${industry.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const posts = POSTS.flatMap((post) => localized(`/blog/${post.slug}`, {
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [`${SITE.url}${post.image}`],
  }));

  const projects = PROJECTS.filter((project) => !project.placeholder).map((project) => ({
    url: `${SITE.url}/portfolio/${project.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    images: [`${SITE.url}${portfolioFile(project.image)}`],
  }));

  return [...pages, ...industries, ...posts, ...projects];
}
