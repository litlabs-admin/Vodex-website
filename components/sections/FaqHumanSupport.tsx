import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./FaqHumanSupport.module.css";

export function FaqHumanSupport() {
  return (
    <section className={styles.section} aria-labelledby="faq-human-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Still stuck?</p>
          <h2 id="faq-human-title" className={styles.title}>
            Talk to a <span className="accent">human</span>
          </h2>
          <p className={styles.lead}>
            If your question is not covered here, our team answers directly. No ticket queues for
            pre-sales questions.
          </p>
        </Entrance>

        <div className={styles.grid}>
          <Entrance delay={70} as="article" className={`${styles.card} ${styles.cardDark}`}>
            <p className={styles.cardTitle}>Help Center</p>
            <p className={styles.cardBody}>
              Guides, tutorials, and platform documentation for current customers.
            </p>
            {/* ⚠️ Reference PDF's link text here literally said "Medical & Healthcare →"
                — a mismatched Figma artifact (an industry link, not a Help Center
                destination). Fixed per confirmed user direction. */}
            <Link href="/help" className={styles.cardLink}>
              Visit Help Center
              <ArrowRight />
            </Link>
          </Entrance>

          <Entrance delay={140} as="article" className={`${styles.card} ${styles.cardBrand}`}>
            <p className={styles.cardTitle}>Email us</p>
            <p className={styles.cardBody}>
              General enquiries land with a real person: contact@vodex.ai or +1 (323) 999 2373.
            </p>
            <Link href="mailto:contact@vodex.ai" className={styles.cardLink}>
              contact@vodex.ai
              <ArrowRight />
            </Link>
          </Entrance>
        </div>
      </div>
    </section>
  );
}
