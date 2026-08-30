import type { Locale } from "@/i18n/routing";
import { applySpainEuros } from "@/i18n/currency";
import { localeContent } from "@/i18n/locale-content";
import { blogArticlesEnExpanded } from "./blog-articles-en-expanded";
import { blogArticlesEsExpanded } from "./blog-articles-es-expanded";
export type BlogArticle = {
  title: string;
  category: string;
  publishedAt: string;
  body: string;
};

export const blogArticles = localeContent({
  en: blogArticlesEnExpanded,
  "es-419": blogArticlesEsExpanded,
});
export function getBlogArticle(slug: string, locale: Locale): BlogArticle | undefined {
  const localized = blogArticles[locale] as Record<string, BlogArticle>;
  const article =
    localized?.[slug] ?? blogArticles.en[slug as keyof typeof blogArticles.en];
  return article ? applySpainEuros(article, locale) : undefined;
}
