/** Category chips. Cards stay in the page HTML and are shown or hidden from the boot script. */
export default function Filterable({ cats, allLabel = "All" }: { cats: string[]; allLabel?: string }) {
  return (
    <div className="chips">
      {["all", ...cats].map((cat) => (
        <button key={cat} type="button" className={`chip${cat === "all" ? " is-active" : ""}`} aria-pressed={cat === "all"} data-filter={cat}>
          {cat === "all" ? allLabel : cat}
        </button>
      ))}
    </div>
  );
}
