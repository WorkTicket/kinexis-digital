import type { ReactNode, SVGProps } from "react";
import "@/styles/routes/studio.css";
import type { MethodMarkId } from "@/components/about/about-studies";
import type { HomeProcessStepId } from "@/content/home-process";

type MarkProps = SVGProps<SVGSVGElement>;

function Mark({ children, ...props }: MarkProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      className="studio-mark studio-mark--glyph process-stage__mark"
      {...props}
    >
      {children}
    </svg>
  );
}

function AuditMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect className="studio-mark__frame" x="18" y="16" width="58" height="76" />
      <path className="studio-mark__quiet" d="M30 36H64" />
      <path className="studio-mark__quiet" d="M30 50H52" />
      <path className="studio-mark__glyph" d="M30 64H46" />
      <rect className="studio-mark__blue" x="30" y="72" width="28" height="8" />
      <circle className="studio-mark__ring" cx="74" cy="74" r="18" />
      <path className="studio-mark__plot" d="M87 87 102 102" />
    </Mark>
  );
}

function BuildMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect className="studio-mark__frame" x="14" y="18" width="68" height="50" />
      <path className="studio-mark__quiet" d="M14 32H82" />
      <rect className="studio-mark__frame" x="58" y="40" width="46" height="62" />
      <rect className="studio-mark__blue" x="26" y="48" width="32" height="8" />
      <rect className="studio-mark__blue" x="68" y="78" width="26" height="8" />
    </Mark>
  );
}

function RunMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <path className="studio-mark__quiet" d="M18 98H102" />
      <rect className="studio-mark__ink" x="26" y="70" width="16" height="28" />
      <rect className="studio-mark__ink" x="52" y="50" width="16" height="48" />
      <rect className="studio-mark__blue" x="78" y="28" width="16" height="70" />
      <path className="studio-mark__plot" d="M34 74 60 54 86 32" />
    </Mark>
  );
}

function AnalyzeMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect className="studio-mark__frame" x="16" y="16" width="64" height="64" />
      <path className="studio-mark__quiet" d="M48 16V80" />
      <path className="studio-mark__quiet" d="M16 48H80" />
      <rect className="studio-mark__blue" x="50" y="18" width="28" height="28" />
      <circle className="studio-mark__ring" cx="78" cy="78" r="16" />
      <path className="studio-mark__plot" d="M90 90 104 104" />
    </Mark>
  );
}

function StrategizeMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <path className="studio-mark__quiet" d="M28 86 52 58" />
      <path className="studio-mark__quiet" d="M52 58 34 36" />
      <path className="studio-mark__plot" d="M52 58 86 34" />
      <circle className="studio-mark__dot" cx="28" cy="86" r="7" />
      <circle className="studio-mark__dot" cx="34" cy="36" r="7" />
      <circle className="studio-mark__dot" cx="52" cy="58" r="7" />
      <circle className="studio-mark__blue" cx="86" cy="34" r="8" />
    </Mark>
  );
}

function OptimizeMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <path className="studio-mark__glyph" d="M22 34H98" />
      <path className="studio-mark__glyph" d="M22 60H98" />
      <path className="studio-mark__glyph" d="M22 86H98" />
      <rect className="studio-mark__ink" x="36" y="26" width="16" height="16" />
      <rect className="studio-mark__blue" x="70" y="52" width="16" height="16" />
      <rect className="studio-mark__ink" x="48" y="78" width="16" height="16" />
    </Mark>
  );
}

function ScaleMark(props: MarkProps) {
  return (
    <Mark {...props}>
      <rect className="studio-mark__ink" x="16" y="76" width="26" height="22" />
      <rect className="studio-mark__ink" x="47" y="50" width="26" height="22" />
      <rect className="studio-mark__blue" x="78" y="24" width="26" height="22" />
    </Mark>
  );
}

export const processMarks: Record<HomeProcessStepId, (props: MarkProps) => ReactNode> = {
  audit: AuditMark,
  build: BuildMark,
  run: RunMark,
};

export const methodMarks: Record<MethodMarkId, (props: MarkProps) => ReactNode> = {
  analyze: AnalyzeMark,
  strategize: StrategizeMark,
  build: BuildMark,
  optimize: OptimizeMark,
  scale: ScaleMark,
};
