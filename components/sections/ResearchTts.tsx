import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./ResearchTts.module.css";
import tts1 from "@/public/assets/research-tts-1.jpg";
import tts2 from "@/public/assets/research-tts-2.jpg";
import tts3 from "@/public/assets/research-tts-3.jpg";
import tts4 from "@/public/assets/research-tts-4.jpg";

const CARDS = [
  {
    title: "Orpheus core architecture",
    description:
      "Our pretrained TTS model is built on the Orpheus core architecture, tuned for production conversation rather than demos.",
    href: "/resources/research#orpheus-core-architecture",
    src: tts1,
  },
  {
    title: "21,000+ hours of training data",
    description:
      "Trained on more than 21,000 hours of diverse, expressive speech, so the model has heard how people actually talk.",
    href: "/resources/research#training-data",
    src: tts2,
  },
  {
    title: "Zen-Tokenizer inside",
    description:
      "Our proprietary neural audio codec is integrated at the audio tokenization layer, not bolted on afterward.",
    href: "/resources/research#zen-tokenizer",
    src: tts3,
  },
  {
    title: "Narrowband and wideband",
    description:
      "Supports both 8kHz telephony pipelines and 16kHz wideband audio from the same stack.",
    href: "/resources/research#narrowband-wideband",
    src: tts4,
  },
];

export function ResearchTts() {
  return (
    <section className={styles.section} aria-labelledby="research-tts-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Speech synthesis</p>
          <h2 id="research-tts-title" className={styles.title}>
            Why we built our <span className="accent">own TTS</span>
          </h2>
          <p className={styles.lead}>
            Existing text-to-speech fell short on naturalness,
            expressiveness, and control. Production conversation needs
            behaviors off-the-shelf models often lack: laughing, sighing,
            pausing, expressing uncertainty. So we trained our own.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {CARDS.map(({ title, description, href, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{title}</h3>
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
