import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/content";
import { contentMetadata } from "@/lib/seo";
import { ArticleSchema } from "@/components/JsonLd";
import { PageHero, Section, CtaBand, Faq } from "@/components/ui";
import { EN_POST_CONTENT } from "@/data/posts-en";
import { BLOG_IMAGE_WIDTHS, imageSrcSet, imageVariant } from "@/lib/image-sources";

interface Props {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found", robots: { index: false, follow: false } };
  return contentMetadata({
    path: `/blog/${post.slug}`,
    title: "seoTitle" in post && post.seoTitle ? post.seoTitle : post.title,
    description: post.excerpt,
    image: post.image,
    imageAlt: post.title,
    ogType: "article",
    publishedTime: post.date,
    section: post.category,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const content = EN_POST_CONTENT[slug];
  if (!content) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const related = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        date={post.date}
        modified={post.modified}
        section={post.category}
        faqs={content.faqs}
      />
      <PageHero
        className="page-hero--article"
        eyebrow={post.category}
        h1={post.title}
        sub={
          <span className="blog-post__byline">
            <time dateTime={post.date}>{formattedDate}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </span>
        }
      />
      <Section>
        <div className="container container--narrow">
          <article className="blog-post">
            <nav className="blog-post__crumb" aria-label="Breadcrumb">
              <Link href="/blog" prefetch={false}>Blog</Link>
              <span aria-hidden="true">/</span>
              <span>{post.category}</span>
            </nav>

            <figure className="blog-post__hero">
              <picture>
                {/* Desktop keeps the article still; mobile waits for boot so the title is LCP. */}
                <source
                  type="image/avif"
                  media="(min-width: 861px)"
                  srcSet={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS, "avif")}
                  sizes="(max-width: 840px) 92vw, 760px"
                />
                <source
                  media="(min-width: 861px)"
                  srcSet={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS)}
                  sizes="(max-width: 840px) 92vw, 760px"
                />
                <img
                  src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${post.width}' height='${post.height}'%3E%3C/svg%3E`}
                  data-src={imageVariant(post.image, 640, "webp")}
                  data-srcset={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS)}
                  sizes="(max-width: 840px) 92vw, 760px"
                  alt={post.title}
                  width={post.width}
                  height={post.height}
                  decoding="async"
                  fetchPriority="low"
                />
              </picture>
            </figure>

            <div className="blog-post__content prose">
              <p className="blog-post__lead">{content.lead}</p>

              {content.sections.map((section, idx) => (
                <section key={idx} className="blog-section">
                  <h2>{section.h2}</h2>
                  <div className="blog-section__body" dangerouslySetInnerHTML={{ __html: section.html }} />
                </section>
              ))}

              {content.faqs?.length ? (
                <section className="blog-section blog-section--faq">
                  <h2>FAQs</h2>
                  <Faq items={content.faqs} />
                </section>
              ) : null}
            </div>

            <footer className="blog-post__footer">
              <Link className="blog-post__back" href="/blog" prefetch={false}>
                ← All guides
              </Link>
              <Link className="btn btn--ghost btn--sm" href="/pricing" prefetch={false}>
                See plans &amp; pricing
              </Link>
            </footer>
          </article>

          {related.length > 0 ? (
            <aside className="blog-related" aria-labelledby="blog-related-heading">
              <h2 id="blog-related-heading">More in {post.category}</h2>
              <ul className="blog-related__list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} prefetch={false}>
                      <span className="blog-related__title">{item.title}</span>
                      <span className="blog-related__meta">{item.readTime}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </Section>
      <CtaBand
        h="Want This Applied to Your Site?"
        mark="Your Site"
        sub="Get a free homepage preview built for your trade. No card, no obligation."
        btn="Get My Free Preview"
        href="/contact"
      />
    </>
  );
}
