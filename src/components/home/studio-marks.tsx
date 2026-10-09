import type { ReactNode, SVGProps } from "react";
import "@/styles/routes/studio.css";
import type { ExploreIconId } from "@/content/home-links";
import type { HomeServiceSlug } from "@/content/home-services";

type MarkProps = SVGProps<SVGSVGElement>;

function Study({
  children,
  className,
  viewBox = "0 0 640 440",
  ...props
}: MarkProps & { children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden
      className={className ? `studio-mark ${className}` : "studio-mark"}
      {...props}
    >
      {children}
    </svg>
  );
}

/** A page and a phone. Both end on the same blue bar. */
export function WebStudy(props: MarkProps) {
  return (
    <Study {...props}>
      <rect className="studio-mark__frame" x="168" y="28" width="404" height="384" />
      <rect className="studio-mark__ink" x="248" y="56" width="276" height="168" />
      <path className="studio-mark__quiet" d="M248 260H524" />
      <path className="studio-mark__quiet" d="M248 292H468" />
      <path className="studio-mark__quiet" d="M248 324H508" />
      <rect className="studio-mark__blue" x="248" y="360" width="276" height="28" />
      <rect className="studio-mark__frame" x="48" y="132" width="176" height="280" />
      <rect className="studio-mark__ink" x="68" y="156" width="136" height="112" />
      <path className="studio-mark__quiet" d="M68 292H204" />
      <path className="studio-mark__quiet" d="M68 320H172" />
      <rect className="studio-mark__blue" x="68" y="360" width="136" height="28" />
    </Study>
  );
}

/** One result leaves the column. The frame still cuts across it. */
export function SeoStudy(props: MarkProps) {
  return (
    <Study {...props}>
      <rect className="studio-mark__frame" x="64" y="40" width="312" height="344" />
      <path className="studio-mark__quiet" d="M80 68V356" />
      <rect className="studio-mark__ink" x="96" y="68" width="220" height="40" />
      <rect className="studio-mark__ink" x="96" y="128" width="164" height="40" />
      <rect className="studio-mark__blue" x="96" y="188" width="468" height="40" />
      <rect className="studio-mark__ink" x="96" y="256" width="196" height="40" />
      <rect className="studio-mark__ink" x="96" y="316" width="140" height="40" />
    </Study>
  );
}

/** Color separation: two squares and the blue chip that sits in the overlap. */
export function BrandStudy(props: MarkProps) {
  return (
    <Study {...props}>
      <g className="studio-mark__crop">
        <path d="M148 98V82H164" />
        <path d="M456 82H472V98" />
        <path d="M472 374V390H456" />
        <path d="M164 390H148V374" />
      </g>
      <rect className="studio-mark__ink" x="176" y="108" width="200" height="200" />
      <rect className="studio-mark__frame" x="248" y="180" width="200" height="200" />
      <rect className="studio-mark__blue" x="312" y="244" width="72" height="72" />
      <circle className="studio-mark__ring" cx="420" cy="132" r="11" />
      <path className="studio-mark__crop" d="M420 122v20M410 132h20" />
    </Study>
  );
}

/** A ledger. One row is the spend that stays. One figure is struck. */
export function PaidStudy(props: MarkProps) {
  return (
    <Study {...props}>
      <rect className="studio-mark__frame" x="72" y="56" width="496" height="328" />
      <rect className="studio-mark__blue" x="74" y="222" width="492" height="78" />
      <path className="studio-mark__quiet" d="M96 98H268" />
      <path className="studio-mark__quiet" d="M96 180H220" />
      <path className="studio-mark__quiet" d="M96 344H252" />
      <rect className="studio-mark__ink" x="400" y="86" width="136" height="24" />
      <rect className="studio-mark__ink" x="456" y="168" width="80" height="24" />
      <path className="studio-mark__strike" d="M448 160L544 200" />
      <rect className="studio-mark__ink" x="376" y="332" width="160" height="24" />
      <path className="studio-mark__glyph" d="M72 138H568" />
      <path className="studio-mark__glyph" d="M72 220H568" />
      <path className="studio-mark__glyph" d="M72 302H568" />
      <path className="studio-mark__glyph" d="M340 56V384" />
    </Study>
  );
}

/** A manuscript on one leading. The marked line meets the margin note. */
export function ContentStudy(props: MarkProps) {
  return (
    <Study {...props}>
      <rect className="studio-mark__frame" x="88" y="48" width="308" height="344" />
      <path className="studio-mark__quiet" d="M116 92H312" />
      <path className="studio-mark__quiet" d="M116 124H340" />
      <path className="studio-mark__quiet" d="M116 156H300" />
      <rect className="studio-mark__highlight" x="108" y="172" width="220" height="32" />
      <path className="studio-mark__rule" d="M116 188H316" />
      <path className="studio-mark__quiet" d="M116 220H292" />
      <path className="studio-mark__quiet" d="M116 252H328" />
      <path className="studio-mark__quiet" d="M116 284H260" />
      <path className="studio-mark__quiet" d="M116 316H228" />
      <path className="studio-mark__arrow" d="M396 188H440" />
      <rect className="studio-mark__frame" x="440" y="172" width="140" height="80" />
      <rect className="studio-mark__blue" x="456" y="184" width="40" height="8" />
      <path className="studio-mark__quiet" d="M456 208H552" />
      <path className="studio-mark__quiet" d="M456 224H524" />
    </Study>
  );
}

export function IndexStudy(props: MarkProps) {
  return (
    <Study {...props} viewBox="0 0 360 220">
      <rect className="studio-mark__frame" x="122" y="44" width="140" height="148" />
      <rect className="studio-mark__frame" x="106" y="28" width="140" height="148" />
      <rect className="studio-mark__frame" x="90" y="12" width="140" height="148" />
      <rect className="studio-mark__blue" x="110" y="32" width="64" height="10" />
      <path className="studio-mark__quiet" d="M110 58H200" />
      <path className="studio-mark__quiet" d="M110 74H176" />
      <rect className="studio-mark__ink" x="110" y="108" width="80" height="28" />
    </Study>
  );
}

function ExploreGlyph({ children, ...props }: MarkProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className="studio-mark studio-mark--glyph" {...props}>
      {children}
    </svg>
  );
}

function HomeServicesMark(props: MarkProps) {
  return (
    <ExploreGlyph {...props}>
      <path className="studio-mark__glyph" d="M18 30v20h28V30" />
      <path className="studio-mark__glyph" d="M12 32 32 14 52 32" />
      <rect className="studio-mark__blue" x="27" y="36" width="10" height="10" />
    </ExploreGlyph>
  );
}

function CommerceMark(props: MarkProps) {
  return (
    <ExploreGlyph {...props}>
      <path className="studio-mark__glyph" d="M16 26h32l-3 26H19L16 26z" />
      <path className="studio-mark__glyph" d="M24 26v-2a8 8 0 0 1 16 0v2" />
      <rect className="studio-mark__blue" x="42" y="12" width="10" height="10" />
    </ExploreGlyph>
  );
}

function ServicesMark(props: MarkProps) {
  return (
    <ExploreGlyph {...props}>
      <rect className="studio-mark__sheet" x="12" y="18" width="28" height="34" />
      <rect className="studio-mark__frame" x="22" y="10" width="28" height="34" />
      <rect className="studio-mark__blue" x="28" y="18" width="16" height="6" />
    </ExploreGlyph>
  );
}

function WorkMark(props: MarkProps) {
  return (
    <ExploreGlyph {...props}>
      <rect className="studio-mark__frame" x="12" y="10" width="34" height="44" />
      <rect className="studio-mark__blue" x="30" y="18" width="10" height="10" />
      <path className="studio-mark__glyph" d="M18 42h16" />
    </ExploreGlyph>
  );
}

function ScoreMark(props: MarkProps) {
  return (
    <ExploreGlyph {...props}>
      <rect className="studio-mark__frame" x="8" y="10" width="32" height="40" />
      <path className="studio-mark__glyph" d="M14 22h20M14 30h14M14 38h16" />
      <circle className="studio-mark__blue" cx="46" cy="46" r="8" />
    </ExploreGlyph>
  );
}

function IndustriesMark(props: MarkProps) {
  return (
    <ExploreGlyph {...props}>
      <path className="studio-mark__glyph" d="M22 42h8M34 24h10" />
      <rect className="studio-mark__ink" x="10" y="36" width="12" height="12" />
      <rect className="studio-mark__ink" x="26" y="16" width="12" height="12" />
      <rect className="studio-mark__blue" x="42" y="34" width="12" height="12" />
    </ExploreGlyph>
  );
}

export const serviceMarks: Record<HomeServiceSlug, (props: MarkProps) => ReactNode> = {
  "web-design": WebStudy,
  seo: SeoStudy,
  branding: BrandStudy,
  "paid-media": PaidStudy,
  "content-marketing": ContentStudy,
};

export const exploreMarks: Record<ExploreIconId, (props: MarkProps) => ReactNode> = {
  industries: IndustriesMark,
  "home-services": HomeServicesMark,
  ecommerce: CommerceMark,
  services: ServicesMark,
  work: WorkMark,
  contact: ScoreMark,
};
