import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import {
  BlogArticleHeader,
  BlogCard,
  blogCategoryHref,
} from "@/components/blog/BlogFeed";
import { PageCTA } from "@/components/page/PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { resolveLocale } from "@/i18n/locale";
import { getBlogRelatedLinks } from "@/lib/blog-related-links";
import { localizeInternalLinks } from "@/lib/locale-path";
import {
  blogAbsoluteUrl,
  getAllBlogSlugs,
  getBlogListingPosts,
  getBlogSerpMeta,
  resolvePost,
  sortPostsByRecency,
} from "@/lib/blog-utils";
import { normalizeMetaDescription, buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import {
  articleSchema,
  breadcrumbSchema,
  organizationSchema,
} from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = resolvePost(slug, locale);
  if (!post) return {};
  const serp = getBlogSerpMeta(post);
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: serp.title,
    description: serp.description,
    ogType: "article",
    publishedTime: post.publishedAtIso,
    modifiedTime: post.publishedAtIso,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = resolvePost(slug, locale);
  if (!post) notFound();

  const related = getBlogRelatedLinks(slug, locale);
  const moreInCategory = sortPostsByRecency(
    getBlogListingPosts(locale).filter(
      (p) => p.category === post.category && p.slug !== slug,
    ),
  ).slice(0, 3);

  const serviceLinks = related.serviceLinks;
  const blogLinks = related.blogLinks.filter(
    (l) => !l.href.endsWith("/blog/posts"),
  );

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          articleSchema({
            title: post.title,
            description: normalizeMetaDescription(post.excerpt),
            url: blogAbsoluteUrl(locale, `/blog/${slug}`),
            datePublished: post.publishedAtIso,
          }),
          breadcrumbSchema([
            { name: "Home", url: blogAbsoluteUrl(locale, "/") },
            { name: "Blog", url: blogAbsoluteUrl(locale, "/blog") },
            { name: post.title },
          ]),
        ]}
      />

      <BlogArticleHeader
        category={post.category}
        title={post.title}
        publishedAt={post.publishedAt}
        publishedAtIso={post.publishedAtIso}
        readingMinutes={post.readingMinutes}
      />

      <article className="chapter chapter--void relative">
        <div className="shell relative py-12 md:py-16 lg:py-20">
          <Reveal variant="fadeUp">
            <p className="blog-article__dek">{post.excerpt}</p>
            <div
              className="blog-article__body"
              dangerouslySetInnerHTML={{ __html: localizeInternalLinks(post.body, locale) }}
            />
          </Reveal>
        </div>
      </article>

      {(serviceLinks.length > 0 || blogLinks.length > 0) && (
        <section className="chapter chapter--studio relative">
          <div className="shell relative py-14 md:py-20">
            <Reveal variant="rise" when="chapter">
              <p className="section-eyebrow">Related</p>
              <h2 className="blog-section-head__title mt-4">
                Keep going
              </h2>
            </Reveal>
            <ul className="blog-related mt-10">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="blog-related__item">
                    <span className="blog-related__kind">Service</span>
                    <span className="blog-related__title">{link.label}</span>
                    <span aria-hidden className="blog-related__arrow">
                      →
                    </span>
                  </Link>
                </li>
              ))}
              {blogLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="blog-related__item">
                    <span className="blog-related__kind">Article</span>
                    <span className="blog-related__title">{link.label}</span>
                    <span aria-hidden className="blog-related__arrow">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {moreInCategory.length > 0 ? (
        <section className="chapter chapter--void relative">
          <div className="shell relative py-14 md:py-20 lg:py-24">
            <Reveal variant="rise" when="chapter" className="mb-10">
              <div className="blog-section-head">
                <div>
                  <p className="section-eyebrow">More in {post.category}</p>
                  <h2 className="blog-section-head__title mt-4">
                    Continue reading
                  </h2>
                </div>
                <Link
                  href={blogCategoryHref(post.category)}
                  className="blog-section-head__more"
                >
                  All {post.category}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
            <RevealGroup
              as="ul"
              className="blog-grid"
              stagger={duration.staggerTight}
            >
              {moreInCategory.map((item) => (
                <RevealItem key={item.slug} as="li" variant="fadeUp">
                  <BlogCard post={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <PageCTA
        title="Want results like these applied to your funnel?"
        copy="Bring your numbers and the bottleneck. We'll map what to fix first."
      />
    </main>
  );
}
