import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { PlayIcon } from "@/components/ui/icons";
import { VideoThumbButton } from "@/components/ui/VideoThumbButton";
import { formatDate } from "@/lib/format-date";
import type { Video } from "@/lib/videos";
import styles from "./VideoCard.module.css";

type VideoCardProps = {
  video: Video;
  delay?: number;
};

/**
 * Grid card for the videos listing. Every migrated video is a real,
 * published YouTube video (see lib/videos.ts) — clicking the thumbnail now
 * opens it in an on-page lightbox (VideoThumbButton + VideoLightbox)
 * instead of the decorative, non-interactive play icon this card shipped
 * with when there was no real video to link to. Webflow's videos
 * collection has no duration field, so that badge is gone too.
 */
export function VideoCard({ video, delay = 0 }: VideoCardProps) {
  return (
    <Entrance as="article" delay={delay} className={styles.card}>
      <VideoThumbButton youtubeId={video.youtubeId} title={video.title} className={styles.thumb}>
        <Image
          src={video.thumb}
          alt=""
          fill
          sizes="(max-width: 820px) 480px, 380px"
          style={{ objectFit: "cover" }}
        />
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.playButton} aria-hidden="true">
          <PlayIcon />
        </span>
      </VideoThumbButton>
      <div className={styles.body}>
        <p className={styles.category}>{video.category}</p>
        <h3 className={styles.cardTitle}>{video.title}</h3>
        <p className={styles.excerpt}>{video.description}</p>
        <p className={styles.meta}>{formatDate(video.date)}</p>
      </div>
    </Entrance>
  );
}
