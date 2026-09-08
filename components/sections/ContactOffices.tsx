import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ExternalLinkIcon } from "@/components/ui/icons";
import styles from "./ContactOffices.module.css";

const OFFICES = [
  {
    name: "USA",
    address: "Vodex AI Inc, 8 The Green, Dover, DE 19901, USA",
    src: "/assets/contact-office-usa.jpg",
  },
  {
    name: "India",
    address: "WeWork, Salarpuria Symbiosis, Arakere Bannerghatta Rd, Bengaluru, KA 560076, India",
    src: "/assets/contact-office-india.jpg",
  },
];

export function ContactOffices() {
  return (
    <section className={styles.section} aria-labelledby="offices-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Offices</p>
          <h2 id="offices-title" className={styles.title}>
            Visit us in <span className="accent">person</span>
          </h2>
          <p className={styles.lead}>
            The platform drives intelligent, personalized conversations, empowering
            businesses to scale outbound and inbound calls with ease.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {OFFICES.map(({ name, address, src }, i) => (
            <Entrance key={name} delay={i * 80} as="article" className={styles.card}>
              <Image
                src={src}
                alt=""
                fill
                quality={90}
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.scrim} />
              <div className={styles.copy}>
                <p className={styles.cardTitle}>{name}</p>
                <p className={styles.address}>{address}</p>
              </div>
              <Link href="/company/about" className={styles.learnMore}>
                Learn More
                <ExternalLinkIcon />
              </Link>
            </Entrance>
          ))}
        </div>

        <p className={styles.contactLine}>
          Prefer email? Write to{" "}
          <Link href="mailto:contact@vodex.ai">contact@vodex.ai</Link> or call{" "}
          <Link href="tel:+13239992373">+1 (323) 999 2373</Link>.
        </p>
      </div>
    </section>
  );
}
