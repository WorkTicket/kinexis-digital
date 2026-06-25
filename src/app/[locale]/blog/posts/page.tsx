import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { blogContent } from "@/content/blog";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { getBlogPostsMetadata } from "@/lib/static-page-metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const BlogPostsPageClient = dynamic(() => import("@/components/pages/BlogPostsPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getBlogPostsMetadata(locale);
}

export default async function BlogPostsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(blogContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Blog", url: buildAbsoluteUrl(locale, "/blog") },
            { name: content.postsHeroTitleLine1, url: buildAbsoluteUrl(locale, "/blog/posts") },
          ]),
        ]}
      />
      <BlogPostsPageClient content={content} />
    </>
  );
}
