"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown, Globe } from "lucide-react";

const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español (LATAM)",
};

type LanguageSwitcherProps = {
  variant?: "header" | "footer";
  className?: string;
  menuOpen?: boolean;
  /** Icon-only on lg–xl to free header space for nav labels */
  compact?: boolean;
};

export default function LanguageSwitcher({
  variant = "header",
  className,
  menuOpen = false,
  compact = false,
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }
    setOpen(false);
    router.push(pathname, { locale: newLocale });
    router.refresh();
  };

  useEffect(() => {
    if (menuOpen) setOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (variant === "footer") {
    return (
      <nav
        aria-label="Language"
        className={cn("flex flex-wrap items-center justify-center gap-1", className)}
      >
        {locales.map((loc, index) => (
          <span key={loc} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-muted/30" aria-hidden>
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => switchLocale(loc)}
              className={cn(
                "text-xs transition-colors duration-200",
                locale === loc
                  ? "text-white font-medium"
                  : "text-muted/70 hover:text-white"
              )}
              aria-current={locale === loc ? "true" : undefined}
            >
              {localeLabels[loc]}
            </button>
          </span>
        ))}
      </nav>
    );
  }

  return (
    <div ref={containerRef} className={cn("header-lang-switcher relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
        className={cn(
          "header-lang-btn text-[11px] xl:text-xs",
          compact && "header-lang-btn--compact",
          open && "header-lang-btn--open"
        )}
      >
        <Globe className="h-3.5 w-3.5 shrink-0 text-neon-cyan/75" aria-hidden />
        <span
          className={cn(
            "hidden xs:inline max-w-[5.5rem] truncate sm:max-w-none",
            compact && "lg:hidden xl:inline"
          )}
        >
          {localeLabels[locale]}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 shrink-0 text-white/40 transition-transform duration-300 ease-out",
            open && "rotate-180 text-neon-cyan/70"
          )}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "header-lang-menu absolute right-0 top-[calc(100%+0.25rem)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        )}
      >
        <ul
          role="listbox"
          aria-label="Language"
          className="header-lang-menu__panel min-w-[11.5rem] overflow-hidden rounded-xl py-1 backdrop-blur-2xl"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={locale === loc}>
              <button
                type="button"
                onClick={() => switchLocale(loc)}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors duration-200",
                  locale === loc
                    ? "bg-surface-active text-white font-medium"
                    : "text-white/55 hover:bg-surface-hover hover:text-white"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    locale === loc ? "bg-neon-cyan shadow-[0_0_8px_rgba(0,212,255,0.5)]" : "bg-transparent"
                  )}
                  aria-hidden
                />
                {localeLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
