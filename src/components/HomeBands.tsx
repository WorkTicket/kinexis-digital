import { Icon } from "./artwork";
import type { ReactNode } from "react";

const REVIEW_STEPS = [
  {
    n: "1",
    title: "Missed call, automatic text",
    titleDisplay: <>Missed call,<br />automatic text</>,
    text: <>When you cannot pick up, a text goes<br />out on your tracking number so the<br />lead does not go cold.</>,
    icon: "missed-call-text-back",
  },
  {
    n: "2",
    title: "After the job is done",
    titleDisplay: <>After the job<br />is done</>,
    text: <>Your customer gets a text with a<br />direct Google review link. You do<br />not have to ask in person.</>,
    icon: "after-every-job",
  },
  {
    n: "3",
    title: "Straight to your profile",
    titleDisplay: <>Straight to<br />your profile</>,
    text: <>The link opens your Google Business<br />Profile. New reviews land ready<br />for you to reply to them.</>,
    icon: "one-tap-to-google",
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
    text: "Every page makes the next step clear, whether someone wants to call now or request a quote online.",
    icon: "sales-focused",
  },
  {
    title: "Easy For Google To Find",
    text: "Clean page structure, useful headings, and fast load times help search engines read your site clearly.",
    icon: "search-optimized",
  },
  {
    title: "Hosting And Updates Stay With Us",
    text: "We manage hosting, routine changes, backups, and security instead of handing that work back to you.",
    icon: "hassle-free",
  },
] as const;

type ReviewStep = { n: string; title: string; titleDisplay?: ReactNode; text: ReactNode; icon: (typeof REVIEW_STEPS)[number]["icon"] | string };
type Reason = { title: string; text: string; icon: (typeof REASONS)[number]["icon"] };

/** Lead System sequence: missed-call text-back, then Google review request. */
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
