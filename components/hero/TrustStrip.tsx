import type { ComponentType, SVGProps } from "react";
import { Entrance } from "@/components/ui/Entrance";
import {
  GaugeIcon,
  PhoneLinesIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";
import styles from "./TrustStrip.module.css";

type TrustItem = {
  title: string;
  note: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const ITEMS: TrustItem[] = [
  { title: "SOC 2 Type II", note: "Audited security controls", Icon: GaugeIcon },
  {
    title: "ISO 27001 Certified",
    note: "Global security standard",
    Icon: ShieldCheckIcon,
  },
  {
    title: "10M+ Conversations Automated",
    note: "AI conversations at scale",
    Icon: PhoneLinesIcon,
  },
];

export function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="Security and scale credentials">
      <ul className={`container ${styles.grid}`}>
        {ITEMS.map(({ title, note, Icon }, index) => (
          <li key={title} className={styles.cell}>
            <Entrance delay={360 + index * 90} className={styles.item}>
              <Icon className={styles.icon} />
              <div className={styles.label}>
                <span className={styles.title}>{title}</span>
                <span className={styles.note}>{note}</span>
              </div>
            </Entrance>
          </li>
        ))}
      </ul>
    </section>
  );
}
