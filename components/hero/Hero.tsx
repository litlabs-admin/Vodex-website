import Image from "next/image";
import heroBackdrop from "@/public/assets/hero-bg.png";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { Waveform } from "@/components/ui/icons";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop}>
        <Image
          src={heroBackdrop}
          alt=""
          priority
          quality={90}
          sizes="100vw"
          placeholder="blur"
        />
      </div>

      <div className={`container ${styles.content}`}>
        <Entrance delay={0}>
          <p className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Waveform />
            </span>
            GenAI Voice Agents, purpose-built for enterprise
          </p>
        </Entrance>

        <Entrance delay={90}>
          <h1 id="hero-title" className={styles.title}>
            Voice agents that turn
            <br className={styles.titleBreak} />{" "}
            outreach into <span className="accent">revenue</span>
          </h1>
        </Entrance>

        <Entrance delay={180}>
          <p className={styles.lead}>
            GenAI-powered voice agents for enterprise engagement. Make reminders,
            collections, follow-ups, qualification, payment negotiation and more
            easy without the extra overhead.
          </p>
        </Entrance>

        <Entrance delay={260} className={styles.actions}>
          <Button href="/demo" variant="primary" withArrow>
            Schedule a Demo
          </Button>
          <Button href="/use-cases" variant="secondary">
            Explore Use Cases
          </Button>
        </Entrance>
      </div>
    </section>
  );
}
