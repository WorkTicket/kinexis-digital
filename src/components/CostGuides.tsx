import Link from "next/link";
import { industryCostPostPath } from "@/data/industries";

const COST_GUIDES = [
  { slug: "plumbing", name: "Plumbing", title: "plumber website cost" },
  { slug: "hvac", name: "HVAC", title: "HVAC website cost" },
  { slug: "electrical", name: "Electrical", title: "electrician website cost" },
  { slug: "roofing", name: "Roofing", title: "roofing website cost" },
  { slug: "landscaping", name: "Landscaping", title: "landscaping website cost" },
  { slug: "garage-doors", name: "Garage Doors", title: "garage door website cost" },
  { slug: "pressure-washing", name: "Pressure Washing", title: "pressure washing website cost" },
] as const;

const DESIGN_GUIDES = [
  { slug: "plumbing", name: "Plumbing", title: "plumber website design" },
  { slug: "hvac", name: "HVAC", title: "hvac website design" },
  { slug: "electrical", name: "Electrical", title: "electrician website design" },
  { slug: "roofing", name: "Roofing", title: "roofing website design" },
  { slug: "garage-doors", name: "Garage Doors", title: "garage door website design" },
  { slug: "landscaping", name: "Landscaping", title: "landscaping website design" },
  { slug: "pressure-washing", name: "Pressure Washing", title: "pressure washing website design" },
] as const;

export type CostGuideItem = {
  href: string;
  name: string;
  title: string;
  /** Small label above the trade name (e.g. Cost / Pages / Design). */
  badge?: string;
  /** Emphasize as the hub / catch-all tile. */
  featured?: boolean;
  /** Kept for call-site compat; links no longer render icons. */
  iconSlug?: string;
  icon?: string;
  mark?: string;
};

const FEATURED_DEFAULTS: Record<"cost" | "design", CostGuideItem> = {
  cost: { href: "/web-design", name: "All trades", title: "contractor website design" },
  design: { href: "/industries", name: "& more", title: "every local trade" },
};

export default function CostGuides({
  variant = "cost",
  label,
  ariaLabel,
  eyebrow = "Guides",
  guides,
  featured,
  className,
  showHead = true,
}: {
  variant?: "cost" | "design";
  label?: string;
  ariaLabel?: string;
  eyebrow?: string;
  guides?: CostGuideItem[];
  /** Pass `null` to hide. Omit to use the variant default. */
  featured?: CostGuideItem | null;
  className?: string;
  /** Hide the built-in eyebrow/label when a parent section already titles the block. */
  showHead?: boolean;
}) {
  const defaults = variant === "design" ? DESIGN_GUIDES : COST_GUIDES;
  const items: CostGuideItem[] =
    guides ??
    defaults.map((guide) => ({
      href: variant === "design" ? `/industries/${guide.slug}` : industryCostPostPath(guide.slug),
      name: guide.name,
      title: guide.title,
    }));

  const resolvedLabel =
    label ?? (variant === "design" ? "Websites by trade" : "What a website costs for these trades");
  const resolvedAria =
    ariaLabel ?? (variant === "design" ? "Website design by trade" : "Website cost guides");
  const resolvedFeatured = featured === undefined ? FEATURED_DEFAULTS[variant] : featured;
  const rootClass = className ? `cost-guides ${className}` : "cost-guides";
  const links = resolvedFeatured ? [...items, resolvedFeatured] : items;

  return (
    <nav className={rootClass} aria-label={resolvedAria}>
      {showHead ? (
        <div className="cost-guides__head">
          <p className="cost-guides__eyebrow">{eyebrow}</p>
          <p className="cost-guides__label">{resolvedLabel}</p>
        </div>
      ) : null}
      <ul className="cost-guides__list">
        {links.map((guide) => (
          <li key={guide.href} className={guide.featured ? "cost-guides__cell--featured" : undefined}>
            <Link
              className={guide.featured ? "cost-guides__item cost-guides__item--featured" : "cost-guides__item"}
              href={guide.href}
              prefetch={false}
            >
              {guide.badge ? <span className="cost-guides__badge">{guide.badge}</span> : null}
              <span className="cost-guides__name">{guide.name}</span>
              <span className="cost-guides__meta trust-hl">{guide.title}</span>
              {guide.badge || guide.featured ? (
                <span className="cost-guides__go" aria-hidden="true">→</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
