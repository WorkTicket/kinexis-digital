import { cn } from "@/lib/utils";

export type HeroTheme = "seo" | "ppc" | "web-design" | "automation" | "branding" | "default";

type Props = {
  theme?: HeroTheme;
  className?: string;
};

export default function HeroBackdrop({ theme = "default", className }: Props) {
  if (theme === "default") return null;

  return (
    <div className={cn("hero-backdrop pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className={cn("hero-backdrop__pattern", `hero-backdrop__pattern--${theme}`)} />
    </div>
  );
}
