"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SiteLogo from "@/components/ui/SiteLogo";
import Header from "@/components/layout/Header";

/** Logo-only header for paid landing pages — no nav leak. */
function LandingHeader() {
  const tA11y = useTranslations("a11y");

  return (
    <header className="sticky top-0 z-50 border-b border-surface bg-bg-dark/90 backdrop-blur-md">
      <div className="container-site flex h-14 items-center justify-between">
        <Link href="/" className="group flex items-center no-underline" aria-label="KINEXIS Digital home">
          <SiteLogo
            src="/assets/logos/KINEXIS_logo_full.webp"
            alt={tA11y("logoAlt")}
            width={160}
            height={28}
            priority
            className="h-7 w-auto opacity-90 transition-opacity group-hover:opacity-100"
          />
        </Link>
        <a
          href="#lp-form"
          className="text-sm font-semibold text-neon-cyan hover:text-white transition-colors"
        >
          Get started
        </a>
      </div>
    </header>
  );
}

export default function HeaderGate() {
  const pathname = usePathname();
  const isLanding = pathname.startsWith("/lp/");

  if (isLanding) return <LandingHeader />;
  return <Header />;
}
