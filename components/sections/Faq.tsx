import { Button } from "@/components/ui/Button";
import { ChatIcon } from "@/components/ui/icons";
import { Entrance } from "@/components/ui/Entrance";
import { FaqAccordion } from "./FaqAccordion";
import styles from "./Faq.module.css";

/**
 * The reference PDF's FAQ copy ("Recruiting vs Staffing pricing", "Talently")
 * is leftover text from an unrelated template — replaced with real
 * Vodex-relevant questions per the user's direction.
 */
const FAQS = [
  {
    question:
      "What makes Vodex's voice agents different from a standard IVR or chatbot?",
    answer:
      "Vodex agents run real, context-aware conversations — verifying identity, adapting to what the debtor says, and carrying outcomes like promise-to-pay capture, rather than routing callers through scripted menus.",
  },
  {
    question: "How does Vodex handle compliance during collections calls?",
    answer:
      "Every call starts with right-party contact verification and follows the compliance rules your industry requires, so conversations stay compliant without extra manual review.",
  },
  {
    question:
      "Can the AI agents negotiate payment plans, or just send reminders?",
    answer:
      "Both. Agents handle everything from payment reminders to full payment-plan negotiation, adjusting the offer based on each debtor's situation.",
  },
  {
    question: "Which industries can use Vodex beyond debt collection?",
    answer:
      "Vodex also supports BPO, insurance and mortgage teams — any business running high-volume, outcome-driven voice conversations.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "Most teams are live within weeks. Book a demo and we'll walk through onboarding, integrations and compliance setup for your workflow.",
  },
];

export function Faq() {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.grid}>
          <Entrance>
            <h2 id="faq-title" className={styles.heading}>
              Frequently asked <span className={styles.serif}>questions</span>
            </h2>

            <FaqAccordion items={FAQS} />
          </Entrance>

          <Entrance delay={90} className={styles.sideCol}>
            <p className={styles.sideText}>
              Everything you need to know about putting GenAI voice agents to
              work. Can&rsquo;t find an answer? Talk to our team.
            </p>

            <div className={styles.card}>
              <span className={styles.cardIcon}>
                <ChatIcon width={20} height={20} />
              </span>
              <p className={styles.cardTitle}>Do you have more questions?</p>
              <p className={styles.cardBody}>
                Talk to our team about putting GenAI voice agents to work for
                your collections pipeline.
              </p>
              <Button href="/demo" className={styles.cardButton} withArrow>
                Talk to Sales
              </Button>
            </div>
          </Entrance>
        </div>
      </div>
    </section>
  );
}
