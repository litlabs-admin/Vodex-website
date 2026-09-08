import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate, type NewsPost } from "@/lib/news";
import styles from "./NewsCard.module.css";

type NewsCardProps = {
  post: NewsPost;
  delay?: number;
};

/**
 * Grid card for the newsroom listing — copy-adapted from BlogPostCard (same
 * light body / sharp corners / stretched-link idiom). No per-item detail
 * page exists yet, so the link is a plausible, not-yet-resolving
 * `/company/news/[slug]` href — same placeholder-link convention used
 * elsewhere in this project (e.g. Resources.tsx, CaseStudyCard) before a
 * real destination page is built.
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
          <Link href={`/company/news/${post.slug}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <p className={styles.meta}>{formatDate(post.date)}</p>
        <hr className={styles.divider} />
        <span className={styles.readMore} aria-hidden="true">
          Read More
          <ArrowRight />
        </span>
      </div>
    </Entrance>
  );
}
