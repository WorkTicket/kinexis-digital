import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  rounded?: "lg" | "xl" | "full";
  className?: string;
};

const sizes = {
  sm: { box: "h-10 w-10", icon: "h-4 w-4" },
  md: { box: "h-12 w-12", icon: "h-5 w-5" },
  lg: { box: "h-16 w-16", icon: "h-6 w-6" },
};

export default function StepIcon({
  icon: Icon,
  size = "md",
  rounded = "lg",
  className,
}: Props) {
  const s = sizes[size];
  const radius = rounded === "full" ? "rounded-full" : rounded === "xl" ? "rounded-xl" : "rounded-lg";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border border-neon-cyan/20 bg-neon-cyan/10",
        radius,
        s.box,
        className
      )}
    >
      <Icon className={cn("text-neon-cyan", s.icon)} />
    </div>
  );
}
