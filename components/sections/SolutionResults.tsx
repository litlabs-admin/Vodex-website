import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./SolutionResults.module.css";

type Stat = {
  number: string;
  label: string;
  description: string;
};

type SolutionResultsProps = {
  lead: string;
  stats: Stat[];
};

export function SolutionResults({ lead, stats }: SolutionResultsProps) {
  return (
    <section className={styles.section} aria-labelledby="results-title">
      <Image
        src="/assets/results-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.bg}
      />
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Comparison</p>
          <h2 id="results-title" className={styles.title}>
            What you can <span className="accent">expect</span>
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <div className={styles.stats}>
          {stats.map(({ number, label, description }, i) => (
            <Entrance key={label} delay={i * 70} as="article" className={styles.card}>
              <p className={styles.statNumber}>{number}</p>
              <p className={styles.statLabel}>{label}</p>
              <p className={styles.statDescription}>{description}</p>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
