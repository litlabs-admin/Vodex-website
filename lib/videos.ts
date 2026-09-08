/**
 * Mock content for /resources/videos — same treatment as lib/blog-posts.ts:
 * a plain typed array, no CMS/repository abstraction, copy invented but
 * grounded in product facts already established elsewhere in this codebase.
 * Per explicit user instruction this round, there's no real video/playback
 * to wire up yet — cards are static (not links), just a play-icon overlay
 * and a duration badge for now.
 *
 * Categories are drawn straight from the hero's own lead copy ("insights,
 * updates, announcements, demos, customer stories, tutorials & podcasts").
 */

export type Video = {
  title: string;
  description: string;
  category: string;
  duration: string;
  date: string;
  thumb: string;
  featured?: boolean;
};

export const VIDEO_CATEGORIES = ["Product Demos", "Customer Stories", "Podcast"] as const;

export const VIDEOS: Video[] = [
  {
    title: "Inside DROS: A Live Walkthrough of the Engagement Operating System",
    description:
      "A full tour of how DROS manages an account queue end to end — verification, re-dial, promise-to-pay capture and compliance, all in one pass.",
    category: "Product Demos",
    duration: "18:24",
    date: "2026-08-20",
    thumb: "/assets/dashboard-mockup.png",
    featured: true,
  },
  {
    title: "Auto Re-Dial in Action: A 5-Minute Product Demo",
    description:
      "Watch attempt-based re-dial scheduling work through a live portfolio, respecting call-frequency limits while lifting right-party contact.",
    category: "Product Demos",
    duration: "5:12",
    date: "2026-08-02",
    thumb: "/assets/action-3.jpg",
  },
  {
    title: "How One Agency Cut Wrong-Party Contact to Near Zero",
    description:
      "A collections operations lead walks through what changed after moving verification to the top of every call.",
    category: "Customer Stories",
    duration: "11:47",
    date: "2026-07-18",
    thumb: "/assets/why-vodex-1.jpg",
  },
  {
    title: "The Future of Voice AI in Collections",
    description:
      "A conversation on where conversational AI is headed in receivables management, and what teams should be building toward now.",
    category: "Podcast",
    duration: "34:09",
    date: "2026-07-05",
    thumb: "/assets/results-bg.jpg",
  },
  {
    title: "Promise-to-Pay Capture, Explained",
    description:
      "How a verbal commitment made mid-call becomes a structured, tracked payment instead of a note buried in a call summary.",
    category: "Product Demos",
    duration: "7:38",
    date: "2026-06-14",
    thumb: "/assets/action-2.jpg",
  },
  {
    title: "Compliance Without the Headache: A Conversation on FDCPA & Reg F",
    description:
      "A practical, non-legalese conversation on what actually changes day-to-day when a voice AI vendor enforces compliance at the call level.",
    category: "Podcast",
    duration: "28:51",
    date: "2026-05-27",
    thumb: "/assets/security-4.jpg",
  },
];

export function getFeaturedVideo(): Video {
  return VIDEOS.find((video) => video.featured) ?? VIDEOS[0];
}

export function getGridVideos(): Video[] {
  const featured = getFeaturedVideo();
  return VIDEOS.filter((video) => video !== featured);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
