import { pageMetadata } from "@/lib/seo";
import { POSTS } from "@/lib/content";
import CostGuides from "@/components/CostGuides";
import Filterable from "@/components/Filterable";
import { DeferredImg } from "@/components/DeferredImg";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, HL, PageHero, Section } from "@/components/ui";
import Link from "next/link";
import { BLOG_IMAGE_WIDTHS, imageSrcSet, imageVariant } from "@/lib/image-sources";

export const metadata = pageMetadata("blog");

export default function Page() {
  return (
    <>
      <PageSchema page="blog" items={POSTS.map((post) => ({ name: post.title, path: `/blog/${post.slug}` }))} />
      <PageHero h1="Digital Marketing Blog" mark="Blog" sub="SEO, web design, and marketing guides for service businesses across the United States." image="blog" imageAlt="Article cards for guides and resources" />

      <Section tint>
        <div className="section-head">
          <p className="eyebrow">Start here</p>
          <h2><HL text="Cost and Pages Guides by Trade" mark="by Trade" /></h2>
          <p>Jump to the cost and pages guides owners search first, then browse the full blog below.</p>
        </div>
        <CostGuides
          className="blog-hub__guides"
          showHead={false}
          ariaLabel="Start here cost and pages guides"
          featured={{
            href: "/web-design",
            name: "Every trade",
            title: "contractor website design",
            badge: "Design",
            featured: true,
          }}
          guides={[
            { href: "/blog/plumber-website-cost", name: "Plumbing", title: "plumber website cost", badge: "Cost" },
            { href: "/blog/hvac-website-cost", name: "HVAC", title: "HVAC website cost", badge: "Cost" },
            { href: "/blog/electrician-website-cost", name: "Electrical", title: "electrician website cost", badge: "Cost" },
            { href: "/blog/roofing-website-cost", name: "Roofing", title: "roofing website cost", badge: "Cost" },
            { href: "/blog/plumbing-website-pages", name: "Plumbing pages", title: "pages a plumbing website needs", badge: "Pages" },
          ]}
        />
      </Section>

      <Section>
        <div className="blog-hub">
          <div className="blog-hub__head">
            <div className="section-head blog-hub__intro">
              <p className="eyebrow">Articles</p>
              <h2><HL text="All tips, SEO, and design posts" mark="design posts" /></h2>
              <p>Filter the full library, or keep browsing every guide we publish for contractors.</p>
            </div>
            <Filterable cats={["Tips", "SEO", "Design"]} />
          </div>
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
