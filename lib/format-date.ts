/**
 * Client-safe date formatter shared by every card/hero that renders a
 * post/video/news date. Extracted out of lib/blog-posts.ts (and the
 * duplicate copies in lib/news.ts / lib/videos.ts) so that those modules
 * are free to read the filesystem (MDX frontmatter) without pulling
 * `node:fs` into the client bundle — components/sections/BlogExplorer.tsx
 * ("use client") imports BlogPostCard, which imported `formatDate` as a
 * VALUE from "@/lib/blog-posts", so the whole module (including any fs
 * call) was reachable from client code. Same chain via NewsCard/lib/news
 * and VideoCard/lib/videos. This module has no such dependency and is
 * safe in both server and client trees.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
