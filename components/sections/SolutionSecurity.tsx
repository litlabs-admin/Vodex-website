import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight, ExternalLinkIcon } from "@/components/ui/icons";
import { resolveResources, type ResourceRef } from "@/lib/resource-refs";
import styles from "./SolutionSecurity.module.css";

/** Shared closing card — the certifications page, not a post. */
export const COMPLIANCE_PAGE_REF: ResourceRef = {
  type: "page",
  href: "/resources/compliance",
  title: "ISO 27001, SOC 2, and HIPAA compliant",
  excerpt:
    "The certifications, frameworks and security practices behind every Vodex conversation.",
  category: "Compliance",
  thumb: "/assets/security-4.jpg",
};

type SolutionSecurityProps = {
  /** Real resources by slug, chosen per solution page. */
  items: ResourceRef[];
};

/**
 * "Security & Compliance" resource grid on the solutions pages. Each card is
 * a real resource (post, video, news, or the compliance page) with a short
 * gist — card shape copy-adapted from Resources.tsx, kept to 4 columns in
 * the 1327px band.
 */
export function SolutionSecurity({ items }: SolutionSecurityProps) {
  const resources = resolveResources(items);

  return (
    <section className={styles.section} aria-labelledby="security-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Resources</p>
          <h2 id="security-title" className={styles.title}>
            Security &amp; <span className="accent">Compliance</span>
          </h2>
          <p className={styles.lead}>
            Every reminder call runs inside the guardrails your compliance
            team expects.
          </p>
        </Entrance>

        <div className={styles.band}>
          <div className={styles.grid}>
            {resources.map((r, i) => (
              // Outer Entrance gates the reveal; the inner card owns the
              // hover lift, so `rise`'s fill mode can't pin its transform.
              <Entrance key={r.key} delay={i * 60} className={styles.cardWrap}>
                <article className={styles.card}>
                  <div className={styles.thumb} data-fit={r.thumbFit}>
                    <Image
                      src={r.thumb}
                      alt=""
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 322px"
                      style={{ objectFit: r.thumbFit === "logo" ? "scale-down" : "cover" }}
                    />
                  </div>
                  <div className={styles.body}>
                    <p className={styles.category}>{r.category}</p>
                    <h3 className={styles.cardTitle}>
                      <Link
                        href={r.href}
                        className={styles.titleLink}
                        {...(r.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {r.title}
                        {r.external && (
                          <span className="visually-hidden"> (opens in a new tab)</span>
                        )}
                      </Link>
                    </h3>
                    <p className={styles.excerpt}>{r.excerpt}</p>
                    <hr className={styles.divider} />
                    <span className={styles.readMore} aria-hidden="true">
                      Read More
                      {r.external ? <ExternalLinkIcon /> : <ArrowRight />}
                    </span>
                  </div>
                </article>
              </Entrance>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
