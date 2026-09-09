"use client";

import { useState, type ReactNode } from "react";
import { VideoLightbox } from "@/components/ui/VideoLightbox";

type VideoThumbButtonProps = {
  youtubeId: string;
  title: string;
  className?: string;
  children: ReactNode;
};

/**
 * Shared "click a thumbnail, open the video in an on-page lightbox"
 * mechanism, used by both VideoCard (grid) and VideoFeatured (the large
 * hero card) — the two differ in thumb size/CSS, so this only owns the
 * interactive state + dialog, and renders the caller's own thumb markup
 * (image, scrim, play icon) as `children` inside a real <button> instead
 * of the `aria-hidden` decorative play icon those two used to render.
 */
export function VideoThumbButton({ youtubeId, title, className, children }: VideoThumbButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        aria-haspopup="dialog"
        aria-label={`Play video: ${title}`}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      {open && <VideoLightbox youtubeId={youtubeId} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}
