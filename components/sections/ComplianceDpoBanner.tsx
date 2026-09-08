import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { MailIcon } from "@/components/ui/icons";
import styles from "./ComplianceDpoBanner.module.css";

/**
 * ⚠️ The PDF's own eyebrow for this banner literally reads "Named Voices" —
 * a leftover Figma-template label with no plausible connection to a data-
 * protection contact section (unlike every other mismatched eyebrow already
 * found on the Solutions pages, which were at least generic enough to leave
 * verbatim). Corrected to "Data Protection" per explicit user confirmation
 * rather than reproduced, same treatment as the "Benifit" → "Benefit" typo
 * fix documented elsewhere in this project.
 */
export function ComplianceDpoBanner() {
  return (
    <section className={styles.section} aria-labelledby="compliance-dpo-title">
      <div className="container">
        <Entrance className={styles.banner}>
          <p className={styles.eyebrow}>Data Protection</p>
          <h2 id="compliance-dpo-title" className={styles.title}>
            Data protection <span className="accent">questions</span>
          </h2>
          <p className={styles.lead}>
            Questions about how Vodex handles personal data, retention, or your rights under
            privacy law go straight to our Data Protection Officer.
          </p>
          <Link href="mailto:dpo@vodex.ai" className={styles.cta}>
            <MailIcon />
            dpo@vodex.ai
          </Link>
        </Entrance>
      </div>
    </section>
  );
}
