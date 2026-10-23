import Link from "next/link";
import { getFacebookReviews } from "@/lib/facebook";
import { FacebookReviewCard, LeaveFacebookReview } from "./FacebookReviews";
import { HL } from "./ui";

/** Facebook recommendations, used near the bottom of project pages. */
export default async function ReviewsSection() {
  const reviews = await getFacebookReviews();
  return (
    <section className="section section--tint reviews-block">
      <div className="container">
        <p className="eyebrow center">Facebook recommendations</p>
        <h2 className="center"><HL text="Reviews From Our Awesome Clients" mark="Awesome Clients" /></h2>
        <div className="review-cards">
          {reviews.map((review) => <FacebookReviewCard key={review.id} review={review} />)}
        </div>
        <div className="btn-row spaced">
          <Link className="btn btn--primary" href="/reviews" prefetch={false}>Read More Reviews</Link>
          <LeaveFacebookReview primary={false} />
        </div>
      </div>
    </section>
  );
}
