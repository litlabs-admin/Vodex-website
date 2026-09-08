import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./SolutionIndustries.module.css";

type IndustryCard = {
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  src: string;
};

type SolutionIndustriesProps = {
  eyebrow?: string;
  heading?: ReactNode;
  lead: string;
  cards: IndustryCard[];
};

export function SolutionIndustries({
  eyebrow = "Core features",
  heading = (
    <>
      Industries that <span className="accent">Benefit</span>
    </>
  ),
  lead,
  cards,
}: SolutionIndustriesProps) {
  return (
    <section className={styles.section} aria-labelledby="industries-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id="industries-title" className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <div className={styles.grid}>
          {cards.map(({ title, description, Icon, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt={`${title} — photo`}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.heading}>
                  <Icon className={styles.icon} />
                  <h3 className={styles.cardTitle}>{title}</h3>
                </div>
                <p className={styles.description}>{description}</p>
                <hr className={styles.divider} />
                <Link href="/solutions" className={styles.readMore}>
                  Read More
                  <ArrowRight />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>

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
