import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { ResearchTimeline } from "@/components/sections/ResearchTimeline";
import { ResearchTts } from "@/components/sections/ResearchTts";
import { ResearchVoices } from "@/components/sections/ResearchVoices";
import { ResearchLatency } from "@/components/sections/ResearchLatency";
import { SolutionWorkflows } from "@/components/sections/SolutionWorkflows";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import researchHeroBg from "@/public/assets/results-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — Research & Innovation",
  description:
    "Vodex is an AI-native voice automation company building speech intelligence for real-world, high-stakes conversations in mortgage, insurance, and collections.",
};

/**
 * Reuses `results-bg.jpg` for the hero background per the user's explicit
 * "use any hero bg for now" — a placeholder pending real art, same status
 * as Section 9's placeholder audio elsewhere in this project.
 */
export default function ResearchPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="research-hero-title"
          badgeLabel="Research & Innovation"
          titleLines={
            <>
              Pushing the boundaries of{" "}
              <span className="accent">Voice AI</span>
            </>
          }
          lead="Vodex is an AI-native voice automation company building speech intelligence for real-world, high-stakes conversations in mortgage, insurance, and collections."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={researchHeroBg}
        />
        <ResearchTimeline />
        <ResearchTts />
        <ResearchVoices />
        <ResearchLatency />
        <SolutionWorkflows
          eyebrow="Roadmap"
          heading={
            <>
              What comes <span className="accent">next</span>
            </>
          }
          lead="We draw inspiration from Kyutai (Moshi's full-duplex and MIMI tokenizer work), Snac's neural codecs, Canaophy Labs, Sesame Labs and their CSM stack, and Carson et al. (2025). Agentic voice AI is a long-term mission, and we want company on the road."
          columns={3}
          workflows={[
            {
              title: "Buy Now Pay Later (BNPL)",
              description:
                "Short-term installment collections, payment reminders, failed payment follow-ups and more.",
              src: "/assets/debt-collection-industry-1.png",
            },
            {
              title: "Medical & Healthcare",
              description:
                "HIPAA-compliant patient payment reminders, EOB clarification, and deductible notifications.",
              src: "/assets/debt-collection-industry-2.jpg",
            },
            {
              title: "Buy Here Pay Here (BHPH)",
              description:
                "High-frequency outreach for late payments, reminders, and CPI or confusion clarification.",
              src: "/assets/debt-collection-industry-3.jpg",
            },
          ]}
        />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
