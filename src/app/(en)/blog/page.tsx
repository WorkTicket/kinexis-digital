import { pageMetadata } from "@/lib/seo";
import { POSTS } from "@/lib/content";
import Filterable from "@/components/Filterable";
import { DeferredImg } from "@/components/DeferredImg";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, PageHero, Section } from "@/components/ui";
import Link from "next/link";
import { BLOG_IMAGE_WIDTHS, imageSrcSet, imageVariant } from "@/lib/image-sources";

export const metadata = pageMetadata("blog");

export default function Page() {
  return (
    <>
      <PageSchema page="blog" items={POSTS.map((post) => ({ name: post.title, path: `/blog/${post.slug}` }))} />
      <PageHero h1="Digital Marketing Blog" mark="Blog" sub="SEO, web design, and marketing guides for service businesses across the United States." image="blog" imageAlt="Article cards for guides and resources" />
      <Section>
        <nav className="industry-reads industry-reads--stack" aria-label="Start here cost and pages guides">
          <p className="industry-reads__label">Start Here: Cost and Pages Guides by Trade</p>
          <ul className="industry-reads__list">
            <li>
              <Link href="/blog/plumber-website-cost" prefetch={false}>
                <span className="industry-reads__title">plumber website cost</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/hvac-website-cost" prefetch={false}>
                <span className="industry-reads__title">HVAC website cost</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/roofing-website-cost" prefetch={false}>
                <span className="industry-reads__title">roofing website cost</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/plumbing-website-pages" prefetch={false}>
                <span className="industry-reads__title">pages a plumbing website needs</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href="/web-design" prefetch={false}>
                <span className="industry-reads__title">contractor website design</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </nav>
        <Filterable cats={["Tips", "SEO", "Design"]} />
        <div className="grid grid--3 blog-index">
          {POSTS.map((post) => (
            <article className="card post" key={post.slug} data-cat={post.category}>
              <Link href={`/blog/${post.slug}`} className="post__link" prefetch={false}>
                <div className="post__img">
                  <DeferredImg
                    src={imageVariant(post.image, 640, "webp")}
                    srcSet={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS)}
                    avifSrcSet={imageSrcSet(post.image, BLOG_IMAGE_WIDTHS, "avif")}
                    alt={post.title}
                    width={post.width}
                    height={post.height}
                    sizes="(max-width: 900px) 92vw, 380px"
                  />
                </div>
              </Link>
              <div className="post__body">
                <Link href={`/blog/${post.slug}`} className="post__link" prefetch={false}>
                  <p className="eyebrow">{post.category}</p>
                  <h2 className="card-title">{post.title}</h2>
                </Link>
                <p className="post__excerpt muted">{post.excerpt}</p>
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
        sub="Start with a free homepage preview built for your business. No card, no obligation."
        btn="Get My Free Preview"
        href="/contact"
      />
    </>
  );
}
