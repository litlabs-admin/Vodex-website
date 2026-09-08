import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./SolutionBlogCards.module.css";

type Post = {
  title: string;
  href: string;
  src: string;
};

type SolutionBlogCardsProps = {
  lead: string;
  posts: Post[];
};

export function SolutionBlogCards({ lead, posts }: SolutionBlogCardsProps) {
  return (
    <section className={styles.section} aria-labelledby="blog-cards-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Resources</p>
          <h2 id="blog-cards-title" className={styles.title}>
            From the <span className="accent">blog</span>
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <div className={styles.grid}>
          {posts.map(({ title, href, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 1100px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <Link href={href} className={styles.readMore}>
                  Read More
                  <ArrowRight />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
