import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./SolutionSecurity.module.css";

const ITEMS = [
  {
    caption: "Encrypted call recordings & scheduling details",
    src: "/assets/security-1.jpg",
  },
  {
    caption: "Consent checks before sharing information",
    src: "/assets/security-2.jpg",
  },
  {
    caption: "Full audit trails for compliance tracking",
    src: "/assets/security-3.jpg",
  },
  {
    caption: "ISO 27001, SOC 2, and HIPAA compliant",
    src: "/assets/security-4.jpg",
  },
];

export function SolutionSecurity() {
  return (
    <section className={styles.section} aria-labelledby="security-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Resources</p>
          <h2 id="security-title" className={styles.title}>
            Security &amp; <span className="accent">Compliance</span>
          </h2>
          <p className={styles.lead}>
            Every reminder call runs inside the guardrails your compliance
            team expects.
          </p>
        </Entrance>

        <div className={styles.band}>
          <div className={styles.grid}>
            {ITEMS.map(({ caption, src }, i) => (
              <Entrance key={caption} delay={i * 60} as="article" className={styles.card}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1327px) 25vw, 322px"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.scrim} />
                <p className={styles.caption}>{caption}</p>
              </Entrance>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
