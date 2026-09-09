import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/format-date";
import type { NewsPost } from "@/lib/news";
import styles from "./NewsFeatured.module.css";

/** Copy-adapted from BlogFeaturedPost — same layout, minus read-minutes (a
 * blog-specific field news items don't have). Links off-site to the real
 * press coverage rather than a `/company/news/[slug]` page — see
 * NewsCard.tsx for why. */
export function NewsFeatured({ post }: { post: NewsPost }) {
  return (
    <section className={styles.section} aria-labelledby="featured-news-title">
      <div className="container">
        <Entrance as="article" className={styles.card}>
          <div className={styles.thumb}>
            <Image
              src={post.thumb}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className={styles.body}>
            <div className={styles.badges}>
              <span className={styles.eyebrow}>Featured</span>
              <span className={styles.category}>{post.category}</span>
            </div>
            <h2 id="featured-news-title" className={styles.title}>
              <a
                href={post.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.titleLink}
              >
                {post.title}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </h2>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <p className={styles.meta}>{formatDate(post.date)}</p>
            <span className={styles.readMore} aria-hidden="true">
              {post.source ? `Read on ${post.source}` : "Read the story"}
              <ExternalLinkIcon />
            </span>
          </div>
        </Entrance>
      </div>
    </section>
  );
}
