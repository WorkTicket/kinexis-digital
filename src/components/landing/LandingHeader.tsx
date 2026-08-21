"use client";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CallLink } from "@/components/analytics/CallLink";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL } from "@/content/contact";

/**
 * Minimal header for paid landing pages — brand + contact, no full nav exits.
 */
export function LandingHeader() {
  return (
    <>
      <div className="site-header__frost chrome-glass" aria-hidden />
      <header className="site-header pt-[env(safe-area-inset-top,0px)]">
        <div className="shell site-header__bar flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="site-header__logo inline-flex min-h-11 shrink-0 items-center"
            aria-label="KINEXIS Digital home"
          >
            <BrandLogo />
          </Link>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <CallLink className="hidden text-sm font-medium text-foreground underline-offset-2 hover:underline md:inline" />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hidden text-sm font-medium text-muted hover:text-foreground sm:inline"
            >
              {CONTACT_EMAIL}
            </a>
            <Button href="#lp-form" size="header" className="hidden sm:inline-flex">
              Get started
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
