import Image from "next/image";
import solutionCard from "@/public/assets/solution-card.png";
import { Entrance } from "@/components/ui/Entrance";
import { IndustryTabs } from "./IndustryTabs";
import styles from "./Solutions.module.css";

const INDUSTRIES = ["Debt Collection", "BPO", "Insurance", "Mortgage"];

/**
 * Only "Debt Collection" copy exists in the reference design — the tabs
 * themselves are interactive (IndustryTabs), but switching tabs doesn't swap
 * this content yet since no other industry's copy has been supplied.
 */
const USE_CASES = [
  {
    label: "Debt Collection · 01",
    heading: "Verifying Right-Party Contact (RPC)",
    bullets: [
      "Ensures secure interactions by verifying debtor identity before proceeding.",
      "Reduces compliance risks while maintaining a seamless experience.",
    ],
  },
  {
    label: "Debt Collection · 02",
    heading: "Payment reminders",
    bullets: [
      "AI agents handle thousands of reminder calls effortlessly, lifting connect and recovery rates.",
      "Timely, structured follow-ups keep accounts on track and reduce delinquency.",
    ],
  },
  {
    label: "Debt Collection · 03",
    heading: "Payment plan negotiation",
    bullets: [
      "AI offers flexible repayment options based on each debtor's situation.",
      "Encourages successful resolutions while keeping the experience positive.",
    ],
  },
];

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

          <IndustryTabs industries={INDUSTRIES} />
        </Entrance>

        <div className={styles.rows}>
          {USE_CASES.map(({ label, heading, bullets }, i) => (
            <Entrance
              key={label}
              delay={i * 60}
              className={styles.row}
              data-reverse={i % 2 === 1}
            >
              <div className={styles.text}>
                <p className={styles.label}>{label}</p>
                <h3 className={styles.heading}>{heading}</h3>
                <ul className={styles.bullets}>
                  {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.card}>
                <Image
                  src={solutionCard}
                  alt="AI agent on a live call verifying account details, with Leo's profile shown on the call"
                  fill
                  sizes="(max-width: 820px) 90vw, (max-width: 1440px) 35vw, 520px"
                  quality={90}
                  placeholder="blur"
                />
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
