import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import TextLink from "@/components/ui/TextLink";
import TwoLineText from "@/components/ui/TwoLineText";
import { cardClasses } from "@/lib/card-styles";
import type { BlogPost } from "@/content/blog";

type Props = {
  posts: BlogPost[];
  readLabel: string;
  emptyMessage?: string;
};

export default function BlogPostFeed({ posts, readLabel, emptyMessage }: Props) {
  if (posts.length === 0) {
    return emptyMessage ? (
      <p className="col-span-full text-center text-muted section-content">{emptyMessage}</p>
    ) : null;
  }

  return (
    <>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="h-full">
          <Reveal
            as="article"
            className={cardClasses({ className: "group flex h-full flex-col overflow-hidden !p-0" })}
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
          </Reveal>
        </Link>
      ))}
    </>
  );
}
