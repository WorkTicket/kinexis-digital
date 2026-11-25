const TRAILING_PUNCT = /^[.!?,;:…'"“”‘’)\]]+/;

/** H1s retain the marker phrase; other uses emphasize the marked text typographically. */
export function HL({ text, mark, phrase = false }: { text: string; mark: string; phrase?: boolean }) {
  const i = text.indexOf(mark);
  if (i < 0) return <>{text}</>;
  if (!phrase) {
    return (
      <>
        {text.slice(0, i)}
        <strong className="hl-emphasis">{mark}</strong>
        {text.slice(i + mark.length)}
      </>
    );
  }
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
