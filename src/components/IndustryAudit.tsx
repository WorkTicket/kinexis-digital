import Link from "next/link";
import type { ReactNode } from "react";
import { imageSrcSet, imageVariant } from "@/lib/image-sources";
import { kitSrc } from "@/lib/site";
import { HL } from "./mark";

const CHECKS = [
  {
    title: "Speed",
    titleDisplay: <>Page<br />Speed</>,
    text: <>How quickly each page loads<br />for visitors using phones<br />and desktop computers.</>,
    icon: "speed",
  },
  {
    title: "Search Visibility",
    titleDisplay: <>Search<br />Visibility</>,
    text: <>How headings and page structure<br />help search engines read<br />and understand the website.</>,
    icon: "search",
  },
  {
    title: "Mobile Experience",
    titleDisplay: <>Mobile<br />Experience</>,
    text: <>How comfortably the site works<br />on phones, with readable type<br />and easy-to-reach controls.</>,
    icon: "mobile",
  },
  {
    title: "Calls & Quote Requests",
    titleDisplay: <>Calls &amp; Quote<br />Requests</>,
    text: <>How phone numbers, buttons,<br />and forms guide each visitor<br />toward the right next step.</>,
    icon: "conversion",
  },
] as const;

/** Reused on every industry page. The artwork is the audit hero, not the trade collage. */
export default function IndustryAudit({
  eyebrow = "A clear place to begin",
  heading = "See What Is Holding Your Website Back",
  mark = "Holding Your Website Back",
  text = "We’ll point out what is working, what is getting in the way, and which fixes deserve attention first. Free and paid audits are available.",
  cta = "Review My Website",
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
  checks?: readonly { title: string; titleDisplay?: ReactNode; text: ReactNode; icon: string }[];
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
               <source type="image/avif" srcSet={imageSrcSet("/assets/audit/hero.webp", [480, 768, 960], "avif")} sizes="(max-width: 640px) 92vw, (max-width: 860px) 640px, 520px" />
               <source srcSet={imageSrcSet("/assets/audit/hero.webp", [480, 768, 960])} sizes="(max-width: 640px) 92vw, (max-width: 860px) 640px, 520px" />
               <img
                className="industry-audit__img"
                 src={imageVariant("/assets/audit/hero.webp", 960, "webp")}
                 srcSet={imageSrcSet("/assets/audit/hero.webp", [480, 768, 960])}
                 sizes="(max-width: 640px) 92vw, (max-width: 860px) 640px, 520px"
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
              <h3>{item.titleDisplay ?? item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
