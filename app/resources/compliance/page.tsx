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
import { pageMetadata } from "@/lib/seo";
import { BOOK_DEMO_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata({
  title: "Vodex Compliance & Security",
  description:
    "Our SOC 2 and ISO 27001 certifications ensure data protection, privacy, and regulatory adherence for every interaction.",
  path: "/resources/compliance",
});

/**
 * Notable decisions: the reference's "Named Voices" eyebrow is corrected to
 * "Data Protection", and the page is linked from both the Footer and the
 * Resources mega-menu.
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
          primaryCta={{ label: "Talk To Our Expert", href: BOOK_DEMO_URL }}
          secondaryCta={{ label: "Schedule a Demo", href: BOOK_DEMO_URL }}
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
