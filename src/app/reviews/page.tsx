import { pageMetadata } from "@/lib/seo";
import { getFacebookReviews } from "@/lib/facebook";
import { FacebookReviewCard, LeaveFacebookReview } from "@/components/FacebookReviews";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("reviews");
export const revalidate = 3600;

export default async function Page() {
  const reviews = await getFacebookReviews();
  return (
    <>
      <PageSchema page="reviews" />
      <PageHero h1="What Clients Have Shared" mark="Clients Have Shared" sub="Read the recommendations posted directly to our Facebook page." image="reviews" imageAlt="Symbolic review cards beside a business owner" />
      <Section>
        <div className="review-cards">
          {reviews.map((review) => <FacebookReviewCard key={review.id} review={review} />)}
        </div>
        <div className="btn-row spaced justify-center">
          <LeaveFacebookReview />
        </div>
      </Section>
      <CtaBand h="Want To See Your Own Homepage?" mark="Your Own Homepage" sub="Start with a free preview written for your trade. No card and no obligation." btn="See My Homepage First" />
    </>
  );
}
