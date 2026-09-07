import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./Resources.module.css";

const POSTS = [
  {
    category: "Debt Collection",
    title: "Why most agencies are stuck below 25% RPC — and what's actually working now",
    excerpt:
      "What thousands of calls taught us about lifting right-party contact rates without burning out collectors.",
    href: "/resources/rpc-rates",
    thumb: "/assets/resources-1.jpg",
  },
  {
    category: "AI & Technology",
    title: "AI Agents vs. IVR: why conversational AI is the better call",
    excerpt:
      "Voice AI doesn't just answer calls — it closes loops, captures outcomes, and keeps you compliant.",
    href: "/resources/ai-vs-ivr",
    thumb: "/assets/resources-2.jpg",
  },
  {
    category: "Voice Technology",
    title: "How AI voice agents are transforming BPOs and contact centers",
    excerpt:
      "Long hold times and repetitive calls are becoming relics of the past. Here's what's replacing them.",
    href: "/resources/bpo-transformation",
    thumb: "/assets/resources-3.jpg",
  },
];

export function Resources() {
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
          {POSTS.map(({ category, title, excerpt, href, thumb }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={thumb}
                  alt={`${category} article thumbnail`}
                  fill
                  sizes="(max-width: 820px) 480px, 380px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <p className={styles.category}>{category}</p>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.excerpt}>{excerpt}</p>
                <hr className={styles.divider} />
                <Link href={href} className={styles.readMore}>
                  Read More
                  <ArrowRight />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
