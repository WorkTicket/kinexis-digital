import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  BlogCard,
  BlogFeatured,
  BlogMasthead,
  BlogSectionHeader,
} from "@/components/blog/BlogFeed";
import { PageCTA } from "@/components/page/PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { resolveLocale } from "@/i18n/locale";
import {
  blogAbsoluteUrl,
  categoryFromSlug,
  getCategoryMeta,
  getPostsByCategory,
} from "@/lib/blog-utils";
import { buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return [
    "seo",
    "web-design",
    "paid-ads",
    "cro",
    "email",
    "analytics",
    "case-studies",
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return {};
  const meta = getCategoryMeta(category);
  return buildPageMetadata({
    locale,
    path: `/blog/category/${slug}`,
    title: meta.title,
    description: meta.description,
  });
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  const t = await getTranslations("pages.blog");
  const tNav = await getTranslations("nav");
  const meta = getCategoryMeta(category);
  const posts = getPostsByCategory(category, locale);
  const [featured, ...rest] = posts;

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: blogAbsoluteUrl(locale, "/") },
            { name: tNav("blog"), url: blogAbsoluteUrl(locale, "/blog") },
            {
              name: meta.label,
              url: blogAbsoluteUrl(locale, `/blog/category/${meta.slug}`),
            },
          ]),
        ]}
      />

      <BlogMasthead
        eyebrow={t("topic")}
        title={meta.label}
        description={meta.description}
        count={posts.length}
        topicsActive={meta.slug}
      />

      <section
        aria-labelledby="blog-category-heading"
        className="chapter chapter--void relative"
      >
        <div className="shell relative py-14 md:py-20 lg:py-24">
          {featured ? (
            <Reveal variant="rise" when="chapter" className="mb-14 md:mb-16">
              <p className="section-eyebrow" id="blog-category-heading">
                {t("latestIn", { label: meta.label })}
              </p>
              <BlogFeatured post={featured} />
            </Reveal>
          ) : null}

          {rest.length > 0 ? (
            <>
              <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
                <BlogSectionHeader
                  title={t("moreArticles")}
                  href="/blog/posts"
                  linkLabel={t("fullArchive")}
                />
              </Reveal>
              <RevealGroup
                as="ul"
                className="blog-grid"
                stagger={duration.staggerTight}
              >
                {rest.map((post) => (
                  <RevealItem key={post.slug} as="li" variant="fadeUp">
                    <BlogCard post={post} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </>
          ) : null}
        </div>
      </section>

      <PageCTA
        title={t("ctaTitle")}
        copy={t("ctaCopy")}
      />
    </main>
  );
}
