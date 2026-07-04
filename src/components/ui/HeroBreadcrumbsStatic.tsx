import { Link } from "@/i18n/navigation";
import type { BreadcrumbItem } from "@/lib/schema";

export default function HeroBreadcrumbsStatic({ items }: { items: BreadcrumbItem[] }) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="hero__breadcrumbs">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted/70">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={crumb.url ?? crumb.name} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/15" aria-hidden>/</span>}
              {isLast || !crumb.url ? (
                <span
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                  className={isLast ? "text-neon-cyan/80" : ""}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.url} className="hover:text-white transition-colors duration-500">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
