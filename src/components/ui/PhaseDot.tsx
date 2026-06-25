import { cn } from "@/lib/utils";

type Props = {
  active?: boolean;
  letter?: string;
  className?: string;
};

export default function PhaseDot({ active = false, letter, className }: Props) {
  if (letter) {
    return (
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
          active
            ? "border-neon-cyan/40 bg-neon-cyan/15 text-neon-cyan"
            : "border-white/10 bg-white/[0.04] text-white/50",
          className
        )}
      >
        {letter}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-2.5 w-2.5 shrink-0 rounded-full",
        active
          ? "bg-neon-cyan shadow-glow-sm"
          : "bg-white/20",
        className
      )}
    />
  );
}
