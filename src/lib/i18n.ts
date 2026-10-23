import { cache } from "react";
import { headers } from "next/headers";
import { POSTS } from "@/lib/content";
import { INDUSTRIES } from "@/data/industries";
import { PAGES, type PageMeta } from "@/lib/pages";

/** Cookie values. `es-419` is Latam Spanish. `es-ES` is Spain. */
export type Locale = "en" | "es-419" | "es-ES";

export const LOCALE_HEADER = "x-kd-locale";
export const PATH_HEADER = "x-kd-path";
export const LANG_COOKIE = "kd_lang";

const UNMIRRORED = new Set(["/pay", "/client-login"]);

/** English paths that have a real Spanish page. Portfolio case studies stay English. */
export const MIRROR_PATHS: readonly string[] = [
  ...(Object.values(PAGES) as PageMeta[])
    .filter((page) => page.indexable && !UNMIRRORED.has(page.path))
    .map((page) => page.path),
  ...INDUSTRIES.map((industry) => `/industries/${industry.slug}`),
  ...POSTS.map((post) => `/blog/${post.slug}`),
];

const MIRROR = new Set(MIRROR_PATHS);

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "es-419" || value === "es-ES";
}

/** Locale comes from the URL only. Accept-Language never changes the HTML. */
export function localeFromPath(pathname: string): Locale {
  if (pathname === "/es-es" || pathname.startsWith("/es-es/")) return "es-ES";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es-419";
  return "en";
}

export function contentLanguage(locale: Locale): string {
  if (locale === "es-ES") return "es-ES";
  if (locale === "es-419") return "es-419";
  return "en-US";
}

export function htmlLang(locale: Locale): string {
  return contentLanguage(locale);
}

export function ogLocale(locale: Locale): string {
  if (locale === "es-ES") return "es_ES";
  if (locale === "es-419") return "es_MX";
  return "en_US";
}

export function englishPath(pathname: string): string {
  if (pathname === "/es" || pathname === "/es-es") return "/";
  if (pathname.startsWith("/es-es/")) return pathname.slice("/es-es".length) || "/";
  if (pathname.startsWith("/es/")) return pathname.slice("/es".length) || "/";
  return pathname || "/";
}

export function isMirrored(pathname: string): boolean {
  return MIRROR.has(englishPath(pathname));
}

export function withLocale(locale: Locale, pathname: string): string {
  const en = englishPath(pathname);
  if (locale === "en") return en;
  const prefix = locale === "es-ES" ? "/es-es" : "/es";
  return en === "/" ? prefix : `${prefix}${en}`;
}

/** Same-page language link, or the locale home when that path has no translation. */
export function switchHref(locale: Locale, pathname: string): string {
  const en = englishPath(pathname);
  return withLocale(locale, isMirrored(en) ? en : "/");
}

/** hreflang set. `es` and `es-US` share the Latam URL. `es-419` is not a valid hreflang code. */
export function hreflangLanguages(pathname: string): Record<string, string> | undefined {
  const en = englishPath(pathname);
  if (!MIRROR.has(en)) return undefined;
  const es = withLocale("es-419", en);
  return {
    "en-US": en,
    es,
    "es-US": es,
    "es-ES": withLocale("es-ES", en),
    "x-default": en,
  };
}

export function pathFromSlug(slug?: string[]): string {
  if (!slug?.length) return "/";
  return `/${slug.join("/")}`;
}

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await headers()).get(LOCALE_HEADER);
  return isLocale(value) ? value : "en";
});

export const getRequestPath = cache(async (): Promise<string> => {
  return (await headers()).get(PATH_HEADER) || "/";
});

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

function replaceWord(text: string, from: string, to: string) {
  return text.replace(new RegExp(`\\b${from}\\b`, "gi"), (match) => {
    const replacement = match[0] === match[0].toUpperCase() ? to.charAt(0).toUpperCase() + to.slice(1) : to;
    return replacement;
  });
}

/** Spain vocabulary on top of Latam copy. Formal ustedes stays; it is correct in both. */
export function spainize(text: string): string {
  return SPAIN_WORDS.reduce((next, [from, to]) => replaceWord(next, from, to), text);
}

const SKIP_KEYS = new Set(["slug", "icon", "href", "src", "path", "image", "projectSlug", "id"]);

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

/**
 * Runs on every page. It never changes the HTML of the URL.
 * A saved choice wins. Otherwise a Spanish phone on an English URL opens the matching Spanish URL.
 * Spanish URLs stay put until the visitor picks a language, so crawlers can index them.
 */
export function localeBootScript(): string {
  const paths = JSON.stringify(MIRROR_PATHS);
  return `(function(){
var COOKIE="${LANG_COOKIE}";
var M=${paths};
function read(){var m=document.cookie.match(/(?:^|; )${LANG_COOKIE}=([^;]*)/);return m?decodeURIComponent(m[1]):""}
function write(v){document.cookie=COOKIE+"="+encodeURIComponent(v)+"; Path=/; Max-Age=31536000; SameSite=Lax"}
document.addEventListener("click",function(e){
  var n=e.target;
  while(n&&n!==document){
    if(n.getAttribute&&n.getAttribute("data-set-lang")){write(n.getAttribute("data-set-lang"));break}
    n=n.parentNode;
  }
},true);
var path=location.pathname;
var prefix=path==="/es-es"||path.indexOf("/es-es/")===0?"es-ES":path==="/es"||path.indexOf("/es/")===0?"es-419":"en";
var saved=read();
if(!saved&&prefix!=="en")return;
var want=saved||detect();
if(!want||want===prefix)return;
var next=target(path,want);
if(!next||next===path)return;
if(!saved)write(want);
location.replace(next+location.search+location.hash);
function detect(){
  var langs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||""];
  var i,low;
  for(i=0;i<langs.length;i++){
    low=String(langs[i]||"").toLowerCase();
    if(low==="es-es"||low.indexOf("es-es-")===0)return "es-ES";
    if(low==="es"||low.indexOf("es-")===0)return low==="es"&&spainZone()?"es-ES":"es-419";
    if(low==="en"||low.indexOf("en-")===0)return "en";
  }
  return "";
}
function spainZone(){
  var tz="";
  try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
  return tz==="Europe/Madrid"||tz==="Atlantic/Canary"||tz==="Africa/Ceuta";
}
function enPath(pathname){
  if(pathname==="/es"||pathname==="/es-es")return "/";
  if(pathname.indexOf("/es-es/")===0)return pathname.slice(6)||"/";
  if(pathname.indexOf("/es/")===0)return pathname.slice(3)||"/";
  return pathname||"/";
}
function mirrored(en){return M.indexOf(en)!==-1}
function target(pathname,locale){
  var en=enPath(pathname);
  if(!mirrored(en))return "";
  if(locale==="en")return en;
  if(locale==="es-ES")return en==="/"?"/es-es":"/es-es"+en;
  return en==="/"?"/es":"/es"+en;
}
})();`;
}
