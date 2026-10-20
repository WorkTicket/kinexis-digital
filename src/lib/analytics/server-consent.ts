export function hasAcceptedWebsiteConsent(request: Request): boolean {
 return /(?:^|;\s*)kinexis-cookie-consent=accepted(?:;|$)/.test(request.headers.get("cookie") ?? "");
}
