import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { Logo } from "@/components/ui/Logo";
import styles from "./AboutLeadership.module.css";
import anshul from "@/public/assets/about-leader-anshul.jpg";
import kumar from "@/public/assets/about-leader-kumar.jpg";
import deb from "@/public/assets/about-leader-deb.jpg";

type Leader = {
  name: string;
  role: string;
  photo?: Parameters<typeof Image>[0]["src"];
};

const LEADERS: Leader[] = [
  { name: "Anshul Shrivastava", role: "CEO & Co-Founder", photo: anshul },
  { name: "Kumar Saurav", role: "CTO & Co-Founder", photo: kumar },
  { name: "Deb Biswas", role: "Advisor", photo: deb },
  // No headshot was supplied for Yash Kotak — the reference PDF itself has
  // no visible photo for him either, so this renders an empty placeholder
  // circle rather than a stand-in image.
  { name: "Yash Kotak", role: "Advisor" },
];

export function AboutLeadership() {
  return (
    <section className={styles.section} aria-labelledby="about-leadership-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Leadership</p>
          <h2 id="about-leadership-title" className={styles.title}>
            The people <span className="accent">building</span> Vodex
          </h2>
          <p className={styles.lead}>
            Founders and advisors with deep roots in conversational AI, voice
            technology, and enterprise software.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {LEADERS.map(({ name, role, photo }, i) => (
            <Entrance key={name} delay={i * 90} className={styles.card}>
              <Logo height={18} className={styles.mark} />
              <div className={styles.photoFrame}>
                {photo ? (
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    sizes="(max-width: 900px) 45vw, 300px"
                    className={styles.photo}
                  />
                ) : (
                  <div className={styles.photoPlaceholder} aria-hidden="true" />
                )}
              </div>
              <p className={styles.name}>{name}</p>
              <p className={styles.role}>{role}</p>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
