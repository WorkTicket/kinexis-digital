import Link from "next/link";
import type { ReactNode } from "react";
import { still } from "@/lib/image-sources";
import { Icon } from "./artwork";
import { HL } from "./mark";
import type { Locale } from "@/lib/i18n";

const CHECKS = [
  {
    title: "Speed",
    titleDisplay: <>Page<br />Speed</>,
    text: <>How quickly each page loads<br />on phones and desktops for<br />visitors who arrive.</>,
    icon: "audit-speed",
  },
  {
    title: "Search Visibility",
    titleDisplay: <>Search<br />Visibility</>,
    text: <>How headings and structure<br />help search engines read<br />and understand the site.</>,
    icon: "search-optimized",
  },
  {
    title: "Mobile Experience",
    titleDisplay: <>Mobile<br />Experience</>,
    text: <>How comfortably the site<br />works on phones, with clear<br />type and easy controls.</>,
    icon: "audit-mobile",
  },
  {
    title: "Calls & Quote Requests",
    titleDisplay: <>Calls &amp; Quote<br />Requests</>,
    text: <>How phone numbers, buttons,<br />and forms guide visitors<br />to the right next step.</>,
    icon: "audit-conversion",
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
  locale = "en",
}: {
  eyebrow?: string;
  heading?: string;
  mark?: string;
  text?: string;
  cta?: string;
  href?: string;
  alt?: string;
  checks?: readonly { title: string; titleDisplay?: ReactNode; text: ReactNode; icon: string }[];
  locale?: Locale;
} = {}) {
  const suffix = locale === "en" ? "" : "-es";
  const auditDesktop = still(`/assets/kinexis/page-art/website-audit-desktop${suffix}.avif`);
  const auditMobile = still(`/assets/kinexis/page-art/website-audit-mobile${suffix}.webp`);
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
               <source media="(max-width: 860px)" type="image/webp" srcSet={auditMobile} />
               <source type="image/avif" srcSet={auditDesktop} />
               <img
                className="industry-audit__img"
                 src={auditMobile}
                alt={alt}
                 width={2400}
                 height={1350}
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
              <Icon name={item.icon} alt="" size={72} />
              <h3>{item.titleDisplay ?? item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
