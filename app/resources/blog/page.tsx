import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { BlogFeaturedPost } from "@/components/sections/BlogFeaturedPost";
import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { FinalCta } from "@/components/sections/FinalCta";
import { CATEGORIES, getFeaturedPost, getGridPosts } from "@/lib/blog-posts";
import blogHeroBg from "@/public/assets/blog-hero-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — Blog",
  description:
    "Field notes from thousands of AI-run conversations. Collections, compliance, and the future of voice.",
};

export default function BlogIndexPage() {
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
          headingId="blog-hero-title"
          badgeLabel="Blog"
          titleLines={
            <>
              The latest voice <span className="accent">AI insights</span>, news &amp; thought
              leadership
            </>
          }
          lead="Field notes from thousands of AI-run conversations. Collections, compliance, and the future of voice."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={blogHeroBg}
        />
        <BlogFeaturedPost post={featured} />
        <BlogExplorer posts={gridPosts} categories={CATEGORIES} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
