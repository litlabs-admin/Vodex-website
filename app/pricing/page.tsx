import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { Faq } from "@/components/sections/Faq";
import { ContactOffices } from "@/components/sections/ContactOffices";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import pricingHeroBg from "@/public/assets/collection-software-hero-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — Pricing",
  description:
    "No commitments to get started. Enterprise plans are available for teams with advanced requirements.",
};

/**
 * See CLAUDE.md §23 for the full reasoning behind this page's two confirmed
 * deviations from the reference: the hero badge ("Newsroom" in the
 * reference — a mismatched leftover, replaced with "Pricing") and the
 * pricing cards' feature checklist (generic website-builder copy in the
 * reference, rewritten with real Vodex-grounded features per tier). The
 * Offices section reuses `<ContactOffices />` verbatim (built moments
 * earlier for `/company/contact`) rather than a new component — same
 * eyebrow/heading/lead/office data/contact line, confirmed by screenshot
 * comparison, not just matching text.
 */
export default function PricingPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="pricing-hero-title"
          badgeLabel="Pricing"
          titleLines={
            <>
              Only pay for <span className="accent">connected</span> calls
            </>
          }
          lead="No commitments to get started. Enterprise plans are available for teams with advanced requirements."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={pricingHeroBg}
        />
        <PricingPlans />
        <Faq />
        <ContactOffices />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
