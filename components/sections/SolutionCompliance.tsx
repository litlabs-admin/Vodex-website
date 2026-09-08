import Link from "next/link";
import type { ComponentType } from "react";
import { Entrance } from "@/components/ui/Entrance";
import { LockIcon } from "@/components/ui/icons";
import styles from "./SolutionCompliance.module.css";

type Item = {
  label: string;
  Icon?: ComponentType<{ className?: string }>;
};

type Closing = {
  text: string;
  linkText: string;
  href: string;
};

type SolutionComplianceProps = {
  lead: string;
  items: Item[];
  closing?: Closing;
};

/**
 * Light section wrapping a dark inset band of white pill "chips" (icon +
 * label), wrapping and centered — distinct from SolutionSecurity's 4-photo
 * scrim-card grid used on Pages 1-4.
 */
export function SolutionCompliance({ lead, items, closing }: SolutionComplianceProps) {
  return (
    <section className={styles.section} aria-labelledby="compliance-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Compliance</p>
          <h2 id="compliance-title" className={styles.title}>
            Compliance <span className="accent">controls</span>, built in
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <Entrance className={styles.band}>
          <div className={styles.row}>
            {items.map(({ label, Icon = LockIcon }) => (
              <span key={label} className={styles.chip}>
                <Icon className={styles.chipIcon} />
                {label}
              </span>
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
