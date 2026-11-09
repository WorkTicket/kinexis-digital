import Link from "next/link";
import {
  averageReviewStars,
  getAllReviews,
  getCuratedReviews,
  pickHomeReviews,
  reviewSourceSummary,
} from "@/lib/reviews";
import { LeaveFacebookReview } from "./FacebookReviews";
import { LeaveTrustpilotReview } from "./TrustpilotReviews";
import { UnifiedReviewCard } from "./UnifiedReviewCard";
import { HL } from "./ui";

type ReviewsSectionProps = {
  /** Homepage band: rating line + CTA to /reviews only. */
  variant?: "default" | "home";
  limit?: number;
  eyebrow?: string;
  title?: string;
  mark?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * Homepage rating line. Use `{count}` and `{source}` placeholders, or omit for
   * the concise English “client reviews” label.
   */
  ratingCopy?: string;
};

function RatingLine({
  average,
  count,
  source,
  label,
}: {
  average: number;
  count: number;
  source: string;
  label?: string;
}) {
  const display = average.toFixed(1);
  const copy = (label ?? "client reviews")
    .replaceAll("{count}", String(count))
    .replaceAll("{source}", source);
  return (
    <p className="reviews-rating">
      <span className="reviews-rating__stars" aria-hidden="true">
        {"★★★★★"}
      </span>
      <span className="reviews-rating__score">{display}</span>
      <span className="reviews-rating__copy">{copy}</span>
    </p>
  );
}

/** Recent reviews for the homepage and project pages — one shared card format. */
export default async function ReviewsSection({
  variant = "default",
  limit = 3,
  eyebrow = "Client reviews",
  title = "Reviews From Our Awesome Clients",
  mark = "Awesome Clients",
  sub,
  ctaLabel = "Read More Reviews",
  ctaHref = "/reviews",
  ratingCopy,
}: ReviewsSectionProps) {
  // Homepage keeps curated quotes only so the first paint never waits on
  // Facebook / Trustpilot / KV. Live aggregation stays on /reviews.
  const home = variant === "home";
  const all = home ? getCuratedReviews() : await getAllReviews();
  if (all.length === 0) return null;

  const reviews = home ? pickHomeReviews(all, limit) : all.slice(0, limit);
  if (reviews.length === 0) return null;

  const average = averageReviewStars(all);
  const showRating = home && average >= 4.5;
  const source = reviewSourceSummary(all);

  return (
    <section className={`section section--tint reviews-block${home ? " reviews-block--home" : ""}`}>
      <div className="container">
        <p className="eyebrow center">{eyebrow}</p>
        <h2 className="center"><HL text={title} mark={mark} /></h2>
        {sub ? <p className="center muted">{sub}</p> : null}
        {showRating ? (
          <RatingLine average={average} count={all.length} source={source} label={ratingCopy} />
        ) : null}
        <div className="review-cards">
          {reviews.map((review) => <UnifiedReviewCard key={review.id} review={review} />)}
        </div>
        <div className="review-actions spaced">
          <Link className="btn btn--primary" href={ctaHref} prefetch={false}>{ctaLabel}</Link>
          {home ? null : (
            <>
              <LeaveTrustpilotReview />
              <LeaveFacebookReview />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
