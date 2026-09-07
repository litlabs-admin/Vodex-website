import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./FinalCta.module.css";

/* Angles are measured off the reference illustration as clock angles from the
   cluster's centre (0deg = 12 o'clock, positive = clockwise); each icon then
   rides whichever of the two rings it sits nearest in the reference, so every
   badge lands on an orbit line rather than floating between them. */
const NODES = [
  { src: "/assets/final-cta-icon-chart.png", alt: "", angle: -36, ring: "inner" },
  { src: "/assets/final-cta-icon-chat.png", alt: "", angle: 40, ring: "inner" },
  { src: "/assets/final-cta-icon-shield.png", alt: "", angle: 45, ring: "outer" },
  { src: "/assets/final-cta-icon-sync.png", alt: "", angle: 99, ring: "outer" },
  { src: "/assets/final-cta-icon-link.png", alt: "", angle: 139, ring: "outer" },
  { src: "/assets/final-cta-icon-gauge.png", alt: "", angle: 213, ring: "outer" },
  { src: "/assets/final-cta-icon-phone.png", alt: "", angle: 270, ring: "outer" },
] as const;

export function FinalCta() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <div className="container">
        <Entrance className={styles.banner}>
          <Image
            src="/assets/final-cta-bg.jpg"
            alt=""
            fill
            sizes="1180px"
            className={styles.bg}
          />
          <div className={styles.grid}>
            <div>
              <p className={styles.badge}>SOC 2 Type II · ISO 27001 · 24/7 support</p>

              <h2 id="final-cta-title" className={styles.title}>
                Ready to supercharge
                <br />
                your <span className="accent">engagement?</span>
              </h2>

              <p className={styles.lead}>
                Join the enterprises already using Vodex to turn reminders,
                collections and follow-ups into recovered revenue.
              </p>

              <div className={styles.actions}>
                <Button href="/demo" variant="primary" withArrow>
                  Schedule a Demo
                </Button>
                <Button href="/use-cases" variant="secondary">
                  Explore Use Cases
                </Button>
              </div>
            </div>

            <div className={styles.cluster} aria-hidden="true">
              <span className={styles.ringOuter} />
              <span className={styles.ringInner} />
              <span className={styles.center}>
                <Image
                  src="/assets/final-cta-center-mark.png"
                  alt=""
                  width={319}
                  height={319}
                  sizes="128px"
                />
              </span>
              {NODES.map(({ src, alt, angle, ring }) => (
                <span
                  key={src}
                  className={`${styles.node} ${ring === "inner" ? styles.nodeInner : styles.nodeOuter}`}
                  style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                >
                  <Image src={src} alt={alt} width={153} height={153} sizes="44px" />
                </span>
              ))}
            </div>
          </div>
        </Entrance>
      </div>
    </section>
  );
}
