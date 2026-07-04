import HeroBackdrop, { type HeroTheme } from "@/components/ui/HeroBackdrop";
import { cn } from "@/lib/utils";

export function HeroGradientBg() {
  return (
    <div className="hero-gradient-animated" aria-hidden="true">
      <div className="hero-gradient-animated__orb" />
    </div>
  );
}

export function HeroBgGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(100%,42rem)] h-72 rounded-full bg-neon-cyan/[0.022] blur-[140px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/25 via-transparent to-charcoal/50" />
    </div>
  );
}

export function HeroThemeBackdrop({ theme = "default" }: { theme?: HeroTheme }) {
  return <HeroBackdrop theme={theme} />;
}

export function heroPageSectionClass(theme: HeroTheme = "default", extra?: string) {
  return cn(
    "hero hero--page hero--ssr",
    theme !== "default" && `hero--theme-${theme}`,
    extra
  );
}
