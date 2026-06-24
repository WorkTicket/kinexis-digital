import { cn } from "@/lib/utils";
import { parseTwoLine } from "@/lib/two-line-copy";

type Variant = "section" | "subheader" | "body";

const lineClass: Record<Variant, string> = {
  section: "type-section-line",
  subheader: "type-subheader-line",
  body: "type-body-line",
};

type Props = {
  text: string;
  variant?: Variant;
  className?: string;
};

export default function TwoLineText({ text, variant = "section", className }: Props) {
  const { line1, line2 } = parseTwoLine(text);
  const cls = lineClass[variant];

  if (!line2) {
    return <span className={cn(cls, className)}>{line1}</span>;
  }

  return (
    <>
      <span className={cn(cls, className)}>{line1}</span>
      {" "}
      <span className={cn(cls, className)}>{line2}</span>
    </>
  );
}
