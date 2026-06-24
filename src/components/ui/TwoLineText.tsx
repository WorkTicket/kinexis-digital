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
  as?: "span" | "fragment";
};

export default function TwoLineText({
  text,
  variant = "section",
  className,
  as = "fragment",
}: Props) {
  const { line1, line2 } = parseTwoLine(text);
  const cls = lineClass[variant];
  const Tag = as === "span" ? "span" : "span";

  if (!line2) {
    return <Tag className={cn(cls, className)}>{line1}</Tag>;
  }

  return (
    <>
      <Tag className={cn(cls, className)}>{line1}</Tag>
      <Tag className={cn(cls, className)}>{line2}</Tag>
    </>
  );
}
