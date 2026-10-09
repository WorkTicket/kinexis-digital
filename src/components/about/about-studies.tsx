import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { isSpanishLocale } from "@/i18n/spanish";

type ArtProps = {
  className?: string;
  locale?: Locale;
};

const copy = {
  en: {
    system: ["Search", "Page", "Revenue"],
    scraps: ["A website", "Some ads", "Blog posts"],
    chain: ["SEO", "Ads", "Pages", "Pipeline"],
    you: "You",
    strategist: "Strategist",
    hours: "2h",
    active: "active",
    off: "A post",
    rail: ["Page", "Mail", "Data"],
    spike: "Spike",
    yearsWord: "Years",
    not50: "not 50",
  },
  es: {
    system: ["Búsqueda", "Página", "Ingresos"],
    scraps: ["Un sitio", "Anuncios", "Un blog"],
    chain: ["SEO", "Pauta", "Páginas", "Embudo"],
    you: "Cliente",
    strategist: "Estratega",
    hours: "2h",
    active: "activos",
    off: "Un post",
    rail: ["Página", "Mail", "Datos"],
    spike: "Pico",
    yearsWord: "Años",
    not50: "no 50",
  },
} as const;

function words(locale?: Locale) {
  return locale && isSpanishLocale(locale) ? copy.es : copy.en;
}

function artClass(name: string, className?: string) {
  return className ? `about-art about-art--${name} ${className}` : `about-art about-art--${name}`;
}

function Scratch() {
  return (
    <svg className="about-art__scratch" viewBox="0 0 160 36" aria-hidden>
      <path d="M2 14c14 2 18 16 34 8 12-6 16 8 30 4 14-4 18 10 34 4 12-5 22 6 32 2" />
      <path d="M6 26c16-8 22 6 36-2 11-6 18 8 32 1 13-6 20 4 34-2 11-4 16 6 28 0" />
    </svg>
  );
}

/** A printer's proof. Three lines, one color bar. */
export function SystemStudy({ className, locale }: ArtProps) {
  const [search, page, revenue] = words(locale).system;
  return (
    <div className={artClass("system", className)} aria-hidden>
      <div className="about-art__back" />
      <div className="about-art__sheet">
        <p className="about-art__words">
          <span>{search}</span>
          <span>{page}</span>
          <span className="is-signal">{revenue}</span>
        </p>
        <div className="about-art__chip" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

/** Loose scraps on the left. One bound sheet on the right. */
export function SplitStudy({ className, locale }: ArtProps) {
  const c = words(locale);
  return (
    <div className={artClass("split", className)} aria-hidden>
      <div className="about-art__scraps">
        {c.scraps.map((scrap) => (
          <p key={scrap} className="about-art__scrap">
            {scrap}
          </p>
        ))}
      </div>
      <div className="about-art__sheet">
        <ol className="about-art__chain">
          {c.chain.map((line, index) => (
            <li key={line} className={index === c.chain.length - 1 ? "is-signal" : undefined}>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Eight seats filled. Two left open. */
export function RosterStudy({ className, locale }: ArtProps) {
  const c = words(locale);
  return (
    <div className={artClass("roster", className)} aria-hidden>
      <p className="about-art__eight">8</p>
      <div className="about-art__roster-side">
        <p className="about-art__of">
          –10 <span>{c.active}</span>
        </p>
        <ul className="about-art__seats">
          {Array.from({ length: 10 }, (_, index) => (
            <li key={index} className={index < 8 ? "is-in" : "is-out"} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Two notes, not a call center. */
export function DirectStudy({ className, locale }: ArtProps) {
  const c = words(locale);
  return (
    <div className={artClass("direct", className)} aria-hidden>
      <article className="about-art__note about-art__note--you">
        <p>{c.you}</p>
      </article>
      <article className="about-art__note about-art__note--pro">
        <p>{c.strategist}</p>
        <p className="about-art__hours">{c.hours}</p>
      </article>
    </div>
  );
}

/** Vanity figures marked out. The one that counts leaves the sheet. */
export function RevenueStudy({ className }: ArtProps) {
  return (
    <div className={artClass("revenue", className)} aria-hidden>
      <div className="about-art__sheet">
        <p className="about-art__struck">
          48k
          <Scratch />
        </p>
        <p className="about-art__struck">
          3.2
          <Scratch />
        </p>
      </div>
      <p className="about-art__result">142</p>
    </div>
  );
}

function Plate({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 960 640"
      fill="none"
      aria-hidden
      className="studio-mark process-plate about-plate"
    >
      <rect width="960" height="640" fill="#07080c" />
      {children}
    </svg>
  );
}

/** Quiet bars. The pair that matters sits in a measured frame. */
export function EvidenceStudy(_props: ArtProps) {
  const heights = [88, 132, 104, 156, 116, 248, 276];
  return (
    <Plate>
      <path d="M128 512H832" stroke="#242830" strokeWidth="1.5" />
      <rect
        x="628"
        y="216"
        width="180"
        height="296"
        fill="none"
        stroke="#0066ff"
        strokeWidth="1.75"
      />
      {heights.map((height, index) => (
        <rect
          key={height}
          x={164 + index * 96}
          y={512 - height}
          width="52"
          height={height}
          rx="2"
          fill={index >= 5 ? "#0066ff" : "#2c3340"}
        />
      ))}
    </Plate>
  );
}

/** One post sits apart. Page, mail, and data share a rule. */
export function SystemsPrincipleStudy({ locale }: ArtProps) {
  const c = words(locale);
  const [page, mail, data] = c.rail;
  return (
    <Plate>
      <rect
        x="96"
        y="72"
        width="280"
        height="132"
        rx="8"
        fill="#141820"
        stroke="#2c3340"
        strokeWidth="1.5"
      />
      <text x="124" y="148" fill="#6b7280" fontSize="30" fontWeight="650">
        {c.off}
      </text>

      <rect x="96" y="276" width="768" height="196" rx="8" fill="#171b23" />
      <path d="M352 308V428" stroke="#2a3038" strokeWidth="1.5" />
      <path d="M608 308V428" stroke="#2a3038" strokeWidth="1.5" />
      <text x="224" y="384" fill="#f4f5f7" fontSize="32" fontWeight="750" textAnchor="middle">
        {page}
      </text>
      <text x="480" y="384" fill="#f4f5f7" fontSize="32" fontWeight="750" textAnchor="middle">
        {mail}
      </text>
      <text x="736" y="384" fill="#f4f5f7" fontSize="32" fontWeight="750" textAnchor="middle">
        {data}
      </text>
      <rect x="96" y="492" width="768" height="12" fill="#0066ff" />
    </Plate>
  );
}

/** A spike that returns to the baseline. The other line is still climbing. */
export function HorizonStudy({ locale }: ArtProps) {
  const c = words(locale);
  return (
    <Plate>
      <path d="M96 520H864" stroke="#242830" strokeWidth="1.5" />
      <path
        d="M160 520L300 196L440 520"
        fill="none"
        stroke="#5c6370"
        strokeWidth="2.5"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <text x="300" y="164" fill="#6b7280" fontSize="24" fontWeight="650" textAnchor="middle">
        {c.spike}
      </text>
      <path
        d="M188 496L340 456L490 372L640 268L790 156L900 84"
        fill="none"
        stroke="#0066ff"
        strokeWidth="3.5"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <text x="848" y="64" fill="#f4f5f7" fontSize="30" fontWeight="750" textAnchor="end">
        {c.yearsWord}
      </text>
    </Plate>
  );
}

/** Eight seats filled. The other fifty stay in a quiet grid. */
export function FocusStudy({ locale }: ArtProps) {
  const not50 = words(locale).not50;
  return (
    <Plate>
      <text x="88" y="300" fill="#f4f5f7" fontSize="196" fontWeight="750" letterSpacing="-8">
        8
      </text>
      {Array.from({ length: 10 }, (_, index) => (
        <rect
          key={index}
          x={88 + (index % 5) * 48}
          y={index < 5 ? 348 : 400}
          width="36"
          height="36"
          rx="2"
          fill={index < 8 ? "#f4f5f7" : "transparent"}
          stroke={index < 8 ? "none" : "#3a414c"}
          strokeWidth="1.75"
        />
      ))}
      <text x="520" y="168" fill="#6b7280" fontSize="26" fontWeight="650">
        {not50}
      </text>
      {Array.from({ length: 50 }, (_, index) => (
        <rect
          key={index}
          x={520 + (index % 10) * 36}
          y={200 + Math.floor(index / 10) * 36}
          width="16"
          height="16"
          rx="1"
          fill="#f4f5f7"
          opacity="0.32"
        />
      ))}
    </Plate>
  );
}

export const methodMarkIds = ["analyze", "strategize", "build", "optimize", "scale"] as const;

export type MethodMarkId = (typeof methodMarkIds)[number];

export const principleMarks = [
  EvidenceStudy,
  SystemsPrincipleStudy,
  HorizonStudy,
  FocusStudy,
] as const;

export const partnershipMarks = [RosterStudy, DirectStudy, RevenueStudy] as const;
