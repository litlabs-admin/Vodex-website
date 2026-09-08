import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import type { CaseStudy } from "@/lib/case-studies";
import styles from "./CaseStudyGrid.module.css";

export function CaseStudyGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <section className={styles.section} aria-labelledby="case-study-grid-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Debt Collection</p>
          <h2 id="case-study-grid-title" className={styles.title}>
            More customer <span className="accent">outcomes</span>
          </h2>
          <p className={styles.lead}>
            From BNPL portfolios at massive volume to conversion-focused sales teams, the results
            follow the same pattern.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {studies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} delay={i * 70} />
          ))}
        </div>

        <Entrance delay={studies.length * 70} className={styles.crossSell}>
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
