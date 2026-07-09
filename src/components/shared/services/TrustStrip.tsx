import { Award, BarChart3, Shield } from "lucide-react";
import type { TrustStripItem } from "@/content/trust-strip";

type Props = {
  items: TrustStripItem[];
};

function TrustIcon({ icon }: { icon: TrustStripItem["icon"] }) {
  switch (icon) {
    case "google":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      );
    case "meta":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.594 9.26.095 12.576.095 16c0 .344.004.688.013 1.031.006.232.198.422.431.422h3.028c.19 0 .354-.138.382-.325.248-1.618.842-3.037 1.732-4.037.828-.928 1.871-1.403 3.002-1.403 1.263 0 2.326.557 3.086 1.638.761 1.082 1.127 2.557 1.127 4.244 0 .19.154.344.344.344h3.028c.233 0 .425-.19.431-.422.009-.343.013-.687.013-1.031 0-3.424-.499-6.74-1.949-8.857C17.598 5.31 15.883 4.03 13.915 4.03c-1.297 0-2.433.532-3.25 1.495-.817-.963-1.953-1.495-3.25-1.495z"
          />
        </svg>
      );
    case "shield":
      return <Shield className="h-5 w-5" aria-hidden />;
    case "chart":
      return <BarChart3 className="h-5 w-5" aria-hidden />;
    default:
      return <Award className="h-5 w-5" aria-hidden />;
  }
}

/** Certifications and trust signals below the service hero. */
export default function TrustStrip({ items }: Props) {
  return (
    <div className="border-b border-surface bg-bg-dark/50">
      <div className="container-site py-5 md:py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-sm text-muted">
              <span className="text-neon-cyan/70">
                <TrustIcon icon={item.icon} />
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
