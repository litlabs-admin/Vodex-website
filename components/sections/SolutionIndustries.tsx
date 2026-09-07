import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight, BankIcon, PhoneCallIcon, ShieldPlusIcon } from "@/components/ui/icons";
import styles from "./SolutionIndustries.module.css";

const CARDS = [
  {
    title: "Banks & Financial Institutions",
    description:
      "Proactively manage payment reminders regarding credit cards, debts, short-term loans, and more.",
    Icon: BankIcon,
    src: "/assets/industries-banks.jpg",
  },
  {
    title: "Collection Agencies",
    description:
      "First-touch voice AI reminders for upcoming and overdue payments, freeing agents for escalation-worthy cases.",
    Icon: PhoneCallIcon,
    src: "/assets/industries-collection-agencies.jpg",
  },
  {
    title: "Healthcare",
    description:
      "Ensure reduced missed payments with due date reminders, on-day reminders, and more.",
    Icon: ShieldPlusIcon,
    src: "/assets/industries-healthcare.jpg",
  },
];

export function SolutionIndustries() {
  return (
    <section className={styles.section} aria-labelledby="industries-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Core features</p>
          <h2 id="industries-title" className={styles.title}>
            Industries that <span className="accent">Benefit</span>
          </h2>
          <p className={styles.lead}>
            Wherever a due date matters, an AI voice agent can make the reminder
            call for you.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {CARDS.map(({ title, description, Icon, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt={`${title} — photo`}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.heading}>
                  <Icon className={styles.icon} />
                  <h3 className={styles.cardTitle}>{title}</h3>
                </div>
                <p className={styles.description}>{description}</p>
                <hr className={styles.divider} />
                <Link href="/solutions" className={styles.readMore}>
                  Read More
                  <ArrowRight />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>

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
