import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { Waveform } from "@/components/ui/icons";
import styles from "./SolutionVoiceLayer.module.css";

type Panel = {
  label: string;
  title: string;
  description: string;
  items: string[];
};

type SolutionVoiceLayerProps = {
  eyebrow: string;
  heading: React.ReactNode;
  lead: string;
  left: Panel;
  right: Panel;
  bgImage: string;
};

/**
 * Dark two-panel comparison — left panel solid black, right panel a photo
 * background, each with a label + heading + description + bullet list
 * (Waveform-icon markers, the brand's own glyph, matching the reference's
 * small waveform bullet marks). No "VS" badge — unlike SolutionComparison,
 * the reference has no divider/badge between the two panels here, just a
 * ~32px gap.
 */
export function SolutionVoiceLayer({
  eyebrow,
  heading,
  lead,
  left,
  right,
  bgImage,
}: SolutionVoiceLayerProps) {
  return (
    <section className={styles.section} aria-labelledby="voice-layer-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id="voice-layer-title" className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <Entrance className={styles.band}>
          <div className={styles.grid}>
            <div className={styles.leftPanel}>
              <p className={styles.panelLabel}>{left.label}</p>
              <h3 className={styles.panelTitle}>{left.title}</h3>
              <p className={styles.panelDescription}>{left.description}</p>
              <ul className={styles.list}>
                {left.items.map((item) => (
                  <li key={item}>
                    <Waveform className={styles.waveIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rightPanel}>
              <Image
                src={bgImage}
                alt=""
                fill
                sizes="(max-width: 820px) 100vw, 660px"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.rightContent}>
                <p className={styles.panelLabel}>{right.label}</p>
                <h3 className={styles.panelTitle}>{right.title}</h3>
                <p className={styles.panelDescription}>{right.description}</p>
                <ul className={styles.list}>
                  {right.items.map((item) => (
                    <li key={item}>
                      <Waveform className={styles.waveIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <hr className={styles.divider} />
        </Entrance>
      </div>
    </section>
  );
}
