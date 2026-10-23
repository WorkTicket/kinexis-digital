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
  heading = "Websites Built For Your Trade Starting At Only",
  mark = "Your Trade",
  href = "/pricing",
  eyebrow = "Four Plans · One Free Preview",
  chip = "$0 down",
  note = "Every plan starts with a free homepage preview — no card, no obligation.",
  badge = "Most popular",
  cta = "See the Four Plans",
  plans = PLANS,
}: {
  heading?: string;
  mark?: string;
  href?: string;
  eyebrow?: string;
  chip?: string;
  note?: string;
  badge?: string;
  cta?: string;
  plans?: typeof PLANS;
}) {
  return (
    <>
      <p className="eyebrow center">{eyebrow}</p>
      <h2 className="center"><HL text={heading} mark={mark} /></h2>
      <div className="offer__lockup">
        <p className="offer__num">{plans[0].price}<small>{plans[0].suffix}</small></p>
        <p className="offer__chip">{chip}</p>
      </div>
      <p className="center muted offer__note">{note}</p>
      <ul className="offer__plans">
        {plans.map((plan) => (
          <li key={plan.slug}>
            <Link className={`offer__plan${plan.popular ? " is-pop" : ""}`} href={href} prefetch={false}>
              {plan.popular ? <span className="offer__badge">{badge}</span> : null}
              <PlanSticker sticker={PLAN_NAME_STICKERS[plan.slug]} />
              <span className="offer__line">{plan.tagline}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="center btn-row spaced"><Link className="btn btn--primary btn--lg" href={href} prefetch={false}>{cta}</Link></p>
    </>
  );
}
