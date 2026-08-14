import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  BlogCard,
  BlogFeatured,
  BlogGuideRow,
  BlogMasthead,
  BlogSectionHeader,
  BlogTopicIndex,
} from "@/components/blog/BlogFeed";
import { PageCTA } from "@/components/page/PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import {
  blogAbsoluteUrl,
  getBlogCategories,
  getCategoryMeta,
  getFieldGuides,
  getLatestPosts,
  getPostsByCategory,
} from "@/lib/blog-utils";
import { buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/blog",
    title: "Marketing Insights and Playbooks",
    description:
      "Practical SEO, paid ads, CRO, and email notes from the KINEXIS team. Field-tested tactics for home services and ecommerce growth programs.",
  });
}

export default async function BlogPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("pages.blog");
  const tNav = await getTranslations("nav");
  const latest = getLatestPosts(7, locale);
  const [featured, ...restLatest] = latest;
  const secondary = restLatest.slice(0, 2);
  const grid = restLatest.slice(2);
  const guides = getFieldGuides(locale);
  const topics = getBlogCategories(locale).map((category) => {
    const meta = getCategoryMeta(category);
    return {
      label: meta.label,
      slug: meta.slug,
      description: meta.description,
      count: getPostsByCategory(category, locale).length,
    };
  });

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: blogAbsoluteUrl(locale, "/") },
            { name: tNav("blog"), url: blogAbsoluteUrl(locale, "/blog") },
          ]),
        ]}
      />

      <BlogMasthead
        title={t("title")}
        signal={t("signal")}
        description={t("description")}
        topicsActive="all"
      />

      {featured ? (
        <section
          aria-labelledby="blog-featured-heading"
          className="chapter chapter--void relative"
        >
          <div className="shell relative py-14 md:py-20 lg:py-24">
            <Reveal variant="rise" when="chapter">
              <p className="section-eyebrow" id="blog-featured-heading">
                {t("featured")}
              </p>
              <BlogFeatured post={featured} />
            </Reveal>

            {secondary.length > 0 ? (
              <RevealGroup
                as="ul"
                className="blog-secondary"
                stagger={duration.staggerTight}
                delayChildren={0.08}
              >
                {secondary.map((post) => (
                  <RevealItem key={post.slug} as="li" variant="fadeUp">
                    <BlogCard post={post} />
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : null}
          </div>
        </section>
      ) : null}

      {grid.length > 0 ? (
        <section
          aria-labelledby="blog-recent-heading"
          className="chapter chapter--studio relative"
        >
          <div className="shell relative py-14 md:py-20 lg:py-24">
            <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
              <BlogSectionHeader
                titleId="blog-recent-heading"
                eyebrow={t("recent")}
                title={t("latestArticles")}
                href="/blog/posts"
                linkLabel={t("viewArchive")}
              />
            </Reveal>
            <RevealGroup
              as="ul"
              className="blog-grid"
              stagger={duration.staggerTight}
            >
              {grid.map((post) => (
                <RevealItem key={post.slug} as="li" variant="fadeUp">
                  <BlogCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="blog-guides-heading"
        className="chapter chapter--void relative"
      >
        <div className="shell relative py-14 md:py-20 lg:py-24">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <BlogSectionHeader
              titleId="blog-guides-heading"
              eyebrow={t("guides")}
              title={t("cornerstone")}
              description={t("cornerstoneDek")}
            />
          </Reveal>
          <RevealGroup
            as="ul"
            className="blog-guides"
            stagger={duration.staggerTight}
          >
            {guides.map((post) => (
              <RevealItem key={post.slug} as="li" variant="fadeUp">
                <BlogGuideRow post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section
        aria-labelledby="blog-topics-heading"
        className="chapter chapter--studio relative"
      >
        <div className="shell relative py-14 md:py-20 lg:py-24">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <BlogSectionHeader
              titleId="blog-topics-heading"
              eyebrow="Topics"
              title="Browse by focus"
              description="Pick the channel or discipline you need to tighten next."
            />
          </Reveal>
          <Reveal variant="fadeUp">
            <BlogTopicIndex topics={topics} />
          </Reveal>
        </div>
      </section>

      <section className="chapter chapter--void relative">
        <div className="shell relative py-14 md:py-20">
          <Reveal variant="rise" when="chapter">
            <div className="blog-archive-cta">
              <p className="section-eyebrow">Archive</p>
              <h2 className="blog-archive-cta__title">Full library</h2>
              <p className="blog-archive-cta__dek">
                Newest first. Filter by topic from the bar above whenever you need a narrower cut.
              </p>
              <Button href="/blog/posts" variant="link" arrow>
                {t("allPosts")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <PageCTA
        title={t("ctaTitle")}
        copy={t("ctaCopy")}
      />
    </main>
  );
}
