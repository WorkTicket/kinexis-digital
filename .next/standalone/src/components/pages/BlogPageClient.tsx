"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import CTAArchetype from "@/components/ui/CTAArchetype";
import HeroArchetype from "@/components/ui/HeroArchetype";
import TextLink from "@/components/ui/TextLink";
import type { BlogContent } from "@/content/blog";
import TwoLineText from "@/components/ui/TwoLineText";
import { Eye, Share2, Star, Clock } from "lucide-react";
import { getRecentPosts } from "@/lib/blog-utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import BlogPostFeed from "@/components/blog/BlogPostFeed";
import Button from "@/components/ui/Button";

const trendingIcons = [Eye, Share2, Star, Clock];

type Props = { content: BlogContent };

export default function BlogPageClient({ content: c }: Props) {
  const { fadeUp, stagger, scaleIn } = useMotionVariants();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const featuredPost = c.posts.find((p) => p.featured)!;
  const recentPosts = getRecentPosts(c.posts, 6);

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
      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="section-label">{c.featuredResearchLabel}</motion.span>
          </motion.div>
          <Link href={`/blog/${featuredPost.slug}`}>
            <motion.div
              className="group mt-6 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.06]"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="p-10 md:p-16 lg:p-20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{featuredPost.category}</span>
                </div>
                <h2 className="section-title section-title--left mt-6 group-hover:gradient-text transition-all duration-300">
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
      </section>

      {/* SECTION 3: Recent Posts Preview */}
      <section className="section-padding relative">
        <div className="container-site">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="section-label">{c.recentPostsLabel}</motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-2">{c.recentPostsTitle}</motion.h2>
          </motion.div>

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
      </section>

      {/* SECTION 5: Trending Insights */}
      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="section-label">{c.trendingLabel}</motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-2">{c.trendingTitle}</motion.h2>
          </motion.div>

          <div className="section-content grid gap-grid-sm md:grid-cols-4">
            {c.trendingItems.map((item, i) => {
              const Icon = trendingIcons[i];
              return (
                <Link key={item.label} href={`/blog/${item.slug}`} className="h-full">
                  <motion.div
                    className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 hover:border-white/[0.1] transition-all duration-300"
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
      </section>

      {/* SECTION 6: Research Library */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-site">
          <motion.div className="section-header section-header--left" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="section-label">{c.archiveLabel}</motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-2">{c.archiveTitle}</motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle section-subtitle--left mt-3">
              <TwoLineText text={c.archiveDescription} variant="body" />
            </motion.p>
          </motion.div>

          <div className="section-content grid gap-grid-sm md:grid-cols-3">
            {c.archiveYears.map((y, i) => (
              <motion.div
                key={y.year}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 hover:border-white/[0.1] transition-all duration-300"
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
      </section>

      <CTAArchetype
        headline={c.ctaTitle}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaButton}
        ctaHref="/contact"
      />
    </>
  );
}
