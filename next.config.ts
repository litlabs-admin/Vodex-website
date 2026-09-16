import type { NextConfig } from "next";
import { EXACT_REDIRECTS, PREFIX_REDIRECTS } from "./lib/legacy-routes";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    // Default list tops out at 3840, which full-bleed `sizes="100vw"` images
    // hit on large retina screens for no visible gain. Sources are capped at
    // 2560 too (scripts/optimize-assets.mjs).
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
    // Keep optimized variants for 31 days instead of regenerating them
    // every few hours (source files are content-stable).
    minimumCacheTTL: 2678400,
  },
  // Permanent (308) redirects from the old vodex.ai (Webflow) URL structure
  // to this site's routes, so search rankings and inbound backlinks survive
  // the cutover. Source of truth is lib/legacy-routes.ts, shared with the
  // migrated-article-body link resolver in components/blog/mdx-components.tsx
  // — one map, not two that could drift apart.
  async redirects() {
    return [
      ...EXACT_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...PREFIX_REDIRECTS.map(([fromPrefix, toPrefix]) => ({
        source: `${fromPrefix}:slug`,
        destination: `${toPrefix}:slug`,
        permanent: true,
      })),
    ];
  },
  // Same headers the old Webflow/Cloudflare setup sent, plus two defaults.
  async headers() {
    return [
      // public/assets isn't content-hashed (call samples are swapped by
      // overwriting the file), so a day's cache + background revalidation
      // rather than `immutable`.
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
