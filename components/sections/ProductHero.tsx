import Image from "next/image";
import heroBackdrop from "@/public/assets/product-hero-bg.jpg";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { Waveform } from "@/components/ui/icons";
import styles from "./ProductHero.module.css";
import { BOOK_DEMO_URL } from "@/lib/links";

export function ProductHero() {
  return (
    <section className={styles.hero} aria-labelledby="product-hero-title">
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
        <Entrance immediate delay={0}>
          <p className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Waveform />
            </span>
            Our Product
          </p>
        </Entrance>

        <Entrance immediate delay={90}>
          <h1 id="product-hero-title" className={styles.title}>
            AI powered <span className="accent">phone calls</span> for
            <br className={styles.titleBreak} /> enterprises
          </h1>
        </Entrance>

        <Entrance immediate delay={180}>
          <p className={styles.lead}>
            Effortless, intelligent calling that scales with your business.
            Human-like conversations, deep system integration, and
            enterprise-grade standards, built for high call volumes.
          </p>
        </Entrance>

        <Entrance immediate delay={260} className={styles.actions}>
          <Button href={BOOK_DEMO_URL} variant="primary" withArrow>
            Schedule a Demo
          </Button>
          <Button href="/products#features" variant="secondary">
            Explore Features
          </Button>
        </Entrance>
      </div>
    </section>
  );
}
