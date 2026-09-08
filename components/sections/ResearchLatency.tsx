import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { Button } from "@/components/ui/Button";
import styles from "./ResearchLatency.module.css";
import latencyBg from "@/public/assets/research-latency-bg.jpg";

const STATS = [
  { number: "189ms", label: "Average time-to-first-byte (TTFB) today" },
  { number: "<80ms", label: "Target response time in production" },
];

export function ResearchLatency() {
  return (
    <section className={styles.section} aria-labelledby="research-latency-title">
      <div className="container">
        <Entrance className={styles.banner}>
          <Image src={latencyBg} alt="" fill sizes="1327px" className={styles.bg} />
          <p className={styles.eyebrow}>Latency</p>

          <div className={styles.grid}>
            <div>
              <h2 id="research-latency-title" className={styles.title}>
                Fast enough to interrupt
              </h2>
              <p className={styles.lead}>
                A voice agent that pauses too long breaks the illusion. We
                keep pushing time-to-first-byte down through codebook
                structure refinement and distributed deployment techniques.
              </p>
              <Button
                href="/solutions/collection-software"
                size="sm"
                withArrow
                className={styles.cta}
              >
                Learn More About Integrations
              </Button>
            </div>

            <div className={styles.stats}>
              {STATS.map(({ number, label }) => (
                <div key={number} className={styles.stat}>
                  <p className={styles.statNumber}>{number}</p>
                  <p className={styles.statLabel}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Entrance>
      </div>
    </section>
  );
}
