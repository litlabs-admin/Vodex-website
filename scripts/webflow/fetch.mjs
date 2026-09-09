#!/usr/bin/env node
// Phase 1 of the Webflow -> Next.js migration: pull every collection's
// published items + schema from the Webflow Data API v2, and download every
// referenced asset (thumbnails, logos, inline body images). Writes ONLY to
// scripts/webflow/.cache/ (gitignored) — nothing here touches the app.
//
// Idempotent and re-runnable: safe to run again if an asset download fails
// partway through, or if Webflow content changes before cutover. The slow,
// rate-limited part (asset downloads) is deliberately separated from
// transform.mjs (phase 2, run dozens of times while iterating) so iterating
// on the transform never re-hits the network.
//
// Usage: node --env-file=.env.local scripts/webflow/fetch.mjs

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = path.join(__dirname, ".cache");
const SITE_ID = "66a38648fc56330fa5753f86";
const API = "https://api.webflow.com/v2";

const TOKEN = process.env.WEBFLOW_API_TOKEN;
if (!TOKEN) {
  console.error("Missing WEBFLOW_API_TOKEN. Run with: node --env-file=.env.local scripts/webflow/fetch.mjs");
  process.exit(1);
}

const COLLECTIONS = {
  "blog-posts": "66c585f78d5026e1e6fe79aa",
  "blog-topic": "66c81e86dac648fc176f4360",
  "news-articles": "66c8c42fa8f94f12a2056144",
  "articles-topics": "67079e834c9558a2c60f8f24",
  videos: "6765645b1e949016c089814b",
  "videos-categories": "6765646cd31592332520f59d",
  "case-studies": "676a4f05b155c6ddf83014aa",
  "case-studies-categories": "676a4f306997d558c55e4766",
};

async function apiGet(p) {
  const res = await fetch(API + p, {
    headers: { Authorization: `Bearer ${TOKEN}`, accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`GET ${p} -> ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/** Publication-state truth. isDraft means "has unpublished edits", NOT
 * "unpublished" — one case study in this site is isDraft:true yet is in
 * /items/live (and the live sitemap). Only /items/live is authoritative. */
async function allLiveItems(collectionId) {
  const out = [];
  let offset = 0;
  for (;;) {
    const d = await apiGet(`/collections/${collectionId}/items/live?limit=100&offset=${offset}`);
    out.push(...d.items);
    offset += 100;
    if (offset >= (d.pagination?.total ?? 0)) break;
  }
  return out;
}

const CT_TO_EXT = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
};

/** Extension is derived from the RESPONSE Content-Type, never the URL — a
 * verified case in this site's own data: a `.png`-suffixed URL served
 * `image/webp`. HEAD requests 403 on this CDN; always GET. */
async function downloadAsset(url, manifest) {
  if (manifest.byUrl[url]) return manifest.byUrl[url];
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(`${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const ct = (res.headers.get("content-type") || "").split(";")[0].trim();
      const urlExt = path.extname(new URL(url).pathname.split("?")[0]).toLowerCase();
      let ext = CT_TO_EXT[ct];
      const mismatch = !!ext && !!urlExt && ext !== urlExt;
      if (!ext) ext = urlExt || ".bin";
      const id = manifest.nextId++;
      const filename = `asset-${id}${ext}`;
      await writeFile(path.join(CACHE_DIR, "assets", filename), buf);
      const entry = { url, filename, bytes: buf.length, contentType: ct, ext, urlExt, mismatch };
      manifest.byUrl[url] = entry;
      return entry;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, attempt * 500));
    }
  }
  throw new Error(`Failed to download ${url} after 3 attempts: ${lastErr}`);
}

/** Walk a fieldData object collecting every Webflow Image-field URL. */
function collectImageUrls(fieldData) {
  const urls = [];
  for (const v of Object.values(fieldData)) {
    if (v && typeof v === "object" && typeof v.url === "string" && !v.metadata) {
      urls.push(v.url);
    }
  }
  return urls;
}

/** Inline <img src> URLs inside any RichText field value. */
function collectInlineImageUrls(html) {
  if (typeof html !== "string") return [];
  return [...html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]);
}

async function main() {
  await mkdir(path.join(CACHE_DIR, "assets"), { recursive: true });

  console.log("Fetching schemas + published items...");
  const dump = {};
  for (const [slug, id] of Object.entries(COLLECTIONS)) {
    const schema = await apiGet(`/collections/${id}`);
    const items = await allLiveItems(id);
    dump[slug] = { id, schema, items };
    console.log(`  ${slug}: ${items.length} published items`);
  }
  await writeFile(path.join(CACHE_DIR, "collections.json"), JSON.stringify(dump, null, 2));

  console.log("\nDownloading assets...");
  const manifestPath = path.join(CACHE_DIR, "assets-manifest.json");
  const manifest = existsSync(manifestPath)
    ? JSON.parse(await readFile(manifestPath, "utf8"))
    : { byUrl: {}, nextId: 1 };

  let count = 0;
  const mismatches = [];
  for (const { items } of Object.values(dump)) {
    for (const item of items) {
      const urls = [
        ...collectImageUrls(item.fieldData),
        ...collectInlineImageUrls(item.fieldData["body-2"]),
        ...collectInlineImageUrls(item.fieldData.challenges),
        ...collectInlineImageUrls(item.fieldData.solutions),
        ...collectInlineImageUrls(item.fieldData.results),
      ];
      for (const url of urls) {
        const entry = await downloadAsset(url, manifest);
        if (entry.mismatch) mismatches.push({ url, contentType: entry.contentType, urlExt: entry.urlExt });
        count++;
      }
    }
  }
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  ${count} asset references resolved, ${Object.keys(manifest.byUrl).length} unique files downloaded`);
  if (mismatches.length) {
    console.log(`  ${mismatches.length} Content-Type/extension mismatches (handled correctly, logged for review):`);
    for (const m of mismatches) console.log(`    ${m.contentType} (url said ${m.urlExt || "none"}) <- ${m.url.slice(0, 90)}`);
  }

  console.log("\nDone. Cache written to scripts/webflow/.cache/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
