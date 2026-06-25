import { cn } from "@/lib/utils";
import TwoLineText from "@/components/ui/TwoLineText";

type Props = {
  text: string;
  className?: string;
};

export function SectionTitle({ text, className }: Props) {
  return (
    <h2 className={cn("section-title", className)}>
      <TwoLineText text={text} variant="section" />
    </h2>
  );
}

export function SectionSubtitle({ text, className }: Props) {
  return (
    <p className={cn("section-subtitle", className)}>
      <TwoLineText text={text} variant="body" />
    </p>
  );
}

export function SubheaderTitle({ text, className }: Props) {
  return (
    <h2 className={cn("type-subheader", className)}>
      <TwoLineText text={text} variant="subheader" />
    </h2>
  );
}
