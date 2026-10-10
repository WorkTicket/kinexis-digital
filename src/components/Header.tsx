"use client";

import { useLocale, useTranslations } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { CallLink } from "@/components/analytics/CallLink";
import { PhoneMark } from "@/components/ui/PhoneMark";
import { WhatsAppLink } from "@/components/landing/WhatsAppLink";
import { CONTACT_EMAIL } from "@/content/contact";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { MegaTrigger } from "@/components/nav/MegaMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  isMainNavActive,
  mainNavLinks,
  megaDestinations,
  activeMegaHref,
  NAV_CONTACT_HREF,
  type MainNavItem,
} from "@/lib/site-nav";
import { cn } from "@/lib/cn";
import {
  getBusinessPhoneDisplay,
  getBusinessTelHref,
  getBusinessWhatsAppHref,
} from "@/lib/business";
import { getLandingChrome, landingSlugFromPath } from "@/lib/landing-chrome";
import { trackLandingFunnel } from "@/lib/analytics/landing-funnel";
import { isSpanishLocale } from "@/i18n/spanish";
import type { Locale } from "@/i18n/routing";

const SCROLL_DELTA = 8;
const SCROLL_TOP_REVEAL = 28;

function navItemLabel(
  link: Pick<MainNavItem, "key" | "label">,
  t: ReturnType<typeof useTranslations>,
) {
  if (link.key === "caseStudies") return t("work");
  return t.has(link.key) ? t(link.key) : link.label;
}

export function Header() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenHref, setMobileOpenHref] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const mobileNavId = useId();
  const hasPhone = Boolean(getBusinessTelHref());
  const whatsappHref = isSpanishLocale(locale)
    ? getBusinessWhatsAppHref(
        "Hola, me interesa hablar sobre un sitio web para mi negocio.",
      )
    : null;
  const showWhatsApp = Boolean(whatsappHref);
  const contactHref = NAV_CONTACT_HREF;
  const contactLabel = t("contact");
  const landing = getLandingChrome(pathname, locale);
  const isSlimLanding = Boolean(landing?.slim);

  const supportSlot = (placement: "nav" | "menu" | "bar") => {
    if (showWhatsApp && whatsappHref) {
      return (
        <WhatsAppLink
          href={whatsappHref}
          label={placement === "bar" ? "WhatsApp" : t("whatsappSupport")}
          ariaLabel={t("whatsappSupport")}
          variant={placement === "menu" ? "menu" : "nav"}
          className={placement === "bar" ? "site-header__phone--bar" : undefined}
        />
      );
    }
    if (!hasPhone) return null;
    if (placement === "menu") {
      return (
        <CallLink className="site-menu__phone">
          <PhoneMark className="site-header__phone-mark" />
          <span className="site-menu__phone-num">
            {getBusinessPhoneDisplay()}
          </span>
        </CallLink>
      );
    }
    if (placement === "bar") {
      return (
        <CallLink className="site-header__phone site-header__phone--bar">
          <span className="site-header__phone-num">
            {getBusinessPhoneDisplay()}
          </span>
        </CallLink>
      );
    }
    return (
      <CallLink
        className={cn(
          "site-header__phone",
          isSlimLanding && "site-header__phone--lp",
        )}
      >
        <PhoneMark className="site-header__phone-mark" />
        <span className="site-header__phone-num">
          {getBusinessPhoneDisplay()}
        </span>
      </CallLink>
    );
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isSlimLanding) root.classList.add("lp-chrome");
    else root.classList.remove("lp-chrome");
    return () => root.classList.remove("lp-chrome");
  }, [isSlimLanding]);

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

  useBodyScrollLock(menuOpen);

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
        const trigger = triggerRefs.current.get(openDropdown);
        setOpenDropdown(null);
        trigger?.focus();
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
    }, 220);
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
          headerHidden && !menuOpen && !openDropdown && !isSlimLanding && "site-header__frost--hidden",
          (menuOpen || openDropdown) && "site-header__frost--solid",
        )}
        aria-hidden
      />
      <header
        className={cn(
          "site-header pt-[env(safe-area-inset-top,0px)]",
          headerHidden && !menuOpen && !openDropdown && !isSlimLanding && "site-header--hidden",
          openDropdown && "site-header--open",
        )}
      >
        {openDropdown && !isSlimLanding ? (
          <div className="mega-scrim" aria-hidden onClick={closeDropdown} />
        ) : null}
        <div className="shell site-header__bar flex items-center gap-4 overflow-visible sm:gap-5 lg:gap-10">
          {isSlimLanding ? (
            <Link
              href="/"
              className="site-header__logo site-header__logo--quiet inline-flex min-h-11 shrink-0 items-center"
              aria-label={tA11y("logoAlt")}
            >
              <BrandLogo height={22} />
            </Link>
          ) : (
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
          )}

          {isSlimLanding && landing ? (
            <div className="site-header__lp-actions ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
              {supportSlot("nav")}
              <ThemeToggle />
              <Button
                href={landing.formHref}
                size="header"
                className="site-header__lp-cta"
                onClick={() =>
                  trackLandingFunnel("cta_click", {
                    placement: "header",
                    landingSlug: landingSlugFromPath(pathname),
                  })
                }
              >
                {landing.headerCtaLabel}
              </Button>
            </div>
          ) : (
            <>
              <nav
                className="relative z-50 ml-auto hidden h-full overflow-visible lg:flex lg:items-stretch"
                aria-label={t("main")}
              >
            <ul className="site-header__nav-list">
              {mainNavLinks.map((link) => {
                const isActive = isMainNavActive(pathname, link, mainNavLinks);
                return link.groups ? (
                  <MegaTrigger
                    key={link.href}
                    link={link}
                    label={navItemLabel(link, t)}
                    active={isActive}
                    open={openDropdown === link.href}
                    menuId={`nav-mega-${link.key}`}
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
                    setTriggerRef={(node) => {
                      if (node) triggerRefs.current.set(link.href, node);
                      else triggerRefs.current.delete(link.href);
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
            {showWhatsApp || hasPhone ? (
              <>
                {supportSlot("nav")}
                <span className="site-header__rule" aria-hidden />
              </>
            ) : null}
            <ThemeToggle />
            <Button href={contactHref} size="header" onClick={closeDropdown}>
              {contactLabel}
            </Button>
          </div>

          <div className="site-header__mobile ml-auto flex items-center lg:hidden">
            {supportSlot("bar")}
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
                  (link) =>
                    link.groups && isMainNavActive(pathname, link, mainNavLinks),
                );
                setMobileOpenHref(openGroup?.href ?? null);
                setMenuOpen(true);
              }}
            >
              <svg
                className="site-nav__burger-icon"
                viewBox="0 0 22 16"
                width="22"
                height="16"
                aria-hidden
                focusable="false"
              >
                <path className="site-nav__burger-line" d="M2 2h18" />
                <path className="site-nav__burger-line" d="M2 8h18" />
                <path className="site-nav__burger-line" d="M2 14h18" />
              </svg>
            </button>
          </div>
            </>
          )}
        </div>
      </header>

      {menuOpen && !isSlimLanding ? (
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
                const isActive = isMainNavActive(pathname, link, mainNavLinks);
                if (link.groups) {
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
              <Button href={contactHref} size="header" onClick={closeMenu}>
                {contactLabel}
              </Button>
              {supportSlot("menu")}
              <a href={`mailto:${CONTACT_EMAIL}`} className="site-menu__email">
                {CONTACT_EMAIL}
              </a>
              <ThemeToggle variant="menu" />
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
  const menu = link.menu;
  const groups = link.groups ?? [];
  const current = activeMegaHref(pathname, megaDestinations(link));

  if (!menu) return null;

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
          {groups.map((group) => (
            <div key={group.key} className="site-menu__group">
              <p className="site-menu__group-label">
                {t(`mega.${menu}.groups.${group.key}`)}
              </p>
              <ul className="site-menu__sub">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "site-menu__sub-link",
                        current === item.href && "site-menu__sub-link--active",
                      )}
                      onClick={onNavigate}
                    >
                      {t(`mega.${menu}.links.${item.key}.label`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {link.feature ? (
            <div className="site-menu__feature">
              <p className="site-menu__feature-title">
                {t(`mega.${menu}.feature.title`)}
              </p>
              <p className="site-menu__feature-dek">
                {t(`mega.${menu}.feature.dek`)}
              </p>
              <Link
                href={link.feature.href}
                className="site-menu__feature-link"
                onClick={onNavigate}
              >
                {t(`mega.${menu}.feature.cta`)}
              </Link>
              {link.feature.secondaryHref ? (
                <Link
                  href={link.feature.secondaryHref}
                  className="site-menu__sub-link"
                  onClick={onNavigate}
                >
                  {t(`mega.${menu}.feature.secondary`)}
                </Link>
              ) : null}
            </div>
          ) : null}
          <Link href={link.href} className="site-menu__all" onClick={onNavigate}>
            <span>{t(`mega.${menu}.all`)}</span>
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

