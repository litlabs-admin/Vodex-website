import { Entrance } from "@/components/ui/Entrance";
import { CallSamplesGrid } from "./CallSamplesGrid";
import type { CallCardData } from "./CallCard";
import styles from "./CallSamples.module.css";

/**
 * ⚠️ The 3 audio files are temporary placeholders unrelated to the card
 * copy (supplied by the user for wiring up real playback; real Vodex call
 * recordings will replace them later). Filenames are position-based
 * (call-sample-1/2/3.mp3) specifically so a future swap is just "overwrite
 * the file" — no code change needed.
 */
const CALLS: CallCardData[] = [
  {
    title: "Upcoming payment reminder",
    agent: "Olivia",
    quote:
      "Hi Andrew, this is Olivia calling about your upcoming credit card payment due Friday…",
    status: "Payment confirmed on call",
    src: "/assets/call-sample-1.mp3",
  },
  {
    title: "Payment plan negotiation",
    agent: "Olivia",
    quote:
      "I can offer a plan of three monthly installments that fits your budget. Would that work?",
    status: "Plan accepted · 3 installments",
    src: "/assets/call-sample-2.mp3",
  },
  {
    title: "Overdue payment",
    agent: "Olivia",
    quote:
      "Your account shows a balance past due. Let's find the easiest way to get it resolved today.",
    status: "Promise-to-pay captured",
    src: "/assets/call-sample-3.mp3",
  },
];

export function CallSamples() {
  return (
    <section className={styles.section} aria-labelledby="call-samples-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Call Samples</p>
          <h2 id="call-samples-title" className={styles.title}>
            Hear the difference <span className="accent">context</span> makes
          </h2>
          <p className={styles.lead}>
            Real conversation flows our AI agents run every day — natural,
            compliant, and built around your business rules.
          </p>
        </Entrance>

        <Entrance delay={80} className={styles.frame}>
          <CallSamplesGrid calls={CALLS} />
        </Entrance>
      </div>
    </section>
  );
}
