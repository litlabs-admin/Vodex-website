"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import styles from "./VideoLightbox.module.css";

type VideoLightboxProps = {
  youtubeId: string;
  title: string;
  onClose: () => void;
};

/**
 * On-page YouTube player, opened from VideoThumbButton. Uses the native
 * <dialog> element rather than a hand-rolled modal — showModal() gives a
 * focus trap, Escape-to-close, background inerting, scroll lock and a
 * ::backdrop for free, consistent with this project's "plain
 * platform features over a library" bias (no dependency was added for
 * this). Only mounted while open (the caller conditionally renders this
 * component), so no YouTube script/iframe ever loads just from viewing the
 * listing page, and closing (unmounting) stops playback outright — no
 * manual pause/teardown needed.
 */
export function VideoLightbox({ youtubeId, title, onClose }: VideoLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    // Fires on Escape too (the browser's own default <dialog> behavior),
    // so this one handler covers every close path and keeps React state in
    // sync with the dialog's own open/closed state.
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClick={handleBackdropClick} aria-label={title}>
      <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()}>
        <span aria-hidden="true">&times;</span>
        <span className="visually-hidden">Close video</span>
      </button>
      <div className={styles.frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </dialog>
  );
}
