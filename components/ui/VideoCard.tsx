import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import { PlayIcon } from "@/components/ui/icons";
import { formatDate, type Video } from "@/lib/videos";
import styles from "./VideoCard.module.css";

type VideoCardProps = {
  video: Video;
  delay?: number;
};

/**
 * Grid card for the videos listing. Unlike BlogPostCard, this is
 * deliberately NOT a link — there's no real per-video page to send anyone
 * to yet (explicit user instruction: mock content, no actual video this
 * round). The play button and duration badge are visual affordances only,
 * not functional controls.
 */
export function VideoCard({ video, delay = 0 }: VideoCardProps) {
  return (
    <Entrance as="article" delay={delay} className={styles.card}>
      <div className={styles.thumb}>
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
        <span className={styles.duration} aria-hidden="true">
          {video.duration}
        </span>
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{video.category}</p>
        <h3 className={styles.cardTitle}>{video.title}</h3>
        <p className={styles.excerpt}>{video.description}</p>
        <p className={styles.meta}>{formatDate(video.date)}</p>
      </div>
    </Entrance>
  );
}
