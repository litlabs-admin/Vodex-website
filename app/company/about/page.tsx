import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { AboutStats } from "@/components/sections/AboutStats";
import { AboutMissionVision } from "@/components/sections/AboutMissionVision";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { AboutLeadership } from "@/components/sections/AboutLeadership";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import aboutHeroBg from "@/public/assets/about-hero-bg.jpg";
import aboutVisionBg from "@/public/assets/about-vision-bg.jpg";
import aboutLocationUsa from "@/public/assets/about-location-usa.jpg";
import aboutLocationIndia from "@/public/assets/about-location-india.jpg";

export const metadata: Metadata = {
  title: "Vodex — About",
  description:
    "The team behind Vodex's Gen AI voice agents — our mission, story, leadership, and offices.",
};

/**
 * Reference hero is pixel-confirmed flat #000000 with no photo, but the
 * user asked for a photo background instead — this deliberately deviates
 * from the PDF (see CLAUDE.md's About page section for the full reasoning).
 * The Locations section (2nd AboutMissionVision usage below) also replaces
 * the PDF's literal eyebrow/heading, which duplicates the Mission/Vision
 * section's copy verbatim over unrelated office-address content — a
 * confirmed Figma copy-paste artifact, not reproduced.
 */
export default function AboutPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="about-hero-title"
          badgeLabel="About"
          titleLines={
            <>
              The team behind the <span className="accent">voice</span>
            </>
          }
          lead="Vodex was born from a clear realization: traditional outreach methods were holding businesses back. The founders saw potential in using Gen AI for improved communication, creating a platform that redefines how businesses handle their outbound and inbound communication."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={aboutHeroBg}
        />
        <AboutStats />
        <AboutMissionVision
          headingId="about-mission-vision-title"
          eyebrow="Why we exist"
          heading={
            <>
              Our mission and <span className="accent">vision</span>
            </>
          }
          lead="The platform drives intelligent, personalized conversations, empowering businesses to scale outbound and inbound calls with ease."
          cards={[
            {
              title: "Mission",
              description:
                "Empower businesses with innovative, Gen AI-powered agents that automate conversations to drive growth while optimizing costs and resources.",
              href: "/company/about#mission",
              background: "solid",
            },
            {
              title: "Vision",
              description:
                "Lead the future of Gen AI driven voice solutions, empowering businesses to maximize their potential and streamline their processes.",
              href: "/company/about#vision",
              background: "image",
              bgImage: aboutVisionBg,
            },
          ]}
        />
        <AboutTimeline />
        <AboutLeadership />
        <AboutMissionVision
          headingId="about-locations-title"
          eyebrow="Where we are"
          heading={
            <>
              Our global <span className="accent">offices</span>
            </>
          }
          lead="Vodex operates across two continents, combining engineering depth in India with go-to-market reach in the United States."
          cards={[
            {
              title: "USA",
              description: "Vodex AI Inc, 8 The Green, Dover, DE 19901, USA",
              href: "/contact",
              background: "image",
              bgImage: aboutLocationUsa,
              bgAlt: "United States flag",
            },
            {
              title: "India",
              description:
                "WeWork, Salarpuria Symbiosis, Arakere Bannerghatta Rd, Bengaluru, KA 560076, India",
              href: "/contact",
              background: "image",
              bgImage: aboutLocationIndia,
              bgAlt: "India flag",
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
