/** Spain vocabulary on top of Latam copy. Formal ustedes stays; it is correct in both. */
const SPAIN_WORDS: [string, string][] = [
  ["computadoras", "ordenadores"],
  ["computadora", "ordenador"],
  ["celulares", "móviles"],
  ["celular", "móvil"],
  ["plomería", "fontanería"],
  ["plomeros", "fontaneros"],
  ["plomero", "fontanero"],
  ["estacionamiento", "aparcamiento"],
  ["manejar", "conducir"],
  ["carro", "coche"],
  ["acá", "aquí"],
];

const SKIP_KEYS = new Set(["slug", "icon", "href", "src", "path", "image", "projectSlug", "id"]);

function replaceWord(text: string, from: string, to: string) {
  return text.replace(new RegExp(`\\b${from}\\b`, "gi"), (match) => {
    const replacement = match[0] === match[0].toUpperCase() ? to.charAt(0).toUpperCase() + to.slice(1) : to;
    return replacement;
  });
}

export function spainize(text: string): string {
  return SPAIN_WORDS.reduce((next, [from, to]) => replaceWord(next, from, to), text);
}

export function spainizeData<T>(value: T, key = ""): T {
  if (typeof value === "string") return (SKIP_KEYS.has(key) ? value : spainize(value)) as T;
  if (Array.isArray(value)) return value.map((item) => spainizeData(item)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [childKey, child] of Object.entries(value)) out[childKey] = spainizeData(child, childKey);
    return out as T;
  }
  return value;
}
