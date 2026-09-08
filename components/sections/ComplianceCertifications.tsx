import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./ComplianceCertifications.module.css";

/* Same 6 assets already used in Footer.tsx's CERTIFICATIONS row (there
   rendered at 48px) — sized up here since this section is their own visual
   anchor, per the user's "make sure the logos are big and readable". Order
   matches both the PDF and Footer.tsx's existing array — no reordering
   needed this time (unlike the Debt Collection page's cert row). */
const CERTIFICATIONS = [
  {
    label: "ISO 27001",
    src: "/assets/footer-cert-iso.png",
    title: "ISO 27001",
    description:
      "Certified information security management, covering how sensitive borrower information is stored and handled.",
  },
  {
    label: "AICPA SOC 2",
    src: "/assets/footer-cert-soc2.png",
    title: "SOC 2 Type II",
    description:
      "AICPA SOC 2 Type II certified. Security controls audited for effectiveness over time, not just on paper.",
  },
  {
    label: "HIPAA Compliant",
    src: "/assets/footer-cert-hipaa.png",
    title: "HIPAA",
    description:
      "HIPAA-compliant workflows for medical and healthcare collections, including patient payment reminders.",
  },
  {
    label: "FDCPA",
    src: "/assets/footer-cert-fdcpa.png",
    title: "FDCPA",
    description:
      "Required disclosures and legally required language enforced on every call, with timestamped transcripts for record-keeping.",
  },
  {
    label: "Reg F",
    src: "/assets/footer-cert-regf.png",
    title: "Reg F",
    description:
      "Call caps and calling windows enforced by the platform, keeping outreach frequency inside Regulation F limits.",
  },
  {
    label: "TCPA",
    src: "/assets/footer-cert-tcpa.png",
    title: "TCPA",
    description:
      "Consent handling and opt-outs built into every campaign, honored automatically across channels.",
  },
];

export function ComplianceCertifications() {
  return (
    <section className={styles.section} aria-labelledby="compliance-certifications-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Certifications &amp; frameworks</p>
          <h2 id="compliance-certifications-title" className={styles.title}>
            Certified, not just <span className="accent">Claimed</span>
          </h2>
          <p className={styles.lead}>
            Security certifications held by Vodex and the collection regulations the platform
            enforces on every conversation.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {CERTIFICATIONS.map(({ label, src, title, description }, i) => (
            <Entrance key={title} delay={i * 60} as="article" className={styles.card}>
              <Image src={src} alt={label} width={200} height={200} className={styles.badge} />
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.description}>{description}</p>
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
