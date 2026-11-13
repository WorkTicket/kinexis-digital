const TRAILING_PUNCT = /^[.!?,;:…'"“”‘’)\]]+/;

/** Phrase highlight markup. Intersection marking is handled by boot.js. */
export function HL({ text, mark }: { text: string; mark: string }) {
  const i = text.indexOf(mark);
  if (i < 0) return <>{text}</>;
  let end = i + mark.length;
  const trail = text.slice(end).match(TRAILING_PUNCT);
  if (trail) end += trail[0].length;
  return (
    <>
      {text.slice(0, i)}
      <span className="hl">{text.slice(i, end)}</span>
      {text.slice(end)}
    </>
  );
}

export function Phrase({ text, mark, tone }: { text: string; mark: string; tone: "orange" | "cobalt" }) {
  const i = text.indexOf(mark);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={`phrase-mark phrase-mark--${tone}`}>{mark}</span>
      {text.slice(i + mark.length)}
    </>
  );
}
