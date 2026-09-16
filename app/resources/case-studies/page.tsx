import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { CaseStudyFeatured } from "@/components/sections/CaseStudyFeatured";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { getFeaturedCaseStudy, getGridCaseStudies } from "@/lib/case-studies";
import caseStudiesHeroBg from "@/public/assets/solution-payment-reminders-hero-bg.jpg";
import { pageMetadata } from "@/lib/seo";
import { BOOK_DEMO_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata({
  title: "Vodex Case Studies | AI Voice Agents Driving Business Success",
  description:
    "How businesses leverage Vodex’s AI voice agents to streamline operations, enhance engagement, and scale effortlessly while staying compliant.",
  path: "/resources/case-studies",
});

/**
 * Built "like the blog page" per explicit user direction — dedicated
 * CaseStudyFeatured/CaseStudyGrid components (new, not the shared
 * FeaturedCaseStudy/Resources sections) rather than reusing or editing the
 * landing page's existing sections.
 */
export default function CaseStudiesPage() {
  const featured = getFeaturedCaseStudy();
  const gridStudies = getGridCaseStudies();

  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="case-studies-hero-title"
          badgeLabel="Case Studies"
          titleLines={
            <>
              Case studies that showcase our <span className="accent">impact</span>
            </>
          }
          lead="How collections teams and enterprises use Vodex AI voice agents to recover more, connect more, and spend less per contact."
          primaryCta={{ label: "Talk To Our Expert", href: BOOK_DEMO_URL }}
          secondaryCta={{ label: "Schedule a Demo", href: BOOK_DEMO_URL }}
          bgImage={caseStudiesHeroBg}
        />
        <CaseStudyFeatured study={featured} />
        <CaseStudyGrid studies={gridStudies} />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
