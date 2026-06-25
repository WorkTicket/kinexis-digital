"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { useTranslations } from "next-intl";
import HeroArchetype from "@/components/ui/HeroArchetype";
import BlogPostFeed from "@/components/blog/BlogPostFeed";
import type { BlogContent } from "@/content/blog";
import { sortPostsByRecency } from "@/lib/blog-utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = { content: BlogContent };

export default function BlogPostsPageClient({ content: c }: Props) {
  const { fadeUp, stagger } = useMotionVariants();
  const tCommon = useTranslations("common");
  const [activeCategory, setActiveCategory] = useState(c.categories[0]);

  const nonFeaturedPosts = sortPostsByRecency(c.posts.filter((post) => !post.featured));
  const filtered =
    activeCategory === c.categories[0]
      ? nonFeaturedPosts
      : nonFeaturedPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        headline={
          <>
            <span className="type-hero-line">{c.postsHeroTitleLine1}</span>
            <span className="type-hero-line gradient-text">{c.postsHeroTitleGradient}</span>
          </>
        }
        subtitle={c.postsHeroSubtitle}
        ctaLabel={tCommon("bookStrategyCall")}
        ctaHref="/contact"
      />

      <section className="section-padding relative">
        <div className="container-site">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {c.contentExplorerLabel}
              </span>
              <h2 className="section-title section-title--left mt-2">{c.contentExplorerTitle}</h2>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5">
              {c.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-neon-cyan text-bg-dark"
                      : "border border-white/[0.08] text-muted hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="section-content grid gap-grid-sm sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPostFeed posts={filtered} readLabel={c.read} emptyMessage={c.noArticlesMessage} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
