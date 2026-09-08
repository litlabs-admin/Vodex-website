import type { ComponentType, ReactNode, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./SolutionWhyUs.module.css";

type WhyCard = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  src: string;
};

type SolutionWhyUsProps = {
  heading: ReactNode;
  lead: string;
  cards: WhyCard[];
};

export function SolutionWhyUs({ heading, lead, cards }: SolutionWhyUsProps) {
  return (
    <section className={styles.section} aria-labelledby="why-us-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Why Vodex</p>
          <h2 id="why-us-title" className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <div className={styles.grid}>
          {cards.map(({ title, description, Icon, href, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 1100px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>
                  <Icon />
                  {title}
                </h3>
                <p className={styles.description}>{description}</p>
                <hr className={styles.divider} />
                <Link href={href} className={styles.readMore}>
                  Read More
                  <ArrowRight />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
