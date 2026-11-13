import Link from "next/link";
import type { Industry } from "@/data/industries";
import {
  INDUSTRY_SEO_DEPTH,
  industryCostRows,
  industryDepthLinks,
  industryProcessStepsEn,
} from "@/data/industry-seo-depth";
import { DeferredImg } from "./DeferredImg";
import { HL } from "./ui";

function tradeNoun(industry: Industry) {
  if (industry.slug === "hvac") return "HVAC";
  if (industry.slug === "electrical") return "electrician";
  if (industry.slug === "garage-doors") return "garage door";
  if (industry.slug === "pressure-washing") return "pressure washing";
  return industry.name.toLowerCase();
}

export default function IndustrySeoDepth({
  industry,
  locale = "en",
}: {
  industry: Industry;
  locale?: "en" | "es";
}) {
  const depth = INDUSTRY_SEO_DEPTH[industry.slug];
  if (!depth) return null;

  const links = industryDepthLinks(industry.slug, industry.name);
  const noun = tradeNoun(industry);
  const es = locale === "es";

  const titles = es
    ? {
        examples: `Ejemplo de sitio de ${industry.name}`,
        pages: `Páginas que armamos para un sitio de ${industry.name}`,
        cost: `Cuánto cuesta un sitio de ${industry.name} con Kinexis`,
        process: "De la vista previa gratis al lanzamiento",
        demo: "Plantilla demo",
        visit: "Ver sitio",
        down: "$0 de entrada, mes a mes, cancela cuando quieras.",
        examplesMark: "Ejemplo",
        examplesEyebrow: "Ejemplo real",
      }
    : {
        examples: `${industry.name} Website Example`,
        pages: `Pages We Build for a ${industry.name} Website`,
        cost: `What a ${industry.name} Website Costs With Kinexis`,
        process: "From Free Preview to Launch",
        demo: "Demo template",
        visit: "Visit",
        down: "$0 down, month-to-month, cancel anytime.",
        examplesMark: "Example",
        examplesEyebrow: "Real example",
      };

  const process = industryProcessStepsEn(noun);

  return (
    <>
      <section className="industry-seo-depth">
        <div className="section-head">
          <p className="eyebrow">{titles.examplesEyebrow}</p>
          <h2 className="center"><HL text={titles.examples} mark={titles.examplesMark} /></h2>
        </div>
        <div className="industry-seo-depth__examples">
          {depth.examples.slice(0, 1).map((example) => (
            <article className="industry-seo-depth__card" key={example.name}>
              <div className="industry-seo-depth__shot">
                <DeferredImg
                  src={example.image}
                  sizes="(max-width: 860px) 90vw, 420px"
                  alt={`${example.name} website`}
                  width={example.width}
                  height={example.height}
                  className="industry-seo-depth__img"
                />
              </div>
              <div className="industry-seo-depth__copy">
                <h3>
                  {example.name}
                  {example.demo ? <span className="industry-seo-depth__demo"> {titles.demo}</span> : null}
                </h3>
                <p>{example.annotation}</p>
                {example.url.startsWith("http") ? (
                  <a className="text-link" href={example.url} target="_blank" rel="noopener noreferrer">{titles.visit}</a>
                ) : (
                  <Link className="text-link" href={example.url} prefetch={false}>{titles.visit}</Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="industry-seo-depth industry-seo-depth--pages">
        <div className="section-head">
          <p className="eyebrow">{es ? "Mapa del sitio" : "Site map"}</p>
          <h2 className="center"><HL text={titles.pages} mark={es ? "Páginas" : "Pages"} /></h2>
        </div>
        <ul className="industry-seo-depth__list">
          {depth.pagesList.map((page) => (
            <li key={page}>{page}</li>
          ))}
        </ul>
        <p className="center">
          <Link className="btn btn--ghost" href={links.pagesHref} prefetch={false}>{links.pagesLabel}</Link>
        </p>
      </section>

      <section className="industry-seo-depth industry-seo-depth--cost">
        <div className="section-head">
          <p className="eyebrow">{es ? "Precios claros" : "Clear pricing"}</p>
          <h2 className="center"><HL text={titles.cost} mark={es ? "cuesta" : "Costs"} /></h2>
        </div>
        <div className="table-wrap industry-seo-depth__table">
          <table>
            <thead>
              <tr>
                <th>{es ? "Plan" : "Plan"}</th>
                <th>{es ? "Precio" : "Price"}</th>
                <th>{es ? "Notas" : "Notes"}</th>
              </tr>
            </thead>
            <tbody>
              {industryCostRows().map((row) => (
                <tr key={row.plan}>
                  <td>{row.plan}</td>
                  <td>{row.price}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="center muted">{titles.down}</p>
        <p className="center">
          <Link className="btn btn--ghost" href={links.costHref} prefetch={false}>{links.costLabel}</Link>
        </p>
      </section>

      <section className="industry-seo-depth industry-seo-depth--process">
        <div className="section-head">
          <p className="eyebrow">{es ? "Cómo trabajamos" : "How it works"}</p>
          <h2 className="center"><HL text={titles.process} mark={es ? "lanzamiento" : "Launch"} /></h2>
        </div>
        <ol className="industry-seo-depth__steps">
          {process.map((step, index) => (
            <li key={step.title}>
              <span className="industry-seo-depth__n">{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
