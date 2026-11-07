import Link from "next/link";
import { getAllReviews } from "@/lib/reviews";
import { LeaveFacebookReview } from "./FacebookReviews";
import { LeaveTrustpilotReview } from "./TrustpilotReviews";
import { UnifiedReviewCard } from "./UnifiedReviewCard";
import { HL } from "./ui";

/** Recent reviews for project pages — one shared card format. */
export default async function ReviewsSection() {
  const reviews = (await getAllReviews()).slice(0, 3);

  return (
    <section className="section section--tint reviews-block">
      <div className="container">
        <p className="eyebrow center">Client reviews</p>
        <h2 className="center"><HL text="Reviews From Our Awesome Clients" mark="Awesome Clients" /></h2>
        <div className="review-cards">
          {reviews.map((review) => <UnifiedReviewCard key={review.id} review={review} />)}
        </div>
        <div className="review-actions spaced">
          <Link className="btn btn--primary" href="/reviews" prefetch={false}>Read More Reviews</Link>
          <LeaveTrustpilotReview />
          <LeaveFacebookReview />
        </div>
      </div>
    </section>
  );
}
