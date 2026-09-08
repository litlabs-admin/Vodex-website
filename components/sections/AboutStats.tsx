import { Entrance } from "@/components/ui/Entrance";
import styles from "./AboutStats.module.css";

type Stat = { number: string; label: string };

const STATS: Stat[] = [
  { number: "$3.5M", label: "Funding" },
  { number: "5+", label: "Funding" },
  { number: "30+", label: "Customers & Partners" },
  { number: "25M+", label: "Calls Made" },
];

/**
 * Copy-adapted from components/hero/TrustStrip.tsx/.module.css — same
 * full-bleed hairline-bordered strip mechanics (border-block + inset
 * cell-divider box-shadows), but 4 plain number+label cells instead of 3
 * icon+title+note cells. The 2nd stat's "Funding" label duplicates the 1st
 * verbatim — a PDF copy-paste artifact, kept as-is per explicit user
 * direction rather than corrected to e.g. "Investors".
 */
export function AboutStats() {
  return (
    <section className={styles.strip} aria-label="Vodex by the numbers">
      <ul className={`container ${styles.grid}`}>
        {STATS.map(({ number, label }, index) => (
          <li key={index} className={styles.cell}>
            <Entrance delay={index * 90} className={styles.item}>
              <p className={styles.number}>{number}</p>
              <p className={styles.label}>{label}</p>
            </Entrance>
          </li>
        ))}
      </ul>
    </section>
  );
}
