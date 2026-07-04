"use client";

import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/schema";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="container-site py-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-white/20" />}
              {isLast || !item.url ? (
                <span
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                  className={isLast ? "text-white/70" : ""}
                >
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
