import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./WorksWithTools.module.css";

/* Source PNGs were originally an 842x369 canvas per logo with a large
   transparent margin baked in around each mark (and a 1-2px opaque
   border-artifact line on 3 of the 5 files) — using that raw canvas as the
   next/image intrinsic size scaled the invisible padding along with the
   logo, rendering every mark far smaller than intended. Each file has since
   been cropped to its own true content bounding box (plus ~14px padding),
   so intrinsic width/height now vary per logo and must be listed here
   individually rather than assumed uniform. */
const TOOLS = [
  { name: "HubSpot", src: "/assets/tool-hubspot.png", width: 454, height: 148 },
  { name: "HighLevel", src: "/assets/tool-highlevel.png", width: 538, height: 142 },
  { name: "Make", src: "/assets/tool-make.png", width: 464, height: 156 },
  { name: "Twilio", src: "/assets/tool-twilio.png", width: 418, height: 142 },
  { name: "VICIdial", src: "/assets/tool-vicidial.png", width: 646, height: 165 },
];

export function WorksWithTools() {
  return (
    <section className={styles.section} aria-label="Integrations">
      <div className="container">
        <Entrance>
          <p className={styles.heading}>Works with the tools you already run</p>
        </Entrance>

        <Entrance as="ul" delay={90} className={styles.row}>
          {TOOLS.map(({ name, src, width, height }) => (
            <li key={name} className={styles.cell}>
              <Image
                src={src}
                alt={name}
                width={width}
                height={height}
                className={styles.logo}
              />
            </li>
          ))}
        </Entrance>
      </div>
    </section>
  );
}
