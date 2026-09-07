import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { Logo } from "@/components/ui/Logo";
import styles from "./WhatYourTeamGets.module.css";

const ITEMS = [
  "Effortless follow-up automation",
  "Communication across voice, SMS, WhatsApp, and email",
  "Targeted outreach with multi-campaign control",
  "Personalized scripting for every audience",
];

export function WhatYourTeamGets() {
  return (
    <section className={styles.section} aria-labelledby="team-gets-title">
      <div className="container">
        <Entrance className={styles.banner}>
          <Image
            src="/assets/team-gets-bg.jpg"
            alt=""
            fill
            sizes="1338px"
            className={styles.bg}
          />
          <Logo height={22} className={styles.logo} />

          <div className={styles.grid}>
            <div>
              <h2 id="team-gets-title" className={styles.title}>
                What your team gets
              </h2>
              <p className={styles.lead}>
                Every campaign runs with the same playbook: reach out,
                converse, log the outcome, follow up.
              </p>
            </div>

            <ul className={styles.list}>
              {ITEMS.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Entrance>
      </div>
    </section>
  );
}
