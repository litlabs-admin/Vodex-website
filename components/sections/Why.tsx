import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { Logo } from "@/components/ui/Logo";
import styles from "./Why.module.css";

const SUB_TILES = [
  { caption: "24/7 Voice AI, fine-tuned for business", src: "/assets/why-tile-1.jpg" },
  { caption: "Built for high-volume voice ops", src: "/assets/why-tile-2.jpg" },
  { caption: "Scale workflows, not headcount", src: "/assets/why-tile-3.jpg" },
  { caption: "Talk with context, not just scripts", src: "/assets/why-tile-4.jpg" },
];

export function Why() {
  return (
    <section className={styles.section} aria-labelledby="why-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>
            Why
            <Logo height={16} />
          </p>
          <h2 id="why-title" className={styles.title}>
            Why teams choose
            <br />
            our <span className="accent">GenAI voice agents</span>
          </h2>
          <p className={styles.lead}>
            Not another IVR, not another chatbot — conversational voice AI
            that carries real business outcomes on every call.
          </p>
        </Entrance>

        <Entrance delay={80} className={styles.grid}>
          <div className={styles.mainTile}>
            <div className={styles.mainPhoto}>
              <Image
                src="/assets/why-main.jpg"
                alt="Team collaborating around a document"
                fill
                sizes="(max-width: 820px) 100vw, 555px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.mainCaption}>
              <h3>A Team that never sleep</h3>
              <p>
                Thousands of concurrent conversations, one consistent brand
                voice.
              </p>
            </div>
          </div>

          <div className={styles.subGrid}>
            {SUB_TILES.map(({ caption, src }) => (
              <div key={caption} className={styles.tile}>
                <div className={styles.tilePhoto}>
                  <Image
                    src={src}
                    alt={caption}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 300px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p>{caption}</p>
              </div>
            ))}
          </div>
        </Entrance>
      </div>
    </section>
  );
}
