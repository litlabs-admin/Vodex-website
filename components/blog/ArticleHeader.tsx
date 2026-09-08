import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate, type BlogPost } from "@/lib/blog-posts";
import styles from "./ArticleHeader.module.css";

export function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <header className={styles.header}>
      <div className="container">
        <Entrance delay={0}>
          <Link href="/resources/blog" className={styles.back}>
            <ArrowRight className={styles.backIcon} />
            All articles
          </Link>
        </Entrance>

        <Entrance delay={60} className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.metaDot} aria-hidden="true" />
          <span>{formatDate(post.date)}</span>
          <span className={styles.metaDot} aria-hidden="true" />
          <span>{post.readMinutes} min read</span>
        </Entrance>

        <Entrance delay={120}>
          <h1 className={styles.title}>{post.title}</h1>
        </Entrance>

        <Entrance delay={170}>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </Entrance>

        <Entrance delay={220} className={styles.thumb}>
          <Image
            src={post.thumb}
            alt=""
            fill
            sizes="(max-width: 1100px) 100vw, 1180px"
            style={{ objectFit: "cover" }}
            priority
          />
        </Entrance>
      </div>
    </header>
  );
}
