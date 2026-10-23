import { FACEBOOK_PAGE_URL, FACEBOOK_REVIEW_URL, type FacebookReview } from "@/lib/facebook";

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        fill="#0866FF"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
      />
    </svg>
  );
}

export function FacebookReviewCard({ review, recommends = "Recommends", doesNot = "Does not recommend" }: { review: FacebookReview; recommends?: string; doesNot?: string }) {
  return (
    <figure className="review-card">
      <header className="review-card__top">
        <p className={`review-card__label${review.recommends ? "" : " review-card__label--no"}`}>
          {review.recommends ? recommends : doesNot}
        </p>
        <a className="review-card__mark" href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" aria-label="Kinexis Digital on Facebook">
          <FacebookLogo />
        </a>
      </header>
      <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
      <figcaption>
        <b>{review.name}</b>
        {review.date ? <span>{review.date}</span> : null}
      </figcaption>
    </figure>
  );
}

export function LeaveFacebookReview({ primary = true, label = "Leave a Review on Facebook" }: { primary?: boolean; label?: string }) {
  return (
    <a
      className={primary ? "btn btn--primary" : "btn btn--ghost"}
      href={FACEBOOK_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
