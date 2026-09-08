import Image from "next/image";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./SolutionIntegrationSteps.module.css";

type Step = {
  title: string;
  description: string;
  src: string;
};

type Closing = {
  text: string;
  linkText: string;
  href: string;
};

type SolutionIntegrationStepsProps = {
  eyebrow: string;
  heading: React.ReactNode;
  lead: string;
  steps: Step[];
  closing?: Closing;
};

/**
 * Light 4-card grid — copy-adapted from WhyItWorks (photo + light body +
 * title/description/divider/Read More, no icon), plus an optional closing
 * cross-sell line matching SolutionIndustries' pattern.
 */
export function SolutionIntegrationSteps({
  eyebrow,
  heading,
  lead,
  steps,
  closing,
}: SolutionIntegrationStepsProps) {
  return (
    <section className={styles.section} aria-labelledby="integration-steps-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id="integration-steps-title" className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <div className={styles.grid}>
          {steps.map(({ title, description, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <hr className={styles.divider} />
                <Link href="/solutions" className={styles.readMore}>
                  Read More
                  <ArrowRight />
                </Link>
              </div>
            </Entrance>
          ))}
        </div>

        {closing && (
          <Entrance className={styles.closing}>
            <p>
              {closing.text}{" "}
              <Link href={closing.href} className={styles.closingLink}>
                {closing.linkText}
              </Link>
            </p>
          </Entrance>
        )}
      </div>
    </section>
  );
}
