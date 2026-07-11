"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown } from "lucide-react";
import { mainNavLinks, serviceNavGroups } from "@/lib/site-nav";
import IndustriesNavDropdown from "./IndustriesNavDropdown";
import ResourcesNavDropdown from "./ResourcesNavDropdown";

type NavigationProps = {
  servicesOpen: boolean;
  industriesOpen: boolean;
  resourcesOpen: boolean;
  onServicesOpenChange: (open: boolean) => void;
  onIndustriesOpenChange: (open: boolean) => void;
  onResourcesOpenChange: (open: boolean) => void;
};

export default function Navigation({
  servicesOpen,
  industriesOpen,
  resourcesOpen,
  onServicesOpenChange,
  onIndustriesOpenChange,
  onResourcesOpenChange,
}: NavigationProps) {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");

  const linkClass = (active: boolean, extra?: string) =>
    cn("nav-link", extra, active && "nav-link--active");

  const closeOtherDropdowns = (except: "services" | "industries" | "resources") => {
    if (except !== "services") onServicesOpenChange(false);
    if (except !== "industries") onIndustriesOpenChange(false);
    if (except !== "resources") onResourcesOpenChange(false);
  };

  const isIndustriesActive = pathname.startsWith("/industries");
  const isResourcesActive =
    pathname === "/resources" ||
    pathname.startsWith("/resources/") ||
    pathname.startsWith("/solutions") ||
    pathname.startsWith("/google-ads-vs-seo") ||
    pathname.startsWith("/seo-vs-ppc") ||
    pathname.startsWith("/local-seo-vs-google-ads") ||
    pathname.startsWith("/wordpress-vs-webflow");

  return (
    <nav className="hidden lg:block" aria-label="Main">
      <ul className="flex flex-nowrap items-center gap-1 lg:gap-1.5 xl:gap-2">
        {mainNavLinks.map((link) => {
          if ("dropdown" in link && link.dropdown === "services") {
            return (
              <li
                key={link.href}
                className="relative shrink-0"
                onMouseEnter={() => {
                  closeOtherDropdowns("services");
                  onServicesOpenChange(true);
                }}
                onMouseLeave={() => onServicesOpenChange(false)}
              >
                <Link
                  href="/services"
                  className={linkClass(
                    pathname.startsWith("/services"),
                    "flex items-center gap-1"
                  )}
                >
                  {tNav(link.key)}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-white/40 transition-transform duration-300 ease-out",
                      servicesOpen && "rotate-180 text-neon-cyan/70"
                    )}
                    aria-hidden
                  />
                </Link>
                <div
                  className="nav-services-flyout nav-flyout nav-flyout--center fixed left-1/2 pt-3"
                  data-open={servicesOpen}
                >
                  <div className="nav-dropdown-panel nav-dropdown-panel--services">
                    <div className="nav-dropdown-header relative z-[1]">
                      <span className="nav-dropdown-eyebrow">
                        {tNav("servicesOverview")}
                      </span>
                      <Link href="/services" className="nav-dropdown-view-all ml-auto">
                        {tNav("viewAllServices")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                    <div className="nav-services-grid relative z-[1]">
                      {serviceNavGroups.map((group) => (
                        <div key={group.key} className="nav-services-col">
                          <h3 className="nav-dropdown-group__title">
                            {tNav(`serviceGroups.${group.key}`)}
                          </h3>
                          <ul className="nav-dropdown-group__list">
                            {group.links.map((s) => (
                              <li key={s.href}>
                                <Link
                                  href={s.href}
                                  className={cn(
                                    "nav-dropdown-link nav-dropdown-link--compact",
                                    pathname === s.href && "nav-dropdown-link--active"
                                  )}
                                >
                                  {tServices(s.key)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className="nav-services-footer relative z-[1]">
                      <span className="nav-services-footer__text">
                        {tNav("servicesFooterPrompt")}
                      </span>
                      <span className="nav-services-footer__cta">
                        {tNav("bookCall")}
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          }

          if ("dropdown" in link && link.dropdown === "industries") {
            return (
              <li
                key={link.href}
                className="relative shrink-0"
                onMouseEnter={() => {
                  closeOtherDropdowns("industries");
                  onIndustriesOpenChange(true);
                }}
                onMouseLeave={() => onIndustriesOpenChange(false)}
              >
                <Link
                  href="/industries"
                  className={linkClass(isIndustriesActive, "flex items-center gap-1")}
                >
                  {tNav(link.key)}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-white/40 transition-transform duration-300 ease-out",
                      industriesOpen && "rotate-180 text-neon-cyan/70"
                    )}
                    aria-hidden
                  />
                </Link>
                <div
                  className="nav-flyout nav-flyout--center absolute top-full left-1/2 pt-3"
                  data-open={industriesOpen}
                >
                  <IndustriesNavDropdown />
                </div>
              </li>
            );
          }

          if ("dropdown" in link && link.dropdown === "resources") {
            return (
              <li
                key={link.href}
                className="relative shrink-0"
                onMouseEnter={() => {
                  closeOtherDropdowns("resources");
                  onResourcesOpenChange(true);
                }}
                onMouseLeave={() => onResourcesOpenChange(false)}
              >
                <Link
                  href="/resources"
                  className={linkClass(isResourcesActive, "flex items-center gap-1")}
                >
                  {tNav(link.key)}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-white/40 transition-transform duration-300 ease-out",
                      resourcesOpen && "rotate-180 text-neon-cyan/70"
                    )}
                    aria-hidden
                  />
                </Link>
                <div
                  className="nav-flyout nav-flyout--resources absolute top-full right-0 pt-3 xl:left-1/2 xl:right-auto"
                  data-open={resourcesOpen}
                >
                  <ResourcesNavDropdown />
                </div>
              </li>
            );
          }

          const active =
            pathname === link.href ||
            pathname.startsWith(`${link.href}/`);

          return (
            <li key={link.href} className="shrink-0">
              <Link href={link.href} className={linkClass(active)}>
                {tNav(link.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
