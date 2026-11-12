import Link from "next/link";
import { imageSrcSet, imageVariant } from "@/lib/image-sources";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import MobilePlanComparison from "@/components/MobilePlanComparison";
import { pageMetadata } from "@/lib/seo";
import { PRICING_COMPARISON } from "@/data/pricing-comparison";
import { industryCostPostPath } from "@/data/industries";
import { FAQS, PLANS, PLAN_TERM_GROUPS, PLAN_TEXTBACK_FOOTNOTE } from "@/lib/content";
import { OpenDialog } from "@/components/OpenDialog";
import { PageSchema } from "@/components/JsonLd";
import { Faq, HL, PageHero, Section } from "@/components/ui";

const TRADE_COST_LINKS = [
  { slug: "plumbing", label: "plumber website cost" },
  { slug: "hvac", label: "HVAC website cost" },
  { slug: "electrical", label: "electrician website cost" },
  { slug: "roofing", label: "roofing website cost" },
  { slug: "landscaping", label: "landscaping website cost" },
  { slug: "garage-doors", label: "garage door website cost" },
  { slug: "pressure-washing", label: "pressure washing website cost" },
] as const;

export const metadata = pageMetadata("pricing");

const TABLE = PRICING_COMPARISON;

function Cell({ value }: { value: string }) {
  if (value === "Yes") return <span className="yes" role="img" aria-label="Included">✓</span>;
  if (value === "—") return <span className="no" role="img" aria-label="Not included">—</span>;
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
    <picture>
      <source type="image/avif" srcSet={imageSrcSet(sticker.src, [400], "avif")} sizes={kind === "offer" ? "232px" : "240px"} />
      <img className={`plan-sticker plan-sticker--${kind}`} src={imageVariant(sticker.src, 400, "webp")} srcSet={imageSrcSet(sticker.src, [400])} sizes={kind === "offer" ? "232px" : "240px"} alt={sticker.alt} width={sticker.width} height={sticker.height} loading="lazy" decoding="async" fetchPriority="low" />
    </picture>
  );
}

export default function Page() {
  return (
    <>
      <PageSchema page="pricing" faqs={FAQS} />
      <PageHero
        h1="Choose The Website Plan That Fits"
        mark="Plan That Fits"
        sub="Start with the site your business needs, then add the level of follow-up you want. Every plan begins with a free homepage preview, with no card or obligation."
        image="pricing"
        imageAlt="Pricing artwork with a payment card and checkmarks"
      />

      <Section>
        <div className="free-preview">
          <div className="free-preview__copy">
            <span className="free-preview__mark" aria-hidden="true" />
            <div>
              <b>Free homepage preview in 2 business days.</b>
              <span>Every plan begins with a free preview. You don’t need a card and there’s no obligation.</span>
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
                <p className="plan__guarantee plan__guarantee--refund">30-day money-back guarantee</p>
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

        <p className="pay-bridge">Already approved your preview? <Link className="trust-mark" href="/pay" prefetch={false}>Continue to checkout</Link>.</p>

        <div className="guarantee-stack">
          <div className="guarantee-band">
            <GuaranteeBadge />
            <div>
              <h3><HL text="No tracked leads in 60 days? Two charges are waived." mark="Two charges" /></h3>
              <p>
                If Lead System or Plus produces <b>zero tracked leads in your first 60 days live</b>, your{" "}
                <b>3rd and 4th monthly charges are waived</b>. A tracked lead is a
                call of 30+ seconds, a missed caller who replies to the text-back, or a real quote form. One guarantee
                per business.
              </p>
              <p className="fineprint">
                <OpenDialog id="guarantee" className="trust-mark">Read the full guarantee</OpenDialog>
              </p>
            </div>
          </div>

          <div className="guarantee-band guarantee-band--refund">
            <div>
              <h3><HL text="30-Day Money-Back Guarantee" mark="Money-Back" /></h3>
              <p>
                Every plan includes a <b>30-day money-back guarantee</b>. If you are not satisfied with your website
                within <b>30 days of launch</b>, we refund your <b>most recent payment in full</b>. Requests must be
                made in writing. Third-party costs already paid on your behalf are not refundable.
              </p>
              <p className="fineprint">
                <OpenDialog id="refund" className="trust-mark">Read the refund details</OpenDialog>
              </p>
            </div>
          </div>
        </div>

        <aside className="pricing-terms" aria-labelledby="pricing-terms-heading">
          <header className="pricing-terms__head">
            <b id="pricing-terms-heading">The terms, stated clearly</b>
            <p>Plain-language summary of billing, canceling, text-back, and guarantees. The agreement you approve at checkout controls if anything differs.</p>
          </header>
          <div className="pricing-terms__grid">
            {PLAN_TERM_GROUPS.map((group) => (
              <section className="pricing-terms__group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((term) => (
                    <li key={term}>{term}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <div className="pricing-terms__foot">
            <p className="pricing-footnote">
              <b>**</b> {PLAN_TEXTBACK_FOOTNOTE}
            </p>
            <Link href="/terms" prefetch={false}>Full plan terms →</Link>
          </div>
        </aside>
      </Section>

      <Section tint>
        <h2 className="center"><HL text="See What Each Plan Covers" mark="Each Plan" /></h2>
        <p className="center muted">Compare the included work side by side. There are no surprise setup fees.</p>
        <MobilePlanComparison
          plans={PLANS.map((plan, index) => ({ ...plan, price: TABLE[2].rows[5][index + 1] }))}
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

      <Section>
        <h2 className="center"><HL text="Website Cost by Trade" mark="by Trade" /></h2>
        <p className="center muted">Same four plans. Trade pages explain what changes for each job type.</p>
        <ul className="industry-reads__list" style={{ maxWidth: "36rem", marginInline: "auto" }}>
          {TRADE_COST_LINKS.map((item) => (
            <li key={item.slug}>
              <Link href={industryCostPostPath(item.slug)} prefetch={false}>
                <span className="industry-reads__title">{item.label}</span>
                <span className="industry-reads__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" narrow>
        <h2 className="center"><HL text="Questions About Plans And Billing" mark="Plans And Billing" /></h2>
        <Faq items={FAQS} />
      </Section>
    </>
  );
}
