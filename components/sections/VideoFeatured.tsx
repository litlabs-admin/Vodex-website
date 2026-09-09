import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { PlayIcon } from "@/components/ui/icons";
import { VideoThumbButton } from "@/components/ui/VideoThumbButton";
import { formatDate } from "@/lib/format-date";
import type { Video } from "@/lib/videos";
import styles from "./VideoFeatured.module.css";

export function VideoFeatured({ video }: { video: Video }) {
  return (
    <section className={styles.section} aria-labelledby="featured-video-title">
      <div className="container">
        <Entrance as="article" className={styles.card}>
          <VideoThumbButton youtubeId={video.youtubeId} title={video.title} className={styles.thumb}>
            <Image
              src={video.thumb}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              style={{ objectFit: "cover" }}
              priority
            />
            <span className={styles.scrim} aria-hidden="true" />
            <span className={styles.playButton} aria-hidden="true">
              <PlayIcon />
            </span>
          </VideoThumbButton>
          <div className={styles.body}>
            <div className={styles.badges}>
              <span className={styles.eyebrow}>Featured</span>
              <span className={styles.category}>{video.category}</span>
            </div>
            <h2 id="featured-video-title" className={styles.title}>
              {video.title}
            </h2>
            <p className={styles.excerpt}>{video.description}</p>
            <p className={styles.meta}>{formatDate(video.date)}</p>
          </div>
        </Entrance>
      </div>
    </section>
  );
}
