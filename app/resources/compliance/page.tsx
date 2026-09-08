import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { ComplianceCertifications } from "@/components/sections/ComplianceCertifications";
import { ComplianceSecurityPractices } from "@/components/sections/ComplianceSecurityPractices";
import { ComplianceDpoBanner } from "@/components/sections/ComplianceDpoBanner";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import complianceHeroBg from "@/public/assets/debt-collection-hero-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — Compliance & Security",
  description:
    "Vodex is ISO 27001 and SOC 2 Type II certified. Disclosures, calling windows, consent handling, opt-outs, call caps, and audit logging are enforced on every call.",
};

/**
 * See CLAUDE.md §21 for the full reasoning behind this page's build,
 * including the "Named Voices" → "Data Protection" eyebrow correction and
 * the Footer/ResourcesMegaMenu nav-wiring decisions.
 */
export default function CompliancePage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="compliance-hero-title"
          badgeLabel="Compliance & Security"
          titleLines={
            <>
              Every call inside the <span className="accent">rules</span>
            </>
          }
          lead="Vodex is ISO 27001 and SOC 2 Type II certified. Disclosures, calling windows, consent handling, opt-outs, call caps, and audit logging are enforced on every call, so sensitive borrower information stays protected."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={complianceHeroBg}
        />
        <ComplianceCertifications />
        <ComplianceSecurityPractices />
        <ComplianceDpoBanner />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
