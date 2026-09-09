import "server-only";

import { readFrontmatterDir, wordCount } from "@/lib/mdx";

/**
 * Real content, migrated from Webflow (site 66a38648fc56330fa5753f86,
 * "blog-posts" collection) — see scripts/webflow/ for the one-time
 * extraction/conversion pipeline. Article bodies live as MDX files in
 * content/blog/*.mdx; this module only reads their frontmatter (cheap,
 * synchronous, no MDX compile) for the listing pages and route params.
 * The detail route (app/resources/blog/[slug]/page.tsx) calls
 * lib/mdx.ts's `renderMdx` directly to get the compiled body + TOC.
 *
 * `server-only` (transitively, via lib/mdx.ts) — this module reads the
 * filesystem, so it must never be reachable from client code. It has been
 * before: components/sections/BlogExplorer.tsx is "use client" and pulls
 * this module in through BlogPostCard's `formatDate` import — which is why
 * formatDate now lives in the separate, client-safe lib/format-date.ts.
 */

export type BlogPostFrontmatter = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  thumb: string;
  author?: string;
  featured?: boolean;
  faqs?: { q: string; a: string }[];
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  readMinutes: number;
};

const CATEGORY_PRECEDENCE = ["Debt Collection", "AI & Technology", "Agencies", "Insurance", "Sales"];

function loadPosts(): BlogPost[] {
  const frontmatter = readFrontmatterDir<BlogPostFrontmatter>("blog");
  return frontmatter
    .map((post) => ({
      ...post,
      readMinutes: Math.max(1, Math.round(wordCount("blog", post.slug) / 200)),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const BLOG_POSTS: BlogPost[] = loadPosts();

/** Derived from whatever categories are actually present on a published
 * post, ordered by a declared editorial precedence with any unlisted
 * category (a new one a future post introduces) appended alphabetically —
 * so a filter chip can never exist with zero matching posts, and a post's
 * category can never be missing its own chip. */
export const CATEGORIES: readonly string[] = (() => {
  const present = new Set(BLOG_POSTS.map((p) => p.category));
  const known = CATEGORY_PRECEDENCE.filter((c) => present.has(c));
  const rest = [...present].filter((c) => !CATEGORY_PRECEDENCE.includes(c)).sort();
  return [...known, ...rest];
})();

export function getFeaturedPost(): BlogPost {
  return BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0];
}

export function getGridPosts(): BlogPost[] {
  const featured = getFeaturedPost();
  return BLOG_POSTS.filter((post) => post.slug !== featured.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Same-category-first, backfilled with the rest. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const rest = BLOG_POSTS.filter((post) => post.slug !== slug);
  const sameCategory = rest.filter((post) => post.category === current.category);
  const others = rest.filter((post) => post.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
