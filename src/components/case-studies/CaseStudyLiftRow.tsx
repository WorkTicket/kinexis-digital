import { cn } from "@/lib/utils";

type LiftItem = {
  value: string;
  label: string;
  tone?: "traffic" | "leads" | "revenue";
};

type Props = {
  items: LiftItem[];
  className?: string;
};

const toneClass: Record<NonNullable<LiftItem["tone"]>, string> = {
  traffic: "text-emerald-400",
  leads: "text-neon-cyan",
  revenue: "gradient-text",
};

export default function CaseStudyLiftRow({ items, className }: Props) {
  return (
    <div className={cn("case-study-lift-row", className)}>
      {items.map((item) => (
        <div key={item.label} className="case-study-lift-row__item">
          <span
            className={cn(
              "case-study-lift-row__value",
              item.tone ? toneClass[item.tone] : "text-white"
            )}
          >
            {item.value}
          </span>
          <span className="case-study-lift-row__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
