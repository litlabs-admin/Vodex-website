// One-off (re-runnable) pass over public/assets: caps images at 2560px on the
// long edge and re-encodes them, so next/image isn't handed multi-megabyte
// originals to resize on every cold cache (slow first-visitor image TTFB).
// Nothing is ever displayed above 2560 device pixels (see `deviceSizes` in
// next.config.ts). Settings are deliberately conservative (q92, full-resolution
// colour) because next/image compresses again on delivery — a lossy source
// would compound into visible artefacts.
//
//   node scripts/optimize-assets.mjs
//
// A file is only overwritten when the result is at least 10% smaller, so
// running it again is a no-op. Formats/filenames never change (no reference
// edits needed). Uses `sharp`, which ships with Next.js.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MAX_EDGE = 2560;
const MIN_BYTES = 200 * 1024;
const MIN_SAVING = 0.1;

const root = path.resolve(import.meta.dirname, "..", "public", "assets");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
  );
}

let before = 0;
let after = 0;

for (const file of walk(root)) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
  const size = statSync(file).size;
  if (size < MIN_BYTES) continue;

  const input = readFileSync(file);
  // rotate() bakes any EXIF orientation in, since metadata is stripped.
  let pipeline = sharp(input).rotate().resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });
  if (ext === ".png") pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 });
  else if (ext === ".webp") pipeline = pipeline.webp({ quality: 92, smartSubsample: true, effort: 6 });
  else pipeline = pipeline.jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true });

  const output = await pipeline.toBuffer();
  const rel = path.relative(root, file);
  if (output.length <= size * (1 - MIN_SAVING)) {
    writeFileSync(file, output);
    before += size;
    after += output.length;
    console.log(`${rel}: ${Math.round(size / 1024)}KB -> ${Math.round(output.length / 1024)}KB`);
  }
}

console.log(
  `\nRe-encoded: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`,
);
