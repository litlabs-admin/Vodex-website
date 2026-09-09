import type { NextConfig } from "next";
import { EXACT_REDIRECTS, PREFIX_REDIRECTS } from "./lib/legacy-routes";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
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
};

export default nextConfig;
