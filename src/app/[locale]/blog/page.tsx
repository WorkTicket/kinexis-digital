import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { blogContent } from "@/content/blog";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const BlogPageClient = dynamic(() => import("@/components/pages/BlogPageClient"));

type Props = { params: Promise<{ locale: Locale }> };

export default async function BlogPage({ params }: Props) {
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
          ]),
        ]}
      />
      <BlogPageClient content={content} />
    </>
  );
}
