import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import type { CaseStudy } from "@/lib/case-studies";
import styles from "./CaseStudyDetailHeader.module.css";

/**
 * Copy-adapted from ArticleHeader.tsx (same centered eyebrow/title/excerpt/
 * hero-image shell) plus a stat band underneath — the piece ArticleHeader
 * doesn't need. Kept as its own component rather than parameterizing
 * ArticleHeader, since a stat band is specific to case studies and every
 * other ArticleHeader consumer (blog posts) has no equivalent data.
 */
export function CaseStudyDetailHeader({ study }: { study: CaseStudy }) {
  return (
    <header className={styles.header}>
      <div className="container">
        <Entrance delay={0}>
          <Link href="/resources/case-studies" className={styles.back}>
            <ArrowRight className={styles.backIcon} />
            All case studies
          </Link>
        </Entrance>

        <Entrance delay={60}>
          <span className={styles.industry}>{study.industry}</span>
        </Entrance>

        <Entrance delay={120}>
          <h1 className={styles.title}>{study.title}</h1>
        </Entrance>

        <Entrance delay={170}>
          <p className={styles.excerpt}>{study.description}</p>
        </Entrance>

        <Entrance delay={220} className={styles.thumb}>
          <Image
            src={study.thumb}
            alt=""
            fill
            sizes="(max-width: 1100px) 100vw, 1180px"
            style={{ objectFit: "cover" }}
            quality={90}
            priority
          />
        </Entrance>

        {study.stats.length > 0 && (
          <Entrance delay={260} className={styles.stats} data-count={study.stats.length}>
            {study.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <p className={styles.statNumber}>{stat.number}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </Entrance>
        )}
      </div>
    </header>
  );
}
