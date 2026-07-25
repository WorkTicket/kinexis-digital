"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { businessProfile } from "@/lib/business";

/** Minimal footer for paid landing pages — privacy + contact only. */
function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface bg-bg-dark py-8">
      <div className="container-site flex flex-col items-center gap-3 text-center text-xs text-text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>
          © {year} {businessProfile.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/privacy" className="hover:text-white underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white underline-offset-2 hover:underline">
            Terms
          </Link>
          <a
            href={`mailto:${businessProfile.email}`}
            className="hover:text-white underline-offset-2 hover:underline"
          >
            {businessProfile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/lp/")) return <LandingFooter />;
  return <>{children}</>;
}
