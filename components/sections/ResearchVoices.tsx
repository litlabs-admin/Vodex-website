import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ExternalLinkIcon } from "@/components/ui/icons";
import styles from "./ResearchVoices.module.css";
import shreya from "@/public/assets/research-voice-shreya.png";
import shweta from "@/public/assets/research-voice-shweta.png";
import aastha from "@/public/assets/research-voice-aastha.png";

const VOICES = [
  {
    name: "Shreya",
    description:
      "The most soft-spoken and emotionally expressive of our voices. Ideal for empathetic agentic use cases where tone carries the conversation.",
    src: shreya,
    tone: "dark",
  },
  {
    name: "Shweta",
    description:
      "Trained to sound like a professional audiobook narrator. Smooth, clear storytelling with steady pacing.",
    src: shweta,
    tone: "brand",
  },
  {
    name: "Aastha",
    description:
      "A latency-optimized voice that preserves expressiveness while minimizing response time. Built for real-time back-and-forth.",
    src: aastha,
    tone: "dark",
  },
] as const;

export function ResearchVoices() {
  return (
    <section className={styles.section} aria-labelledby="research-voices-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Named Voices</p>
          <h2 id="research-voices-title" className={styles.title}>
            Voices that feel <span className="accent">human</span>
          </h2>
          <p className={styles.lead}>
            Each production voice is a distinct speaker with its own
            character, trained for a specific kind of conversation.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {VOICES.map(({ name, description, src, tone }, i) => (
            <Entrance
              key={name}
              delay={i * 80}
              as="article"
              className={styles.card}
              data-tone={tone}
            >
              <div className={styles.copy}>
                <p className={styles.name}>{name}</p>
                <p className={styles.description}>{description}</p>
              </div>
              <Image
                src={src}
                alt=""
                className={styles.portrait}
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <ExternalLinkIcon className={styles.arrow} />
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
