import { Icon } from "./artwork";
import type { ReactNode } from "react";

const REVIEW_STEPS = [
  {
    n: "1",
    title: "When the job is done",
    titleDisplay: <>When the job<br />is done</>,
    text: <>After each job, your customer<br />gets a text with a direct review<br />link. You don’t have to ask.</>,
    icon: "after-every-job",
  },
  {
    n: "2",
    title: "Straight to your profile",
    titleDisplay: <>Straight to<br />your profile</>,
    text: <>The link opens your Google<br />Business Profile, where a review<br />takes just a few taps.</>,
    icon: "one-tap-to-google",
  },
  {
    n: "3",
    title: "No extra follow-up",
    titleDisplay: <>No extra<br />follow-up</>,
    text: <>The request goes out for you.<br />New reviews reach your profile,<br />ready for you to reply.</>,
    icon: "no-chasing",
  },
] as const;

const REASONS = [
  {
    title: "Looks Great On Every Device",
    text: "A modern, responsive layout keeps your business looking professional on phones, tablets, and computers.",
    icon: "well-designed",
  },
  {
    title: "Designed To Bring In Calls",
    text: "Every page makes the next step clear, whether someone wants to call now or request a quote.",
    icon: "sales-focused",
  },
  {
    title: "Easy For Google To Find",
    text: "Clean page structure, useful headings, and fast load times help search engines read your site.",
    icon: "search-optimized",
  },
  {
    title: "Hosting And Updates Stay With Us",
    text: "We manage the hosting, routine changes, backups, and security instead of handing that work back to you.",
    icon: "hassle-free",
  },
] as const;

type ReviewStep = { n: string; title: string; titleDisplay?: ReactNode; text: ReactNode; icon: (typeof REVIEW_STEPS)[number]["icon"] };
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
          <h3>{step.titleDisplay ?? step.title}</h3>
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
