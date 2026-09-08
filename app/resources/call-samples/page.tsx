import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { CallSamples } from "@/components/sections/CallSamples";
import { Resources } from "@/components/sections/Resources";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import callSamplesHeroBg from "@/public/assets/debt-collection-hero-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — Call Samples",
  description:
    "Explore real call recordings and see how AI-powered voice agents can transform your business.",
};

/**
 * Composed entirely from existing landing-page sections (CallSamples,
 * Resources) plus the shared EnterpriseBand/FinalCta/Footer, per explicit
 * user direction ("we have sections created on either home page, so we
 * will use those sections, instead") rather than rebuilding new ones to
 * match the reference mockup's copy — see CLAUDE.md §18 for the full
 * reasoning, including why CallSamples keeps its own existing header copy
 * instead of the mockup's (confirmed with the user).
 */
export default function CallSamplesPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="call-samples-hero-title"
          badgeLabel="Call Samples"
          titleLines={
            <>
              Hear Vodex&rsquo;s AI agents in <span className="accent">action</span>
            </>
          }
          lead="Explore real call recordings and see how AI-powered voice agents can transform your business."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={callSamplesHeroBg}
        />
        <CallSamples />
        <Resources />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
