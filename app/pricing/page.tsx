import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ContactOffices } from "@/components/sections/ContactOffices";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import pricingHeroBg from "@/public/assets/collection-software-hero-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — Pricing",
  description:
    "No commitments to get started. Enterprise plans are available for teams with advanced requirements.",
};

/* Pricing-specific FAQs, passed as a prop so the shared `Faq` component's
   default set (used on every other page) is untouched. */
const PRICING_FAQS: FaqItem[] = [
  {
    question: "What factors affect the cost of Vodex's AI voice agent solutions?",
    answer:
      "Pricing is based on call volume (the number of AI-powered outbound and inbound calls), use case (lead qualification, debt collection, appointment scheduling, customer support, etc.) and integration requirements (CRM, payment gateways, or third-party systems).",
  },
  {
    question: "Will I be charged for unanswered or unconnected calls?",
    answer:
      "Calling minutes only include connected calls — if the call is not connected, you won't be charged. Extra minutes are billed at $0.13/min.",
  },
  {
    question: "Are there any setup costs or hidden fees?",
    answer:
      "Vodex provides transparent pricing with no hidden fees. Depending on the complexity of integrations or specific requirements, a setup cost may apply, which will be outlined during the consultation.",
  },
  {
    question: "Is Vodex's pricing usage-based or subscription-based?",
    answer:
      "Vodex offers flexible pricing models, including pay-per-usage and subscription plans. Our team will recommend the best pricing structure based on your business goals and call volume.",
  },
  {
    question: "How long does it take to set up Vodex's AI voice agents?",
    answer:
      "Setup time depends on the complexity of integrations and customization needed. Most businesses can get started within a few days to a few weeks, depending on the scale of deployment.",
  },
  {
    question: "How does Vodex compare to traditional call centers in terms of cost?",
    answer:
      "AI voice agents can significantly reduce costs by automating high-volume calls without requiring large human teams. Compared to traditional call centers, Vodex helps businesses save on hiring, training, and operational overhead while improving efficiency.",
  },
  {
    question: "Is Vodex's AI secure and compliant with industry standards?",
    answer:
      "Yes — Vodex is SOC 2, ISO 27001 and HIPAA certified, ensuring the highest standards of information security, data protection and regulatory compliance. Our AI voice agents are designed to meet strict security protocols while adhering to industry-specific regulations like FDCPA, TCPA and more.",
  },
];

/**
 * See CLAUDE.md §23 for the full reasoning behind this page's two confirmed
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
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={pricingHeroBg}
        />
        <PricingPlans />
        <Faq items={PRICING_FAQS} />
        <ContactOffices />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
