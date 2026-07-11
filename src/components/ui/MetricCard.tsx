import ProofMetric from "@/components/ui/ProofMetric";
import { cardClasses } from "@/lib/card-styles";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  value: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  size?: "sm" | "default" | "lg";
  labelVariant?: "default" | "stat";
  align?: "left" | "center" | "right";
  labelFirst?: boolean;
  hover?: boolean;
  className?: string;
  valueClassName?: string;
};

/** Canonical metric/proof stat card — wraps card surface + ProofMetric typography. */
export default function MetricCard({
  value,
  label,
  description,
  size = "default",
  labelVariant = "default",
  align = "center",
  labelFirst = false,
  hover = false,
  className,
  valueClassName,
}: Props) {
  return (
    <div className={cardClasses({ surface: "default", hover, className: cn("text-center", className) })}>
      <ProofMetric
        value={value}
        label={label}
        description={description}
        size={size}
        labelVariant={labelVariant}
        align={align}
        labelFirst={labelFirst}
        valueClassName={valueClassName}
      />
    </div>
  );
}
