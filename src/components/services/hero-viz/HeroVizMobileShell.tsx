import { cardClasses } from "@/lib/card-styles";

export default function HeroVizMobileShell() {
  return (
    <div
      className={cardClasses({
        hover: false,
        className:
          "flex h-[220px] w-full items-center justify-center bg-gradient-to-br from-surface-base to-neon-cyan/[0.03]",
      })}
      aria-hidden
    />
  );
}
