import Link from "next/link";
import {
  getAllReviews,
  getCuratedReviews,
  pickHomeReviews,
} from "@/lib/reviews";
import { LeaveFacebookReview } from "./FacebookReviews";
import { LeaveTrustpilotReview } from "./TrustpilotReviews";
import { UnifiedReviewCard } from "./UnifiedReviewCard";
import { HL } from "./ui";

type ReviewsSectionProps = {
  /** Homepage band: curated quotes + CTA to /reviews only. */
  variant?: "default" | "home";
  limit?: number;
  eyebrow?: string;
  title?: string;
  mark?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

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
  // Homepage keeps curated quotes only so the first paint never waits on
  // Facebook / Trustpilot / KV. Live aggregation stays on /reviews.
  const home = variant === "home";
  const all = home ? getCuratedReviews() : await getAllReviews();
  if (all.length === 0) return null;

  const reviews = home ? pickHomeReviews(all, limit) : all.slice(0, limit);
  if (reviews.length === 0) return null;

  return (
    <section className={`section reviews-block${home ? " reviews-block--home" : ""}`}>
      <div className="container">
        <p className="eyebrow center">{eyebrow}</p>
        <h2 className="center"><HL text={title} mark={mark} /></h2>
        {sub ? <p className="center muted">{sub}</p> : null}
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
