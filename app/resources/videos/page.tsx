import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { VideoFeatured } from "@/components/sections/VideoFeatured";
import { VideoExplorer } from "@/components/sections/VideoExplorer";
import { FinalCta } from "@/components/sections/FinalCta";
import { PlayIcon } from "@/components/ui/icons";
import { VIDEO_CATEGORIES, getFeaturedVideo, getGridVideos } from "@/lib/videos";
import videosHeroBg from "@/public/assets/product-hero-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — Videos & Podcasts",
  description:
    "Check out our latest videos, including insights, updates, announcements, demos, customer stories, tutorials & podcasts.",
};

export default function VideosIndexPage() {
  const featured = getFeaturedVideo();
  const gridVideos = getGridVideos();

  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="videos-hero-title"
          badgeLabel="Videos"
          badgeIcon={PlayIcon}
          titleLines={<>Videos &amp; podcasts</>}
          lead="Check out our latest videos, including insights, updates, announcements, demos, customer stories, tutorials & podcasts."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={videosHeroBg}
        />
        <VideoFeatured video={featured} />
        <VideoExplorer videos={gridVideos} categories={VIDEO_CATEGORIES} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
