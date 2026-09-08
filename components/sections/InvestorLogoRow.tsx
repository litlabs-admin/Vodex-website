import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./InvestorLogoRow.module.css";

type Logo = {
  name: string;
  src: StaticImageData;
  width: number;
  height: number;
};

type InvestorLogoRowProps = {
  headingId: string;
  eyebrow: string;
  heading: ReactNode;
  lead: string;
  logos: Logo[];
};

/**
 * Copy-adapted from WorksWithTools.tsx/.module.css's per-logo intrinsic-
 * sizing pattern, but prop-driven instead of hardcoded — this page renders
 * two real instances (investor backers, tech partners), which justifies
 * props over duplicating the file. Logo display height is larger than
 * WorksWithTools' 40px default per explicit user request ("make sure all
 * the logos are big and readable").
 */
export function InvestorLogoRow({ headingId, eyebrow, heading, lead, logos }: InvestorLogoRowProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={headingId} className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <Entrance as="ul" delay={90} className={styles.row}>
          {logos.map(({ name, src, width, height }) => (
            <li key={name} className={styles.cell}>
              <Image src={src} alt={name} width={width} height={height} className={styles.logo} />
            </li>
          ))}
        </Entrance>
      </div>
    </section>
  );
}
