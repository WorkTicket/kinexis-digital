"use client";

import { useTranslations } from "next-intl";
import { useRef, type CSSProperties } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  activeMegaHref,
  megaDestinations,
  type MainNavItem,
} from "@/lib/site-nav";
import { cn } from "@/lib/cn";

type TriggerProps = {
  link: MainNavItem;
  label: string;
  active: boolean;
  open: boolean;
  menuId: string;
  onOpen: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
  onToggle: () => void;
  setRef: (node: HTMLLIElement | null) => void;
  setTriggerRef: (node: HTMLButtonElement | null) => void;
};

export function MegaTrigger({
  link,
  label,
  active,
  open,
  menuId,
  onOpen,
  onScheduleClose,
  onClose,
  onToggle,
  setRef,
  setTriggerRef,
}: TriggerProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const panelRef = useRef<HTMLDivElement>(null);
  const menu = link.menu;
  const groups = link.groups;
  const current = activeMegaHref(pathname, megaDestinations(link));

  if (!menu || !groups) return null;

  const focusFirstLink = () => {
    onOpen();
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
  };

  return (
    <li
      ref={setRef}
      className="mega-trigger"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          onClose();
        }
      }}
    >
      <button
        ref={setTriggerRef}
        type="button"
        className={cn(
          "site-nav__link site-nav__link--trigger",
          (open || active) && "site-nav__link--active",
        )}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            focusFirstLink();
            return;
          }
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
          const triggers = [
            ...document.querySelectorAll<HTMLButtonElement>(
              ".site-header__nav-list .site-nav__link--trigger",
            ),
          ];
          const index = triggers.indexOf(event.currentTarget);
          const next =
            triggers[index + (event.key === "ArrowRight" ? 1 : -1)];
          if (!next) return;
          event.preventDefault();
          next.focus();
          next.click();
        }}
      >
        <span className="site-nav__label">{label}</span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          className="mega"
          onMouseEnter={onOpen}
          onKeyDown={(event) => {
            const panel = panelRef.current;
            if (!panel) return;
            const links = [
              ...panel.querySelectorAll<HTMLAnchorElement>("a"),
            ];
            const index = links.indexOf(
              document.activeElement as HTMLAnchorElement,
            );
            if (index < 0) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              links[Math.min(index + 1, links.length - 1)]?.focus();
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              if (index === 0) {
                event.currentTarget
                  .closest(".mega-trigger")
                  ?.querySelector<HTMLButtonElement>("button")
                  ?.focus();
                return;
              }
              links[index - 1]?.focus();
            } else if (event.key === "Home") {
              event.preventDefault();
              links[0]?.focus();
            } else if (event.key === "End") {
              event.preventDefault();
              links[links.length - 1]?.focus();
            }
          }}
        >
          <div className="mega__sheet">
            <div className={cn("mega__inner", link.feature && "mega__inner--split")}>
              <div className="mega__main">
                <div
                  className="mega__cols"
                  style={{ "--mega-cols": groups.length } as CSSProperties}
                >
                  {groups.map((group) => (
                    <div key={group.key} className="mega__col">
                      <div className="mega__group">
                        <p className="mega__group-label">
                          {t(`mega.${menu}.groups.${group.key}`)}
                        </p>
                        <ul className="mega__list">
                          {group.links.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className={cn(
                                  "mega__link",
                                  current === item.href && "mega__link--active",
                                )}
                                onClick={onClose}
                              >
                                <span className="mega__link-label">
                                  {t(`mega.${menu}.links.${item.key}.label`)}
                                  <span className="mega__link-go" aria-hidden>
                                    <ArrowIcon />
                                  </span>
                                </span>
                                <span className="mega__link-desc">
                                  {t(`mega.${menu}.links.${item.key}.desc`)}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href={link.href} className="mega__all" onClick={onClose}>
                  <span>{t(`mega.${menu}.all`)}</span>
                  <ArrowIcon />
                </Link>
              </div>
              {link.feature ? (
                <div className="mega__feature">
                  <div className="mega__feature-copy">
                    <p className="mega__feature-kicker">
                      {t(`mega.${menu}.feature.eyebrow`)}
                    </p>
                    <p className="mega__feature-title">
                      {t(`mega.${menu}.feature.title`)}
                    </p>
                    <p className="mega__feature-dek">
                      {t(`mega.${menu}.feature.dek`)}
                    </p>
                  </div>
                  <div className="mega__feature-actions">
                    <Link
                      href={link.feature.href}
                      className="mega__feature-cta"
                      onClick={onClose}
                    >
                      <span>{t(`mega.${menu}.feature.cta`)}</span>
                      <ArrowIcon />
                    </Link>
                    {link.feature.secondaryHref ? (
                      <Link
                        href={link.feature.secondaryHref}
                        className="mega__feature-secondary"
                        onClick={onClose}
                      >
                        {t(`mega.${menu}.feature.secondary`)}
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
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
