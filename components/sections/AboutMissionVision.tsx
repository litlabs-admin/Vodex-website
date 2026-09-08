import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Entrance } from "@/components/ui/Entrance";
import { ExternalLinkIcon } from "@/components/ui/icons";
import styles from "./AboutMissionVision.module.css";

type Card = {
  title: string;
  description: string;
  href: string;
  /** "solid" = flat black card, no photo. "image" requires bgImage. */
  background: "solid" | "image";
  bgImage?: Parameters<typeof Image>[0]["src"];
  bgAlt?: string;
};

type AboutMissionVisionProps = {
  headingId: string;
  eyebrow: string;
  heading: ReactNode;
  lead?: string;
  cards: [Card, Card];
};

/**
 * Prop-driven two-card band, used twice on the About page: once for
 * Mission/Vision (one solid-black card, one photo-bg card) and once for the
 * Locations section (both photo-bg). Same ~1344px inset-band geometry in
 * both cases, confirmed by pixel measurement against the PDF — one
 * component beats duplicating near-identical CSS for a same-page repeat.
 */
export function AboutMissionVision({
  headingId,
  eyebrow,
  heading,
  lead,
  cards,
}: AboutMissionVisionProps) {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={headingId} className={styles.title}>
            {heading}
          </h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </Entrance>

        <div className={styles.grid}>
          {cards.map(({ title, description, href, background, bgImage, bgAlt }, i) => (
            <Entrance key={title} delay={i * 90} className={styles.card} data-bg={background}>
              {background === "image" && bgImage && (
                <Image
                  src={bgImage}
                  alt={bgAlt ?? ""}
                  fill
                  sizes="(max-width: 900px) 100vw, 660px"
                  className={styles.cardImage}
                />
              )}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDescription}>{description}</p>
                <Link href={href} className={styles.cardLink}>
                  Learn More
                  <ExternalLinkIcon className={styles.arrow} />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
