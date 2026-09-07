import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ExternalLinkIcon } from "@/components/ui/icons";
import styles from "./SeeItInAction.module.css";

const CARDS = [
  {
    title: "Upcoming payment reminders",
    description:
      "Timely, structured calls before the due date keep accounts current and reduce delinquency without manual dialing.",
    href: "/products#upcoming-payment-reminders",
    src: "/assets/action-1.jpg",
  },
  {
    title: "Payment plan negotiation",
    description:
      "Agents offer flexible repayment options in conversation, capturing promise-to-pay commitments on the call.",
    href: "/products#payment-plan-negotiation",
    src: "/assets/action-2.jpg",
  },
  {
    title: "Overdue payment reminders",
    description:
      "Persistent, compliant follow-up on past-due accounts, with outcomes and disposition codes written back to your system.",
    href: "/products#overdue-payment-reminders",
    src: "/assets/action-3.jpg",
  },
];

export function SeeItInAction() {
  return (
    <section className={styles.section} aria-labelledby="see-it-in-action-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>See it in action</p>
          <h2 id="see-it-in-action-title" className={styles.title}>
            Conversations that carry <span className="accent">real outcomes</span>
          </h2>
          <p className={styles.lead}>
            From the first reminder to a negotiated plan, Vodex agents run the
            calls that keep accounts moving.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {CARDS.map(({ title, description, href, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <Link href={href} className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.scrim} />
                <div className={styles.overlayTitle}>
                  <span>{title}</span>
                  <ExternalLinkIcon className={styles.arrow} />
                </div>
              </Link>
              <div className={styles.body}>
                <p className={styles.description}>{description}</p>
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
