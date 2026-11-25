import { TRUSTPILOT_EVALUATE_URL } from "@/lib/trustpilot";

function TrustpilotMark() {
  return (
    <svg className="review-cta__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="#00B67A"
        d="M12 1.5 14.9 8.4l7.5.7-5.6 4.8 1.8 7.3L12 17.6l-6.6 3.6 1.8-7.3L1.6 9.1l7.5-.7L12 1.5z"
      />
    </svg>
  );
}

/** Opens Trustpilot’s evaluate form in a new tab — matched to site sticker buttons. */
export function LeaveTrustpilotReview({
  primary = false,
  label = "Leave a Review on Trustpilot",
}: {
  /** Kept for call-site compatibility. */
  locale?: string;
  primary?: boolean;
  label?: string;
}) {
  return (
    <a
      className={`btn review-cta${primary ? " btn--primary" : " btn--ghost"}`}
      href={TRUSTPILOT_EVALUATE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <TrustpilotMark />
      <span>{label}</span>
    </a>
  );
}
