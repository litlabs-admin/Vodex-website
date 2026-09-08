import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import {
  ArrowRight,
  CaseStudyIcon,
  ChartBarIcon,
  CloudLockIcon,
  HandshakeIcon,
  MegaphoneIcon,
  PhoneCallIcon,
} from "@/components/ui/icons";
import styles from "./ContactDepartments.module.css";

const DEPARTMENTS = [
  {
    title: "General Enquiries",
    description: "Anything else, or not sure who to ask.",
    email: "contact@vodex.ai",
    Icon: PhoneCallIcon,
    src: "/assets/contact-dept-general.jpg",
  },
  {
    title: "Sales",
    description: "Pricing, demos and rollout questions.",
    email: "sales@vodex.ai",
    Icon: ChartBarIcon,
    src: "/assets/contact-dept-sales.jpg",
  },
  {
    title: "Marketing",
    description: "Press, content, and brand requests.",
    email: "marketing@vodex.ai",
    Icon: MegaphoneIcon,
    src: "/assets/contact-dept-marketing.jpg",
  },
  {
    title: "Partnership",
    description: "Investor and partner conversations.",
    email: "partnership@vodex.ai",
    Icon: HandshakeIcon,
    src: "/assets/contact-dept-partnership.jpg",
  },
  {
    title: "Careers",
    description: "Join the team building Vodex.",
    email: "careers@vodex.ai",
    Icon: CaseStudyIcon,
    src: "/assets/contact-dept-careers.jpg",
  },
  {
    title: "Data Protection Officer",
    description: "Privacy and data protection matters.",
    email: "dpo@vodex.ai",
    Icon: CloudLockIcon,
    src: "/assets/contact-dept-dpo.jpg",
  },
];

export function ContactDepartments() {
  return (
    <section className={styles.section} aria-labelledby="departments-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Departments</p>
          <h2 id="departments-title" className={styles.title}>
            Reach the right <span className="accent">team</span>
          </h2>
          <p className={styles.lead}>
            Write to the team that can help fastest, or call us directly.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {DEPARTMENTS.map(({ title, description, email, Icon, src }, i) => (
            <Entrance key={title} delay={i * 60} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  quality={90}
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>
                  <Icon />
                  {title}
                </h3>
                <p className={styles.description}>{description}</p>
                <hr className={styles.divider} />
                <Link href={`mailto:${email}`} className={styles.emailLink}>
                  {email}
                  <ArrowRight />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
