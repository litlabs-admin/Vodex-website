import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { MailIcon } from "@/components/ui/icons";
import styles from "./InvestorContactBanner.module.css";

/**
 * Copy-adapted from ComplianceDpoBanner.tsx/.module.css (dark banner, sharp
 * corners, mailto pill CTA), extended with a background photo + dark scrim
 * — the reference's own banner is pixel-confirmed flat solid color (like
 * ComplianceDpoBanner), but the user explicitly asked for a scenic
 * background here, so a photo + scrim replaces the donor's flat `--ink`
 * fill. The eyebrow reads "Named Voices" in the reference, the same
 * mismatched placeholder text already found (and fixed) on
 * ComplianceDpoBanner's near-identical banner — fixed here too, to
 * "Partnerships", per explicit user confirmation.
 */
export function InvestorContactBanner() {
  return (
    <section className={styles.section} aria-labelledby="investor-contact-title">
      <div className="container">
        <Entrance className={styles.banner}>
          <Image
            src="/assets/investors-contact-bg.jpg"
            alt=""
            fill
            sizes="(max-width: 1184px) 100vw, 1184px"
            className={styles.bg}
          />
          <div className={styles.content}>
            <p className={styles.eyebrow}>Partnerships</p>
            <h2 id="investor-contact-title" className={styles.title}>
              Questions about <span className="accent">investing</span> in Vodex?
            </h2>
            <p className={styles.lead}>
              Reach out and we&apos;ll get back to you shortly. For partnership and investment
              enquiries, write to us directly.
            </p>
            <Link href="mailto:partnership@vodex.ai" className={styles.cta}>
              <MailIcon />
              partnership@vodex.ai
            </Link>
          </div>
        </Entrance>
      </div>
    </section>
  );
}
