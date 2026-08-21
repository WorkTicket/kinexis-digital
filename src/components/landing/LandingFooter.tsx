import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL } from "@/content/contact";

/** Compact legal footer for ad landers — privacy/terms without browse exits. */
export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 py-8">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          © {year} KINEXIS Digital ·{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted"
          aria-label="Legal"
        >
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
