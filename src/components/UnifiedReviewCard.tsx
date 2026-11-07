import { REVIEW_SOURCE_LABEL, type DisplayReview, type ReviewSource } from "@/lib/reviews";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className={filled ? "is-on" : "is-off"}>
      <path
        d="M10 1.5l2.35 5.1 5.55.56-4.2 3.7 1.27 5.4L10 13.7l-4.97 2.56 1.27-5.4-4.2-3.7 5.55-.56L10 1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function Stars({ value }: { value: number }) {
  const safe = Math.min(5, Math.max(0, Math.round(value)));
  return (
    <div className="review-card__stars" aria-label={`${safe} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= safe} />
      ))}
    </div>
  );
}

function ThumbsUp() {
  return (
    <span className="review-card__avatar review-card__avatar--thumb" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path
          fill="currentColor"
          d="M2 10.5v9A1.5 1.5 0 0 0 3.5 21H7v-12H3.5A1.5 1.5 0 0 0 2 10.5zm18.16-1.13-4.05-1.2V5.5A3.5 3.5 0 0 0 12.61 2l-.5.08a1.5 1.5 0 0 0-1.1 1.79l.7 3.38H9v12h8.56a2.5 2.5 0 0 0 2.44-1.95l1.2-5.5a2.5 2.5 0 0 0-1.04-2.43z"
        />
      </svg>
    </span>
  );
}

export function UnifiedReviewCard({
  review,
  sourceLabels,
}: {
  review: DisplayReview;
  sourceLabels?: Partial<Record<ReviewSource, string>>;
}) {
  const source = sourceLabels?.[review.source] ?? REVIEW_SOURCE_LABEL[review.source];

  return (
    <figure className="review-card">
      <header className="review-card__top">
        <Stars value={review.stars} />
        <span className={`review-card__source review-card__source--${review.source}`}>{source}</span>
      </header>

      <blockquote className="review-card__quote">
        <span className="review-card__mark" aria-hidden="true">“</span>
        <p>{review.quote}</p>
      </blockquote>

      <figcaption className="review-card__person">
        <ThumbsUp />
        <span className="review-card__meta">
          <b>{review.name}</b>
          {review.role || review.company ? (
            <span className="review-card__detail">
              {review.role ? <span className="review-card__role">{review.role}</span> : null}
              {review.role && review.company ? <span className="review-card__sep" aria-hidden="true"> · </span> : null}
              {review.company ? <span className="review-card__company">{review.company}</span> : null}
            </span>
          ) : null}
          {review.date ? <time dateTime={review.sortKey || undefined}>{review.date}</time> : null}
        </span>
      </figcaption>
    </figure>
  );
}
