import { REVIEW_SOURCE_LABEL, type DisplayReview, type ReviewSource } from "@/lib/review-display";
import { clipReviewQuote } from "@/lib/review-limits";

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
    <div className="review-card__stars" role="img" aria-label={`${safe} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= safe} />
      ))}
    </div>
  );
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "K";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function detailLine(review: DisplayReview) {
  if (review.trade || review.city) {
    return [review.trade, review.city].filter(Boolean).join(" · ");
  }
  return [review.role, review.company].filter(Boolean).join(" · ");
}

export function UnifiedReviewCard({
  review,
  sourceLabels,
}: {
  review: DisplayReview;
  sourceLabels?: Partial<Record<ReviewSource, string>>;
}) {
  const source = sourceLabels?.[review.source] ?? REVIEW_SOURCE_LABEL[review.source];
  const quote = clipReviewQuote(review.quote);
  const truncated = quote !== review.quote.replace(/\s+/g, " ").trim();
  const detail = detailLine(review);

  return (
    <figure className="review-card">
      <header className="review-card__top">
        <Stars value={review.stars} />
        <span className={`review-card__source review-card__source--${review.source}`}>{source}</span>
      </header>

      <blockquote className="review-card__quote" title={truncated ? review.quote : undefined}>
        <span className="review-card__mark" aria-hidden="true">“</span>
        <p>{quote}</p>
      </blockquote>

      <figcaption className="review-card__person">
        <span className="review-card__avatar" aria-hidden="true">{initialsFor(review.name)}</span>
        <span className="review-card__meta">
          <b>{review.name}</b>
          {detail ? <span className="review-card__detail">{detail}</span> : null}
          {review.date ? <time dateTime={review.sortKey || undefined}>{review.date}</time> : null}
        </span>
      </figcaption>
    </figure>
  );
}
