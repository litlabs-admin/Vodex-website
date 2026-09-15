import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./ComplianceSecurityPractices.module.css";

const CARDS = [
  {
    title: "Encryption everywhere",
    description:
      "All call artifacts, recordings, and transcripts are encrypted in transit and at rest.",
    src: "/assets/compliance-security-1.png",
  },
  {
    title: "Role-based access control",
    description:
      "Access to borrower data is scoped by role, so people only see what their job requires.",
    src: "/assets/compliance-security-2.jpg",
  },
  {
    title: "Multi-factor authentication",
    description:
      "MFA protects every platform account handling sensitive borrower information.",
    src: "/assets/compliance-security-3.png",
  },
  {
    title: "Audit-ready records",
    description:
      "Detailed audit logs, with recordings and transcripts indexed, searchable, and exportable.",
    src: "/assets/compliance-security-4.jpg",
  },
];

export function ComplianceSecurityPractices() {
  return (
    <section className={styles.section} aria-labelledby="compliance-security-practices-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Security practices</p>
          <h2 id="compliance-security-practices-title" className={styles.title}>
            How borrower data <span className="accent">stays protected</span>
          </h2>
          <p className={styles.lead}>
            The controls behind the certifications: how data is encrypted, who can touch it, and
            what gets logged.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {CARDS.map(({ title, description, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.description}>{description}</p>
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
