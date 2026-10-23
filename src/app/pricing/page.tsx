import Link from "next/link";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import MobilePlanComparison from "@/components/MobilePlanComparison";
import { pageMetadata } from "@/lib/seo";
import { FAQS, PLANS, PLAN_TERMS } from "@/lib/content";
import { OpenDialog } from "@/components/DialogHost";
import { PageSchema } from "@/components/JsonLd";
import { Faq, HL, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("pricing");

const TABLE: { group: string; rows: [string, string, string, string, string][] }[] = [
  {
    group: "The site",
    rows: [
      ["Pages included", "Up to 5", "Up to 10", "Up to 20", "Up to 10"],
      ["Hosting, SSL, backups", "Included", "Included", "Included", "12 months"],
      ["Small edits", "2 / month, 2 days", "Unlimited, 1 day", "Unlimited, same day", "30 min / month"],
      ["New pages", "$99 each", "1 / month included", "2 / month included", "Quoted"],
      ["You own the site files", "—", "—", "—", "Yes"],
    ],
  },
  {
    group: "Lead follow-up",
    rows: [
      ["Missed-call text-back", "—", "Yes", "English + Spanish", "—"],
      ["Google review requests", "—", "After every job", "English + Spanish", "—"],
      ["Google Business Profile", "—", "Tune-up", "Tune-up + 2 posts / mo", "—"],
      ["Call tracking + report", "—", "Monthly", "Monthly", "—"],
      ["Bilingual site", "—", "—", "Yes", "—"],
    ],
  },
  {
    group: "The deal",
    rows: [
      ["60-day lead guarantee", "—", "Yes", "Yes", "—"],
      ["Minimum", "3 months", "3 months", "3 months", "None"],
      ["Price locked", "24 months", "24 months", "24 months", "One payment"],
      ["Price", "$97 / mo", "$197 / mo", "$297 / mo", "$1,497 once"],
    ],
  },
];

function Cell({ value }: { value: string }) {
  if (value === "Yes") return <span className="yes" aria-label="Included">✓</span>;
  if (value === "—") return <span className="no" aria-label="Not included">—</span>;
  return <>{value}</>;
}

type Sticker = { src: string; alt: string; width: number; height: number };

const STICKERS: Record<string, { name: Sticker; offer: Sticker }> = {
  website: {
    name: { src: "/assets/kinexis/stickers/plan-name-website-97.webp", alt: "Website $97 / mo", width: 676, height: 349 },
    offer: { src: "/assets/kinexis/stickers/zero-down-website-97.webp", alt: "$0 down, then $97/mo", width: 695, height: 348 },
  },
  "lead-system": {
    name: { src: "/assets/kinexis/stickers/plan-name-lead-system-197.webp", alt: "Lead System $197 / mo", width: 730, height: 351 },
    offer: { src: "/assets/kinexis/stickers/zero-down-lead-system-197.webp", alt: "$0 down, then $197/mo", width: 719, height: 348 },
  },
  plus: {
    name: { src: "/assets/kinexis/stickers/plan-name-plus-297.webp", alt: "Plus $297 / mo", width: 706, height: 332 },
    offer: { src: "/assets/kinexis/stickers/zero-down-plus-297.webp", alt: "$0 down, then $297/mo", width: 720, height: 351 },
  },
  "own-it": {
    name: { src: "/assets/kinexis/stickers/plan-name-own-it-1497.webp", alt: "Own It $1,497 once", width: 753, height: 345 },
    offer: { src: "/assets/kinexis/stickers/zero-down-own-it-1497.webp", alt: "Own It $1,497 once", width: 746, height: 348 },
  },
};

function PlanSticker({ sticker, kind }: { sticker: Sticker; kind: "name" | "offer" }) {
  return (
    <img
      className={`plan-sticker plan-sticker--${kind}`}
      src={sticker.src}
      alt={sticker.alt}
      width={sticker.width}
      height={sticker.height}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
    />
  );
}

export default function Page() {
  return (
    <>
      <PageSchema page="pricing" faqs={FAQS} />
      <PageHero
        h1="Four Plans. One Free Preview."
        mark="Free Preview"
        sub="A site built for your trade, then as much lead follow-up as you want. Every plan starts with a free homepage preview — no card, no obligation."
        image="pricing"
        imageAlt="Pricing artwork with a payment card and checkmarks"
      />

      <Section>
        <div className="free-preview">
          <div className="free-preview__copy">
            <span className="free-preview__mark" aria-hidden="true" />
            <div>
              <b>See your homepage before you pay.</b>
              <span>Every plan starts with a free homepage preview. No card, no obligation.</span>
            </div>
          </div>
          <span className="free-preview__tag">Free preview first</span>
        </div>

        <div className="plans">
          {PLANS.map((plan) => (
            <article className={`plan${plan.popular ? " plan--pop" : ""}`} key={plan.slug}>
              {plan.popular && <span className="plan__badge">Most Popular</span>}
              <div className="plan__intro">
                <h2 className="plan-title">{plan.name}</h2>
                <p className="plan__tagline">{plan.tagline}</p>
                <PlanSticker sticker={STICKERS[plan.slug].offer} kind="offer" />
                <p className="plan__note">{plan.note}</p>
                {plan.guarantee && (
                  <p className="plan__guarantee">60-day lead guarantee included</p>
                )}
                <Link
                  className="btn plan__cta btn--primary"
                  href={`/contact?plan=${plan.slug}`}
                  prefetch={false}
                >
                  {plan.cta}
                </Link>
              </div>
              <div className="plan__body">
                <p className="plan__includes">What&apos;s included</p>
                <ul className="ticks">
                  {plan.features.map(([title, detail]) => (
                    <li key={title}>
                      <b>{title}</b>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="pay-bridge">Already approved your preview? <Link href="/pay" prefetch={false}>Continue to checkout</Link>.</p>

        <div className="guarantee-band">
          <GuaranteeBadge />
          <div>
            <h3><HL text="Zero tracked leads in 60 days? We waive two months." mark="two months" /></h3>
            <p>
              If Lead System or Plus produces <b>zero tracked leads in your first 60 days live</b>, your{" "}
              <b>3rd and 4th monthly charges are waived</b> and the <b>minimum is dropped</b>. A tracked lead is a
              call of 30+ seconds, a missed caller who replies to the text-back, or a real quote form. One guarantee
              per business.
            </p>
            <p className="fineprint">
              <OpenDialog id="guarantee" className="link-btn">Read the full guarantee</OpenDialog>
            </p>
          </div>
        </div>

        <div className="fineprint pricing-fineprint">
          <b>The fine print, in plain English:</b>
          <ul className="fineprint-list">
            {PLAN_TERMS.slice(1).map((term) => <li key={term}>{term}</li>)}
            <li><b>30-day money-back guarantee</b> on all plans.</li>
          </ul>
          <Link href="/terms" prefetch={false}>Full plan terms →</Link>
        </div>
      </Section>

      <Section tint>
        <h2 className="center"><HL text="Compare the Plans" mark="the Plans" /></h2>
        <p className="center muted">Everything included, side by side. No surprise setup fees.</p>
        <MobilePlanComparison
          plans={PLANS.map((plan, index) => ({ ...plan, price: TABLE[2].rows[3][index + 1] }))}
          sections={TABLE}
          hint="Tap a plan to see everything included. Open two to compare."
          popularLabel="Most Popular"
        />
        <div className="table-scroll pricing-comparison-table">
          <table className="plan-table">
            <thead>
              <tr>
                <th scope="col">What you get</th>
                <th scope="col"><PlanSticker sticker={STICKERS.website.name} kind="name" /></th>
                <th scope="col" className="is-pop"><PlanSticker sticker={STICKERS["lead-system"].name} kind="name" /></th>
                <th scope="col"><PlanSticker sticker={STICKERS.plus.name} kind="name" /></th>
                <th scope="col"><PlanSticker sticker={STICKERS["own-it"].name} kind="name" /></th>
              </tr>
            </thead>
            {TABLE.map((section) => (
              <tbody key={section.group}>
                <tr className="plan-table__group">
                  <th colSpan={5} scope="rowgroup"><span>{section.group}</span></th>
                </tr>
                {section.rows.map(([label, ...values]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {values.map((value, i) => (
                      <td className={i === 1 ? "is-pop" : undefined} key={`${label}-${i}`}>
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Section>

      <Section id="faq" narrow>
        <h2 className="center"><HL text="Pricing Questions" mark="Questions" /></h2>
        <Faq items={FAQS} />
      </Section>
    </>
  );
}
