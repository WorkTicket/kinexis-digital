import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function PhaseAccent({ className }: Props) {
  return (
    <div
      className={cn(
        "w-1 shrink-0 self-stretch rounded-full bg-gradient-to-b from-neon-cyan to-neon-cyan/20",
        className
      )}
    />
  );
}
