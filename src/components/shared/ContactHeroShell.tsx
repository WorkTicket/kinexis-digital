import TwoLineText from "@/components/ui/TwoLineText";
import { HeroBgGlow, HeroGradientBg, HeroThemeBackdrop } from "@/components/ui/HeroShellDecorations";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  headline: string;
  subtitle: string;
};

export default function ContactHeroShell({ label, headline, subtitle }: Props) {
  return (
    <section className={cn("hero hero--compact hero--centered hero--ssr overflow-hidden bg-gradient-glow")}>
      <HeroGradientBg />
      <HeroThemeBackdrop />
      <HeroBgGlow />
      <div className="container-site hero__container relative z-10">
        <div className="section-header">
          <span className="hero-label">{label}</span>
          <h1
            className="mt-6 type-hero type-hero--center text-balance"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          >
            {headline}
          </h1>
          <p
            className="section-intro-lg section-intro-lg--center"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          >
            <TwoLineText text={subtitle} variant="body" />
          </p>
        </div>
      </div>
    </section>
  );
}
