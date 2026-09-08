import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { InvestorTimeline } from "@/components/sections/InvestorTimeline";
import { InvestorLogoRow } from "@/components/sections/InvestorLogoRow";
import { InvestorContactBanner } from "@/components/sections/InvestorContactBanner";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import investorsHeroBg from "@/public/assets/investors-hero-bg.jpg";
import unicornLogo from "@/public/assets/investor-unicorn-india-ventures.png";
import pentathlonLogo from "@/public/assets/investor-pentathlon-ventures.png";
import oneHundredXLogo from "@/public/assets/investor-100x.png";
import googleCloudLogo from "@/public/assets/partner-google-cloud.png";
import mongodbLogo from "@/public/assets/partner-mongodb.png";
import krispLogo from "@/public/assets/partner-krisp.png";

export const metadata: Metadata = {
  title: "Vodex — Investors & Partners",
  description:
    "The investors backing Vodex and the technology partners behind every Vodex voice conversation.",
};

/**
 * Reference hero is pixel-confirmed flat #000000 with no photo, and the
 * "Questions about investing" banner below is pixel-confirmed flat solid
 * color too — but the user explicitly asked for scenic backgrounds in both
 * spots, so both deliberately deviate from the reference (same precedent
 * already set on the About page's hero). The hero badge reads "Newsroom" in
 * the reference (a leftover from the News page mockup) — built as
 * "Investors" per explicit user confirmation. Google Cloud / MongoDB /
 * Krisp logos are official brand assets fetched from each company's public
 * brand/press resources (no usable asset was supplied — the reference only
 * shows faint outline placeholders), per explicit user confirmation.
 */
export default function InvestorsPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="investors-hero-title"
          badgeLabel="Investors"
          titleLines={
            <>
              Growing <span className="accent">together</span> with Vodex
            </>
          }
          lead="Together with our partners, we're shaping a future of growth, efficiency, and innovation powered by Gen AI-driven solutions."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={investorsHeroBg}
        />
        <InvestorTimeline />
        <InvestorLogoRow
          headingId="investors-backers-title"
          eyebrow="Backers"
          heading={
            <>
              Meet our <span className="accent">investors</span>
            </>
          }
          lead="Unicorn India Ventures and Pentathlon Ventures led our $2M seed round."
          logos={[
            { name: "Unicorn India Ventures", src: unicornLogo, width: 614, height: 254 },
            { name: "Pentathlon Ventures", src: pentathlonLogo, width: 636, height: 191 },
            { name: "100X", src: oneHundredXLogo, width: 516, height: 175 },
          ]}
        />
        <InvestorLogoRow
          headingId="investors-tech-partners-title"
          eyebrow="Technology"
          heading={
            <>
              Our tech <span className="accent">partners</span>
            </>
          }
          lead="The infrastructure and audio partners behind every Vodex conversation."
          logos={[
            { name: "Google Cloud", src: googleCloudLogo, width: 724, height: 112 },
            { name: "MongoDB", src: mongodbLogo, width: 1113, height: 300 },
            { name: "Krisp", src: krispLogo, width: 704, height: 328 },
          ]}
        />
        <InvestorContactBanner />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
