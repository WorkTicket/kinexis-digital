import { cache } from "react";
import { headers } from "next/headers";
import {
  type Locale,
  EN_REDIRECTED_BLOG_SLUGS,
  MIRROR_PATHS,
  englishPath,
  isLocale,
  isMirrored,
  localeFromPath,
  localizeHtmlHrefs,
  pathFromSlug,
  switchHref,
  withLocale,
} from "@/lib/locale-path";

export type { Locale };
export {
  EN_REDIRECTED_BLOG_SLUGS,
  MIRROR_PATHS,
  englishPath,
  isLocale,
  isMirrored,
  localeFromPath,
  localizeHtmlHrefs,
  pathFromSlug,
  switchHref,
  withLocale,
};

export const LOCALE_HEADER = "x-kd-locale";
export const PATH_HEADER = "x-kd-path";
export const LANG_COOKIE = "kd_lang";

export function contentLanguage(locale: Locale): string {
  // Match the HTML lang attribute so Search Console and crawlers see the same
  // language signal in Content-Language and the document.
  if (locale === "es-ES") return "es-ES";
  if (locale === "es-419") return "es";
  return "en";
}

export function htmlLang(locale: Locale): string {
  if (locale === "es-ES") return "es-ES";
  if (locale === "es-419") return "es";
  return "en";
}

export function ogLocale(locale: Locale): string {
  if (locale === "es-ES") return "es_ES";
  if (locale === "es-419") return "es_MX";
  return "en_US";
}

/**
 * Indexable locales for Google. `/es` (Latam / US Spanish) stays in search.
 * `/es-es` (Spain) permanently redirects to `/es` and is not indexed.
 */
export function localeIndexable(locale: Locale): boolean {
  return locale === "en" || locale === "es-419";
}

/**
 * hreflang set. `es` and `es-US` share the Latam URL. `es-419` is not a valid
 * hreflang code. Spain (`es-ES`) is omitted — those URLs 301 to `/es`.
 */
export function hreflangLanguages(pathname: string): Record<string, string> | undefined {
  const en = englishPath(pathname);
  if (!isMirrored(en) || !localeIndexable("en")) return undefined;
  const es = withLocale("es-419", en);
  const blogSlug = en.startsWith("/blog/") ? en.slice("/blog/".length) : "";
  // Retired English Spanish-slug posts: Spanish-only hreflang (no EN alternate).
  if (blogSlug && EN_REDIRECTED_BLOG_SLUGS.has(blogSlug)) {
    return {
      es,
      "es-US": es,
      "x-default": es,
    };
  }
  return {
    "en-US": en,
    es,
    "es-US": es,
    "x-default": en,
  };
}

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await headers()).get(LOCALE_HEADER);
  return isLocale(value) ? value : "en";
});

export const getRequestPath = cache(async (): Promise<string> => {
  return (await headers()).get(PATH_HEADER) || "/";
});

export { spainize, spainizeData } from "@/lib/spainize";

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
if(saved==="es-ES"){write("es-419");saved="es-419"}
if(!saved&&prefix!=="en")return;
var want=saved||detect();
if(want==="es-ES")want="es-419";
if(!want||want===prefix||(want==="es-419"&&prefix==="es-ES"))return;
var next=target(path,want);
if(!next||next===path)return;
if(!saved)write(want);
location.replace(next+location.search+location.hash);
function detect(){
  var langs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||""];
  var i,low;
  for(i=0;i<langs.length;i++){
    low=String(langs[i]||"").toLowerCase();
    if(low==="es"||low.indexOf("es-")===0)return "es-419";
    if(low==="en"||low.indexOf("en-")===0)return "en";
  }
  return "";
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
  return en==="/"?"/es":"/es"+en;
}
})();`;
}
