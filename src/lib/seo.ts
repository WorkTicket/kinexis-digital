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
  url: SITE.ogImage,
  width: 1730,
  height: 909,
  alt: `${SITE.name}, digital marketing agency for US businesses`,
};

/** Keep meta descriptions inside the length Google usually displays in full. */
export function clipDescription(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const last = cut.lastIndexOf(" ");
  const base = cut.slice(0, last > 100 ? last : cut.length).replace(/[.,;:\s]+$/, "");
  return `${base}.`;
}

export function pageMetadata(key: PageKey): Metadata {
  const p = PAGES[key] as PageMeta;
  const full = p.absolute ? p.title : `${p.title} | ${SITE.name}`;
  const languages = hreflangLanguages(p.path);
  return {
    title: p.absolute ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: p.indexable ? { canonical: p.path, ...(languages ? { languages } : {}) } : undefined,
    robots: p.indexable ? robotsIndex : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      title: full,
      description: p.description,
      url: p.path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: full, description: p.description, images: [SITE.ogImage] },
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
  const description = clipDescription(input.description);
  const index = input.index !== false;
  const branded = input.absolute || input.title.includes(SITE.name);
  const full = branded ? input.title : `${input.title} | ${SITE.name}`;
  const image = input.image ? [{ url: input.image, alt: input.imageAlt ?? input.title }] : [ogImage];
  const article = input.ogType === "article";
  const locale = input.locale ?? "en";
  const languages = hreflangLanguages(input.path);
  return {
    title: branded ? { absolute: input.title } : input.title,
    description,
    authors: article ? [{ name: SITE.name, url: `${SITE.url}${withLocale(locale, "/about")}` }] : undefined,
    alternates: index ? { canonical: input.path, ...(languages ? { languages } : {}) } : undefined,
    robots: index ? robotsIndex : { index: false, follow: false },
    openGraph: {
      type: input.ogType ?? "website",
      siteName: SITE.name,
      locale: ogLocale(locale),
      title: full,
      description,
      url: input.path,
      images: image,
      ...(article && input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(article ? { authors: [SITE.name] } : {}),
      ...(input.section ? { section: input.section } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [input.image ?? SITE.ogImage],
    },
  };
}
