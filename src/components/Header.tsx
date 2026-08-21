"use client";

import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { CallLink } from "@/components/analytics/CallLink";
import { CONTACT_EMAIL } from "@/content/contact";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import {
  mainNavLinks,
  NAV_CONTACT_HREF,
  type MainNavItem,
} from "@/lib/site-nav";
import { cn } from "@/lib/cn";
import { getBusinessTelHref } from "@/lib/business";

const SCROLL_DELTA = 8;
const SCROLL_TOP_REVEAL = 28;

function navChildLabel(
  href: string,
  fallback: string,
  t: ReturnType<typeof useTranslations>,
) {
  if (href.includes("/home-services")) return t("homeServices");
  if (href.includes("/ecommerce")) return t("ecommerce");
  return fallback;
}

function navItemLabel(
  link: Pick<MainNavItem, "key" | "label">,
  t: ReturnType<typeof useTranslations>,
) {
  if (link.key === "caseStudies") return t("work");
  return t.has(link.key) ? t(link.key) : link.label;
}

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenHref, setMobileOpenHref] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const mobileNavId = useId();
  const hasPhone = Boolean(getBusinessTelHref());

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;

        if (menuOpen || y <= SCROLL_TOP_REVEAL) {
          setHeaderHidden(false);
        } else if (delta > SCROLL_DELTA) {
          setHeaderHidden(true);
          setOpenDropdown(null);
        } else if (delta < -SCROLL_DELTA) {
          setHeaderHidden(false);
        }

        lastScrollY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useFocusTrap(mobilePanelRef, menuOpen, () => {
    setMenuOpen(false);
    setMobileOpenHref(null);
    menuButtonRef.current?.focus();
  });

  useEffect(() => {
    if (!openDropdown) return;

    const onPointerDown = (event: MouseEvent) => {
      const node = dropdownRefs.current.get(openDropdown);
      if (node && !node.contains(event.target as Node)) {
        if (closeTimer.current !== null) {
          clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
        setOpenDropdown(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (closeTimer.current !== null) {
          clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileOpenHref(null);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const openNavDropdown = (href: string) => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(href);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimer.current = null;
    }, 140);
  };

  const closeDropdown = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(null);
  };

  return (
    <>
      <div
        className={cn(
          "site-header__frost chrome-glass",
          headerHidden && !menuOpen && "site-header__frost--hidden",
          menuOpen && "site-header__frost--solid",
        )}
        aria-hidden
      />
      <header
        className={cn(
          "site-header pt-[env(safe-area-inset-top,0px)]",
          headerHidden && !menuOpen && "site-header--hidden",
        )}
      >
        <div className="shell site-header__bar flex items-center gap-4 overflow-visible sm:gap-5 lg:gap-10">
          <Link
            href="/"
            className="site-header__logo inline-flex min-h-11 shrink-0 items-center"
            aria-label={tA11y("logoAlt")}
            onClick={() => {
              closeDropdown();
              closeMenu();
            }}
          >
            <BrandLogo />
          </Link>

          <nav
            className="relative z-50 ml-auto hidden overflow-visible lg:block"
            aria-label={t("main")}
          >
            <ul className="site-header__nav-list">
              {mainNavLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return link.children ? (
                  <DesktopFlyout
                    key={link.href}
                    link={link}
                    active={isActive}
                    open={openDropdown === link.href}
                    menuId={`nav-flyout-${link.href.replace(/\W+/g, "-")}`}
                    onOpen={() => openNavDropdown(link.href)}
                    onScheduleClose={scheduleCloseDropdown}
                    onClose={closeDropdown}
                    onToggle={() =>
                      setOpenDropdown((current) =>
                        current === link.href ? null : link.href,
                      )
                    }
                    setRef={(node) => {
                      if (node) dropdownRefs.current.set(link.href, node);
                      else dropdownRefs.current.delete(link.href);
                    }}
                  />
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn("site-nav__link", isActive && "site-nav__link--active")}
                      onMouseEnter={scheduleCloseDropdown}
                      onClick={closeDropdown}
                    >
                      <span className="site-nav__label">{navItemLabel(link, t)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="site-header__actions hidden items-center lg:flex">
            {hasPhone ? (
              <CallLink className="mr-1 text-sm font-medium text-muted underline-offset-2 hover:text-foreground hover:underline" />
            ) : null}
            <Button href={NAV_CONTACT_HREF} size="header" onClick={closeDropdown}>
              {t("contact")}
            </Button>
            <ThemeToggle />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:hidden">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className={cn("site-nav__burger", menuOpen && "site-nav__burger--open")}
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
              aria-controls={mobileNavId}
              onClick={() => {
                if (menuOpen) {
                  closeMenu();
                  return;
                }
                const openGroup = mainNavLinks.find(
                  (link) => link.children && pathname.startsWith(link.href),
                );
                setMobileOpenHref(openGroup?.href ?? null);
                setMenuOpen(true);
              }}
            >
              <span className="site-nav__burger-box" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          ref={mobilePanelRef}
          id={mobileNavId}
          className="site-menu lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("mobile")}
        >
          <nav className="site-menu__inner shell" aria-label={t("mobile")}>
            <ul className="site-menu__list">
              <li className="site-menu__item">
                <Link
                  href="/"
                  className={cn(
                    "site-menu__link",
                    pathname === "/" && "site-menu__link--active",
                  )}
                  onClick={closeMenu}
                >
                  <span className="site-menu__name">{t("home")}</span>
                </Link>
              </li>
              {mainNavLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                if (link.children) {
                  return (
                    <MobileNavGroup
                      key={link.href}
                      link={link}
                      active={isActive}
                      open={mobileOpenHref === link.href}
                      onToggle={() =>
                        setMobileOpenHref((current) =>
                          current === link.href ? null : link.href,
                        )
                      }
                      onNavigate={closeMenu}
                    />
                  );
                }

                return (
                  <li key={link.href} className="site-menu__item">
                    <Link
                      href={link.href}
                      className={cn(
                        "site-menu__link",
                        isActive && "site-menu__link--active",
                      )}
                      onClick={closeMenu}
                    >
                      <span className="site-menu__name">{navItemLabel(link, t)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="site-menu__meta">
              <Button href={NAV_CONTACT_HREF} size="lg" fullWidthMobile onClick={closeMenu}>
                {t("contact")}
              </Button>
              <a href={`mailto:${CONTACT_EMAIL}`} className="site-menu__email">
                {CONTACT_EMAIL}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}

function MobileNavGroup({
  link,
  active,
  open,
  onToggle,
  onNavigate,
}: {
  link: MainNavItem;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const panelId = useId();
  const children = link.children ?? [];
  const allLabel =
    link.key === "industries"
      ? t("allIndustries")
      : (link.allLabel ?? `All ${link.label.toLowerCase()}`);

  return (
    <li className="site-menu__item">
      <button
        type="button"
        className={cn(
          "site-menu__link site-menu__link--trigger",
          (open || active) && "site-menu__link--active",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="site-menu__name">{navItemLabel(link, t)}</span>
        <ChevronIcon open={open} />
      </button>
      <div
        id={panelId}
        className={cn("site-menu__panel", open && "site-menu__panel--open")}
        inert={open ? undefined : true}
      >
        <div className="site-menu__panel-inner">
          <ul className="site-menu__sub">
            {children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={cn(
                    "site-menu__sub-link",
                    pathname.startsWith(child.href) && "site-menu__sub-link--active",
                  )}
                  onClick={onNavigate}
                >
                  {navChildLabel(child.href, child.label, t)}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={link.href} className="site-menu__all" onClick={onNavigate}>
            <span>{allLabel}</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </li>
  );
}

function DesktopFlyout({
  link,
  active,
  open,
  menuId,
  onOpen,
  onScheduleClose,
  onClose,
  onToggle,
  setRef,
}: {
  link: MainNavItem;
  active: boolean;
  open: boolean;
  menuId: string;
  onOpen: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
  onToggle: () => void;
  setRef: (node: HTMLLIElement | null) => void;
}) {
  const t = useTranslations("nav");
  const children = link.children ?? [];
  const featured = link.featured ?? [];
  const allLabel = link.key === "industries" ? t("allIndustries") : (link.allLabel ?? `All ${link.label.toLowerCase()}`);
  const isWide = link.mega === "industries";
  const showDesc = link.mega === "services";
  const remainingChildren = isWide
    ? children.filter(
        (c) => !featured.some((f) => f.href === c.href),
      )
    : children;

  return (
    <li
      ref={setRef}
      className="nav-flyout relative"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
    >
      <button
        type="button"
        className={cn(
          "site-nav__link site-nav__link--trigger",
          (open || active) && "site-nav__link--active",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={onToggle}
        onFocus={onOpen}
      >
        <span className="site-nav__label">{navItemLabel(link, t)}</span>
        <ChevronIcon open={open} />
      </button>

      <div
        id={menuId}
        role="menu"
        aria-label={navItemLabel(link, t)}
        className={cn(
          "nav-flyout__panel",
          isWide && "nav-flyout__panel--wide",
          open && "nav-flyout__panel--open",
        )}
      >
        <div className="nav-flyout__surface">
          {isWide && featured.length > 0 ? (
            <>
              <div className="nav-flyout__featured">
                <p className="nav-flyout__featured-heading">
                  {link.megaIntro}
                </p>
                <div className="nav-flyout__featured-grid">
                  {featured.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="nav-flyout__featured-card"
                      onClick={onClose}
                    >
                      <span className="nav-flyout__featured-label">
                        {navChildLabel(item.href, item.label, t)}
                      </span>
                      {item.description ? (
                        <span className="nav-flyout__featured-desc">
                          {item.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="nav-flyout__divider" />

              <ul className="nav-flyout__list nav-flyout__list--cols">
                {remainingChildren.map((child) => (
                  <li key={child.href} role="none">
                    <Link
                      href={child.href}
                      role="menuitem"
                      className="nav-flyout__item"
                      onClick={onClose}
                    >
                      <span className="nav-flyout__item-label">
                        {navChildLabel(child.href, child.label, t)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul
                className={cn(
                  "nav-flyout__list",
                  (isWide || showDesc) && "nav-flyout__list--cols",
                )}
              >
                {children.map((child) => (
                  <li key={child.href} role="none">
                    <Link
                      href={child.href}
                      role="menuitem"
                      className={cn(
                        "nav-flyout__item",
                        showDesc && "nav-flyout__item--rich",
                      )}
                      onClick={onClose}
                    >
                      <span className="nav-flyout__item-label">{navChildLabel(child.href, child.label, t)}</span>
                      {showDesc && child.description ? (
                        <span className="nav-flyout__item-desc">
                          {child.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="nav-flyout__divider" />

          <Link
            href={link.href}
            role="menuitem"
            className="nav-flyout__all"
            onClick={onClose}
          >
            <span>{allLabel}</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </li>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className={cn(
        "shrink-0 opacity-70 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open && "rotate-180 opacity-100",
      )}
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h9.5M8.5 3.5 13.5 8l-5 4.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

