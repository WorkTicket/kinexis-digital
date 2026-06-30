import { cn } from "@/lib/utils";

type Props = {
  value: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "default" | "lg";
  labelVariant?: "default" | "stat";
  align?: "left" | "center" | "right";
  labelFirst?: boolean;
  className?: string;
  valueClassName?: string;
};

export default function ProofMetric({
  value,
  label,
  description,
  size = "default",
  labelVariant = "default",
  align = "center",
  labelFirst = false,
  className,
  valueClassName,
}: Props) {
  const labelClass = cn(
    labelVariant === "stat" ? "type-metric-label-stat" : "type-metric-label",
    labelFirst && "mt-0 mb-2",
    align === "left" && "mx-0",
    align === "right" && "ml-auto mr-0"
  );

  const labelEl = label ? <p className={labelClass}>{label}</p> : null;

  return (
    <div
      className={cn(
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className
      )}
    >
      {labelFirst && labelEl}
      <div
        className={cn(
          size === "lg" && "type-metric-lg",
          size === "sm" && "type-metric-sm",
          size === "default" && "type-metric",
          valueClassName
        )}
      >
        {value}
      </div>
      {!labelFirst && labelEl}
      {description && <p className="type-metric-desc">{description}</p>}
    </div>
  );
}
