import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/content";
import { INDUSTRIES } from "@/data/industries";
import { portfolioFile, PROJECTS } from "@/data/portfolio";
import { EN_REDIRECTED_BLOG_SLUGS, hreflangLanguages, isMirrored, localeIndexable, withLocale, type Locale } from "@/lib/i18n";
import { PAGES, SITE_CONTENT_UPDATED, type PageMeta } from "@/lib/pages";
import { SITE } from "@/lib/site";

const LOCALES: Locale[] = (["en", "es-419", "es-ES"] as const).filter(localeIndexable);

export const revalidate = 86400;

function absolute(path: string) {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

function languagesFor(path: string) {
  const languages = hreflangLanguages(path);
  if (!languages) return undefined;
  return Object.fromEntries(Object.entries(languages).map(([code, href]) => [code, absolute(href)]));
}

function day(date: string) {
  return new Date(`${date}T00:00:00.000Z`);
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
      lastModified: day(page.updatedAt ?? SITE_CONTENT_UPDATED),
      changeFrequency: page.changeFrequency ?? "monthly",
      priority: page.priority ?? 0.6,
      ...(page.path === "/" ? { images: [`${SITE.url}${SITE.ogImage}`] } : {}),
    }));

  const industries = INDUSTRIES.filter((industry) => industry.status === "live").flatMap((industry) => localized(`/industries/${industry.slug}`, {
    url: `${SITE.url}/industries/${industry.slug}`,
    lastModified: day(SITE_CONTENT_UPDATED),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const posts = POSTS.flatMap((post) => {
    const path = `/blog/${post.slug}`;
    const entry = {
      url: `${SITE.url}${path}`,
      lastModified: day((post.modified ?? post.date).slice(0, 10)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [`${SITE.url}${post.image}`],
    };
    // EN Spanish-slug duplicates 301 away — keep Spanish sitemap rows only.
    if (EN_REDIRECTED_BLOG_SLUGS.has(post.slug)) {
      if (!isMirrored(path) || !localeIndexable("es-419")) return [];
      const languages = languagesFor(path);
      return [{
        ...entry,
        url: absolute(withLocale("es-419", path)),
        ...(languages ? { alternates: { languages } } : {}),
      }];
    }
    return localized(path, entry);
  });

  // Detail pages are demonstration templates, not standalone client case
  // studies. Keep the portfolio hub indexable, but keep demo URLs out of the
  // sitemap until a page has a real, distinct search purpose.
  const projects = PROJECTS.filter((project) => project.indexable && !project.placeholder).map((project) => ({
    url: `${SITE.url}/portfolio/${project.slug}`,
    lastModified: day(SITE_CONTENT_UPDATED),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    images: [`${SITE.url}${portfolioFile(project.image)}`],
  }));

  return [...pages, ...industries, ...posts, ...projects];
}
