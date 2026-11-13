import { portfolioScoresFile, type Project } from "@/lib/projects";

/**
 * Single baked WebP: Lighthouse 100 chrome + this project's homepage hero in
 * the gray screenshot panel. Avoids CSS overlays that can fail to paint.
 * Rebuild with: node scripts/build-pagespeed-scores.mjs
 */
export default function PageSpeedProof({ project }: { project: Project }) {
  const src = portfolioScoresFile(project.image);

  return (
    <figure className="pagespeed-proof">
      <img
        className="pagespeed-proof__frame"
        src={src}
        width={1024}
        height={530}
        alt={`${project.name} homepage next to Google PageSpeed Insights scores of 100 for Performance, Accessibility, Best Practices, and SEO`}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </figure>
  );
}
