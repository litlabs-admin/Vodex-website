import Image from "next/image";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { Waveform } from "@/components/ui/icons";
import styles from "./SolutionHero.module.css";

type Cta = {
  label: string;
  href: string;
  withArrow?: boolean;
};

type SolutionHeroProps = {
  headingId: string;
  badgeLabel: string;
  badgeIcon?: ComponentType<{ className?: string }>;
  /** Full H1 content — a line break plus the `.accent` span both vary per page. */
  titleLines: ReactNode;
  lead: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  bgImage: Parameters<typeof Image>[0]["src"];
  bgAlt?: string;
  bgObjectPosition?: string;
};

/**
 * Reusable hero for the Solutions page family — landing/product heroes are
 * each a one-off, but Footer.tsx already declares 5 solutions routes that
 * all need this exact structure with different copy/art per page.
 */
export function SolutionHero({
  headingId,
  badgeLabel,
  badgeIcon: BadgeIcon = Waveform,
  titleLines,
  lead,
  primaryCta,
  secondaryCta,
  bgImage,
  bgAlt = "",
  bgObjectPosition = "center",
}: SolutionHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby={headingId}>
      <div className={styles.backdrop} style={{ "--bg-pos": bgObjectPosition } as CSSProperties}>
        <Image
          src={bgImage}
          alt={bgAlt}
          priority
          quality={90}
          sizes="100vw"
          placeholder="blur"
        />
      </div>

      <div className={`container ${styles.content}`}>
        <Entrance delay={0}>
          <p className={styles.badge}>
            <span className={styles.badgeIcon}>
              <BadgeIcon />
            </span>
            {badgeLabel}
          </p>
        </Entrance>

        <Entrance delay={90}>
          <h1 id={headingId} className={styles.title}>
            {titleLines}
          </h1>
        </Entrance>

        <Entrance delay={180}>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <Entrance delay={260} className={styles.actions}>
          <Button href={primaryCta.href} variant="primary" withArrow={primaryCta.withArrow ?? true}>
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="secondary" withArrow={secondaryCta.withArrow ?? false}>
            {secondaryCta.label}
          </Button>
        </Entrance>
      </div>
    </section>
  );
}
