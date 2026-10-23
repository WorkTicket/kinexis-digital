import Link from "next/link";
import { kitSrc } from "@/lib/site";
import { HL } from "./mark";

const CHECKS = [
  {
    title: "Speed",
    text: "How fast each page loads for visitors on phones and desktop computers.",
    icon: "speed",
  },
  {
    title: "Search Visibility",
    text: "How headings and pages help search engines read and understand the website.",
    icon: "search",
  },
  {
    title: "Mobile Experience",
    text: "How well the site fits phones, from readable type to reachable controls.",
    icon: "mobile",
  },
  {
    title: "Calls & Quote Requests",
    text: "How phone numbers, buttons and forms guide visitors to the next step.",
    icon: "conversion",
  },
] as const;

/** Reused on every industry page. The artwork is the audit hero, not the trade collage. */
export default function IndustryAudit({
  eyebrow = "Free site audit",
  heading = "Get a Free Site Audit & Increase Your Profitability.",
  mark = "Your Profitability",
  text = "Let us show you areas for dramatic improvement on your website. We offer free and paid website audit services.",
  cta = "Get A Free Site Audit",
  href = "/audit",
  alt = "Laptop, phone, magnifying glass and an audit card",
  checks = CHECKS,
}: {
  eyebrow?: string;
  heading?: string;
  mark?: string;
  text?: string;
  cta?: string;
  href?: string;
  alt?: string;
  checks?: readonly { title: string; text: string; icon: string }[];
} = {}) {
  return (
    <section className="industry-audit" aria-labelledby="industry-audit-heading">
      <div className="container">
        <div className="industry-audit__top">
          <div className="industry-audit__copy">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="industry-audit-heading">
              <HL text={heading} mark={mark} />
            </h2>
            <p>{text}</p>
          </div>
          <div className="industry-audit__cta">
            <Link className="btn btn--light" href={href} prefetch={false}>{cta}</Link>
          </div>
          <div className="industry-audit__art">
            <picture>
              <source media="(max-width: 860px)" srcSet="/assets/audit/hero-768.webp" />
              <img
                className="industry-audit__img"
                src="/assets/audit/hero.webp"
                alt={alt}
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </picture>
          </div>
        </div>
        <div className="industry-audit__checks">
          {checks.map((item) => (
            <article className="card center" key={item.icon}>
              <img className="icon icon--kit" src={kitSrc(`/assets/audit/icons/${item.icon}.svg`)} alt="" width={72} height={72} decoding="async" loading="lazy" fetchPriority="low" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
