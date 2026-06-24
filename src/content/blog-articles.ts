import type { Locale } from "@/i18n/routing";
import { blogArticlesEnExpanded } from "./blog-articles-en-expanded";
import { blogArticlesEsExpanded } from "./blog-articles-es-expanded";

export type BlogArticle = {
  title: string;
  category: string;
  publishedAt: string;
  body: string;
};

export const blogArticles: Record<Locale, Record<string, BlogArticle>> = {
  en: blogArticlesEnExpanded,
  es: blogArticlesEsExpanded,
};

export function getBlogArticle(slug: string, locale: Locale): BlogArticle | undefined {
  return blogArticles[locale]?.[slug] ?? blogArticles.en[slug];
}
