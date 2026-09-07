import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./WhyItWorks.module.css";

const CARDS = [
  {
    title: "Human-like conversations",
    description:
      "Dynamic, contextual dialogue that adapts to the person on the line instead of following a rigid script.",
    href: "/products#human-like-conversations",
    src: "/assets/why-works-1.jpg",
  },
  {
    title: "System integration",
    description:
      "Connects to your CRM and dialer stack via APIs, webhooks, SFTP, or CSV, and writes results back automatically.",
    href: "/products#system-integration",
    src: "/assets/why-works-2.jpg",
  },
  {
    title: "Enterprise-grade standards",
    description:
      "Security, compliance, and reliability built for teams that answer to regulators and auditors.",
    href: "/products#enterprise-grade-standards",
    src: "/assets/why-works-3.jpg",
  },
  {
    title: "Built for scale",
    description:
      "Handle high call volumes without increasing agent count. Thousands of conversations, one platform.",
    href: "/products#built-for-scale",
    src: "/assets/why-works-4.jpg",
  },
];

export function WhyItWorks() {
  return (
    <section className={styles.section} aria-labelledby="why-it-works-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Why it works</p>
          <h2 id="why-it-works-title" className={styles.title}>
            Built to <span className="accent">enterprise</span> standards
          </h2>
          <p className={styles.lead}>
            Conversational quality on the surface, serious infrastructure
            underneath.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {CARDS.map(({ title, description, href, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <hr className={styles.divider} />
                <Link href={href} className={styles.readMore}>
                  Read More
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
