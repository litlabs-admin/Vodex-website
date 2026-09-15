import type { Element, ElementContent, Root, RootContent } from "hast";
import type { Plugin } from "unified";

/**
 * Groups a legal document's flat top-level output into one <section> per h2,
 * so each section can reveal on scroll and carry its own divider (see
 * components/legal/LegalSection.tsx, which MDX `section` maps to).
 *
 * - Content before the first h2 becomes `<section data-preamble>`.
 * - Each h2 and the siblings after it become `<section data-number="01">`
 *   (the h2 gets the same data-number, rendered as its label).
 *   The number is the h2's position, not parsed from the source: the cookie
 *   policy's headings aren't numbered, and privacy/terms number 1…N in order,
 *   so both come out the same.
 * - A leading "2. " is stripped from the h2 text — the number moves into the
 *   section label and the TOC instead of repeating inside the heading.
 *
 * Must run AFTER rehype-slug (ids stay "2-notice", so existing #anchors keep
 * working) and BEFORE rehypeCollectHeadings (so TOC labels are unnumbered).
 */
export const rehypeLegalSections: Plugin<[], Root> = () => (tree) => {
  const out: RootContent[] = [];
  let current: Element | null = null;
  let count = 0;

  const open = (properties: Element["properties"]): Element => {
    const section: Element = { type: "element", tagName: "section", properties, children: [] };
    out.push(section);
    return section;
  };

  for (const node of tree.children) {
    if (node.type === "element" && node.tagName === "h2") {
      count += 1;
      stripLeadingNumber(node);
      const number = String(count).padStart(2, "0");
      // Also on the h2 itself: the label is drawn as the heading's ::before,
      // so a TOC jump to the h2 id lands with the label in view too.
      node.properties = { ...node.properties, dataNumber: number };
      current = open({ dataNumber: number });
      current.children.push(node);
      continue;
    }
    // Whitespace between blocks shouldn't open an empty preamble.
    if (!current && node.type === "text" && !node.value.trim()) continue;
    current ??= open({ dataPreamble: true });
    current.children.push(node as ElementContent);
  }

  tree.children = out;
};

function stripLeadingNumber(heading: Element) {
  const first = heading.children[0];
  if (first?.type === "text") first.value = first.value.replace(/^\s*\d+\.\s*/, "");
}
