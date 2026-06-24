"use client";

import { m as motion } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import TextLink from "@/components/ui/TextLink";
import TwoLineText from "@/components/ui/TwoLineText";
import type { BlogPost } from "@/content/blog";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = {
  posts: BlogPost[];
  readLabel: string;
  emptyMessage?: string;
};

export default function BlogPostFeed({ posts, readLabel, emptyMessage }: Props) {
  const { fadeUp } = useMotionVariants();
  if (posts.length === 0) {
    return emptyMessage ? (
      <p className="col-span-full text-center text-muted section-content">{emptyMessage}</p>
    ) : null;
  }

  return (
    <>
      {posts.map((post, i) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="h-full">
          <motion.article
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:border-white/[0.1] transition-all duration-300"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{post.category}</span>
              </div>
              <h3 className="text-lg font-bold leading-snug group-hover:gradient-text transition-all duration-200">
                <TwoLineText text={post.title} variant="subheader" />
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-xs text-muted/50">{post.publishedAt}</span>
                <TextLink size="sm">{readLabel}</TextLink>
              </div>
            </div>
          </motion.article>
        </Link>
      ))}
    </>
  );
}
