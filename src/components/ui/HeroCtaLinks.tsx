import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Cta = {
  label: string;
  href: string;
};

type Props = {
  primary?: Cta;
  secondary?: Cta;
};

export default function HeroCtaLinks({ primary, secondary }: Props) {
  if (!primary && !secondary) return null;

  const base =
    "inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-xl backface-hidden touch-manipulation motion-btn min-h-touch-lg min-w-touch-lg px-5 py-4 text-base w-full sm:w-auto";

  return (
    <div className="hero__cta cta-stack">
      {primary && (
        <Link href={primary.href} aria-label={primary.label} className={cn(base, "bg-gradient text-white sm:hover:shadow-glow")}>
          {primary.label}
        </Link>
      )}
      {secondary && (
        <Link
          href={secondary.href}
          aria-label={secondary.label}
          className={cn(
            base,
            "text-white/85 border border-surface hover:text-bg hover:bg-neon-cyan hover:border-neon-cyan hover:shadow-glow-sm"
          )}
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
