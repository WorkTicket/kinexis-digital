import dynamic from "next/dynamic";
import { pageMetadata } from "@/lib/seo";
import { getAllReviews } from "@/lib/reviews";
import { LeaveFacebookReview } from "@/components/FacebookReviews";
import { LeaveTrustpilotReview } from "@/components/TrustpilotReviews";
import { UnifiedReviewCard } from "@/components/UnifiedReviewCard";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, HL, PageHero, Section } from "@/components/ui";

const SiteReviewForm = dynamic(() => import("@/components/SiteReviewForm"));

export const metadata = pageMetadata("reviews");
export const revalidate = 3600;

export default async function Page() {
  const reviews = await getAllReviews();

  return (
    <>
      <PageSchema page="reviews" />
      <PageHero
        h1="Client Reviews"
        mark="Client Reviews"
        sub="Read what clients have shared — on this site, on Trustpilot, and on Facebook."
        image="reviews"
        imageAlt="Symbolic review cards beside a business owner"
      />

      <Section>
        <h2 className="center"><HL text="Share Your Experience" mark="Your Experience" /></h2>
        <p className="center muted">Leave a review here on the site, or open Trustpilot or Facebook in one click.</p>
        <div className="review-actions spaced">
          <LeaveTrustpilotReview />
          <LeaveFacebookReview />
        </div>
        <div className="site-review-panel spaced">
          <SiteReviewForm />
        </div>
      </Section>

      <Section tint>
        <h2 className="center"><HL text="What Clients Have Shared" mark="Have Shared" /></h2>
        <p className="center muted">
          {reviews.length > 0
            ? "Reviews from this site, Trustpilot, and Facebook — same format, newest first."
            : "No reviews yet. Be the first to share your experience."}
        </p>
        {reviews.length > 0 ? (
          <div className="review-cards">
            {reviews.map((review) => <UnifiedReviewCard key={review.id} review={review} />)}
          </div>
        ) : null}
        <div className="review-actions spaced">
          <LeaveTrustpilotReview />
          <LeaveFacebookReview />
        </div>
      </Section>

      <CtaBand h="Want To See Your Own Homepage?" mark="Your Own Homepage" sub="Start with a free preview written for your business. No card and no obligation." btn="See My Homepage First" />
    </>
  );
}
