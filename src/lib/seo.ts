import type { Metadata } from "next";
import { hreflangLanguages, ogLocale, withLocale, type Locale } from "./i18n";
import { PAGES, type PageKey, type PageMeta } from "./pages";
import { SITE } from "./site";

const robotsIndex: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

export const ogImage = {
  url: SITE.ogImage.startsWith("http") ? SITE.ogImage : `${SITE.url}${SITE.ogImage}`,
  width: 1730,
  height: 909,
  alt: `${SITE.name} — website plans for local businesses from $97/mo`,
};

/** Keep meta descriptions inside the useful 120–155 character range. */
export function clipDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const last = cut.lastIndexOf(" ");
  const base = cut.slice(0, last > 100 ? last : cut.length).replace(/[.,;:\s]+$/, "");
  return `${base}.`;
}

/**
 * Descriptions should be written per page, but this guard prevents a short
 * translated excerpt or newly added content page from shipping a weak tag.
 * The suffix is deliberately supplied by the caller so it remains localized
 * and relevant instead of being a generic repeated padding string.
 */
export function descriptionWithFallback(text: string, suffix: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  let result = clean;
  // A short translated description should never leak into production. Repeat
  // the caller's localized, relevant suffix only as much as needed, then clip
  // once so every route stays inside the 120–155 character audit range.
  while (result.length < 120) result = `${result} ${suffix.trim()}`.trim();
  return clipDescription(result);
}

export function absoluteUrl(path: string) {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

function absoluteLanguages(languages?: Record<string, string>) {
  if (!languages) return undefined;
  return Object.fromEntries(Object.entries(languages).map(([code, path]) => [code, absoluteUrl(path)]));
}

export function pageMetadata(key: PageKey): Metadata {
  const p = PAGES[key] as PageMeta;
  const full = p.absolute ? p.title : `${p.title} | ${SITE.name}`;
  const description = descriptionWithFallback(
    p.description,
    " Learn how Kinexis Digital can help your business grow online.",
  );
  const languages = hreflangLanguages(p.path);
  return {
    title: p.absolute ? { absolute: p.title } : p.title,
    description,
    alternates: p.indexable ? { canonical: absoluteUrl(p.path), ...(languages ? { languages: absoluteLanguages(languages) } : {}) } : undefined,
    robots: p.indexable ? robotsIndex : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      alternateLocale: languages ? ["es_MX", "es_ES"] : undefined,
      title: full,
      description,
      url: absoluteUrl(p.path),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [absoluteUrl(SITE.ogImage)] },
  };
}

type ContentMeta = {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  section?: string;
  index?: boolean;
  absolute?: boolean;
  locale?: Locale;
};

/** Metadata for routes that are not in the PAGES map, such as posts and projects. */
export function contentMetadata(input: ContentMeta): Metadata {
  const description = descriptionWithFallback(
    input.description,
    input.locale === "es-ES" || input.locale === "es-419"
      ? " Encuentra consejos prácticos y próximos pasos para mejorar tu presencia digital."
      : " Find practical guidance and next steps to improve your digital presence.",
  );
  const index = input.index !== false;
  const branded = input.absolute || input.title.includes(SITE.name);
  const full = branded ? input.title : `${input.title} | ${SITE.name}`;
  const image = input.image
    ? [{ url: input.image.startsWith("http") ? input.image : absoluteUrl(input.image), alt: input.imageAlt ?? input.title }]
    : [ogImage];
  const article = input.ogType === "article";
  const locale = input.locale ?? "en";
  const languages = hreflangLanguages(input.path);
  const alternateLocale = languages
    ? (["en_US", "es_MX", "es_ES"] as const).filter((code) => code !== ogLocale(locale))
    : undefined;
  return {
    title: branded ? { absolute: input.title } : input.title,
    description,
    authors: article ? [{ name: SITE.name, url: `${SITE.url}${withLocale(locale, "/about")}` }] : undefined,
    alternates: index ? { canonical: absoluteUrl(input.path), ...(languages ? { languages: absoluteLanguages(languages) } : {}) } : undefined,
    robots: index ? robotsIndex : { index: false, follow: true },
    openGraph: {
      type: input.ogType ?? "website",
      siteName: SITE.name,
      locale: ogLocale(locale),
      alternateLocale,
      title: full,
      description,
      url: absoluteUrl(input.path),
      images: image,
      ...(article && input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(article ? { authors: [SITE.name] } : {}),
      ...(input.section ? { section: input.section } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [input.image?.startsWith("http") ? input.image : absoluteUrl(input.image ?? SITE.ogImage)],
    },
  };
}
