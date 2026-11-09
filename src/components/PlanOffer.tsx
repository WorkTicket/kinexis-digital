import Link from "next/link";
import { PLANS } from "@/lib/content";
import { HL } from "./mark";

type Sticker = { src: string; alt: string; width: number; height: number };

/** The same package-name stickers used in the "Compare the Plans" table. */
const PLAN_NAME_STICKERS: Record<string, Sticker> = {
  website: { src: "/assets/kinexis/stickers/plan-name-website-97.webp", alt: "Website $97 / mo", width: 676, height: 349 },
  "lead-system": { src: "/assets/kinexis/stickers/plan-name-lead-system-197.webp", alt: "Lead System $197 / mo", width: 730, height: 351 },
  plus: { src: "/assets/kinexis/stickers/plan-name-plus-297.webp", alt: "Plus $297 / mo", width: 706, height: 332 },
  "own-it": { src: "/assets/kinexis/stickers/plan-name-own-it-1497.webp", alt: "Own It $1,497 once", width: 753, height: 345 },
};

function PlanSticker({ sticker }: { sticker: Sticker }) {
  return (
    <img
      className="offer__sticker"
      src={sticker.src}
      alt={sticker.alt}
      width={sticker.width}
      height={sticker.height}
      loading="lazy"
      decoding="async"
    />
  );
}

/** The same four plans, with the same prices, on the homepage and every industry page. */
export default function PlanOffer({
  heading = "Website Plans and Pricing",
  mark = "Plans and Pricing",
  href = "/contact",
  pricingHref = "/pricing",
  eyebrow = "Four Plans · One Free Preview",
  chip = "$0 down",
  note = "Every plan starts with a free homepage preview in 2 business days — no card, no obligation. Month-to-month, cancel anytime.",
  badge = "Most popular",
  cta = "Get My Free Preview",
  planCta = "Start with a free preview",
  secondary = "See Plans & Pricing",
  trust = "60-Day Lead Guarantee · $0 down · Free preview in 2 business days",
  plans = PLANS,
  // Priced stickers bake USD into the art — hide them on Spain chrome.
  showStickers = true,
}: {
  heading?: string;
  mark?: string;
  href?: string;
  pricingHref?: string;
  eyebrow?: string;
  chip?: string;
  note?: string;
  badge?: string;
  cta?: string;
  planCta?: string;
  secondary?: string;
  trust?: string;
  plans?: typeof PLANS;
  showStickers?: boolean;
}) {
  return (
    <>
      <p className="eyebrow center">{eyebrow}</p>
      <h2 className="center"><HL text={heading} mark={mark} /></h2>
      <div className="offer__lockup">
        <p className="offer__num">{plans[0].price}{plans[0].suffix ? <small>{plans[0].suffix}</small> : null}</p>
        <p className="offer__chip">{chip}</p>
      </div>
      <p className="center muted offer__note">{note}</p>
      <ul className="offer__plans">
        {plans.map((plan) => (
          <li key={plan.slug}>
            <Link
              className={`offer__plan${plan.popular ? " is-pop" : ""}`}
              href={`${href}?plan=${plan.slug}`}
              prefetch={false}
            >
              {plan.popular ? <span className="offer__badge">{badge}</span> : null}
              {showStickers ? <PlanSticker sticker={PLAN_NAME_STICKERS[plan.slug]} /> : null}
              <h3 className="offer__line">{plan.name}</h3>
              <span className="offer__tagline">{plan.tagline}</span>
              <span className="offer__plan-cta">{planCta}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="center btn-row spaced">
        <Link className="btn btn--primary btn--lg" href={href} prefetch={false}>{cta}</Link>
        <Link className="btn btn--ghost btn--lg" href={pricingHref} prefetch={false}>{secondary}</Link>
      </p>
      <p className="center muted small">{trust}</p>
    </>
  );
}
