"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import SiteLogo from "@/components/ui/SiteLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export default function Header() {
  const tNav = useTranslations("nav");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    const SHRINK_DISTANCE = 96;
    let ticking = false;
    let isScrolled = false;

    const update = () => {
      const header = headerRef.current;
      if (!header) {
        ticking = false;
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = reduceMotion
        ? window.scrollY > 20
          ? 1
          : 0
        : Math.min(1, Math.max(0, window.scrollY / SHRINK_DISTANCE));

      header.style.setProperty("--header-progress", progress.toFixed(4));
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.offsetHeight}px`
      );

      const nextScrolled = progress > 0.35;
      if (nextScrolled !== isScrolled) {
        isScrolled = nextScrolled;
        header.classList.toggle("site-header--scrolled", isScrolled);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
    setResourcesOpen(false);
    requestAnimationFrame(() => {
      menuButtonRef.current?.focus();
    });
  };

  const openMenu = () => {
    setServicesOpen(false);
    setIndustriesOpen(false);
    setResourcesOpen(false);
    setMenuOpen(true);
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  return (
    <>
      <header
        ref={headerRef}
        className="site-header fixed top-0 inset-x-0 z-50"
      >
        <div className="site-header__backdrop" aria-hidden />

        <div className="site-header__content container-site relative h-full overflow-visible">
          <div className="site-header__bar flex h-full w-full items-center justify-between lg:justify-normal">
            <Link
              href="/"
              className="site-header__brand relative z-10 flex shrink-0 items-center group touch-manipulation"
            >
              <span className="site-header__logo-wrap">
                <SiteLogo
                  src="/assets/logos/KINEXIS_logo_full.webp"
                  alt="Kinexis Digital"
                  width={180}
                  height={32}
                  priority
                  className="site-header__logo motion-logo group-hover:opacity-80"
                />
              </span>
            </Link>

            <div className="site-header__spacer hidden flex-1 lg:block" aria-hidden />

            <div className="site-header__nav hidden shrink-0 overflow-visible lg:block">
              <Navigation
                servicesOpen={servicesOpen}
                industriesOpen={industriesOpen}
                resourcesOpen={resourcesOpen}
                onServicesOpenChange={setServicesOpen}
                onIndustriesOpenChange={setIndustriesOpen}
                onResourcesOpenChange={setResourcesOpen}
              />
            </div>

            <div className="site-header__spacer hidden flex-1 lg:block" aria-hidden />

            <div className="site-header__actions site-header__actions--desktop relative z-20 hidden shrink-0 items-center overflow-visible lg:flex">
              <LanguageSwitcher variant="header" menuOpen={menuOpen} compact />
              <div className="header-actions-divider" aria-hidden />
              <Link
                href="/contact"
                className="header-cta group whitespace-nowrap rounded-lg px-3 text-[11px] xl:px-3.5 xl:text-xs"
              >
                <span className="xl:hidden">{tNav("bookCallShort")}</span>
                <span className="hidden xl:inline">{tNav("bookCall")}</span>
                <ArrowRight
                  className="h-3 w-3 shrink-0 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>

            <div className="relative z-10 flex shrink-0 items-center gap-2 lg:hidden">
              <Link
                href="/contact"
                className="header-cta shrink-0 h-7 whitespace-nowrap rounded-lg px-2.5 text-[10px] sm:px-3 sm:text-[11px]"
              >
                {tNav("bookCallShort")}
                <ArrowRight className="h-2.5 w-2.5 shrink-0 opacity-80" aria-hidden />
              </Link>
              <button
                ref={menuButtonRef}
                type="button"
                className="header-icon-btn h-10 w-10"
                onClick={toggleMenu}
                aria-label={menuOpen ? tNav("closeMenu") : tNav("toggleMenu")}
                aria-expanded={menuOpen}
                aria-controls="mobile-site-nav"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        servicesOpen={servicesOpen}
        industriesOpen={industriesOpen}
        resourcesOpen={resourcesOpen}
        onClose={closeMenu}
        onToggleServices={() => {
          setIndustriesOpen(false);
          setResourcesOpen(false);
          setServicesOpen((prev) => !prev);
        }}
        onToggleIndustries={() => {
          setServicesOpen(false);
          setResourcesOpen(false);
          setIndustriesOpen((prev) => !prev);
        }}
        onToggleResources={() => {
          setServicesOpen(false);
          setIndustriesOpen(false);
          setResourcesOpen((prev) => !prev);
        }}
      />
    </>
  );
}
