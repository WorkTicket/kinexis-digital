import type { Metadata } from "next";
import { hreflangLanguages, localeIndexable, ogLocale, withLocale, type Locale } from "./i18n";
import { PAGES, type PageKey, type PageMeta } from "./pages";
import { isPreviewSite, SITE } from "./site";

const robotsIndex: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

const robotsNoIndex: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: { index: false, follow: false, noimageindex: true },
};

function pageRobots(indexable: boolean): Metadata["robots"] {
  if (isPreviewSite()) return robotsNoIndex;
  return indexable ? robotsIndex : { index: false, follow: true };
}

export const ogImage = {
  url: SITE.ogImage.startsWith("http") ? SITE.ogImage : `${SITE.url}${SITE.ogImage}`,
  width: 1200,
  height: 630,
  alt: `${SITE.name} — website plans for local businesses from $97/mo`,
};

/** Last complete sentence that still fits, or -1 when the text has none. */
function sentenceEnd(text: string, max: number) {
  const slice = text.slice(0, max);
  for (let i = slice.length - 1; i >= 80; i--) {
    const ch = slice[i];
    if (ch !== "." && ch !== "!" && ch !== "?") continue;
    const next = text[i + 1];
    if (next !== undefined && next !== " ") continue;
    if (ch === "." && /\d/.test(slice[i - 1] ?? "") && /\d/.test(next ?? "")) continue;
    return i + 1;
  }
  return -1;
}

/**
 * Keep a meta description inside 155 characters without ending mid-phrase.
 * A description that already fits is returned unchanged.
 */
export function clipDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const end = sentenceEnd(clean, max);
  if (end >= 80) return clean.slice(0, end).trim();
  return clean;
}

/**
 * Descriptions should be written per page. This guard only appends the
 * caller's localized suffix when the whole sentence still fits. It never
 * chops that sentence down to a fragment such as "next steps to."
 */
export function descriptionWithFallback(text: string, suffix: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  const extra = suffix.replace(/\s+/g, " ").trim();
  if (clean.length >= 120 || !extra) return clipDescription(clean);
  const combined = `${clean} ${extra}`.trim();
  if (combined.length <= 155) return combined;
  return clipDescription(clean);
}

const OG_LOCALE_BY_HREFLANG: Record<string, string> = {
  "en-US": "en_US",
  "x-default": "en_US",
  es: "es_MX",
  "es-US": "es_MX",
  "es-ES": "es_ES",
};

function ogAlternateLocales(languages: Record<string, string> | undefined, current: string) {
  if (!languages) return undefined;
  const codes = [...new Set(
    Object.keys(languages).map((code) => OG_LOCALE_BY_HREFLANG[code]).filter((code): code is string => Boolean(code)),
  )];
  const alternates = codes.filter((code) => code !== current);
  return alternates.length ? alternates : undefined;
}

export function absoluteUrl(path: string) {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

function absoluteLanguages(languages?: Record<string, string>) {
  if (!languages) return undefined;
  return Object.fromEntries(Object.entries(languages).map(([code, path]) => [code, absoluteUrl(path)]));
}

/** True when the title already carries a Kinexis brand suffix (avoid "| Kinexis | Kinexis Digital"). */
function hasBrandSuffix(title: string) {
  return /\|\s*Kinexis(\s+Digital)?\s*$/i.test(title.trim()) || title.includes(SITE.name);
}

function brandedTitle(title: string, absolute?: boolean) {
  if (absolute || hasBrandSuffix(title)) return title.replace(/\|\s*Kinexis\s*$/i, `| ${SITE.name}`);
  return `${title} | ${SITE.name}`;
}

export function pageMetadata(key: PageKey): Metadata {
  const p = PAGES[key] as PageMeta;
  const branded = Boolean(p.absolute) || hasBrandSuffix(p.title);
  const full = brandedTitle(p.title, p.absolute);
  const description = descriptionWithFallback(
    p.description,
    " Learn how Kinexis Digital can help your business grow online.",
  );
  const languages = hreflangLanguages(p.path);
  const shareImage = p.ogImage
    ? { url: absoluteUrl(p.ogImage), width: 1200, height: 630, alt: full }
    : ogImage;
  return {
    title: branded ? { absolute: full } : p.title,
    description,
    alternates: !isPreviewSite() && p.indexable
      ? { canonical: absoluteUrl(p.path), ...(languages ? { languages: absoluteLanguages(languages) } : {}) }
      : undefined,
    robots: pageRobots(p.indexable),
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      alternateLocale: ogAlternateLocales(languages, "en_US"),
      title: full,
      description,
      url: absoluteUrl(p.path),
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [p.ogImage ? absoluteUrl(p.ogImage) : absoluteUrl(SITE.ogImage)],
    },
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
  const locale = input.locale ?? "en";
  const description = descriptionWithFallback(
    input.description,
    locale === "es-ES" || locale === "es-419"
      ? " Encuentra consejos prácticos y próximos pasos para mejorar tu presencia digital."
      : " Find practical guidance and next steps to improve your digital presence.",
  );
  const index = !isPreviewSite() && input.index !== false && localeIndexable(locale);
  const branded = Boolean(input.absolute) || hasBrandSuffix(input.title);
  const full = brandedTitle(input.title, input.absolute);
  const image = input.image
    ? [{
        url: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
        width: 1200,
        height: 630,
        alt: input.imageAlt ?? input.title,
      }]
    : [ogImage];
  const article = input.ogType === "article";
  const languages = index ? hreflangLanguages(input.path) : undefined;
  const alternateLocale = ogAlternateLocales(languages, ogLocale(locale));
  return {
    title: branded ? { absolute: full } : input.title,
    description,
    authors: article ? [{ name: SITE.name, url: `${SITE.url}${withLocale(locale, "/about")}` }] : undefined,
    alternates: index ? { canonical: absoluteUrl(input.path), ...(languages ? { languages: absoluteLanguages(languages) } : {}) } : undefined,
    robots: pageRobots(index),
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
