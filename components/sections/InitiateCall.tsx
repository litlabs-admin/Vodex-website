import Image from "next/image";
import bg from "@/public/assets/initiate-call-bg.jpg";
import { Entrance } from "@/components/ui/Entrance";
import { InitiateCallForm } from "./InitiateCallForm";
import styles from "./InitiateCall.module.css";

/**
 * Section 3 (landing page) — replaces the old `DashboardShowcase` screenshot
 * with a live conversion band: a full-bleed dark desk photo carrying an
 * eyebrow / h2 / lead and an inline "Name + Phone -> Initiate Call" form.
 *
 * Deliberately `<h2>`, not `<h1>` — the page's real hero (`Hero.tsx`) stays
 * the h1; this section reuses the display-scale styling locally rather than
 * pulling in `--fs-display` (see InitiateCall.module.css) so the two don't
 * compete for the page's single h1.
 */
export function InitiateCall() {
  return (
    <section className={styles.section} aria-labelledby="initiate-call-title">
      <div className={styles.backdrop}>
        <Image
          src={bg}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          placeholder="blur"
          style={{ objectFit: "cover", objectPosition: "center 42%" }}
        />
        <div className={styles.scrim} />
      </div>

      <div className={`container ${styles.content}`}>
        <Entrance delay={0}>
          <p className={styles.eyebrow}>/ User Information</p>
        </Entrance>

        <Entrance delay={90}>
          <h2 id="initiate-call-title" className={styles.title}>
            Automate your sales calls
            <br className={styles.titleBreak} /> with{" "}
            <span className="accent">human like</span> AI agents
          </h2>
        </Entrance>

        <Entrance delay={180}>
          <p className={styles.lead}>
            Experience 10x faster lead response times, seamless scheduling,
            and higher conversion rates without expanding your call center
            team.
          </p>
        </Entrance>

        <InitiateCallForm />
      </div>
    </section>
  );
}
