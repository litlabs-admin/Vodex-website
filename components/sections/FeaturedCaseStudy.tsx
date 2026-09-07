import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./FeaturedCaseStudy.module.css";

const STATS = [
  { number: "3X", label: "Debt recovery rate improvement" },
  { number: "7X", label: "Connect rate improvement" },
];

export function FeaturedCaseStudy() {
  return (
    <section className={styles.section} aria-labelledby="case-study-title">
      <div className="container">
        <Entrance className={styles.banner}>
          <Image
            src="/assets/case-study-bg.jpg"
            alt=""
            fill
            sizes="1180px"
            className={styles.bg}
          />
          <div className={styles.grid}>
            <div>
              <p className={styles.eyebrow}>Featured Case Study</p>
              <h2 id="case-study-title" className={styles.title}>
                Debt recovery
                <br />
                <span className="accent">improved by 3×</span>
              </h2>
              <p className={styles.lead}>
                Learn how a debt collection firm streamlined its outreach
                operations using Vodex&rsquo;s GenAI-powered voice agents.
              </p>
            </div>

            <div className={styles.stats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <p className={styles.statNumber}>{stat.number}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
              <Link href="/case-studies/debt-recovery" className={styles.cta}>
                Read the full case study
                <ArrowRight />
              </Link>
            </div>
          </div>
        </Entrance>
      </div>
    </section>
  );
}
