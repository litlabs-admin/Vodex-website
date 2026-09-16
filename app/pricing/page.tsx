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
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";
import { PRICING_FAQS } from "@/lib/faqs";
import { BOOK_DEMO_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata({
  title: "Flexible Voice AI Pricing — Only Pay for Connected Calls | Vodex",
  description:
    "Choose from Free, Basic, Growth, Pro, or Enterprise plans. Vodex offers usage-based voice AI pricing to fit every stage of your business.",
  path: "/pricing",
});

/**
 * This page has two confirmed
 * deviations from the reference: the hero badge ("Newsroom" in the
 * reference — a mismatched leftover, replaced with "Pricing"). The pricing
 * cards themselves now carry the previous live site's real two-tier content
 * (Free + Enterprise Plan), replacing the invented 5-tier ladder. The
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
          primaryCta={{ label: "Talk To Our Expert", href: BOOK_DEMO_URL }}
          secondaryCta={{ label: "Schedule a Demo", href: BOOK_DEMO_URL }}
          bgImage={pricingHeroBg}
        />
        <PricingPlans />
        <Faq items={PRICING_FAQS} />
        <JsonLd data={faqPageSchema(PRICING_FAQS)} />
        <ContactOffices />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
