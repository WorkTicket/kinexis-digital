type ComparisonSection = { group: string; rows: readonly (readonly string[])[] };
type ComparisonPlan = { slug: string; name: string; price: string; popular?: boolean; sticker?: { src: string; width: number; height: number; alt: string } };

const PLAN_STICKERS: Record<string, { file: string; width: number; height: number }> = {
  website: { file: "plan-name-website-97.webp", width: 676, height: 349 },
  "lead-system": { file: "plan-name-lead-system-197.webp", width: 730, height: 351 },
  plus: { file: "plan-name-plus-297.webp", width: 706, height: 332 },
  "own-it": { file: "plan-name-own-it-1497.webp", width: 753, height: 345 },
};

export default function MobilePlanComparison({ plans, sections, hint, popularLabel }: {
  plans: ComparisonPlan[];
  sections: ComparisonSection[];
  hint: string;
  popularLabel: string;
}) {
  return (
    <div className="mobile-plan-compare">
      <p className="mobile-plan-compare__hint">{hint}</p>
      {plans.map((plan, index) => (
        <details className={`mobile-plan-compare__card${plan.popular ? " mobile-plan-compare__card--popular" : ""}`} key={plan.slug} open={plan.popular}>
          <summary>
            {plan.popular && <span className="mobile-plan-compare__badge"><span aria-hidden="true">★</span>{popularLabel}<span aria-hidden="true">★</span></span>}
            <span className="mobile-plan-compare__title">
              <img
                className="mobile-plan-compare__sticker"
                src={plan.sticker?.src ?? `/assets/kinexis/stickers/${PLAN_STICKERS[plan.slug].file}`}
                alt={plan.sticker?.alt ?? `${plan.name} ${plan.price}`}
                width={plan.sticker?.width ?? PLAN_STICKERS[plan.slug].width}
                height={plan.sticker?.height ?? PLAN_STICKERS[plan.slug].height}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="mobile-plan-compare__toggle" aria-hidden="true" />
          </summary>
          <div className="mobile-plan-compare__body">
            {sections.map((section) => (
              <div className="mobile-plan-compare__group" key={section.group}>
                <h3>{section.group}</h3>
                <dl>
                  {section.rows.map(([label, ...values]) => (
                    <div className="mobile-plan-compare__row" key={label}>
                      <dt>{label}</dt>
                      <dd>{values[index] === "Yes" ? "Included" : values[index]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
