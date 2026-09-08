import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./InvestorTimeline.module.css";
import timeline1 from "@/public/assets/investor-timeline-1.jpg";
import timeline2 from "@/public/assets/investor-timeline-2.jpg";
import timeline3 from "@/public/assets/investor-timeline-3.jpg";
import timeline4 from "@/public/assets/investor-timeline-4.jpg";
import timeline5 from "@/public/assets/investor-timeline-5.jpg";

const ENTRIES = [
  {
    tag: "2016",
    title: "Anshul Shrivastava and Kumar Saurav began developing chatbot and voice bot technology.",
    src: timeline1,
  },
  {
    tag: "2021",
    title: "Built a core team of 20+ experts in Bangalore focused on human-like conversations.",
    src: timeline2,
  },
  {
    tag: "2022",
    title: "Vodex officially founded, emphasizing AI-driven outbound communication.",
    src: timeline3,
  },
  {
    tag: "2024",
    title: "Launched Vodex 2.0 with 5+ investor backing including Google Cloud, MongoDB, and Krisp.",
    src: timeline4,
  },
  {
    tag: "2024",
    title: "Launched Vodex 2.0 with 5+ investor backing including Google Cloud, MongoDB, and Krisp.",
    src: timeline5,
  },
];

/**
 * Copy-adapted from AboutTimeline.tsx/.module.css — same alternating-row
 * zigzag pattern (center line, dot markers, tag pill, data-reverse column
 * swap with the mobile grid-row:auto reset). The reference's 4th and 5th
 * entries are word-for-word identical (both tagged 2024) — a confirmed
 * Figma duplication artifact, kept verbatim per the user's explicit
 * decision rather than invented or dropped.
 */
export function InvestorTimeline() {
  return (
    <section className={styles.section} aria-labelledby="investor-timeline-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Milestones</p>
          <h2 id="investor-timeline-title" className={styles.title}>
            Timeline of our <span className="accent">milestones</span>
          </h2>
        </Entrance>

        <div className={styles.rows}>
          {ENTRIES.map(({ tag, title, src }, i) => (
            <Entrance
              key={`${tag}-${i}`}
              delay={i * 80}
              as="div"
              className={styles.row}
              data-reverse={i % 2 === 1 ? "true" : undefined}
            >
              <div className={styles.media}>
                <Image
                  src={src}
                  alt={`${tag} — photo`}
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.content}>
                <p className={styles.tag}>{tag}</p>
                <p className={styles.entryTitle}>{title}</p>
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
