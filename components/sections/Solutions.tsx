import { Entrance } from "@/components/ui/Entrance";
import { SolutionsTabs } from "./solutions/SolutionsTabs";
import styles from "./Solutions.module.css";

export function Solutions() {
  return (
    <section className={styles.section} aria-labelledby="solutions-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Solutions</p>
          <h2 id="solutions-title" className={styles.title}>
            Empowering <span className="accent">industry-specific</span>
            <br />
            use cases
          </h2>
          <p className={styles.lead}>
            From first contact to final payment, Vodex agents run the
            conversations that move your pipeline — tuned to the rules of
            your industry.
          </p>
        </Entrance>

        <SolutionsTabs />
      </div>
    </section>
  );
}
