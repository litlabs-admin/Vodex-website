import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { NewsFeatured } from "@/components/sections/NewsFeatured";
import { NewsExplorer } from "@/components/sections/NewsExplorer";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { CATEGORIES, getFeaturedPost, getGridPosts } from "@/lib/news";
import newsHeroBg from "@/public/assets/enterprise-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — News",
  description:
    "Press releases, funding milestones, events and features covering Vodex's work in Gen AI voice agents.",
};

/**
 * Built with the Blog page's own components/pattern (SolutionHero →
 * featured card → filterable category grid → EnterpriseBand → FinalCta),
 * per explicit user direction to reuse that design rather than the
 * supplied newsroom mockup's literal layout — the mockup was for rough
 * reference only. See lib/news.ts for the category taxonomy and content
 * status (placeholder, pending real press content).
 */
export default function NewsIndexPage() {
  const featured = getFeaturedPost();
  const gridPosts = getGridPosts();

  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="news-hero-title"
          badgeLabel="Newsroom"
          titleLines={
            <>
              Vodex in the <span className="accent">news</span>
            </>
          }
          lead="Press releases, funding milestones, events and features covering our work in Gen AI voice agents."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={newsHeroBg}
        />
        <NewsFeatured post={featured} />
        <NewsExplorer posts={gridPosts} categories={CATEGORIES} />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
