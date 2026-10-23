import { Icon } from "./artwork";

const REVIEW_STEPS = [
  {
    n: "1",
    title: "After every job",
    text: "A review request goes out by text with a direct link. No awkward ask and no login for the customer.",
    icon: "after-every-job",
  },
  {
    n: "2",
    title: "One tap to Google",
    text: "The link opens your Google Business Profile, so leaving a review takes a few seconds on a phone.",
    icon: "one-tap-to-google",
  },
  {
    n: "3",
    title: "No chasing",
    text: "New reviews show up on your profile without you remembering to ask. Reply from your Google account.",
    icon: "no-chasing",
  },
] as const;

const REASONS = [
  {
    title: "Well Designed",
    text: "Looks great on every device and makes your business look just as good as it is.",
    icon: "well-designed",
  },
  {
    title: "Sales-Focused",
    text: "Clear calls to action across every page, so visitors become calls and enquiries.",
    icon: "sales-focused",
  },
  {
    title: "Search Optimized",
    text: "Technical SEO and a clean structure so Google can find your site and rank it.",
    icon: "search-optimized",
  },
  {
    title: "Hassle Free",
    text: "Hosting, updates, and security handled for you, so you never worry about it.",
    icon: "hassle-free",
  },
] as const;

type ReviewStep = { n: string; title: string; text: string; icon: (typeof REVIEW_STEPS)[number]["icon"] };
type Reason = { title: string; text: string; icon: (typeof REASONS)[number]["icon"] };

/** A connected sequence: job, tap, review. One instrument, not three cards. */
export function ReviewRail({ steps = REVIEW_STEPS }: { steps?: readonly ReviewStep[] }) {
  return (
    <ol className="review-rail">
      {steps.map((step) => (
        <li key={step.title} className="review-rail__step">
          <div className="review-rail__mark">
            <span className="review-rail__icon">
              <Icon name={step.icon} alt="" size={84} className="icon--bare" />
            </span>
            <span className="review-rail__num" aria-hidden="true">{step.n}</span>
          </div>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Four matched promises on one sheet: what the visit feels like, then what you never manage. */
export function ReasonBoard({ reasons = REASONS }: { reasons?: readonly Reason[] }) {
  return (
    <ul className="reason-sheet">
      {reasons.map((reason) => (
        <li key={reason.title} className="reason-sheet__item">
          <div className="reason-sheet__mark">
            <Icon name={reason.icon} alt="" size={96} className="icon--bare" />
          </div>
          <div className="reason-sheet__copy">
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
