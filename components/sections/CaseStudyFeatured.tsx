import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import type { CaseStudy } from "@/lib/case-studies";
import styles from "./CaseStudyFeatured.module.css";

/**
 * Self-contained section: header + the one featured case study card +
 * cross-sell line — mirrors the layout the reference mockup shows, but
 * built as a new component rather than editing the shared
 * FeaturedCaseStudy (used on the landing page) to match it. See CLAUDE.md
 * §19 for why.
 */
export function CaseStudyFeatured({ study }: { study: CaseStudy }) {
  return (
    <section className={styles.section} aria-labelledby="featured-case-study-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Debt Collection</p>
          <h2 id="featured-case-study-title" className={styles.title}>
            Debt recovery, <span className="accent">improved by 3X</span>
          </h2>
        </Entrance>

        <Entrance delay={80} as="article" className={styles.card}>
          <div className={styles.thumb}>
            <Image
              src={study.thumb}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className={styles.body}>
            <span className={styles.tag}>{study.industry}</span>
            <p className={styles.excerpt}>{study.description}</p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <p className={styles.statNumber}>{study.statNumber}</p>
                <p className={styles.statLabel}>{study.statLabel}</p>
              </div>
              {study.secondStatNumber && (
                <div className={styles.stat}>
                  <p className={styles.statNumber}>{study.secondStatNumber}</p>
                  <p className={styles.statLabel}>{study.secondStatLabel}</p>
                </div>
              )}
            </div>

            <Link href={`/resources/case-studies/${study.slug}`} className={styles.cta}>
              Read Case Study
              <ArrowRight />
            </Link>
          </div>
        </Entrance>

        <Entrance delay={140} className={styles.crossSell}>
          <p>
            Running a collections operation?{" "}
            <Link href="/solutions/debt-collection" className={styles.crossSellLink}>
              See Vodex for Debt Collection
            </Link>
          </p>
        </Entrance>
      </div>
    </section>
  );
}
