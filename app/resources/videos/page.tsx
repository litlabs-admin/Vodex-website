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
import { pageMetadata } from "@/lib/seo";
import { BOOK_DEMO_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata({
  title: "Vodex Videos | Insights, Demos & AI in Action",
  description:
    "Discover a collection of Vodex videos, including AI voice agent demos, industry insights, customer success stories, and more",
  path: "/resources/videos",
});

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
          primaryCta={{ label: "Talk To Our Expert", href: BOOK_DEMO_URL }}
          secondaryCta={{ label: "Schedule a Demo", href: BOOK_DEMO_URL }}
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
