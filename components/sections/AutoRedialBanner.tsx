import Image from "next/image";
import autoRedial from "@/public/assets/auto-redial.png";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./AutoRedialBanner.module.css";

/**
 * The supplied artwork already bakes in the heading, bullets, "Attempt"
 * chips and the Vodex mark as one flat composite — same pattern as the
 * dashboard-showcase section.
 */
export function AutoRedialBanner() {
  return (
    <section className={styles.section} aria-label="Auto re-dial, built in">
      <div className="container">
        <Entrance className={styles.frame}>
          <Image
            src={autoRedial}
            alt="Auto re-dial, built in — diagram showing three automatic retry attempts leading to a connected call"
            fill
            sizes="(max-width: 1440px) 100vw, 1180px"
            quality={90}
            placeholder="blur"
          />
        </Entrance>
      </div>
    </section>
  );
}
