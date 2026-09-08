import { Entrance } from "@/components/ui/Entrance";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import type { BlogPost } from "@/lib/blog-posts";
import styles from "./RelatedPosts.module.css";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section className={styles.section} aria-labelledby="related-posts-title">
      <div className="container">
        <Entrance>
          <p className={styles.eyebrow}>Keep reading</p>
          <h2 id="related-posts-title" className={styles.title}>
            More from the blog
          </h2>
        </Entrance>

        <div className={styles.grid}>
          {posts.map((post, i) => (
            <BlogPostCard key={post.slug} post={post} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
