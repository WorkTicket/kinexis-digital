import { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/content";
import { contentMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ArticleSchema } from "@/components/JsonLd";
import { PageHero, Section, CtaBand } from "@/components/ui";
import { EN_POST_CONTENT } from "@/data/posts-en";

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

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        date={post.date}
        section={post.category}
      />
      <PageHero h1={post.title} sub={`${formattedDate} · ${post.readTime} · ${post.category} · ${SITE.name}`} />
      <Section>
        <div className="container container--narrow prose">
          <article className="blog-post">
            <figure className="blog-post__hero">
              <picture>
                <source type="image/avif" srcSet={post.image.replace(".webp", ".avif")} />
                <img
                  src={post.image}
                  alt={post.title}
                  width={post.width}
                  height={post.height}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </figure>

            <div className="blog-post__content">
              <p className="blog-post__lead">
                {content.lead}
              </p>

              {content.sections.map((section, idx) => (
                <section key={idx} className="blog-section">
                  <h2>{section.h2}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.html }} />
                </section>
              ))}
            </div>
          </article>
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
