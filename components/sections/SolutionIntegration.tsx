import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { Button } from "@/components/ui/Button";
import styles from "./SolutionIntegration.module.css";

type SolutionIntegrationProps = {
  eyebrow: string;
  titleLines: [string, string];
  lead: string;
  cta: { label: string; href: string };
  items: string[];
  bgImage: Parameters<typeof Image>[0]["src"];
};

export function SolutionIntegration({
  eyebrow,
  titleLines,
  lead,
  cta,
  items,
  bgImage,
}: SolutionIntegrationProps) {
  return (
    <section className={styles.section} aria-labelledby="integration-title">
      <div className="container">
        <Entrance className={styles.banner}>
          <Image src={bgImage} alt="" fill sizes="1327px" className={styles.bg} />
          <p className={styles.eyebrow}>{eyebrow}</p>

          <div className={styles.grid}>
            <div>
              <h2 id="integration-title" className={styles.title}>
                {titleLines[0]}
                <br />
                {titleLines[1]}
              </h2>
              <p className={styles.lead}>{lead}</p>
              <Button href={cta.href} size="sm" withArrow className={styles.cta}>
                {cta.label}
              </Button>
            </div>

            <ul className={styles.list}>
              {items.map((item) => (
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
