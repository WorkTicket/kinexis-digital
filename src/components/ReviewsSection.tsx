import Link from "next/link";
import { averageReviewStars, getAllReviews } from "@/lib/reviews";
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
};

function RatingLine({ average, label }: { average: number; label?: string }) {
  const display = average.toFixed(1);
  return (
    <p className="reviews-rating" aria-label={`${display} out of 5 average`}>
      <span className="reviews-rating__stars" aria-hidden="true">
        {"★★★★★"}
      </span>
      <span className="reviews-rating__score">{display}</span>
      <span className="reviews-rating__copy">{label ?? "average"}</span>
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
}: ReviewsSectionProps) {
  const reviews = (await getAllReviews()).slice(0, limit);
  if (reviews.length === 0) return null;

  const average = averageReviewStars(reviews);
  const showRating = variant === "home" && average >= 4.5;
  const home = variant === "home";

  return (
    <section className={`section section--tint reviews-block${home ? " reviews-block--home" : ""}`}>
      <div className="container">
        <p className="eyebrow center">{eyebrow}</p>
        <h2 className="center"><HL text={title} mark={mark} /></h2>
        {sub ? <p className="center muted">{sub}</p> : null}
        {showRating ? <RatingLine average={average} /> : null}
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
