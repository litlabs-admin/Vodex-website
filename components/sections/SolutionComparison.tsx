import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { CheckIcon, XIcon } from "@/components/ui/icons";
import styles from "./SolutionComparison.module.css";

const TRADITIONAL = [
  "Availability during business hours only",
  "Scalability challenges and manual reminders",
  "High costs and unpredictable volume handling",
  "Prone to errors and requires manual data entry",
  "Variability in agent performance and customer experience",
];

const VODEX = [
  "24/7 availability",
  "Scalable, trainable, and automated reminders",
  "Lower costs and high-volume handling",
  "Direct integration with CRMs and platforms to avoid conflicts and errors",
  "Consistent performance and customer experience",
];

type SolutionComparisonProps = {
  bgImage?: Parameters<typeof Image>[0]["src"];
};

export function SolutionComparison({
  bgImage = "/assets/comparison-vodex-bg.jpg",
}: SolutionComparisonProps) {
  return (
    <section className={styles.section} aria-labelledby="comparison-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Comparison</p>
          <h2 id="comparison-title" className={styles.title}>
            Traditional process vs <span className="accent">Vodex AI</span>
          </h2>
          <p className={styles.lead}>
            Wherever a due date matters, an AI voice agent can make the
            reminder call for you.
          </p>
        </Entrance>

        <Entrance className={styles.band}>
          <div className={styles.grid}>
            <div className={styles.leftPanel}>
              <h3 className={styles.panelTitle}>Traditional process</h3>
              <ul className={styles.list}>
                {TRADITIONAL.map((item) => (
                  <li key={item}>
                    <XIcon className={styles.xIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.middle} aria-hidden="true">
              <span className={styles.line} />
              <span className={styles.vsBadge}>VS</span>
              <span className={styles.line} />
            </div>

            <div className={styles.rightPanel}>
              <Image
                src={bgImage}
                alt=""
                fill
                sizes="(max-width: 820px) 100vw, 596px"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.rightContent}>
                <h3 className={styles.panelTitleLight}>Vodex AI</h3>
                <ul className={styles.list}>
                  {VODEX.map((item) => (
                    <li key={item}>
                      <CheckIcon className={styles.checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Entrance>

        <Entrance className={styles.closing}>
          <p>
            Running a collections operation?{" "}
            <Link href="/solutions/debt-collection" className={styles.closingLink}>
              See Vodex for Debt Collection
            </Link>
          </p>
        </Entrance>
      </div>
    </section>
  );
}
