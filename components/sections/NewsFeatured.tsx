import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate, type NewsPost } from "@/lib/news";
import styles from "./NewsFeatured.module.css";

/** Copy-adapted from BlogFeaturedPost — same layout, minus read-minutes (a
 * blog-specific field news items don't have). */
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
              <Link href={`/company/news/${post.slug}`} className={styles.titleLink}>
                {post.title}
              </Link>
            </h2>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <p className={styles.meta}>{formatDate(post.date)}</p>
            <span className={styles.readMore} aria-hidden="true">
              Read the story
              <ArrowRight />
            </span>
          </div>
        </Entrance>
      </div>
    </section>
  );
}
