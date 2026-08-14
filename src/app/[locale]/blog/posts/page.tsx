import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  BlogCard,
  BlogMasthead,
  BlogSectionHeader,
} from "@/components/blog/BlogFeed";
import { PageCTA } from "@/components/page/PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import {
  blogAbsoluteUrl,
  getBlogListingPosts,
  sortPostsByRecency,
} from "@/lib/blog-utils";
import { buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/blog/posts",
    title: "All Marketing Guides and Articles",
    description:
      "Browse the full KINEXIS archive: SEO, paid media, conversion, email, and analytics guides for operators who measure growth.",
  });
}

export default async function BlogArchivePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("pages.blog");
  const tNav = await getTranslations("nav");
  const posts = sortPostsByRecency(getBlogListingPosts(locale));

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: blogAbsoluteUrl(locale, "/") },
            { name: tNav("blog"), url: blogAbsoluteUrl(locale, "/blog") },
            { name: t("archive"), url: blogAbsoluteUrl(locale, "/blog/posts") },
          ]),
        ]}
      />

      <BlogMasthead
        eyebrow={t("archive")}
        title={t("allPosts")}
        description={t("archiveDek")}
        count={posts.length}
        topicsActive="all"
      />

      <section
        aria-labelledby="blog-archive-heading"
        className="chapter chapter--void relative"
      >
        <div className="shell relative py-14 md:py-20 lg:py-24">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <BlogSectionHeader
              titleId="blog-archive-heading"
              title={t("library")}
              description={t("libraryDek")}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="blog-grid blog-grid--archive"
            stagger={duration.staggerTight}
            delayChildren={0.02}
          >
            {posts.map((post) => (
              <RevealItem key={post.slug} as="li" variant="fadeUp">
                <BlogCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <PageCTA
        title={t("ctaTitle")}
        copy={t("ctaCopy")}
      />
    </main>
  );
}
