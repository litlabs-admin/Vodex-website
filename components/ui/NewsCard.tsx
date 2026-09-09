import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/format-date";
import type { NewsPost } from "@/lib/news";
import styles from "./NewsCard.module.css";

type NewsCardProps = {
  post: NewsPost;
  delay?: number;
};

/**
 * Grid card for the newsroom listing — copy-adapted from BlogPostCard (same
 * light body / sharp corners / stretched-link idiom). Every migrated news
 * item is real outbound press coverage (Webflow's "news-articles"
 * collection has no on-site article body, only an external `article-link`)
 * — so the card links off-site rather than to a `/company/news/[slug]`
 * page that was never real content to begin with.
 */
export function NewsCard({ post, delay = 0 }: NewsCardProps) {
  return (
    <Entrance as="article" delay={delay} className={styles.card}>
      <div className={styles.thumb}>
        <Image
          src={post.thumb}
          alt=""
          fill
          sizes="(max-width: 820px) 480px, 380px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{post.category}</p>
        <h3 className={styles.cardTitle}>
          <a
            href={post.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.titleLink}
          >
            {post.title}
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <p className={styles.meta}>{formatDate(post.date)}</p>
        <hr className={styles.divider} />
        <span className={styles.readMore} aria-hidden="true">
          {post.source ? `Read on ${post.source}` : "Read More"}
          <ExternalLinkIcon />
        </span>
      </div>
    </Entrance>
  );
}
