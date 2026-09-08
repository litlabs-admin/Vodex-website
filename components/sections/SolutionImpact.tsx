import { Fragment } from "react";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./SolutionImpact.module.css";

type Stat = {
  number: string;
  label: string;
};

type Group = {
  label: string;
  stats: Stat[];
};

type Closing = {
  text: string;
  linkText: string;
  href: string;
};

type SolutionImpactProps = {
  lead: string;
  groups: Group[];
  closing?: Closing;
};

/**
 * Light section wrapping a full-width dark inset box that holds 2+ groups
 * of stat cards, each group under its own small pill label, separated by a
 * vertical hairline divider — distinct from SolutionResults (a full-bleed
 * photo band with 3 bare stat cards).
 */
export function SolutionImpact({ lead, groups, closing }: SolutionImpactProps) {
  return (
    <section className={styles.section} aria-labelledby="impact-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Impact</p>
          <h2 id="impact-title" className={styles.title}>
            Impact on <span className="accent">both sides</span> of the platform
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <Entrance className={styles.box}>
          <div className={styles.groups}>
            {groups.map(({ label, stats }, i) => (
              <Fragment key={label + i}>
                {i > 0 && <span className={styles.divider} aria-hidden="true" />}
                <div className={styles.group}>
                  <p className={styles.groupLabel}>{label}</p>
                  <div className={styles.stats}>
                    {stats.map(({ number, label: statLabel }) => (
                      <div key={statLabel} className={styles.stat}>
                        <p className={styles.statNumber}>{number}</p>
                        <p className={styles.statLabel}>{statLabel}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </Entrance>

        {closing && (
          <Entrance className={styles.closing}>
            <p>
              {closing.text}{" "}
              <Link href={closing.href} className={styles.closingLink}>
                {closing.linkText}
              </Link>
            </p>
          </Entrance>
        )}
      </div>
    </section>
  );
}
