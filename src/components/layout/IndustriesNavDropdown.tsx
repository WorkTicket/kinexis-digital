"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { industryCategories } from "@/content/registry/industries";

type Props = {
  onNavigate?: () => void;
};

export default function IndustriesNavDropdown({ onNavigate }: Props) {
  const pathname = usePathname();
  const tNav = useTranslations("nav");

  return (
    <div className="nav-dropdown-panel nav-dropdown-panel--industries">
      <div className="nav-dropdown-header relative z-[1]">
        <span className="nav-dropdown-eyebrow">{tNav("industriesOverview")}</span>
        <Link href="/industries" className="nav-dropdown-view-all" onClick={onNavigate}>
          {tNav("viewAllIndustries")}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      <div className="nav-industries-grid relative z-[1]">
        {industryCategories.map((category) => (
          <div key={category.id} className="nav-dropdown-group">
            <Link
              href={`/industries/${category.id}`}
              onClick={onNavigate}
              className={cn(
                "nav-dropdown-group__title nav-dropdown-group__title--link",
                pathname.startsWith(`/industries/${category.id}`) &&
                  "nav-dropdown-group__title--active"
              )}
            >
              {category.label}
            </Link>
            <ul className="nav-dropdown-group__list">
              {category.industries.map((industry) => {
                const href = `/industries/${category.id}/${industry.slug}`;
                const active = pathname === href;

                return (
                  <li key={industry.slug}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      className={cn(
                        "nav-dropdown-link nav-dropdown-link--compact",
                        active && "nav-dropdown-link--active"
                      )}
                    >
                      {industry.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
