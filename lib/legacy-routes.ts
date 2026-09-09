/**
 * Single source of truth for every old vodex.ai (Webflow) URL this Next.js
 * site needs to know about. Two consumers:
 *  - next.config.ts's `redirects()` — so a visitor hitting the old URL
 *    directly gets sent to the new one (permanent, 308), preserving search
 *    rankings and backlinks across the cutover.
 *  - components/blog/mdx-components.tsx's `a` override — so an internal
 *    `https://www.vodex.ai/...` link written inside migrated article body
 *    copy resolves to the new route instead of round-tripping through the
 *    (soon to be retired) Webflow site.
 *
 * Kept as plain data + a couple of pure functions (no Next-specific types)
 * so it's safe to import from next.config.ts, which Next transpiles in a
 * restricted context.
 */

/** Exact old path -> new path. */
export const EXACT_REDIRECTS: Array<[string, string]> = [
  ["/blog", "/resources/blog"],
  ["/news", "/company/news"],
  ["/videos", "/resources/videos"],
  ["/case-studies", "/resources/case-studies"],
  ["/faq", "/resources/faq"],
  ["/research", "/resources/research"],
  ["/compliance", "/resources/compliance"],
  ["/product", "/products"],
  ["/about-us", "/company/about"],
  ["/contactus", "/company/contact"],
  ["/investors-partners", "/company/investors"],
  ["/debt-collection", "/solutions/debt-collection"],
  ["/collections-software-integration", "/solutions/collection-software"],
  ["/use-cases/payment-reminders", "/solutions/payment-reminders"],
  ["/use-cases/promise-to-pay-capture", "/solutions/promise-to-pay"],
  ["/use-cases/lead-qualification", "/solutions/lead-qualification"],
  // /search has no real equivalent on this site — the blog listing is the
  // only page with a search box, so it's the least-bad landing spot.
  ["/search", "/resources/blog"],
];

/** Old path prefix -> new path prefix; the remainder (the slug) carries
 * over unchanged. Blog post and case study slugs were deliberately NOT
 * re-slugged during migration specifically so these wildcard redirects
 * (and any inbound backlink to a specific post) keep working. */
export const PREFIX_REDIRECTS: Array<[string, string]> = [
  ["/blog-posts/", "/resources/blog/"],
  ["/case-studies/", "/resources/case-studies/"],
];

/** Old paths with genuinely no destination on the new site yet (legal
 * pages that were never built) — listed so they're a deliberate, documented
 * gap rather than a silent omission. Left un-redirected: sending these to
 * a nonexistent page would be worse than the clean 404 they get today. */
export const UNRESOLVED_LEGACY_PATHS = ["/privacy-policy", "/terms-of-use", "/cookie-management"];

/**
 * Resolves an absolute vodex.ai URL or a bare path to its new internal
 * route. Returns `null` if the input isn't a vodex.ai URL at all (the
 * caller should treat it as a normal external link in that case).
 */
export function mapLegacyVodexUrl(href: string): string | null {
  const match = href.match(/^https?:\/\/(?:www\.)?vodex\.ai(\/[^?#]*)?/i);
  if (!match) return null;
  const path = (match[1] || "/").replace(/\/+$/, "") || "/";
  return mapLegacyPath(path);
}

/** Resolves a bare old path (already stripped of domain) to its new route.
 * Falls back to returning the path unchanged if nothing matches — better
 * to attempt the same path on the new site than to break the link. */
export function mapLegacyPath(path: string): string {
  const exact = EXACT_REDIRECTS.find(([from]) => from === path);
  if (exact) return exact[1];
  for (const [fromPrefix, toPrefix] of PREFIX_REDIRECTS) {
    if (path.startsWith(fromPrefix)) return toPrefix + path.slice(fromPrefix.length);
  }
  return path;
}
