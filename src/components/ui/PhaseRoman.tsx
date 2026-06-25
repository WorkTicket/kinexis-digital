import { cn } from "@/lib/utils";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

type Props = {
  index: number;
  size?: "sm" | "md" | "lg";
  lowercase?: boolean;
  className?: string;
};

const sizes = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-3xl",
};

export default function PhaseRoman({
  index,
  size = "md",
  lowercase = false,
  className,
}: Props) {
  const numeral = ROMAN[index] ?? String(index + 1);
  const display = lowercase ? numeral.toLowerCase() : numeral;

  return (
    <span
      className={cn(
        "shrink-0 font-serif font-bold tabular-nums text-neon-cyan/30",
        sizes[size],
        className
      )}
    >
      {display}
    </span>
  );
}
