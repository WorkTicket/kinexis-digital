"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { resourceNavGroups } from "@/lib/site-nav";

type Props = {
  onNavigate?: () => void;
};

export default function ResourcesNavDropdown({ onNavigate }: Props) {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tResources = useTranslations("nav.resourceLinks");

  return (
    <div className="nav-dropdown-panel nav-dropdown-panel--resources">
      <div className="nav-dropdown-header relative z-[1]">
        <span className="nav-dropdown-eyebrow">{tNav("resourcesOverview")}</span>
        <Link href="/resources" className="nav-dropdown-view-all" onClick={onNavigate}>
          {tNav("viewAllResources")}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <div className="nav-resources-grid relative z-[1]">
        {resourceNavGroups.map((group) => (
          <div key={group.key} className="nav-dropdown-group">
            <h3 className="nav-dropdown-group__title">{tResources(`groups.${group.key}`)}</h3>
            <ul className="nav-dropdown-group__list">
              {group.links.map((link) => {
                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className={cn(
                        "nav-dropdown-link nav-dropdown-link--compact",
                        active && "nav-dropdown-link--active"
                      )}
                    >
                      {tResources(link.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <Link
        href="/resources"
        onClick={onNavigate}
        className={cn(
          "nav-resources-featured relative z-[1]",
          pathname === "/resources" && "nav-resources-featured--active"
        )}
      >
        <span className="nav-resources-featured__icon" aria-hidden>
          <Layers className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="nav-resources-featured__title">{tResources("toolkitTitle")}</span>
          <span className="nav-resources-featured__desc">{tResources("toolkitDesc")}</span>
        </span>
        <BookOpen className="h-3.5 w-3.5 shrink-0 text-neon-cyan/60" aria-hidden />
      </Link>
    </div>
  );
}
