import Link from "next/link";
import { DeferredImg } from "./DeferredImg";
import { HL } from "./ui";

/** Free site audit band. The laptop-and-rocket graphic straddles the section above it. */
export default function AuditCta({
  eyebrow = "Free site audit",
  heading = "Get a Free Site Audit & Increase Your Profitability",
  mark = "Your Profitability",
  text = "Let us show you areas for dramatic improvement on your website. We offer free and paid website audit services.",
  cta = "Get A Free Site Audit",
  href = "/audit",
  alt = "A rocket launches upward from a laptop screen",
}: {
  eyebrow?: string;
  heading?: string;
  mark?: string;
  text?: string;
  cta?: string;
  href?: string;
  alt?: string;
}) {
  return (
    <section className="audit-cta" aria-labelledby="audit-cta-heading">
      <div className="container audit-cta__inner">
        <div className="audit-cta__art">
          <DeferredImg
            src="/assets/brand/rocket-launch-laptop-sm.webp"
            alt={alt}
            width={800}
            height={1200}
            className="audit-cta__img"
          />
        </div>
        <div className="audit-cta__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="audit-cta-heading"><HL text={heading} mark={mark} /></h2>
          <p>{text}</p>
          <Link className="btn btn--light btn--lg" href={href} prefetch={false}>{cta}</Link>
        </div>
      </div>
    </section>
  );
}
