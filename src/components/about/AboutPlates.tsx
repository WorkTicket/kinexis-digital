import { localeContent, getLocaleContent } from "@/i18n/locale-content";
import type { Locale } from "@/i18n/routing";

const rosterCopy = localeContent({
  en: {
    kicker: "The roster",
    figure: "8–10",
    unit: "Active clients",
    lines: [
      "Every channel connects",
      "Every decision tracks revenue",
      "One system from the first week",
    ],
  },
  "es-419": {
    kicker: "La cartera",
    figure: "8–10",
    unit: "Clientes activos",
    lines: [
      "Cada canal se conecta",
      "Cada decisión mira ingresos",
      "Un sistema desde la primera semana",
    ],
  },
});

const whyCopy = localeContent({
  en: {
    scraps: ["A website", "Some ads", "Blog posts"],
    chain: ["SEO", "Ads", "Landing pages", "Pipeline"],
  },
  "es-419": {
    scraps: ["Una web", "Unos anuncios", "Artículos"],
    chain: ["SEO", "Anuncios", "Landing pages", "Pipeline"],
  },
  "es-ES": {
    scraps: ["Una web", "Unos anuncios", "Artículos"],
    chain: ["SEO", "Anuncios", "Landing pages", "Pipeline"],
  },
});

type ArchNode = {
  id: string;
  label: string;
  role: string;
};

const FLOW = ["seo", "paid-ads", "web-design", "cro", "email"] as const;

export function AboutRoster({ locale }: { locale: Locale }) {
  const copy = getLocaleContent(rosterCopy, locale);
  return (
    <figure className="about-roster" aria-hidden>
      <header className="about-roster__head">
        <p className="about-roster__kicker">{copy.kicker}</p>
        <p className="about-roster__figure">{copy.figure}</p>
        <p className="about-roster__unit">{copy.unit}</p>
      </header>
      <ul className="about-roster__lines">
        {copy.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </figure>
  );
}

export function AboutWhyPlate({
  locale,
  brokenLabel,
  systemLabel,
}: {
  locale: Locale;
  brokenLabel: string;
  systemLabel: string;
}) {
  const copy = getLocaleContent(whyCopy, locale);
  return (
    <figure className="about-split" aria-hidden>
      <div className="about-split__side about-split__side--broken">
        <p className="about-split__kicker">{brokenLabel}</p>
        <ul className="about-split__scraps">
          {copy.scraps.map((scrap) => (
            <li key={scrap}>{scrap}</li>
          ))}
        </ul>
      </div>
      <div className="about-split__side about-split__side--system">
        <p className="about-split__kicker">{systemLabel}</p>
        <ol className="about-split__chain">
          {copy.chain.map((step, index) => (
            <li key={step} className={index === copy.chain.length - 1 ? "is-end" : undefined}>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

export function AboutArchitectureMap({ nodes }: { nodes: readonly ArchNode[] }) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const flow = FLOW.map((id) => byId.get(id)).filter(
    (node): node is ArchNode => Boolean(node),
  );
  const intelligence = byId.get("analytics");

  return (
    <figure className="about-map" aria-hidden>
      <ul className="about-map__flow">
        {flow.map((node) => (
          <li key={node.id}>
            <span className="about-map__mark" aria-hidden />
            <span className="about-map__body">
              <span className="about-map__role">{node.role}</span>
              <span className="about-map__name">{node.label}</span>
            </span>
          </li>
        ))}
      </ul>
      {intelligence ? (
        <div className="about-map__intel">
          <p className="about-map__role">{intelligence.role}</p>
          <p className="about-map__intel-name">{intelligence.label}</p>
          <ul className="about-map__feeds">
            {flow.map((node) => (
              <li key={node.id}>{node.label}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </figure>
  );
}
