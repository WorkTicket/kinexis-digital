import { OWNERSHIP_COMPARE } from "@/lib/plans-catalog";
import { HL } from "@/components/ui";

/**
 * Own It vs monthly — desktop table + mobile-first stacked cards.
 */
export default function OwnershipCompare({
  heading,
  mark = "monthly managed plans",
}: {
  heading?: string;
  mark?: string;
}) {
  const title = heading ?? OWNERSHIP_COMPARE.headline;

  return (
    <div className="plan-compare__ownership">
      <h3 className="center">
        <HL text={title} mark={mark} />
      </h3>
      <p className="center muted">{OWNERSHIP_COMPARE.intro}</p>

      <div className="own-path-cards" aria-label="Ownership comparison">
        {OWNERSHIP_COMPARE.rows.map((row) => (
          <article className="own-path-card" key={row.path}>
            <h4 className="own-path-card__title">{row.path}</h4>
            <dl className="own-path-card__list">
              <div className="own-path-card__row">
                <dt>24-month illustration</dt>
                <dd>{row.cost24}</dd>
              </div>
              <div className="own-path-card__row">
                <dt>Ownership</dt>
                <dd>{row.ownership}</dd>
              </div>
              <div className="own-path-card__row">
                <dt>If you leave</dt>
                <dd>{row.afterCancel}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="table-scroll own-path-table">
        <table className="plan-table plan-compare__own-table">
          <thead>
            <tr>
              <th scope="col">Path</th>
              <th scope="col">24-month illustration</th>
              <th scope="col">Ownership</th>
              <th scope="col">If you leave</th>
            </tr>
          </thead>
          <tbody>
            {OWNERSHIP_COMPARE.rows.map((row) => (
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

      <p className="plan-notes__legal">{OWNERSHIP_COMPARE.footnote}</p>
    </div>
  );
}
