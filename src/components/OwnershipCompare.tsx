import { HL } from "@/components/ui";
import { EN_OWNERSHIP, type OwnershipCompareData } from "@/i18n/spanish-plan-compare";

/**
 * Own It vs monthly — desktop table + mobile-first stacked cards.
 */
export default function OwnershipCompare({
  heading,
  mark = "vs",
  data = EN_OWNERSHIP,
}: {
  heading?: string;
  mark?: string;
  data?: OwnershipCompareData;
}) {
  const title = heading ?? data.headline;
  const { labels } = data;

  return (
    <div className="plan-compare__ownership">
      <h2 className="center">
        <HL text={title} mark={mark} />
      </h2>
      <p className="center muted">{data.intro}</p>

      <div className="own-path-cards" aria-label={labels.aria}>
        {data.rows.map((row) => (
          <article className="own-path-card" key={row.path}>
            <h3 className="own-path-card__title">{row.path}</h3>
            <dl className="own-path-card__list">
              <div className="own-path-card__row">
                <dt>{labels.cost24}</dt>
                <dd>{row.cost24}</dd>
              </div>
              <div className="own-path-card__row">
                <dt>{labels.ownership}</dt>
                <dd>{row.ownership}</dd>
              </div>
              <div className="own-path-card__row">
                <dt>{labels.afterCancel}</dt>
                <dd>{row.afterCancel}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="table-scroll own-path-table" role="region" aria-label={labels.aria} tabIndex={0}>
        <table className="plan-table plan-compare__own-table">
          <thead>
            <tr>
              <th scope="col">{labels.path}</th>
              <th scope="col">{labels.cost24}</th>
              <th scope="col">{labels.ownership}</th>
              <th scope="col">{labels.afterCancel}</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.path}>
                <th scope="row">{row.path}</th>
                <td>{row.cost24}</td>
                <td>{row.ownership}</td>
                <td>{row.afterCancel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="plan-notes__legal">{data.footnote}</p>
    </div>
  );
}
