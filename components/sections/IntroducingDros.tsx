import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { EngagementQueueIllustration } from "./EngagementQueueIllustration";
import {
  ArrowRight,
  ContextIcon,
  LayersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import styles from "./IntroducingDros.module.css";

const FEATURES = [
  {
    title: "End-to-end engagement operations",
    body: "Accounts, payments, outreach and follow-ups run in one place — no more stitching tools together.",
    Icon: LayersIcon,
  },
  {
    title: "Context-aware AI agents",
    body: "Agents that remember every interaction and adapt each conversation to the account in front of them.",
    Icon: ContextIcon,
  },
  {
    title: "AI-powered collections workflows",
    body: "Design recovery journeys once; DROS executes them across voice, SMS and email automatically.",
    Icon: WorkflowIcon,
  },
];

export function IntroducingDros() {
  return (
    <section className={styles.section} aria-labelledby="dros-title">
      <div className={`container ${styles.row}`}>
        <Entrance className={styles.text}>
          <p className={styles.pill}>
            <span className={styles.pillTag}>New</span>
            Introducing DROS
          </p>

          <h2 id="dros-title" className={styles.title}>
            The Debt Resolution
            <br />
            <span className="accent">Operating System</span>
          </h2>

          <p className={styles.lead}>
            A new product from the Vodex team designed from the ground up for
            modern collections operations, from first reminder to final
            resolution.
          </p>

          <ul className={styles.features}>
            {FEATURES.map(({ title, body, Icon }) => (
              <li key={title} className={styles.feature}>
                <Icon className={styles.featureIcon} />
                <div>
                  <p className={styles.featureTitle}>{title}</p>
                  <p className={styles.featureBody}>{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/dros" className={styles.cta}>
            See DROS in action
            <ArrowRight />
          </Link>
        </Entrance>

        <Entrance delay={90} className={styles.imageFrame}>
          <EngagementQueueIllustration />
        </Entrance>
      </div>
    </section>
  );
}
