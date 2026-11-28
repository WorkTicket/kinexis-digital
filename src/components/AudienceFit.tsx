/** Who this offer is for / not for — factual, no insults. */
export default function AudienceFit({
  forLines,
  notForLines,
}: {
  forLines: string[];
  notForLines: string[];
}) {
  return (
    <div className="audience-fit">
      <div>
        <h2 className="card-title">Who this is for</h2>
        <ul>
          {forLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="card-title">Who this is not for</h2>
        <ul>
          {notForLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
