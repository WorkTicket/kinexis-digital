"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import CTAArchetype from "@/components/ui/CTAArchetype";
import HeroArchetype from "@/components/ui/HeroArchetype";
import TextLink from "@/components/ui/TextLink";
import SectionHeader from "@/components/ui/SectionHeader";
import type { BlogContent } from "@/content/blog";
import TwoLineText from "@/components/ui/TwoLineText";
import { Eye, Share2, Star, Clock } from "lucide-react";
import { getRecentPosts } from "@/lib/blog-utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import BlogPostFeed from "@/components/blog/BlogPostFeed";
import Button from "@/components/ui/Button";
import { cardClasses } from "@/lib/card-styles";
import Section from "@/components/shared/services/Section";

const trendingIcons = [Eye, Share2, Star, Clock];

type Props = { content: BlogContent };

export default function BlogPageClient({ content: c }: Props) {
  const { stagger, scaleIn } = useMotionVariants();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const featuredPost = c.posts.find((p) => p.featured)!;
  const recentPosts = getRecentPosts(c.posts, 6);
  let surfaceIndex = 0;

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        label={tNav("blog")}
        headline={
          <>
            <span className="type-hero-line">{c.heroTitleLine1}</span>
            <span className="type-hero-line gradient-text">{c.heroTitleGradient}</span>
          </>
        }
        subtitle={c.heroSubtitle}
        ctaLabel={tCommon("bookStrategyCall")}
        ctaHref="/contact"
      />

      {/* SECTION 2: Featured Research */}
      <Section id="featured-research" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader
            badge={c.featuredResearchLabel}
            title={c.featuredResearchLabel}
            align="left"
            className="[&_h2]:sr-only"
            headingId="featured-research-heading"
          />
          <Link href={`/blog/${featuredPost.slug}`}>
            <motion.div
              className={cardClasses({
                hover: false,
                className:
                  "group mt-6 relative overflow-hidden bg-gradient-to-br from-surface-raised to-surface-hover",
              })}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="p-10 md:p-16 lg:p-20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{featuredPost.category}</span>
                </div>
                <h2 className="card-heading mt-6 group-hover:gradient-text transition-all duration-300">
                  {featuredPost.title}
                </h2>
                <p className="mt-6 section-intro section-intro--left text-base md:text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <span className="text-sm text-muted/50">{featuredPost.publishedAt}</span>
                  <TextLink>{c.readArticle}</TextLink>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-neon-cyan/[0.03] blur-[80px] group-hover:bg-neon-cyan/[0.06] transition-all duration-700" />
            </motion.div>
          </Link>
        </div>
      </Section>

      {/* SECTION 3: Recent Posts Preview */}
      <Section id="recent-posts" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader
            badge={c.recentPostsLabel}
            title={c.recentPostsTitle}
            align="left"
            headingId="recent-posts-heading"
          />

          <motion.div
            className="section-content grid gap-grid-sm sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <BlogPostFeed posts={recentPosts} readLabel={c.read} />
          </motion.div>

          <div className="section-cta-row">
            <Button href="/blog/posts" variant="secondary" fullWidthMobile>
              {c.viewAllLabel}
            </Button>
          </div>
        </div>
      </Section>

      {/* SECTION 5: Trending Insights */}
      <Section id="trending-insights" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader
            badge={c.trendingLabel}
            title={c.trendingTitle}
            align="left"
            headingId="trending-insights-heading"
          />

          <div className="section-content grid gap-grid-sm md:grid-cols-4">
            {c.trendingItems.map((item, i) => {
              const Icon = trendingIcons[i];
              return (
                <Link key={item.label} href={`/blog/${item.slug}`} className="h-full">
                  <motion.div
                    className={cardClasses({ className: "group h-full" })}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="h-3.5 w-3.5 text-neon-cyan" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{item.label}</span>
                    </div>
                    <p className="text-sm font-semibold group-hover:gradient-text transition-all duration-200">{item.value}</p>
                    {item.reads && <span className="text-xs text-muted/50 mt-1 block">{item.reads} {c.readsSuffix}</span>}
                    {item.shares && <span className="text-xs text-muted/50 mt-1 block">{item.shares} {c.sharesSuffix}</span>}
                    {item.note && <span className="text-xs text-neon-cyan/60 mt-1 block">{item.note}</span>}
                    {item.date && <span className="text-xs text-muted/50 mt-1 block">{item.date}</span>}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* SECTION 6: Research Library */}
      <Section id="research-library" surfaceIndex={surfaceIndex++} className="relative overflow-hidden">
        <div className="container-site">
          <SectionHeader
            badge={c.archiveLabel}
            title={c.archiveTitle}
            description={<TwoLineText text={c.archiveDescription} variant="body" />}
            align="left"
            headingId="research-library-heading"
          />

          <div className="section-content grid gap-grid-sm md:grid-cols-3">
            {c.archiveYears.map((y, i) => (
              <motion.div
                key={y.year}
                className={cardClasses({ className: "group !p-8" })}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="type-metric-lg">{y.year}</span>
                <div className="mt-4 h-px w-10 bg-neon-cyan/30" />
                <p className="mt-4 text-sm text-muted">{y.count} {c.articlesPublishedLabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <CTAArchetype
        headline={c.ctaTitle}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaButton}
        ctaHref="/contact"
      />
    </>
  );
}
