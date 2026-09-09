import Image from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { mapLegacyVodexUrl } from "@/lib/legacy-routes";
import styles from "./ArticleBody.module.css";

/**
 * MDX component overrides for migrated article bodies (blog posts + case
 * studies, both compiled via lib/mdx.ts's `renderMdx`). Two custom
 * components (`Figure`, `Embed`) are the only literal JSX tags the Webflow
 * migration script ever emits into .mdx source — everything else in a
 * migrated body is plain Markdown syntax, specifically so the MDX compiler
 * never has to parse raw HTML as JSX (see scripts/webflow/lib/html-to-mdx.mjs's
 * top-of-file comment for why that matters).
 */

type FigureProps = {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
};

function Figure({ src, width, height, alt, caption }: FigureProps) {
  return (
    <figure className={styles.figure}>
      <Image
        src={src}
        width={width ?? 1200}
        height={height ?? 675}
        alt={alt}
        sizes="(max-width: 780px) 100vw, 720px"
        className={styles.figureImage}
      />
      {caption && <figcaption className={styles.figcaption}>{caption}</figcaption>}
    </figure>
  );
}

type EmbedProps = { src: string; title: string };

function Embed({ src, title }: EmbedProps) {
  return (
    <div className={styles.embed}>
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

/**
 * Every link in migrated body copy goes through here — resolution happens
 * once, at render time, rather than as a one-time text rewrite during
 * migration: it's what lets an old `https://www.vodex.ai/...` URL anywhere
 * in a post's body resolve to the new route automatically (via
 * lib/legacy-routes.ts, the same map next.config.ts's redirects() use),
 * and it's what marks genuine external links as opening in a new tab —
 * without the migration script needing to know about either concern.
 */
function A({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <a {...rest}>{children}</a>;

  const legacyTarget = mapLegacyVodexUrl(href);
  if (legacyTarget) {
    return (
      <Link href={legacyTarget} className={styles.link}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={styles.link}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link} {...rest}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

// A plain <img> should never appear in migrated content (every image goes
// through the `Figure` component instead), but MDX's `remark-gfm` still
// parses bare markdown image syntax into one if a future hand-written post
// uses it — render it reasonably rather than letting a raw <img> slip in
// unstyled with no dimensions.
function Img({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== "string") return null;
  return (
    <span className={styles.figure}>
      <Image src={src} width={1200} height={675} alt={alt ?? ""} className={styles.figureImage} />
    </span>
  );
}

export const mdxComponents = {
  a: A,
  img: Img,
  Figure,
  Embed,
};
