import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./CoreFeatures.module.css";

const FEATURES = [
  {
    label: "Human-like conversations",
    description:
      "Dynamic, contextual dialogue that adapts to the person on the line.",
    src: "/assets/feature-1.jpg",
  },
  {
    label: "Real-time interruption handling",
    description:
      "Agents pause, listen, and pick the thread back up mid-sentence.",
    src: "/assets/feature-2.jpg",
  },
  {
    label: "Live analytics & dispositions",
    description:
      "Every call scored, coded, and written back to your system.",
    src: "/assets/feature-3.jpg",
  },
  {
    label: "Multilingual voice agents",
    description: "One agent, many languages, matched to each account.",
    src: "/assets/feature-4.jpg",
  },
  {
    label: "Low-latency speech engine",
    description:
      "Sub-second responses, so the conversation never feels stalled.",
    src: "/assets/feature-5.jpg",
  },
  {
    label: "Call recording & QA review",
    description: "Full recordings and transcripts for audit and coaching.",
    src: "/assets/feature-6.jpg",
  },
  {
    label: "Carrier-grade telephony",
    description: "High-volume dialing with automatic re-dial across attempts.",
    src: "/assets/feature-7.jpg",
  },
  {
    label: "24/7 always-on calling",
    description: "Reach accounts in their window, not just business hours.",
    src: "/assets/feature-8.jpg",
  },
  {
    label: "RPC verification & compliance",
    description:
      "Right-party contact confirmed before any account detail is discussed.",
    src: "/assets/feature-9.jpg",
  },
];

export function CoreFeatures() {
  return (
    <section
      id="features"
      className={styles.section}
      aria-labelledby="core-features-title"
    >
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Core features</p>
          <h2 id="core-features-title" className={styles.title}>
            Everything a voice agent needs
            <br /> to <span className="accent">perform</span>
          </h2>
          <p className={styles.lead}>
            Nine capabilities that make every Vodex conversation sound
            natural, stay compliant, and end in an outcome.
          </p>
        </Entrance>
      </div>

      <Entrance as="ul" className={styles.strip}>
        {FEATURES.map(({ label, description, src }) => (
          <li key={label} className={styles.panel} tabIndex={0}>
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 560px) 50vw, (max-width: 900px) 34vw, 40vw"
              style={{ objectFit: "cover" }}
            />
            <div className={styles.scrim} />
            <div className={styles.copy}>
              <p className={styles.panelLabel}>{label}</p>
              <p className={styles.panelDescription}>{description}</p>
            </div>
          </li>
        ))}
      </Entrance>
    </section>
  );
}
