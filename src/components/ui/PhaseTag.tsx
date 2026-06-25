import { cn } from "@/lib/utils";

type Props = {
  label: string;
  size?: "sm" | "md" | "lg" | "watermark";
  className?: string;
};

const sizes = {
  sm: "px-2.5 py-1 text-[10px]",
  md: "px-3 py-1.5 text-xs",
  lg: "px-4 py-2 text-sm",
  watermark: "text-5xl md:text-6xl lg:text-7xl leading-none",
};

export default function PhaseTag({ label, size = "md", className }: Props) {
  if (size === "watermark") {
    return (
      <span
        className={cn(
          "font-bold uppercase tracking-tight text-neon-cyan/10",
          sizes.watermark,
          className
        )}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.06] font-bold uppercase tracking-[0.15em] text-neon-cyan",
        sizes[size],
        className
      )}
    >
      {label}
    </span>
  );
}
