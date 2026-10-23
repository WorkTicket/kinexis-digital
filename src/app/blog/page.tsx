import { pageMetadata } from "@/lib/seo";
import { POSTS } from "@/lib/content";
import Filterable from "@/components/Filterable";
import { DeferredImg } from "@/components/DeferredImg";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, PageHero, Section } from "@/components/ui";
import Link from "next/link";

export const metadata = pageMetadata("blog");

export default function Page() {
  return (
    <>
      <PageSchema page="blog" items={POSTS.map((post) => ({ name: post.title, path: `/blog/${post.slug}` }))} />
      <PageHero h1="Digital Marketing Blog" mark="Blog" sub="SEO, web design, and marketing guides for service businesses across the United States." image="blog" imageAlt="Article cards for guides and resources" />
      <Section>
        <Filterable cats={["Tips", "SEO", "Design"]} />
        <div className="grid grid--3">
          {POSTS.map((post) => (
            <article className="card post" key={post.slug} data-cat={post.category}>
              <Link href={`/blog/${post.slug}`} className="post__link" prefetch={false}>
                <div className="post__img">
                  <DeferredImg src={post.image} alt={post.title} width={post.width} height={post.height} sizes="(max-width: 900px) 92vw, 380px" />
                </div>
              </Link>
              <div className="post__body">
                <Link href={`/blog/${post.slug}`} className="post__link" prefetch={false}>
                  <p className="eyebrow">{post.category}</p>
                  <h2 className="card-title">{post.title}</h2>
                </Link>
                <p className="muted">{post.excerpt}</p>
                <div className="post__meta">
                  <span>{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="btn btn--ghost btn--sm" aria-label={`Read ${post.title}`} prefetch={false}>Read the guide</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand
        h="Want These Tips Applied to Your Site?"
        mark="Your Site"
        sub="Start with a free homepage preview built for your trade. No card, no obligation."
        btn="Get My Free Preview"
        href="/contact"
      />
    </>
  );
}
