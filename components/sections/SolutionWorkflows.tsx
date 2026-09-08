import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight, ExternalLinkIcon } from "@/components/ui/icons";
import styles from "./SolutionWorkflows.module.css";

type Workflow = {
  title: string;
  description: string;
  src: string;
};

type Closing = {
  text: string;
  linkText: string;
  href: string;
};

type SolutionWorkflowsProps = {
  eyebrow?: string;
  heading?: ReactNode;
  lead: string;
  workflows: Workflow[];
  /** "scrim" (default) overlays title/description on the photo, matching
   * every existing usage. "panel" renders a separate light body below the
   * photo (title + description + divider + Read More), no icon — the card
   * shape "Four core workflows" on the Collection Software page needs. */
  variant?: "scrim" | "panel";
  columns?: number;
  closing?: Closing;
};

export function SolutionWorkflows({
  eyebrow = "Workflows",
  heading = (
    <>
      Actions you can <span className="accent">streamline</span>
    </>
  ),
  lead,
  workflows,
  variant = "scrim",
  columns = 3,
  closing,
}: SolutionWorkflowsProps) {
  return (
    <section className={styles.section} aria-labelledby="workflows-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id="workflows-title" className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <div className={styles.band}>
          <div
            className={variant === "panel" ? styles.gridPanel : styles.grid}
            style={{ "--cols": columns } as CSSProperties}
          >
            {workflows.map(({ title, description, src }, i) =>
              variant === "panel" ? (
                <Entrance key={title} delay={i * 60} as="article" className={styles.panelCard}>
                  <div className={styles.panelThumb}>
                    <Image
                      src={src}
                      alt={`${title} — photo`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1327px) 25vw, 322px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.panelBody}>
                    <h3 className={styles.panelTitle}>{title}</h3>
                    <p className={styles.panelDescription}>{description}</p>
                    <hr className={styles.panelDivider} />
                    <Link href="/solutions" className={styles.panelReadMore}>
                      Read More
                      <ArrowRight />
                    </Link>
                  </div>
                </Entrance>
              ) : (
                <Entrance key={title} delay={i * 60} as="article" className={styles.card}>
                  <Image
                    src={src}
                    alt={`${title} — photo`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1327px) 33vw, 436px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.scrim} />
                  <div className={styles.copy}>
                    <p className={styles.cardTitle}>
                      {title}
                      <ExternalLinkIcon className={styles.arrow} />
                    </p>
                    <p className={styles.cardDescription}>{description}</p>
                  </div>
                </Entrance>
              )
            )}
          </div>

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
      </div>
    </section>
  );
}
