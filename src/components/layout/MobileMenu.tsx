"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";
import { industryCategories } from "@/content/registry/industries";
import {
  mainNavLinks,
  resourceNavGroups,
  serviceNavGroups,
} from "@/lib/site-nav";
import Button from "@/components/ui/Button";

const mobilePrimaryLinks = mainNavLinks.filter(
  (link) => !("dropdown" in link && link.dropdown)
);

type Props = {
  open: boolean;
  scrolled: boolean;
  servicesOpen: boolean;
  industriesOpen: boolean;
  resourcesOpen: boolean;
  onClose: () => void;
  onToggleServices: () => void;
  onToggleIndustries: () => void;
  onToggleResources: () => void;
};

export default function MobileMenu({
  open,
  scrolled,
  servicesOpen,
  industriesOpen,
  resourcesOpen,
  onClose,
  onToggleServices,
  onToggleIndustries,
  onToggleResources,
}: Props) {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const tResources = useTranslations("nav.resourceLinks");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      id="mobile-site-nav"
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={tNav("menu")}
    >
      <div
        className="absolute inset-0 bg-bg/90 backdrop-blur-2xl"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 flex flex-col",
          scrolled ? "top-14 md:top-16" : "top-16 md:top-[72px]"
        )}
      >
        <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {tNav("menu")}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={tNav("closeMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-strong bg-white/[0.04] text-muted transition-colors hover:bg-white/[0.08] hover:text-white touch-manipulation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          aria-label={tNav("menu")}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4"
        >
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={onToggleServices}
                aria-expanded={servicesOpen}
                aria-controls="mobile-services-dropdown"
                className={cn(
                  "flex w-full min-h-touch items-center rounded-xl px-4 py-4 transition-colors touch-manipulation",
                  pathname.startsWith("/services")
                    ? "bg-white/[0.08] text-white"
                    : "hover:bg-white/[0.04] text-white/90"
                )}
              >
                <span className="flex-1 text-left text-lg font-semibold">
                  {tNav("services")}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted transition-transform duration-200",
                    servicesOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                id="mobile-services-dropdown"
                hidden={!servicesOpen}
                className={cn(
                  "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
                  servicesOpen
                    ? "mt-1 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <Link
                      href="/services"
                      onClick={onClose}
                      className={cn(
                        "flex min-h-touch items-center rounded-lg px-3 py-3 text-base font-medium transition-colors touch-manipulation",
                        pathname === "/services"
                          ? "bg-white/10 text-white"
                          : "text-muted hover:bg-white/[0.04] hover:text-white"
                      )}
                    >
                      {tNav("viewAllServices")}
                    </Link>
                    {serviceNavGroups.map((group) => (
                      <div key={group.key} className="border-t border-white/[0.06] pt-3">
                        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                          {tNav(`serviceGroups.${group.key}`)}
                        </p>
                        <ul className="mt-2 space-y-0.5">
                          {group.links.map((s) => (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                onClick={onClose}
                                className={cn(
                                  "flex min-h-touch items-center rounded-lg px-3 py-2.5 text-sm transition-colors touch-manipulation",
                                  pathname === s.href
                                    ? "bg-white/10 font-medium text-white"
                                    : "text-muted hover:bg-white/[0.04] hover:text-white"
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
                </div>
              </div>
            </li>

            <li>
              <button
                type="button"
                onClick={onToggleIndustries}
                aria-expanded={industriesOpen}
                aria-controls="mobile-industries-dropdown"
                className={cn(
                  "flex w-full min-h-touch items-center rounded-xl px-4 py-4 transition-colors touch-manipulation",
                  pathname.startsWith("/industries")
                    ? "bg-white/[0.08] text-white"
                    : "hover:bg-white/[0.04] text-white/90"
                )}
              >
                <span className="flex-1 text-left text-lg font-semibold">
                  {tNav("industries")}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted transition-transform duration-200",
                    industriesOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                id="mobile-industries-dropdown"
                hidden={!industriesOpen}
                className={cn(
                  "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
                  industriesOpen
                    ? "mt-1 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <Link
                      href="/industries"
                      onClick={onClose}
                      className={cn(
                        "flex min-h-touch items-center rounded-lg px-3 py-3 text-base font-medium transition-colors touch-manipulation",
                        pathname === "/industries"
                          ? "bg-white/10 text-white"
                          : "text-muted hover:bg-white/[0.04] hover:text-white"
                      )}
                    >
                      {tNav("viewAllIndustries")}
                    </Link>
                    {industryCategories.map((category) => (
                      <div key={category.id} className="border-t border-white/[0.06] pt-3">
                        <Link
                          href={`/industries/${category.id}`}
                          onClick={onClose}
                          className="block px-3 text-sm font-semibold text-white"
                        >
                          {category.label}
                        </Link>
                        <ul className="mt-2 space-y-0.5">
                          {category.industries.map((industry) => {
                            const href = `/industries/${category.id}/${industry.slug}`;
                            const active = pathname === href;

                            return (
                              <li key={industry.slug}>
                                <Link
                                  href={href}
                                  onClick={onClose}
                                  className={cn(
                                    "flex min-h-touch items-center rounded-lg px-3 py-2.5 text-sm transition-colors touch-manipulation",
                                    active
                                      ? "bg-white/10 font-medium text-white"
                                      : "text-muted hover:bg-white/[0.04] hover:text-white"
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
              </div>
            </li>

            <li>
              <button
                type="button"
                onClick={onToggleResources}
                aria-expanded={resourcesOpen}
                aria-controls="mobile-resources-dropdown"
                className={cn(
                  "flex w-full min-h-touch items-center rounded-xl px-4 py-4 transition-colors touch-manipulation",
                  pathname.startsWith("/resources") ||
                    pathname.startsWith("/pricing/") ||
                    pathname.includes("-vs-")
                    ? "bg-white/[0.08] text-white"
                    : "hover:bg-white/[0.04] text-white/90"
                )}
              >
                <span className="flex-1 text-left text-lg font-semibold">
                  {tNav("resources")}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted transition-transform duration-200",
                    resourcesOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                id="mobile-resources-dropdown"
                hidden={!resourcesOpen}
                className={cn(
                  "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
                  resourcesOpen
                    ? "mt-1 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <Link
                      href="/resources"
                      onClick={onClose}
                      className={cn(
                        "flex min-h-touch items-center rounded-lg px-3 py-3 text-base font-medium transition-colors touch-manipulation",
                        pathname === "/resources"
                          ? "bg-white/10 text-white"
                          : "text-muted hover:bg-white/[0.04] hover:text-white"
                      )}
                    >
                      {tNav("viewAllResources")}
                    </Link>
                    {resourceNavGroups.map((group) => (
                      <div key={group.key} className="border-t border-white/[0.06] pt-3">
                        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                          {tResources(`groups.${group.key}`)}
                        </p>
                        <ul className="mt-2 space-y-0.5">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className={cn(
                                  "flex min-h-touch items-center rounded-lg px-3 py-2.5 text-sm transition-colors touch-manipulation",
                                  pathname === link.href
                                    ? "bg-white/10 font-medium text-white"
                                    : "text-muted hover:bg-white/[0.04] hover:text-white"
                                )}
                              >
                                {tResources(link.key)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {mobilePrimaryLinks.map((link) => {
              const active =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex min-h-touch items-center rounded-xl px-4 py-4 text-lg font-semibold transition-colors touch-manipulation",
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-white/90 hover:bg-white/[0.04]"
                    )}
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-white/10 bg-bg/80 px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
          <Button
            href="/contact"
            variant="primary"
            className="w-full whitespace-nowrap"
            onClick={onClose}
          >
            {tNav("bookCall")}
          </Button>
        </div>
      </div>
    </div>
  );
}
