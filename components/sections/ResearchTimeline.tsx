import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./ResearchTimeline.module.css";
import timeline1 from "@/public/assets/research-timeline-1.jpg";
import timeline2 from "@/public/assets/research-timeline-2.jpg";
import timeline3 from "@/public/assets/research-timeline-3.png";

const ENTRIES = [
  {
    tag: "2020",
    title: "First experiments in speech synthesis",
    description:
      "The team's background is foundational AI/ML and speech synthesis. Vodex is the product of years spent inside these models, not a wrapper around someone else's.",
    src: timeline1,
  },
  {
    tag: "2021",
    title: "Retrieval and language modeling",
    description:
      "Work with FAISS, Haystack-RAG, and BLOOM built the retrieval and language foundations that conversational agents depend on.",
    src: timeline2,
  },
  {
    tag: "Today",
    title: "An AI-native voice automation company",
    description:
      "Vodex builds speech intelligence for real-world, high-stakes conversations in the mortgage, insurance, and collections industries.",
    src: timeline3,
  },
];

export function ResearchTimeline() {
  return (
    <section className={styles.section} aria-labelledby="research-timeline-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Debt Collection</p>
          <h2 id="research-timeline-title" className={styles.title}>
            Where this work <span className="accent">began</span>
          </h2>
          <p className={styles.lead}>
            The team&apos;s background is foundational AI/ML and speech
            synthesis. Vodex is the product of years spent inside these
            models, not a wrapper around someone else&apos;s.
          </p>
        </Entrance>

        <div className={styles.rows}>
          {ENTRIES.map(({ tag, title, description, src }, i) => (
            <Entrance
              key={tag}
              delay={i * 80}
              as="div"
              className={styles.row}
              data-reverse={i === 1 ? "true" : undefined}
            >
              <div className={styles.media}>
                <Image
                  src={src}
                  alt={`${title} — photo`}
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.content}>
                <p className={styles.tag}>{tag}</p>
                <h3 className={styles.entryTitle}>{title}</h3>
                <p className={styles.entryDescription}>{description}</p>
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
