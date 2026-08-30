/**
 * Shared Content-Security-Policy builder for next.config.mjs and
 * public/_headers. Keep those two consumers in lockstep.
 *
 * Google Ads / GA4 remarketing loads `www.google.<ccTLD>/ads/ga-audiences`.
 * CSP host wildcards cannot cover TLDs, so every Google-supported domain
 * is allowlisted for img-src. Source: https://www.google.com/supported_domains
 */

const GOOGLE_SUPPORTED_DOMAINS_RAW = `
.google.com .google.ad .google.ae .google.com.af .google.com.ag .google.al
.google.am .google.co.ao .google.com.ar .google.as .google.at .google.com.au
.google.az .google.ba .google.com.bd .google.be .google.bf .google.bg
.google.com.bh .google.bi .google.bj .google.com.bn .google.com.bo
.google.com.br .google.bs .google.bt .google.co.bw .google.by .google.com.bz
.google.ca .google.cd .google.cf .google.cg .google.ch .google.ci
.google.co.ck .google.cl .google.cm .google.cn .google.com.co .google.co.cr
.google.com.cu .google.cv .google.com.cy .google.cz .google.de .google.dj
.google.dk .google.dm .google.com.do .google.dz .google.com.ec .google.ee
.google.com.eg .google.es .google.com.et .google.fi .google.com.fj
.google.fm .google.fr .google.ga .google.ge .google.gg .google.com.gh
.google.com.gi .google.gl .google.gm .google.gr .google.com.gt .google.gy
.google.com.hk .google.hn .google.hr .google.ht .google.hu .google.co.id
.google.ie .google.co.il .google.im .google.co.in .google.iq .google.is
.google.it .google.je .google.com.jm .google.jo .google.co.jp .google.co.ke
.google.com.kh .google.ki .google.kg .google.co.kr .google.com.kw
.google.kz .google.la .google.com.lb .google.li .google.lk .google.co.ls
.google.lt .google.lu .google.lv .google.com.ly .google.co.ma .google.md
.google.me .google.mg .google.mk .google.ml .google.com.mm .google.mn
.google.com.mt .google.mu .google.mv .google.mw .google.com.mx
.google.com.my .google.co.mz .google.com.na .google.com.ng .google.com.ni
.google.ne .google.nl .google.no .google.com.np .google.nr .google.nu
.google.co.nz .google.com.om .google.com.pa .google.com.pe .google.com.pg
.google.com.ph .google.com.pk .google.pl .google.pn .google.com.pr
.google.ps .google.pt .google.com.py .google.com.qa .google.ro .google.ru
.google.rw .google.com.sa .google.com.sb .google.sc .google.se
.google.com.sg .google.sh .google.si .google.sk .google.com.sl .google.sn
.google.so .google.sm .google.sr .google.st .google.com.sv .google.td
.google.tg .google.co.th .google.com.tj .google.tl .google.tm .google.tn
.google.to .google.com.tr .google.tt .google.com.tw .google.co.tz
.google.com.ua .google.co.ug .google.co.uk .google.com.uy .google.co.uz
.google.com.vc .google.co.ve .google.co.vi .google.com.vn .google.vu
.google.ws .google.rs .google.co.za .google.co.zm .google.co.zw .google.cat
`;

export const GOOGLE_SUPPORTED_DOMAINS = GOOGLE_SUPPORTED_DOMAINS_RAW.trim()
  .split(/\s+/)
  .map((domain) => domain.replace(/^\./, ""));

export function googleWwwImgSrcHosts() {
  return GOOGLE_SUPPORTED_DOMAINS.map((domain) => `https://www.${domain}`).join(
    " ",
  );
}

/**
 * @param {{ isDev?: boolean, cloudflareInsightsConnect?: string, includeGoogleTldImgSrc?: boolean }} [options]
 * HTML documents use the full Google TLD img-src list. Cloudflare `_headers`
 * has a 2000-character line limit, so static assets omit that list.
 */
export function buildContentSecurityPolicy({
  isDev = false,
  cloudflareInsightsConnect = "https://cloudflareinsights.com",
  includeGoogleTldImgSrc = true,
} = {}) {
  const evalDirective = isDev ? " 'unsafe-eval'" : "";
  const googleImgHosts = includeGoogleTldImgSrc
    ? googleWwwImgSrcHosts()
    : "https://www.google.com https://www.google.ca https://www.google.co.uk https://www.google.com.mx https://www.google.es";

  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${evalDirective} https://www.googletagmanager.com https://tagassistant.google.com https://www.google-analytics.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://connect.facebook.net https://www.clarity.ms https://static.cloudflareinsights.com`,
    `script-src-elem 'self' 'unsafe-inline'${evalDirective} https://www.googletagmanager.com https://tagassistant.google.com https://www.google-analytics.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://connect.facebook.net https://www.clarity.ms https://static.cloudflareinsights.com`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://www.facebook.com https://facebook.com https://connect.facebook.net ${googleImgHosts}`,
    "media-src 'self' blob:",
    "font-src 'self' data:",
    `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.googletagmanager.com https://tagassistant.google.com https://analytics.google.com https://www.google.com https://google.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://td.doubleclick.net https://ad.doubleclick.net https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://www.facebook.com https://facebook.com https://connect.facebook.net https://graph.facebook.com https://www.clarity.ms https://*.clarity.ms ${cloudflareInsightsConnect}`,
    "frame-src 'self' https://td.doubleclick.net https://bid.g.doubleclick.net https://www.googletagmanager.com https://tagassistant.google.com https://www.facebook.com https://web.facebook.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self' https://tagassistant.google.com https://www.googletagmanager.com https://ads.google.com",
    "report-uri https://kinexisdigital.report-uri.com/r/d/csp/enforce",
  ].join("; ");
}

/** Compact CSP for public/_headers (Cloudflare asset line limit is 2000 chars). */
export function buildAssetContentSecurityPolicy({
  isDev = false,
  cloudflareInsightsConnect = "https://cloudflareinsights.com",
} = {}) {
  const evalDirective = isDev ? " 'unsafe-eval'" : "";
  const scripts = `'self' 'unsafe-inline'${evalDirective} https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://www.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://www.clarity.ms https://static.cloudflareinsights.com`;

  return [
    "default-src 'self'",
    `script-src ${scripts}`,
    `script-src-elem ${scripts}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.facebook.com https://connect.facebook.net",
    "media-src 'self' blob:",
    "font-src 'self' data:",
    `connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com https://www.google.com https://www.googleadservices.com https://*.g.doubleclick.net https://td.doubleclick.net https://www.facebook.com https://connect.facebook.net https://graph.facebook.com https://*.clarity.ms ${cloudflareInsightsConnect}`,
    "frame-src 'self' https://td.doubleclick.net https://www.googletagmanager.com https://www.facebook.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "report-uri https://kinexisdigital.report-uri.com/r/d/csp/enforce",
  ].join("; ");
}
