import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { FaqTopics } from "@/components/sections/FaqTopics";
import { FaqHumanSupport } from "@/components/sections/FaqHumanSupport";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import faqHeroBg from "@/public/assets/results-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — FAQ",
  description:
    "Everything you need to know about putting GenAI voice agents to work, from platform basics to collections-specific compliance, performance, and pricing.",
};

/**
 * See CLAUDE.md §20 for the full reasoning behind this page's three
 * confirmed deviations from the reference PDF: mock/placeholder FAQ copy
 * (kept generic per explicit user direction, not rewritten like the
 * landing page's own FAQ), functional category tabs replacing the PDF's
 * content-type tabs (Overview/Tutorials/Product/Podcasts & Interviews →
 * Overview/Product/Compliance & Security/Pricing), and the Help Center
 * card's link text fixed from a mismatched "Medical & Healthcare →".
 */
export default function FaqPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="faq-hero-title"
          badgeLabel="Compliance & Security"
          titleLines={
            <>
              Frequently asked <span className="accent">questions</span>
            </>
          }
          lead="Everything you need to know about putting GenAI voice agents to work, from platform basics to collections-specific compliance, performance, and pricing."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={faqHeroBg}
        />
        <FaqTopics />
        <FaqHumanSupport />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
