import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./AnnouncementBar.module.css";

export function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.tag}>New</span>
        <p className={styles.message}>
          We&rsquo;ve built DROS &mdash; an Engagement Operating System for modern
          collections teams.
        </p>
        <Link href="/dros" className={styles.link}>
          Learn More
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
