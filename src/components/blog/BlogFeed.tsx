import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/content/blog";
import { Button } from "@/components/ui/Button";
import {
  categoryToSlug,
  displayTitle,
  estimateReadingMinutes,
  getPostIsoDate,
} from "@/lib/blog-utils";
import { cn } from "@/lib/cn";

function readingMinutesFor(post: BlogPost, body?: string): number {
  if (body) return estimateReadingMinutes(body);
  return estimateReadingMinutes(post.excerpt);
}

export function blogCategoryHref(category: string): string {
  return `/blog/category/${categoryToSlug(category)}`;
}

type BlogMastheadProps = {
  eyebrow?: string;
  title: string;
  /** Blue punch word/phrase with period (Clay hero formula). */
  signal?: string;
  description: string;
  count?: number;
  /** Topic filter active slug — keeps the bar inside the masthead */
  topicsActive?: string;
};

/** Compact editorial header — industry-standard blog masthead, not a marketing hero. */
export async function BlogMasthead({
  eyebrow = "Blog",
  title,
  signal,
  description,
  count,
  topicsActive,
}: BlogMastheadProps) {
  const t = await getTranslations("pages.blog");
  return (
    <header className="blog-masthead">
      <div className="shell">
        <p className="section-eyebrow">{eyebrow}</p>
        <div className="blog-masthead__row">
          <h1 className="blog-masthead__title">
            {title}
            {signal ? ` ${signal}` : null}
          </h1>
          {typeof count === "number" ? (
            <p className="blog-masthead__count" aria-label={t("articles", { count })}>
              {t("articles", { count })}
            </p>
          ) : null}
        </div>
        <p className="blog-masthead__dek">{description}</p>
      </div>
      {topicsActive !== undefined ? (
        <BlogCategoryNav active={topicsActive} />
      ) : null}
    </header>
  );
}

type BlogCategoryNavProps = {
  active?: string;
};

export async function BlogCategoryNav({ active = "all" }: BlogCategoryNavProps) {
  const t = await getTranslations("pages.blog");
  const items = [
    { href: "/blog", slug: "all", label: t("all") },
    { href: "/blog/category/seo", slug: "seo", label: "SEO" },
    { href: "/blog/category/web-design", slug: "web-design", label: t("webDesign") },
    { href: "/blog/category/paid-ads", slug: "paid-ads", label: t("paidAds") },
    { href: "/blog/category/cro", slug: "cro", label: "CRO" },
    { href: "/blog/category/email", slug: "email", label: "Email" },
    { href: "/blog/category/analytics", slug: "analytics", label: t("analytics") },
    {
      href: "/blog/category/case-studies",
      slug: "case-studies",
      label: t("caseStudies"),
    },
  ] as const;

  return (
    <nav aria-label={t("topicsAria")} className="blog-topics">
      <div className="shell">
        <ul className="blog-topics__list">
          {items.map((item) => {
            const isActive = active === item.slug;
            return (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className={cn(
                    "blog-topics__link",
                    isActive && "blog-topics__link--active",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="blog-topics__archive">
            <Link href="/blog/posts" className="blog-topics__link">
              {t("archive")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

type BlogMetaProps = {
  category: string;
  publishedAt: string;
  publishedAtIso?: string;
  readingMinutes: number;
  categoryHref?: boolean;
};

export async function BlogMeta({
  category,
  publishedAt,
  publishedAtIso,
  readingMinutes,
  categoryHref = true,
}: BlogMetaProps) {
  const t = await getTranslations("pages.blog");
  return (
    <p className="blog-meta">
      {categoryHref ? (
        <Link href={blogCategoryHref(category)} className="blog-meta__cat">
          {category}
        </Link>
      ) : (
        <span className="blog-meta__cat">{category}</span>
      )}
      <span aria-hidden className="blog-meta__dot">
        ·
      </span>
      <time dateTime={publishedAtIso}>{publishedAt}</time>
      <span aria-hidden className="blog-meta__dot">
        ·
      </span>
      <span>{t("minRead", { count: readingMinutes })}</span>
    </p>
  );
}

type FeaturedProps = {
  post: BlogPost;
  body?: string;
};

/** Large lead story — standard magazine feature. */
export async function BlogFeatured({ post, body }: FeaturedProps) {
  const minutes = readingMinutesFor(post, body);
  const title = displayTitle(post.title);
  const t = await getTranslations("pages.blog");

  return (
    <article className="blog-feature">
      <BlogMeta
        category={post.category}
        publishedAt={post.publishedAt}
        publishedAtIso={getPostIsoDate(post.slug)}
        readingMinutes={minutes}
      />
      <h2 className="blog-feature__title">
        <Link href={`/blog/${post.slug}`}>{title}</Link>
      </h2>
      <p className="blog-feature__excerpt">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="blog-feature__cta">
        {t("readArticle")}
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}

type BlogCardProps = {
  post: BlogPost;
  body?: string;
  priority?: boolean;
};

/** Standard post card with excerpt — scannable archive unit. */
export async function BlogCard({ post, body }: BlogCardProps) {
  const minutes = readingMinutesFor(post, body);
  const title = displayTitle(post.title);
  const t = await getTranslations("pages.blog");

  return (
    <article className="blog-card motion-tile">
      <BlogMeta
        category={post.category}
        publishedAt={post.publishedAt}
        publishedAtIso={getPostIsoDate(post.slug)}
        readingMinutes={minutes}
      />
      <h3 className="blog-card__title">
        <Link href={`/blog/${post.slug}`}>{title}</Link>
      </h3>
      <p className="blog-card__excerpt">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="blog-card__more">
        {t("readMore")}
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}

type BlogGuideRowProps = {
  post: BlogPost;
};

export async function BlogGuideRow({ post }: BlogGuideRowProps) {
  const minutes = readingMinutesFor(post);
  const t = await getTranslations("pages.blog");
  return (
    <Link href={`/blog/${post.slug}`} className="blog-guide motion-row">
      <span className="blog-guide__cat">{post.category}</span>
      <span className="blog-guide__title">{displayTitle(post.title)}</span>
      <span className="blog-guide__meta">
        {t("min", { count: minutes })}
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

type TopicIndexItem = {
  label: string;
  slug: string;
  description: string;
  count: number;
};

export function BlogTopicIndex({ topics }: { topics: TopicIndexItem[] }) {
  return (
    <ul className="blog-topic-index">
      {topics.map((topic) => (
        <li key={topic.slug}>
          <Link
            href={`/blog/category/${topic.slug}`}
            className="blog-topic-index__item"
          >
            <span className="blog-topic-index__top">
              <span className="blog-topic-index__label">{topic.label}</span>
              <span className="blog-topic-index__count">{topic.count}</span>
            </span>
            <span className="blog-topic-index__dek">{topic.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

type ArticleHeaderProps = {
  category: string;
  title: string;
  publishedAt: string;
  publishedAtIso: string;
  readingMinutes: number;
};

export async function BlogArticleHeader({
  category,
  title,
  publishedAt,
  publishedAtIso,
  readingMinutes,
}: ArticleHeaderProps) {
  const t = await getTranslations("pages.blog");
  return (
    <header className="blog-article-head">
      <div className="shell blog-article-head__inner">
        <nav aria-label="Breadcrumb" className="blog-article-head__crumbs">
          <Link href="/blog">Blog</Link>
          <span aria-hidden>/</span>
          <Link href={blogCategoryHref(category)}>{category}</Link>
        </nav>
        <p className="blog-article-head__cat">
          <Link href={blogCategoryHref(category)}>{category}</Link>
        </p>
        <h1 className="blog-article-head__title">{title}</h1>
        <div className="blog-article-head__byline">
          <p className="blog-meta blog-meta--plain">
            <time dateTime={publishedAtIso}>{publishedAt}</time>
            <span aria-hidden className="blog-meta__dot">
              ·
            </span>
            <span>{t("minRead", { count: readingMinutes })}</span>
          </p>
        </div>
      </div>
    </header>
  );
}

/** @deprecated — kept for any leftover imports; prefer BlogCard */
export async function BlogPostLink({
  post,
  size = "md",
  className,
  body,
}: {
  post: BlogPost;
  size?: "lg" | "md" | "sm";
  className?: string;
  body?: string;
}) {
  return (
    <div className={cn(size === "lg" && "blog-card--span", className)}>
      <BlogCard post={post} body={body} />
    </div>
  );
}

export function BlogSectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  titleId,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  titleId?: string;
}) {
  return (
    <header className="blog-section-head">
      <div className="blog-section-head__copy">
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h2 id={titleId} className="blog-section-head__title">
          {title}
        </h2>
        {description ? (
          <p className="blog-section-head__dek">{description}</p>
        ) : null}
      </div>
      {href ? (
        <Button href={href} variant="link" arrow>
          {linkLabel}
        </Button>
      ) : null}
    </header>
  );
}
