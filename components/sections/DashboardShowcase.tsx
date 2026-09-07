import Image from "next/image";
import dashboardMockup from "@/public/assets/dashboard-mockup.png";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./DashboardShowcase.module.css";

/**
 * Section 5 — product dashboard mockup. The supplied artwork already bakes
 * in the browser chrome, floating "Call me now" card and the "Connect rate"
 * badge, so this section is just that image placed at container width.
 */
export function DashboardShowcase() {
  return (
    <section className={styles.section} aria-label="Product dashboard preview">
      <div className="container">
        <Entrance className={styles.frame}>
          <Image
            src={dashboardMockup}
            alt="Vodex collections dashboard showing outstanding balances, collected payments and live agent activity"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            quality={90}
            placeholder="blur"
          />
        </Entrance>
      </div>
    </section>
  );
}
