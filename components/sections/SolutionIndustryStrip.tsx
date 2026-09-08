import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./SolutionIndustryStrip.module.css";

type Industry = {
  label: string;
  description: string;
  src: string;
};

type SolutionIndustryStripProps = {
  lead: string;
  industries: Industry[];
};

export function SolutionIndustryStrip({ lead, industries }: SolutionIndustryStripProps) {
  return (
    <section className={styles.section} aria-labelledby="industries-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Industries</p>
          <h2 id="industries-title" className={styles.title}>
            Industries that <span className="accent">Benefit</span>
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>
      </div>

      <Entrance as="ul" className={styles.strip}>
        {industries.map(({ label, description, src }) => (
          <li key={label} className={styles.panel} tabIndex={0}>
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 560px) 50vw, (max-width: 900px) 34vw, 45vw"
              style={{ objectFit: "cover" }}
            />
            <div className={styles.scrim} />
            <div className={styles.copy}>
              <p className={styles.panelLabel}>{label}</p>
              <p className={styles.panelDescription}>{description}</p>
            </div>
          </li>
        ))}
      </Entrance>

      <div className="container">
        <Entrance className={styles.closing}>
          <p>
            Running a collections operation?{" "}
            <Link href="/solutions/debt-collection" className={styles.closingLink}>
              See Vodex for Debt Collection
            </Link>
          </p>
        </Entrance>
      </div>
    </section>
  );
}
