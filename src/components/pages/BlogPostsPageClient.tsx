"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "@/lib/framer";
import BlogPostFeed from "@/components/blog/BlogPostFeed";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SectionHeader from "@/components/ui/SectionHeader";
import type { BlogContent } from "@/content/blog";
import { sortPostsByRecency } from "@/lib/blog-utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import Section from "@/components/shared/services/Section";

type Props = { content: BlogContent };

export default function BlogPostsPageClient({ content: c }: Props) {
  const { fadeUp, stagger } = useMotionVariants();
  const [activeCategory, setActiveCategory] = useState(c.categories[0]);

  const nonFeaturedPosts = sortPostsByRecency(c.posts.filter((post) => !post.featured));
  const filtered =
    activeCategory === c.categories[0]
      ? nonFeaturedPosts
      : nonFeaturedPosts.filter((post) => post.category === activeCategory);

  const clusterLinks = [
    { href: "/blog", label: "Blog Home" },
    { href: "/blog/technical-seo-guide", label: "Technical SEO Guide" },
    { href: "/blog/local-seo-checklist", label: "Local SEO Checklist" },
    { href: "/blog/quality-score-guide", label: "Google Ads Quality Score" },
    { href: "/blog/email-segmentation", label: "Email Segmentation" },
  ];
  let surfaceIndex = 0;

  return (
    <>
      <Section id="content-explorer" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeader
              badge={c.contentExplorerLabel}
              title={c.contentExplorerTitle}
              align="left"
              headingId="content-explorer-heading"
            />
            <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5">
              {c.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-neon-cyan text-bg-dark"
                      : "border border-strong text-muted hover:border-white/20 hover:text-white"
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
      </Section>

      <RelatedLinks
        blogLinks={clusterLinks}
        agencyHub
        surfaceIndex={surfaceIndex++}
      />
    </>
  );
}
