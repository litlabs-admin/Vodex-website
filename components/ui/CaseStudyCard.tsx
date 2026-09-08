import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import type { CaseStudy } from "@/lib/case-studies";
import styles from "./CaseStudyCard.module.css";

type CaseStudyCardProps = {
  study: CaseStudy;
  delay?: number;
};

/**
 * Grid card for the case studies listing — copy-adapted from BlogPostCard
 * (same light body / sharp corners / stretched-link idiom), with the
 * date/read-time meta line swapped for a headline stat (the thing a case
 * study actually leads with).
 */
export function CaseStudyCard({ study, delay = 0 }: CaseStudyCardProps) {
  return (
    <Entrance as="article" delay={delay} className={styles.card}>
      <div className={styles.thumb}>
        <Image
          src={study.thumb}
          alt=""
          fill
          sizes="(max-width: 820px) 480px, 380px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{study.industry}</p>
        <h3 className={styles.cardTitle}>
          <Link href={`/resources/case-studies/${study.slug}`} className={styles.titleLink}>
            {study.title}
          </Link>
        </h3>
        <p className={styles.excerpt}>{study.description}</p>
        <p className={styles.stat}>
          <span className={styles.statNumber}>{study.statNumber}</span>
          {study.statLabel}
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
