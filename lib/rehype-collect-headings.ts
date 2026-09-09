import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import type { Plugin } from "unified";

export type TocItem = { id: string; text: string };

/**
 * Factory plugin: takes a mutable array and pushes `{id, text}` for every
 * <h2> in the rendered tree, in document order — then the caller reads that
 * array back after `compileMDX` resolves. Must run AFTER rehype-slug (so
 * `node.properties.id` is already set) in the rehype plugin chain.
 *
 * h2-only, matching this project's pre-migration TOC behavior (the mock
 * PostBlock data only ever produced h2 headings) — h3s still get slugged
 * ids by rehype-slug for deep-linkability, they just don't appear in the
 * sidebar TOC.
 *
 * Text is read from the heading's own children rather than the MDX source,
 * specifically so it matches what rehype-slug slugified — slugifying is
 * based on rendered text (e.g. "Why **this** matters" -> "why-this-matters"),
 * so re-deriving the TOC label from raw source text would drift on any
 * heading containing inline formatting.
 */
export function rehypeCollectHeadings(toc: TocItem[]): Plugin<[], Root> {
  return () => (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2") return;
      const id = typeof node.properties?.id === "string" ? node.properties.id : undefined;
      if (!id) return;
      toc.push({ id, text: headingText(node) });
    });
  };
}

function headingText(node: Element): string {
  let text = "";
  const walk = (n: Element | { type: string; value?: string; children?: unknown[] }) => {
    if (n.type === "text" && "value" in n && typeof n.value === "string") {
      text += n.value;
      return;
    }
    if ("children" in n && Array.isArray(n.children)) {
      for (const child of n.children) walk(child as Element);
    }
  };
  walk(node);
  return text.trim();
}
