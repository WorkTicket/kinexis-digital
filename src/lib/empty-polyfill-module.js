/**
 * Empty stand-in for Next.js `polyfill-module`.
 *
 * Our browserslist already matches Next 16's modern baseline
 * (Chrome/Edge/Firefox 111+, Safari 16.4+), which natively implements every
 * API that module polyfills. Next still imports it unconditionally, so the
 * webpack/turbopack aliases in next.config.ts point here to keep those
 * legacy helpers out of client chunks (Lighthouse "Legacy JavaScript").
 */
export {};
