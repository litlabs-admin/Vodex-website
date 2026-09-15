import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import { resolveResources, type ResourceRef } from "@/lib/resource-refs";
import styles from "./SolutionBlogCards.module.css";

type SolutionBlogCardsProps = {
  lead: string;
  /** Real posts by slug — title and thumbnail come from the post itself. */
  posts: ResourceRef[];
};

export function SolutionBlogCards({ lead, posts }: SolutionBlogCardsProps) {
  const resources = resolveResources(posts);

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
          {resources.map((r, i) => (
            <Entrance key={r.key} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={r.thumb}
                  alt=""
                  fill
                  sizes="(max-width: 1100px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>
                  <Link href={r.href} className={styles.titleLink}>
                    {r.title}
                  </Link>
                </h3>
                <span className={styles.readMore} aria-hidden="true">
                  Read More
                  <ArrowRight />
                </span>
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
