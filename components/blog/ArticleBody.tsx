import type { PostBlock } from "@/lib/blog-posts";
import styles from "./ArticleBody.module.css";

export function ArticleBody({ body }: { body: PostBlock[] }) {
  return (
    <div className={styles.body}>
      {body.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={block.id} id={block.id} className={styles.heading}>
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className={styles.paragraph}>
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className={styles.list}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i} className={styles.quote}>
                <p>{block.text}</p>
                {block.attribution && <cite className={styles.cite}>{block.attribution}</cite>}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
