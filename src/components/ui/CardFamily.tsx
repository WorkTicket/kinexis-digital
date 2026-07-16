"use client";

import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";

type Family = "glass" | "editorial" | "dashboard" | "showcase" | "interactive";

type Props = {
  family: Family;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

const familySurfaces: Record<Family, Parameters<typeof Card>[0]["surface"]> = {
  glass: "glass",
  editorial: "default",
  dashboard: "default",
  showcase: "elevated",
  interactive: "default",
};

const familyExtras: Record<Family, string> = {
  glass: "",
  editorial: "border-0 border-b border-surface rounded-none bg-transparent pb-6",
  dashboard: "bg-bg-dark",
  showcase: "relative overflow-hidden bg-bg-secondary",
  interactive: "bg-bg-secondary",
};

export default function CardFamily({ family, children, className, hover = true }: Props) {
  return (
    <Card
      surface={familySurfaces[family]}
      hover={hover}
      animated
      press={hover}
      className={cn(familyExtras[family], className)}
    >
      {children}
    </Card>
  );
}
