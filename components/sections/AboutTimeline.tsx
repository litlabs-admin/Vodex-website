import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./AboutTimeline.module.css";
import timeline2016 from "@/public/assets/about-timeline-2016.jpg";
import timeline2021 from "@/public/assets/about-timeline-2021.jpg";
import timeline2022 from "@/public/assets/about-timeline-2022.jpg";
import timeline2024 from "@/public/assets/about-timeline-2024.jpg";

const ENTRIES = [
  {
    tag: "2016",
    title: "Anshul Shrivastava and Kumar Saurav began developing chatbot and voice bot technology.",
    src: timeline2016,
  },
  {
    tag: "2021",
    title: "Built a core team of 20+ experts in Bangalore focused on human-like conversations.",
    src: timeline2021,
  },
  {
    tag: "2022",
    title: "Vodex officially founded, emphasizing AI-driven outbound communication.",
    src: timeline2022,
  },
  {
    tag: "2024",
    title: "Launched Vodex 2.0 with 5+ investor backing including Google Cloud, MongoDB, and Krisp.",
    src: timeline2024,
  },
];

/**
 * Copy-adapted from ResearchTimeline.tsx/.module.css — same alternating-row
 * pattern (center line, dot markers, tag pill), own 4-entry story and own
 * cross-sell line, per this project's "duplicate a small closing line
 * locally" precedent rather than parameterizing ResearchTimeline itself.
 */
export function AboutTimeline() {
  return (
    <section className={styles.section} aria-labelledby="about-timeline-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Our story</p>
          <h2 id="about-timeline-title" className={styles.title}>
            The Vodex <span className="accent">timeline</span>
          </h2>
          <p className={styles.lead}>
            From a chatbot experiment in 2016 to a funded voice AI platform
            serving enterprises worldwide.
          </p>
        </Entrance>

        <div className={styles.rows}>
          {ENTRIES.map(({ tag, title, src }, i) => (
            <Entrance
              key={tag}
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
