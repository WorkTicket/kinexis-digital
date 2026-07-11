/** True for locale home routes: /en, /es, /en/, /es/ */
export function isHomePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return /^\/(en|es)\/?$/.test(pathname);
}
