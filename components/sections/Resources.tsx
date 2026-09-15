import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight, ExternalLinkIcon } from "@/components/ui/icons";
import { resolveResources, type ResourceRef } from "@/lib/resource-refs";
import styles from "./Resources.module.css";

/** Landing page default — real posts, see lib/resource-refs.ts. */
const DEFAULT_ITEMS: ResourceRef[] = [
  { type: "blog", slug: "how-voice-ai-can-finally-move-your-right-party-contact-above-30" },
  { type: "blog", slug: "ai-agents-vs-ivr-why-conversational-ai-is-the-better-call" },
  { type: "blog", slug: "how-ai-voice-agents-are-transforming-bpos-and-contact-centers" },
];

type ResourcesProps = {
  items?: ResourceRef[];
};

export function Resources({ items = DEFAULT_ITEMS }: ResourcesProps) {
  const resources = resolveResources(items);

  return (
    <section className={styles.section} aria-labelledby="resources-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Resources</p>
          <h2 id="resources-title" className={styles.title}>
            Insights &amp; updates
          </h2>
          <p className={styles.lead}>
            Field notes from thousands of AI-run conversations — on
            collections, compliance, and the future of voice.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {resources.map((r, i) => (
            // Entrance gates the reveal on an outer wrapper; the hover lift
            // lives on the inner card so `rise`'s fill mode can't pin its
            // transform.
            <Entrance key={r.key} delay={i * 70} className={styles.cardWrap}>
              <article className={styles.card}>
                <div className={styles.thumb} data-fit={r.thumbFit}>
                  <Image
                    src={r.thumb}
                    alt=""
                    fill
                    sizes="(max-width: 820px) 480px, 380px"
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
                      {r.external && <span className="visually-hidden"> (opens in a new tab)</span>}
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
    </section>
  );
}
