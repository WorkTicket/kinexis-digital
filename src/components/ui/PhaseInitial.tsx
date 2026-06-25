import { cn } from "@/lib/utils";

type Props = {
  letter: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-10 w-10 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
};

export default function PhaseInitial({ letter, size = "md", className }: Props) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-bold uppercase tracking-tight text-white/80",
        sizes[size],
        className
      )}
    >
      {letter}
    </div>
  );
}
