import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate, type BlogPost } from "@/lib/blog-posts";
import styles from "./BlogFeaturedPost.module.css";

export function BlogFeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section className={styles.section} aria-labelledby="featured-post-title">
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
            <h2 id="featured-post-title" className={styles.title}>
              <Link href={`/resources/blog/${post.slug}`} className={styles.titleLink}>
                {post.title}
              </Link>
            </h2>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <p className={styles.meta}>
              {formatDate(post.date)} · {post.readMinutes} min read
            </p>
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
