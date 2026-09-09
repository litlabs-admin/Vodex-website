// Converts one Webflow RichText field's HTML into MDX-safe body text.
//
// Strategy (why this avoids the MDX/JSX-passthrough trap documented as
// finding F3 in the migration plan): everything is routed through Turndown
// (HTML -> Markdown). Markdown text is never HTML, so it can never trip the
// "MDX parses raw HTML as JSX" problem — there is no `<br>`, no `class=`, no
// unclosed tag anywhere in the output. The only literal tags this ever
// emits are our own custom components (`<Figure .../>`, `<Embed .../>`),
// always self-closing with clean camelCase/JSX-literal prop syntax, which
// is unambiguous JSX regardless of MDX's parsing mode.
//
// Internal vodex.ai links are intentionally left as absolute URLs in the
// output — link-target resolution (internal vs external, old-path mapping)
// happens once, at render time, in the shared `a` component
// (components/blog/mdx-components.tsx). That is more robust than a
// one-time text rewrite: it also covers any link a human adds later.

import TurndownService from "turndown";
import { readImageDimensions } from "./image-dims.mjs";

const WF_ALT_SENTINEL = "__wf_reserved_inherit";
// Zero-width joiner / zero-width space — Webflow's rich-text editor leaves
// these behind as otherwise-invisible "empty" paragraphs.
const ZERO_WIDTH = /[​‌‍﻿]/g;

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…");
}

function jsxAttr(name, value) {
  if (value === undefined || value === null || value === "") return "";
  const escaped = String(value).replace(/\\/g, "\\\\").replace(/"/g, "&quot;");
  return ` ${name}="${escaped}"`;
}

/**
 * @param {string} html Raw RichText field value from Webflow.
 * @param {object} opts
 * @param {Map<string,{filename:string}>} opts.assetsByUrl Webflow asset URL -> downloaded file info (from fetch.mjs's manifest).
 * @param {Map<string,Buffer>} opts.assetBytes filename -> file bytes, for reading intrinsic dimensions.
 * @param {string} opts.publicDir e.g. "/assets/blog/inline" — where these inline images live once copied.
 * @param {string} opts.slugPrefix e.g. the post's slug, used to name inline images `<slug>-1.jpg`, `<slug>-2.jpg`, ...
 * @param {(filename:string, destName:string) => void} opts.copyAsset called once per inline image actually used, so the transform script copies exactly the files referenced.
 * @param {string} [opts.fallbackAltPrefix] used to build a non-empty (if generic) alt when Webflow supplied neither real alt text nor a caption — e.g. the post's own title. Still reported as a warning either way, so it can be reviewed and replaced with something more specific.
 * @returns {{ markdown: string, warnings: string[] }}
 */
export function htmlToMdx(html, opts) {
  const { assetsByUrl, assetBytes, publicDir, slugPrefix, copyAsset, fallbackAltPrefix } = opts;
  const warnings = [];
  let inlineImageIndex = 0;

  // --- Pre-clean, before any parsing ---------------------------------
  let cleaned = html
    // Webflow wraps embeds (tables, custom HTML) in a marker div; unwrap.
    .replace(/<div data-rt-embed-type='true'>/g, "")
    // Stray leading <br> inside a paragraph, immediately after the tag.
    .replace(/<p([^>]*)>\s*<br\s*\/?>/gi, "<p$1>")
    // Bare <h1> -> <h2>: the page shell already renders its own single <h1>
    // in ArticleHeader; only one post in the whole corpus even has one.
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");

  const td = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "_",
  });

  // Unwrap: return the (already-converted) inner content untouched. Used
  // for elements that carry no markdown-relevant semantics of their own —
  // Webflow's `id=""` litter, and the 1,487+27 <sup>/<sub> wrapping
  // ordinary running prose (a copy-paste artifact, not real superscript).
  for (const tag of ["div", "span", "sup", "sub"]) {
    td.addRule(`unwrap-${tag}`, {
      filter: tag,
      replacement: (content) => content,
    });
  }

  // Drop <style> entirely (1 occurrence in the corpus).
  td.remove("style");

  // Tables: hand-rolled GFM pipe-table serializer. All 6 tables in this
  // corpus are simple rectangular grids with inline `style=` attributes and
  // no rowspan/colspan — turndown has no built-in table rule, and adding
  // turndown-plugin-gfm for 6 tables isn't worth a dependency.
  td.addRule("table", {
    filter: "table",
    replacement: (_content, node) => {
      const rows = Array.from(node.querySelectorAll("tr"));
      if (rows.length === 0) return "";
      const cellText = (cell) => {
        // Reuse turndown for inline formatting inside a cell (bold, links),
        // then collapse to one line — GFM table cells can't contain
        // hard newlines.
        const inner = td.turndown(cell.innerHTML || "").trim();
        return inner.replace(/\n+/g, " ").replace(/\|/g, "\\|");
      };
      const headerRow = rows[0];
      const headerCells = Array.from(headerRow.querySelectorAll("th,td")).map(cellText);
      const bodyRows = rows.slice(1).map((r) => Array.from(r.querySelectorAll("th,td")).map(cellText));
      const line = (cells) => `| ${cells.join(" | ")} |`;
      const sep = `| ${headerCells.map(() => "---").join(" | ")} |`;
      return `\n\n${line(headerCells)}\n${sep}\n${bodyRows.map(line).join("\n")}\n\n`;
    },
  });

  // Figures / bare inline <img> -> a self-closing <Figure> JSX component.
  // Intrinsic width/height come from the downloaded file's own bytes (the
  // source HTML always has width="auto" height="auto" — Webflow never
  // stores real dimensions), which is what prevents layout shift.
  const embedRule = (iframe) => {
    const src = iframe.getAttribute("src") || "";
    const title = iframe.getAttribute("title") || "Embedded video";
    return `\n\n<Embed${jsxAttr("src", src)}${jsxAttr("title", title)} />\n\n`;
  };

  const figureRule = (node) => {
    // Webflow's rich-text editor also emits `<figure class="…-type-video">`
    // wrapping a <div><iframe> — no <img> at all. Route those to the same
    // <Embed> handling as a bare <iframe> instead of silently discarding
    // the whole figure (the original bug here: querySelector("img") found
    // nothing, so the video vanished with no warning).
    if (node.tagName !== "IMG") {
      const iframe = node.querySelector ? node.querySelector("iframe") : null;
      if (iframe) return embedRule(iframe);
    }
    const img = node.tagName === "IMG" ? node : node.querySelector("img");
    if (!img) {
      warnings.push(`<figure> with neither <img> nor <iframe> — dropped: ${(node.outerHTML || "").slice(0, 150)}`);
      return "";
    }
    const src = img.getAttribute("src");
    const asset = assetsByUrl.get(src);
    if (!asset) {
      warnings.push(`No downloaded asset for inline image src: ${src}`);
      return "";
    }
    inlineImageIndex += 1;
    const ext = asset.ext;
    const destName = `${slugPrefix}-${inlineImageIndex}${ext}`;
    copyAsset(asset.filename, destName);

    const dims = assetBytes.get(asset.filename) ? readImageDimensions(assetBytes.get(asset.filename)) : null;
    if (!dims) warnings.push(`Could not read dimensions for ${asset.filename} (${src})`);

    let alt = img.getAttribute("alt") || "";
    if (alt === WF_ALT_SENTINEL) alt = "";
    const figcaption = node.querySelector ? node.querySelector("figcaption") : null;
    const caption = figcaption ? decodeEntities(figcaption.textContent).trim() : "";
    if (!alt && caption) alt = caption;
    if (!alt) {
      warnings.push(`Missing alt text for inline image ${destName} (src: ${src}) — used a generic fallback, needs a real description`);
      alt = fallbackAltPrefix ? `Illustration from “${fallbackAltPrefix}”` : "Illustration";
    }

    const props =
      jsxAttr("src", `${publicDir}/${destName}`) +
      (dims ? ` width={${dims.width}} height={${dims.height}}` : "") +
      jsxAttr("alt", alt) +
      jsxAttr("caption", caption || undefined);
    return `\n\n<Figure${props} />\n\n`;
  };
  const hasFigureAncestor = (node) => {
    for (let p = node.parentNode; p; p = p.parentNode) {
      if (p.tagName === "FIGURE") return true;
    }
    return false;
  };
  td.addRule("figure", { filter: "figure", replacement: (_c, node) => figureRule(node) });
  // Images NOT nested inside a <figure> at any depth — Webflow always wraps
  // its own figures as <figure><div><img></div></figure>, so checking only
  // the immediate parent (rather than walking every ancestor) would still
  // match that inner <img> a second time here, producing a duplicate
  // <Figure> for every single figure-wrapped image in the corpus.
  td.addRule("bare-img", {
    filter: (node) => node.tagName === "IMG" && !hasFigureAncestor(node),
    replacement: (_c, node) => figureRule(node),
  });

  // Bare iframes (YouTube embeds inside blog copy — distinct from the
  // `videos` collection). When an iframe is figure-wrapped, the figure
  // rule above (which searches its full subtree) already produces the
  // <Embed> and ignores this node's own converted content — so this rule
  // firing too, redundantly, for that same descendant node is harmless.
  td.addRule("iframe", {
    filter: "iframe",
    replacement: (_c, node) => embedRule(node),
  });

  let markdown = td.turndown(cleaned);

  // Post-clean: collapse Webflow's empty "‍" (zero-width-joiner-only)
  // paragraphs, which turndown converts into blank lines with stray
  // zero-width characters rather than nothing.
  markdown = markdown
    .split("\n")
    .map((line) => (line.replace(ZERO_WIDTH, "").trim() === "" ? "" : line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { markdown, warnings };
}
