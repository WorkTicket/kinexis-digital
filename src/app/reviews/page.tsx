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
      <PageHero h1="Reviews" mark="Reviews" sub="Recommendations clients have left on our Facebook page." image="reviews" imageAlt="Symbolic review cards beside a business owner" />
      <Section>
        <div className="review-cards">
          {reviews.map((review) => <FacebookReviewCard key={review.id} review={review} />)}
        </div>
        <div className="btn-row spaced justify-center">
          <LeaveFacebookReview />
        </div>
      </Section>
      <CtaBand h="Want a Site That Brings in Work?" mark="in Work" sub="Start with a free homepage preview for your trade. No card and no obligation." btn="Get Started" />
    </>
  );
}
