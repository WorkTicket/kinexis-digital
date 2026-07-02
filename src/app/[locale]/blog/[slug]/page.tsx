import { notFound } from "next/navigation";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import CTAArchetype from "@/components/ui/CTAArchetype";
import { getBlogArticle } from "@/content/blog-articles";
import { getClusterPost } from "@/content/blog-clusters";
import { blogContent } from "@/content/blog";
import { blogSlugs } from "@/content/registry/site-routes";
import { routing, type Locale } from "@/i18n/routing";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { getAuthor } from "@/content/authors";
import { getBlogAuthorSlug } from "@/lib/blog-authors";
import HeroArchetype from "@/components/ui/HeroArchetype";
import { localizeInternalLinks } from "@/lib/locale-path";
import { buildAbsoluteUrl, buildPageMetadata, normalizeMetaDescription } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, organizationSchema } from "@/lib/schema";
import type { Metadata } from "next";

function getPostExcerpt(slug: string, locale: Locale, body: string): string {
  const listing = getLocalizedContent(blogContent, locale).posts.find((p) => p.slug === slug);
  if (listing?.excerpt) return normalizeMetaDescription(listing.excerpt);
  const stripped = body.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return normalizeMetaDescription(stripped);
}

function resolvePost(slug: string, locale: Locale) {
  const featured = getBlogArticle(slug, locale);
  if (featured) return featured;
  const cluster = getClusterPost(slug, locale);
  if (cluster) {
    return {
      title: cluster.title,
      category: cluster.category,
      publishedAt: cluster.publishedAt,
      body: cluster.body,
    };
  }
  return null;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => blogSlugs.map((slug) => ({ locale, slug })));
}

type Params = Promise<{ locale: Locale; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = resolvePost(slug, locale);
  if (!post) return {};
  const description = getPostExcerpt(slug, locale, post.body);
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${post.title} | KINEXIS`,
    description,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = resolvePost(slug, locale);

  if (!post) notFound();

  const description = getPostExcerpt(slug, locale, post.body);
  const c = getLocalizedContent(blogContent, locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const authorSlug = getBlogAuthorSlug(post.category);
  const author = getAuthor(authorSlug, locale);

  return (
    <article>
      <JsonLd
        data={[
          organizationSchema(),
          articleSchema({
            title: post.title,
            description,
            url: buildAbsoluteUrl(locale, `/blog/${slug}`),
            datePublished: post.publishedAt,
            authorName: author?.name,
            authorUrl: buildAbsoluteUrl(locale, `/team/${authorSlug}`),
          }),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("blog"), url: buildAbsoluteUrl(locale, "/blog") },
            { name: post.title },
          ]),
        ]}
      />
      <HeroArchetype
        archetype="article"
        label={post.category}
        headline={post.title}
        subtitle={post.publishedAt}
        ctaLabel={tCommon("bookStrategyCall")}
        ctaHref="/contact"
        breadcrumbs={[
          { name: tNav("home"), url: "/" },
          { name: tNav("blog"), url: "/blog" },
          { name: post.title },
        ]}
      />

      {author && (
        <div className="container-site -mt-8 mb-4 text-center text-sm text-muted">
          <Link href={`/team/${authorSlug}`} className="text-neon-cyan/80 hover:text-neon-cyan no-underline transition-colors">
            {author.name}
          </Link>
          <span className="text-muted/50"> · {author.jobTitle}</span>
        </div>
      )}

      <AnimatedWrapper className="section-padding">
        <div className="container-site">
          <div className="prose prose-gray max-w-3xl mx-auto
            prose-headings:font-bold prose-headings:text-text
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-strong:text-text
            [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3
            [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:mb-4
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: localizeInternalLinks(post.body, locale) }} />
        </div>
      </AnimatedWrapper>

      <CTAArchetype
        headline={c.postDetailCtaHeadline}
        subtitle={c.postDetailCtaSubtitle}
        ctaLabel={c.postDetailCtaButton}
        ctaHref="/contact"
      />
    </article>
  );
}
