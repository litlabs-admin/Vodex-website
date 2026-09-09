import type { ReactNode } from "react";
import styles from "./ArticleBody.module.css";

/**
 * Styling wrapper around compiled MDX content — the actual markup (h2/h3,
 * p, ul/ol, blockquote, table, Figure, Embed, links) is produced by
 * lib/mdx.ts's `renderMdx` via components/blog/mdx-components.tsx, so there
 * is nothing left for this component to switch on. Previously this rendered
 * a `PostBlock[]` union by hand (heading/paragraph/list/quote only) — that
 * type is gone along with the mock data it described; migrated content
 * needs table/figure/embed/inline-formatting support none of those four
 * variants could express.
 */
export function ArticleBody({ children }: { children: ReactNode }) {
  return <div className={styles.body}>{children}</div>;
}
