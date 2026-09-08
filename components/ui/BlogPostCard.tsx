import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate, type BlogPost } from "@/lib/blog-posts";
import styles from "./BlogPostCard.module.css";

type BlogPostCardProps = {
  post: BlogPost;
  delay?: number;
};

/**
 * Shared grid card for the blog listing and Related Posts — copy-adapted
 * from the landing page's Resources.tsx card idiom (light body, sharp
 * corners, dark pill "Read More"). The whole card is clickable via a
 * stretched-link on the title (`.titleLink::after`) rather than a nested
 * <Link>, so assistive tech gets one clear link per card instead of a
 * duplicate "Read More" announcement.
 */
export function BlogPostCard({ post, delay = 0 }: BlogPostCardProps) {
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
          <Link href={`/resources/blog/${post.slug}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <p className={styles.meta}>
          {formatDate(post.date)} · {post.readMinutes} min read
        </p>
        <hr className={styles.divider} />
        <span className={styles.readMore} aria-hidden="true">
          Read More
          <ArrowRight />
        </span>
      </div>
    </Entrance>
  );
}
