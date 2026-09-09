import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import type { CaseStudy } from "@/lib/case-studies";
import styles from "./CaseStudyFeatured.module.css";

/**
 * Self-contained section: header + the one featured case study banner +
 * cross-sell line. Rebuilt to match the reference mockup's literal
 * full-bleed-photo-with-overlay layout (per direct user request, reversing
 * the earlier "build it like Blog instead" decision — see CLAUDE.md §19):
 * a dark-scrim photo banner with the CTA copy overlaid bottom-left and a
 * stats + "Learn More" column overlaid on the right, rather than a
 * side-by-side photo/white-card split.
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
          <p className={styles.lead}>
            Three conversation flows our agents run every day for collections
            teams, from friendly reminders to payment negotiation.
          </p>
        </Entrance>

        <Entrance delay={80} className={styles.banner}>
          <Image
            src="/assets/case-study-featured-bg.jpg"
            alt=""
            fill
            sizes="1327px"
            className={styles.bg}
          />
          <div className={styles.scrim} />

          <div className={styles.grid}>
            <div className={styles.content}>
              <span className={styles.tag}>{study.industry}</span>
              <h3 className={styles.cardTitle}>{study.title}</h3>
              <p className={styles.excerpt}>{study.description}</p>
              <Link
                href={`/resources/case-studies/${study.slug}`}
                className={styles.cta}
              >
                Read Case Study
                <ArrowRight />
              </Link>
            </div>

            <div className={styles.side}>
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

              <Link href="/products" className={styles.learnMore}>
                Learn More About Vodex AI
                <ArrowRight />
              </Link>
            </div>
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
