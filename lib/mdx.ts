import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { ReactElement } from "react";
import { mdxComponents } from "@/components/blog/mdx-components";
import { rehypeCollectHeadings, type TocItem } from "@/lib/rehype-collect-headings";

/**
 * Everything backed by an .mdx file under content/ (currently blog posts
 * and case studies) reads through this one module. `server-only` makes an
 * accidental import
 * from a client component (the exact bug class documented in this
 * project's migration notes — components/sections/BlogExplorer.tsx is
 * "use client" and pulls lib/blog-posts.ts in through BlogPostCard) fail
 * loudly at build time instead of shipping `node:fs` into the browser
 * bundle.
 */

export type FrontmatterOf<T> = T & { slug: string };

/** Lists every `.mdx` file's frontmatter in a content directory — used by
 * the listing pages and by generateStaticParams, WITHOUT compiling any
 * post body (the expensive part). Slug comes from the filename, not a
 * frontmatter field, so a renamed file can never silently drift from its
 * own route. */
export function readFrontmatterDir<T extends Record<string, unknown>>(dir: string): FrontmatterOf<T>[] {
  const full = path.join(process.cwd(), "content", dir);
  return readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = readFileSync(path.join(full, f), "utf8");
      const { data } = matter(raw);
      return { ...(data as T), slug: f.replace(/\.mdx$/, "") };
    });
}

/** Word count of a post's body (frontmatter + JSX component tags/props
 * excluded), for a computed `readMinutes` that can never drift from the
 * body it describes — no separate stored field to keep in sync. */
export function wordCount(dir: string, slug: string): number {
  const full = path.join(process.cwd(), "content", dir, `${slug}.mdx`);
  const { content } = matter(readFileSync(full, "utf8"));
  const plain = content
    .replace(/<[^>]+\/?>/g, " ") // JSX component tags (<Figure ... />, <Embed ... />)
    .replace(/[#*_>`|-]/g, " ") // markdown syntax characters
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1"); // link text, drop the URL
  const words = plain.split(/\s+/).filter(Boolean);
  return words.length;
}

export type RenderedMdx<T> = {
  frontmatter: FrontmatterOf<T>;
  content: ReactElement;
  toc: TocItem[];
};

/** Compiles one post's body to React elements, and collects its h2 table of
 * contents in the same pass (see rehypeCollectHeadings for why a second,
 * separate extraction pass would risk drifting from what rehype-slug
 * actually slugified). */
export async function renderMdx<T extends Record<string, unknown>>(
  dir: string,
  slug: string,
): Promise<RenderedMdx<T>> {
  const full = path.join(process.cwd(), "content", dir, `${slug}.mdx`);
  const raw = readFileSync(full, "utf8");
  const { data, content: body } = matter(raw);

  const toc: TocItem[] = [];
  const { content } = await compileMDX<Record<string, unknown>>({
    source: body,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeCollectHeadings(toc)],
      },
    },
  });

  return {
    frontmatter: { ...(data as T), slug },
    content,
    toc,
  };
}
