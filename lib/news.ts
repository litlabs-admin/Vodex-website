/**
 * Mock content for /company/news. Same treatment as lib/blog-posts.ts /
 * lib/case-studies.ts: a plain typed array, no CMS. Per explicit user
 * instruction this round, content is a placeholder to be swapped later —
 * dates/categories/copy here are invented, though grounded where possible
 * in facts already established elsewhere in this codebase (the funding
 * item names the real backers already shown in Footer.tsx's "Backed By"
 * row — Unicorn India Ventures, Pentathlon Ventures, 100X — rather than
 * fabricating new investor names).
 *
 * Categories match the reference mockup's own filter chips (Press
 * Releases / Funding / Events / Partnerships / Featured In) — a different
 * taxonomy from Blog's subject-based categories, since news items are
 * grouped by announcement type, not topic.
 */

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  thumb: string;
  featured?: boolean;
};

export const CATEGORIES = [
  "Press Releases",
  "Funding",
  "Events",
  "Partnerships",
  "Featured In",
] as const;

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "vodex-raises-seed-round",
    title: "Vodex Raises Seed Funding to Scale Voice AI for Collections",
    excerpt:
      "Backed by Unicorn India Ventures, Pentathlon Ventures and 100X, the new funding accelerates DROS development and enterprise rollout.",
    category: "Funding",
    date: "2026-08-25",
    thumb: "/assets/results-bg.jpg",
    featured: true,
  },
  {
    slug: "introducing-dros-press-release",
    title: "Vodex Launches DROS, an Engagement Operating System for Collections",
    excerpt:
      "DROS moves collections teams beyond single-call dialers to a managed, compliant queue that re-prioritizes itself in real time.",
    category: "Press Releases",
    date: "2026-08-18",
    thumb: "/assets/engagement-queue-bg.jpg",
  },
  {
    slug: "vodex-soc2-iso-certification",
    title: "Vodex Achieves SOC 2 Type II and ISO 27001 Certification",
    excerpt:
      "Independent audits confirm Vodex's security and compliance controls meet enterprise standards for handling sensitive account data.",
    category: "Press Releases",
    date: "2026-07-22",
    thumb: "/assets/security-4.jpg",
  },
  {
    slug: "vodex-at-collections-industry-summit",
    title: "Vodex to Demo Voice AI Agents at an Upcoming Collections Industry Summit",
    excerpt:
      "The team will showcase live RPC verification and promise-to-pay capture on the show floor, with a hands-on demo booth open all week.",
    category: "Events",
    date: "2026-07-10",
    thumb: "/assets/feature-6.jpg",
  },
  {
    slug: "vodex-expands-integration-support",
    title: "Vodex Expands Integration Support Across HubSpot, Twilio and VICIdial",
    excerpt:
      "Deeper native connections make it faster for existing collections stacks to plug Vodex's voice agents directly into current workflows.",
    category: "Partnerships",
    date: "2026-06-28",
    thumb: "/assets/debt-collection-integration-bg.jpg",
  },
  {
    slug: "vodex-webinar-ai-voice-agents",
    title: "Vodex to Host a Live Webinar on AI Voice Agents in Collections",
    excerpt:
      "A product walkthrough covering compliance-first call design, auto re-dial logic, and what teams should ask any voice AI vendor.",
    category: "Events",
    date: "2026-06-12",
    thumb: "/assets/why-vodex-1.jpg",
  },
  {
    slug: "vodex-featured-voice-ai-roundup",
    title: "Vodex Featured in an Industry Roundup on Voice AI for BPOs and Contact Centers",
    excerpt:
      "Vodex's approach to compliant, high-volume outreach was highlighted alongside other voice AI platforms reshaping contact center operations.",
    category: "Featured In",
    date: "2026-05-30",
    thumb: "/assets/product-hero-bg.jpg",
  },
];

export function getFeaturedPost(): NewsPost {
  return NEWS_POSTS.find((post) => post.featured) ?? NEWS_POSTS[0];
}

export function getGridPosts(): NewsPost[] {
  const featured = getFeaturedPost();
  return NEWS_POSTS.filter((post) => post.slug !== featured.slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
