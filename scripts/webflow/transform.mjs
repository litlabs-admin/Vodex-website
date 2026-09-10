#!/usr/bin/env node
// Phase 2 of the Webflow -> Next.js migration: turns scripts/webflow/.cache/
// (raw API dump + downloaded assets, from fetch.mjs) into the app's actual
// runtime content — content/blog/*.mdx, content/case-studies/*.mdx,
// public/assets/{blog,news,videos,case-studies}/*, lib/news.ts, lib/videos.ts.
//
// Re-run freely — this is the part iterated on while reviewing conversion
// quality; it never touches the network. `lib/blog-posts.ts` and
// `lib/case-studies.ts` are NOT written by this script — they're permanent
// runtime modules that read content/**/*.mdx frontmatter directly (see
// lib/mdx.ts) rather than being regenerated data dumps.
//
// Usage: node scripts/webflow/transform.mjs

import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { htmlToMdx } from "./lib/html-to-mdx.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const CACHE_DIR = path.join(__dirname, ".cache");

const dump = JSON.parse(await readFile(path.join(CACHE_DIR, "collections.json"), "utf8"));
const manifest = JSON.parse(await readFile(path.join(CACHE_DIR, "assets-manifest.json"), "utf8"));
const overrides = JSON.parse(await readFile(path.join(__dirname, "overrides.json"), "utf8"));

const assetsByUrl = new Map(Object.entries(manifest.byUrl).map(([url, e]) => [url, e]));
const report = { warnings: [], counts: {} };

// Several of Webflow's own taxonomy collections carry a stray trailing
// space on the name ("Featured in ", "Debt collection ") — trimmed here so
// it never surfaces as a chip label with visible whitespace or silently
// fails a `===` category comparison against the same name typed cleanly
// elsewhere (e.g. in overrides.json's categoryPrecedence arrays).
function nameMap(collectionSlug) {
  return new Map(dump[collectionSlug].items.map((i) => [i.id, i.fieldData.name.trim()]));
}
function optionMap(collectionSlug, fieldSlug) {
  const field = dump[collectionSlug].schema.fields.find((f) => f.slug === fieldSlug);
  return new Map(field.validations.options.map((o) => [o.id, o.name]));
}

async function copyDownloadedAsset(url, destAbsPath) {
  const asset = assetsByUrl.get(url);
  if (!asset) {
    report.warnings.push(`No downloaded asset for ${url} (dest ${destAbsPath})`);
    return null;
  }
  await mkdir(path.dirname(destAbsPath), { recursive: true });
  await copyFile(path.join(CACHE_DIR, "assets", asset.filename), destAbsPath);
  return asset;
}

function orderByPrecedence(present, precedence) {
  const known = precedence.filter((c) => present.has(c));
  const rest = [...present].filter((c) => !precedence.includes(c)).sort();
  return [...known, ...rest];
}

// --------------------------------------------------------------------
// BLOG POSTS -> content/blog/<slug>.mdx + public/assets/blog/<slug>.<ext>
// --------------------------------------------------------------------
async function transformBlog() {
  const blogTopics = nameMap("blog-topic");
  const categoryOptions = optionMap("blog-posts", "category");
  let count = 0;

  for (const item of dump["blog-posts"].items) {
    const fd = item.fieldData;
    const slug = fd.slug;

    const category =
      (fd["blog-topic-reference"] && blogTopics.get(fd["blog-topic-reference"])) ||
      categoryOptions.get(fd.category) ||
      "AI & Technology";

    const thumbAsset = await copyDownloadedAsset(
      fd.thumbnail.url,
      path.join(ROOT, "public", "assets", "blog", `${slug}${pickExt(fd.thumbnail.url)}`),
    );

    const assetBytes = new Map();
    if (thumbAsset) {
      assetBytes.set(
        thumbAsset.filename,
        await readFile(path.join(CACHE_DIR, "assets", thumbAsset.filename)),
      );
    }
    // Preload bytes for every inline image this post's body references, so
    // htmlToMdx can read intrinsic dimensions without re-touching disk per call.
    for (const url of extractInlineImageUrls(fd["body-2"] || "")) {
      const asset = assetsByUrl.get(url);
      if (asset && !assetBytes.has(asset.filename)) {
        assetBytes.set(asset.filename, await readFile(path.join(CACHE_DIR, "assets", asset.filename)));
      }
    }

    const copies = [];
    const { markdown, warnings } = htmlToMdx(fd["body-2"] || "", {
      assetsByUrl,
      assetBytes,
      publicDir: "/assets/blog/inline",
      slugPrefix: slug,
      fallbackAltPrefix: t(fd["title-of-blog"]) || t(fd.name),
      copyAsset: (srcFilename, destName) => copies.push({ srcFilename, destName }),
    });
    for (const w of warnings) report.warnings.push(`[blog/${slug}] ${w}`);
    for (const { srcFilename, destName } of copies) {
      await mkdir(path.join(ROOT, "public", "assets", "blog", "inline"), { recursive: true });
      await copyFile(
        path.join(CACHE_DIR, "assets", srcFilename),
        path.join(ROOT, "public", "assets", "blog", "inline", destName),
      );
    }

    const faqs = [];
    for (let n = 1; n <= 5; n++) {
      const qKey = n === 1 ? "faq-q1" : n === 2 ? "faq-2" : `faq-q${n}`;
      const aKey = n === 2 ? "faq-answer2" : `faq-answer-${n}`;
      const q = fd[qKey]?.trim();
      const a = fd[aKey]?.trim();
      if (q && a) faqs.push({ q, a });
    }

    const frontmatter = {
      title: t(fd["title-of-blog"]) || t(fd.name),
      excerpt: t(fd.description),
      category,
      date: (fd["publsihed-date"] || item.createdOn || "").slice(0, 10),
      thumb: `/assets/blog/${slug}${thumbAsset ? thumbAsset.ext : ".jpg"}`,
      ...(fd["author-name-date-2"] ? { author: fd["author-name-date-2"] } : {}),
      ...(faqs.length ? { faqs } : {}),
    };

    const file = matter.stringify(markdown + "\n", frontmatter, { lineWidth: -1 });
    await writeFile(path.join(ROOT, "content", "blog", `${slug}.mdx`), file, "utf8");
    count++;
  }
  report.counts.blog = count;
}

// --------------------------------------------------------------------
// CASE STUDIES -> content/case-studies/<slug>.mdx
// No image field exists anywhere in Webflow's case-studies collection —
// verified by reading the full schema. Reuses existing, semantically
// matched project photography per case study rather than shipping with no
// image at all; flagged in the migration report as pending real photos.
//
// ⚠️ These MUST be landscape (~3:2). The first mapping here reused photos
// without checking orientation and picked two PORTRAIT ones (they had been
// cropped for the portrait scrim cards on the Solutions pages, aspect
// 436/492) — 1360x2416 and 1304x1476 — which the landscape card and detail
// hero then cropped by 41-63%. All three below are now 1.50 and >=2492px
// wide, so nothing is cropped or upscaled in either slot. If you swap one,
// re-check its aspect ratio first.
// --------------------------------------------------------------------
const CASE_STUDY_THUMBS = {
  // cash / credit cards / passport — on-topic for BNPL credit delinquency
  "voice-ai-in-bnpl-collections-how-a-leading-partner-improved-recovery-with-vodex":
    "/assets/case-studies/voice-ai-in-bnpl-collections-how-a-leading-partner-improved-recovery-with-vodex.jpg",
  // ⚠️ outreach/office scene, NOT a healthcare photo. Genworks is a healthcare
  // provider, but every copy of the surgeon shot in this project is the same
  // 1360x2416 portrait file (industries-healthcare.jpg =
  // lead-qualification-industry-4.jpg = debt-collection-industry-2.jpg) and no
  // landscape healthcare photo exists. This case study is about conversions,
  // engagement and scaling without added headcount, so an outreach scene is the
  // honest fit. Swap it the moment real case-study photography arrives.
  "vodex-genworks-case-study": "/assets/case-studies/vodex-genworks-case-study.jpg",
  // cream desk telephone — on-brand for a voice-AI collections story
  "this-debt-collection-firm-increased-connectivity-rate-by-3x":
    "/assets/case-studies/this-debt-collection-firm-increased-connectivity-rate-by-3x.jpg",
};

async function transformCaseStudies() {
  const industries = nameMap("case-studies-categories");
  let count = 0;

  for (const item of dump["case-studies"].items) {
    const fd = item.fieldData;
    const slug = fd.slug;

    const stats = [];
    for (let n = 1; n <= 5; n++) {
      const number = fd[`matrix-nb-${n}`]?.trim();
      const label = fd[`matrix-nb-${n}-text`]?.trim();
      if (number && label) stats.push({ number, label });
    }

    const sections = [];
    if (fd["about-text"]?.trim()) sections.push(`## About\n\n${fd["about-text"].trim()}`);
    for (const [heading, field] of [
      ["Challenges", "challenges"],
      ["Solutions", "solutions"],
      ["Results", "results"],
    ]) {
      const html = fd[field];
      if (!html?.trim()) continue;

      // Most case-study rich text has no inline images, but at least one
      // does (a screenshot in "voice-ai-in-bnpl-collections-...-challenges")
      // — preload bytes and actually copy referenced files, same as blog.
      const assetBytes = new Map();
      for (const url of extractInlineImageUrls(html)) {
        const asset = assetsByUrl.get(url);
        if (asset && !assetBytes.has(asset.filename)) {
          assetBytes.set(asset.filename, await readFile(path.join(CACHE_DIR, "assets", asset.filename)));
        }
      }
      const copies = [];
      const { markdown, warnings } = htmlToMdx(html, {
        assetsByUrl,
        assetBytes,
        publicDir: "/assets/case-studies/inline",
        slugPrefix: `${slug}-${field}`,
        fallbackAltPrefix: `${fd.name} — ${heading}`,
        copyAsset: (srcFilename, destName) => copies.push({ srcFilename, destName }),
      });
      for (const w of warnings) report.warnings.push(`[case-studies/${slug}] ${w}`);
      for (const { srcFilename, destName } of copies) {
        await mkdir(path.join(ROOT, "public", "assets", "case-studies", "inline"), { recursive: true });
        await copyFile(
          path.join(CACHE_DIR, "assets", srcFilename),
          path.join(ROOT, "public", "assets", "case-studies", "inline", destName),
        );
      }
      sections.push(`## ${heading}\n\n${markdown}`);
    }

    const thumb = CASE_STUDY_THUMBS[slug];
    if (!thumb) report.warnings.push(`[case-studies/${slug}] no thumb mapping — add one to CASE_STUDY_THUMBS`);

    const frontmatter = {
      title: t(fd.name),
      industry: industries.get(fd["select-categories"]) || "Debt Collection",
      description: t(fd["post-summery"]),
      thumb: thumb || "/assets/case-study-bg.jpg",
      stats,
      ...(fd.pdf ? { pdf: fd.pdf } : {}),
    };

    const file = matter.stringify(sections.join("\n\n") + "\n", frontmatter, { lineWidth: -1 });
    await writeFile(path.join(ROOT, "content", "case-studies", `${slug}.mdx`), file, "utf8");
    count++;
  }
  report.counts.caseStudies = count;
}

// --------------------------------------------------------------------
// NEWS -> lib/news.ts (plain generated array, no MDX — no long-form body)
// --------------------------------------------------------------------
function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
const SOURCE_NAMES = {
  "prnewswire.com": "PR Newswire",
  "benzinga.com": "Benzinga",
  "apnews.com": "AP News",
  "ktla.com": "KTLA",
  "fox8.com": "FOX8",
  "wfla.com": "WFLA",
  "finanzen.net": "finanzen.net",
  "seekingalpha.com": "Seeking Alpha",
  "finance.yahoo.com": "Yahoo Finance",
  "blog.google": "Google",
  "inc42.com": "Inc42",
  "krisp.ai": "Krisp",
  "businessreviewlive.com": "Business Review Live",
  "prodwrks.com": "ProdWrks",
  "startupfinanceguide.com": "Startup Finance Guide",
  "images.news18.com": "Forbes India",
};

async function transformNews() {
  const topics = nameMap("articles-topics");
  const items = dump["news-articles"].items.map((item) => ({ item, fd: item.fieldData }));

  // Apply the syndication-collapse groups from overrides.json.
  const dropSlugs = new Set();
  const renames = new Map();
  for (const group of overrides.news.collapseGroups) {
    for (const s of group.dropSlugs) dropSlugs.add(s);
    renames.set(group.keepSlug, group);
  }

  const kept = items.filter(({ fd }) => !dropSlugs.has(fd.slug));
  let count = 0;
  const records = [];

  for (const { item, fd } of kept) {
    const rename = renames.get(fd.slug);
    const slug = rename?.renameSlugTo || fd.slug;
    const title = rename?.renameTitleTo || t(fd.name);
    const category = rename?.categoryOverride || topics.get(fd["choose-category"]) || "Press Releases";

    const asset = await copyDownloadedAsset(
      fd["logo-thumbnail"].url,
      path.join(ROOT, "public", "assets", "news", `${slug}${pickExt(fd["logo-thumbnail"].url)}`),
    );
    const host = hostnameOf(fd["article-link"]);

    records.push({
      slug,
      title,
      excerpt: t(fd["description-of-article"]),
      category,
      date: (item.createdOn || "").slice(0, 10),
      thumb: `/assets/news/${slug}${asset ? asset.ext : ".jpg"}`,
      articleUrl: fd["article-link"],
      source: SOURCE_NAMES[host] || host,
      ...(fd.location ? { location: fd.location } : {}),
    });
    count++;
  }

  records.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  if (records.length) records[0] = { ...records[0], featured: true };

  const present = new Set(records.map((r) => r.category));
  const categories = orderByPrecedence(present, overrides.news.categoryPrecedence);

  await writeFile(path.join(ROOT, "lib", "news.ts"), renderNewsModule(records, categories), "utf8");
  report.counts.news = count;
}

// --------------------------------------------------------------------
// VIDEOS -> lib/videos.ts (plain generated array, no MDX)
// --------------------------------------------------------------------
function extractYoutubeId(video) {
  const url = video?.url || "";
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

async function transformVideos() {
  const cats = nameMap("videos-categories");
  const records = [];
  let count = 0;

  for (const item of dump["videos"].items) {
    const fd = item.fieldData;
    const slug = fd.slug;
    const youtubeId = extractYoutubeId(fd.video);
    if (!youtubeId) {
      report.warnings.push(`[videos/${slug}] no parseable YouTube id in video field — skipped`);
      continue;
    }

    const asset = await copyDownloadedAsset(
      fd["video-image"].url,
      path.join(ROOT, "public", "assets", "videos", `${slug}${pickExt(fd["video-image"].url)}`),
    );

    const categories = (fd["select-categories"] || []).map((id) => cats.get(id)).filter(Boolean);
    const category =
      overrides.videos.categoryPrecedence.find((c) => categories.includes(c)) || categories[0] || "Overview";

    records.push({
      slug,
      title: t(fd.name),
      description: t(fd["sub-text"]),
      category,
      categories,
      date: (item.createdOn || "").slice(0, 10),
      thumb: `/assets/videos/${slug}${asset ? asset.ext : ".jpg"}`,
      youtubeId,
    });
    count++;
  }

  records.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  if (records.length) records[0] = { ...records[0], featured: true };

  const present = new Set(records.flatMap((r) => r.categories));
  const categories = orderByPrecedence(present, overrides.videos.categoryPrecedence);

  await writeFile(path.join(ROOT, "lib", "videos.ts"), renderVideosModule(records, categories), "utf8");
  report.counts.videos = count;
}

// --------------------------------------------------------------------
// helpers
// --------------------------------------------------------------------
// Several PlainText fields in this Webflow export carry stray
// leading/trailing whitespace (e.g. a case-study title ending "...rate  ",
// two trailing spaces) — trimmed at every read site below.
function t(s) {
  return (s ?? "").trim();
}

function pickExt(url) {
  const asset = assetsByUrl.get(url);
  return asset ? asset.ext : path.extname(new URL(url).pathname) || ".jpg";
}

function extractInlineImageUrls(html) {
  return [...html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]);
}

function ts(value) {
  return JSON.stringify(value, null, 2);
}

function renderNewsModule(records, categories) {
  return `// GENERATED by scripts/webflow/transform.mjs — do not hand-edit the array
// contents below (frontmatter-less news items have no source file of their
// own to edit instead); re-run the migration script to regenerate. Safe to
// hand-edit anything OUTSIDE the generated block (types, helpers).
//
// Migrated from Webflow's "news-articles" collection. No date field exists
// on that collection — \`date\` is each item's Webflow \`createdOn\` timestamp.
// 9 of the original 18 items were the same seed-funding press release
// syndicated across outlets; collapsed to one entry per
// scripts/webflow/overrides.json (see that file's "news" section for the
// exact grouping and why).
//
// Plain data, no filesystem access — safe to import from client components
// (NewsExplorer.tsx does, as a type-only import).

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  thumb: string;
  /** External press URL — every migrated news item is outbound coverage,
   * not an on-site article (Webflow's collection has no body field). */
  articleUrl: string;
  /** Display name of the outlet, derived from articleUrl's hostname. */
  source?: string;
  location?: string;
  featured?: boolean;
};

export const CATEGORIES: readonly string[] = ${ts(categories)};

// prettier-ignore
export const NEWS_POSTS: NewsPost[] = ${ts(records)};

export function getFeaturedPost(): NewsPost {
  return NEWS_POSTS.find((post) => post.featured) ?? NEWS_POSTS[0];
}

export function getGridPosts(): NewsPost[] {
  const featured = getFeaturedPost();
  return NEWS_POSTS.filter((post) => post.slug !== featured.slug);
}
`;
}

function renderVideosModule(records, categories) {
  return `// GENERATED by scripts/webflow/transform.mjs — do not hand-edit the array
// contents below; re-run the migration script to regenerate. Safe to
// hand-edit anything OUTSIDE the generated block (types, helpers).
//
// Migrated from Webflow's "videos" collection (all real, published YouTube
// videos). No duration field exists on that collection, so VideoCard no
// longer shows one. Videos open in an on-page modal (VideoLightbox) rather
// than linking off-site — see components/ui/VideoThumbButton.tsx.

export type Video = {
  slug: string;
  title: string;
  description: string;
  /** Single display category, picked from \`categories\` by precedence
   * (scripts/webflow/overrides.json) when a video carries more than one. */
  category: string;
  /** Every category this video is actually tagged with, for filtering. */
  categories: string[];
  date: string;
  thumb: string;
  youtubeId: string;
  featured?: boolean;
};

export const VIDEO_CATEGORIES: readonly string[] = ${ts(categories)};

// prettier-ignore
export const VIDEOS: Video[] = ${ts(records)};

export function getFeaturedVideo(): Video {
  return VIDEOS.find((video) => video.featured) ?? VIDEOS[0];
}

export function getGridVideos(): Video[] {
  const featured = getFeaturedVideo();
  // Compares by slug, not object identity — a generated array from a JSON
  // round-trip (or any future data source) makes \`v !== featured\` an easy,
  // easy-to-reintroduce bug: it silently duplicates the featured video into
  // the grid the moment VIDEOS is produced by anything other than a literal
  // array where getFeaturedVideo() returns the exact same reference.
  return VIDEOS.filter((video) => video.slug !== featured.slug);
}
`;
}

// --------------------------------------------------------------------
async function main() {
  await mkdir(path.join(ROOT, "content", "blog"), { recursive: true });
  await mkdir(path.join(ROOT, "content", "case-studies"), { recursive: true });

  await transformBlog();
  await transformCaseStudies();
  await transformNews();
  await transformVideos();

  console.log("Counts:", report.counts);
  if (report.warnings.length) {
    console.log(`\n${report.warnings.length} warnings:`);
    for (const w of report.warnings) console.log("  -", w);
  } else {
    console.log("\nNo warnings.");
  }
  await writeFile(path.join(CACHE_DIR, "transform-report.json"), JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
