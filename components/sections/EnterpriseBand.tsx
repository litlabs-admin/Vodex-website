import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { Waveform } from "@/components/ui/icons";
import styles from "./EnterpriseBand.module.css";

export function EnterpriseBand() {
  return (
    <section className={styles.section} aria-labelledby="enterprise-title">
      <Entrance className={styles.banner}>
        <Image
          src="/assets/enterprise-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className={styles.bg}
        />
        <div className={styles.content}>
          <p className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Waveform />
            </span>
            Enterprise-grade security &amp; compliance
          </p>

          <h2 id="enterprise-title" className={styles.title}>
            Built for <span className="accent">enterprises</span>
          </h2>

          <p className={styles.lead}>
            Exceptional performance, scalability, and dedicated support.
            Deploy compliant AI agents that accelerate recovery while
            cutting cost-per-contact.
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
      </Entrance>
    </section>
  );
}
