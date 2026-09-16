import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { SolutionStatBand } from "@/components/sections/SolutionStatBand";
import { SolutionCertRow } from "@/components/sections/SolutionCertRow";
import { SolutionWhyUs } from "@/components/sections/SolutionWhyUs";
import { SolutionWorkflows } from "@/components/sections/SolutionWorkflows";
import { SolutionIntegration } from "@/components/sections/SolutionIntegration";
import { SolutionBlogCards } from "@/components/sections/SolutionBlogCards";
import type { ResourceRef } from "@/lib/resource-refs";
import { Faq } from "@/components/sections/Faq";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { PhoneCallIcon, SignalTowerIcon, SparkleIcon } from "@/components/ui/icons";
import solutionHeroBg from "@/public/assets/debt-collection-hero-bg.jpg";
import statBandBg from "@/public/assets/case-study-bg.jpg";
import integrationBg from "@/public/assets/case-study-featured-bg.jpg";
import { pageMetadata } from "@/lib/seo";
import { BOOK_DEMO_URL } from "@/lib/links";

const STATS = [
  { number: "3X", label: "Debt recovery rate improvement" },
  { number: "7X", label: "Connect rate improvement" },
];

const WHY_CARDS = [
  {
    title: "Consistent Outreach",
    description:
      "Maintain regular contact with debtors through automated calls, reducing human errors.",
    Icon: PhoneCallIcon,
    src: "/assets/feature-4.jpg",
  },
  {
    title: "Operational Scalability",
    description: "Handle high call volumes without increasing manpower.",
    Icon: SignalTowerIcon,
    src: "/assets/feature-1.jpg",
  },
  {
    title: "Effortless Compliance",
    description: "Simplified compliance with FDCPA, TCPA and other regulations.",
    Icon: SparkleIcon,
    src: "/assets/why-vodex-3.jpg",
  },
];

const INDUSTRIES = [
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
  {
    title: "Credit Card Payments",
    description: "Delinquency recovery and payment plan negotiation.",
    src: "/assets/action-1.jpg",
  },
  {
    title: "Insurance Collections",
    description: "Lapsed policy reminders and missed premium outreach.",
    src: "/assets/debt-collection-industry-5.jpg",
  },
  {
    title: "Banks & Lending",
    description: "Loan repayment follow-ups and credit card payment reminders.",
    src: "/assets/industries-banks.jpg",
  },
];

const INTEGRATION_ITEMS = [
  "API-first, pilot-ready integration",
  "Outcomes written back to your CRM",
  "Audit-ready recordings and transcripts",
];

const BLOG_POSTS: ResourceRef[] = [
  { type: "blog", slug: "how-voice-ai-can-finally-move-your-right-party-contact-above-30" },
  { type: "blog", slug: "voice-ai-in-collections-for-cfpb-compliance-and-reduced-ahts" },
  { type: "blog", slug: "how-to-automate-promise-to-pay-ptp-capture-with-voice-ai" },
];

export const metadata: Metadata = pageMetadata({
  title: "AI Voice Agents for Debt Collection | FDCPA, TCPA, CFPB Compliant",
  description:
    "Recover debt faster with Vodex FDCPA/TCPA-compliant AI voice agents. Automate payment reminders, follow-ups and collections 24/7 — audit-ready and scalable.",
  path: "/solutions/debt-collection",
});

export default function DebtCollectionPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="debt-collection-hero-title"
          badgeLabel="Use Case"
          titleLines={
            <>
              AI Voice Agents for <span className="accent">Debt Collection</span>
            </>
          }
          lead="For payment reminders, overdue follow-ups, and debt recovery, helping you scale collections while staying fully compliant."
          primaryCta={{ label: "Talk To Our Expert", href: BOOK_DEMO_URL }}
          secondaryCta={{ label: "Schedule a Demo", href: BOOK_DEMO_URL }}
          bgImage={solutionHeroBg}
        />
        <SolutionStatBand bgImage={statBandBg} stats={STATS} />
        <SolutionCertRow />
        <SolutionWhyUs
          heading={
            <>
              Built for <span className="accent">collections</span> teams
            </>
          }
          lead="Conversational quality on the surface, serious infrastructure underneath."
          cards={WHY_CARDS}
        />
        <SolutionWorkflows
          eyebrow="Industries"
          heading={
            <>
              One platform, every <span className="accent">portfolio</span>
            </>
          }
          lead="Ensure reduced missed payments, a better recovery rate, and improved customer experience for your borrowers."
          workflows={INDUSTRIES}
        />
        <SolutionIntegration
          eyebrow="Collections software integration"
          titleLines={["Already running", "a receivables platform?"]}
          lead="Vodex plugs into your existing collections software via API. Run payment reminders, capture promises-to-pay, and write outcomes straight back to your platform."
          cta={{ label: "Learn More About Integrations", href: "/solutions/collection-software" }}
          items={INTEGRATION_ITEMS}
          bgImage={integrationBg}
        />
        <Faq />
        <SolutionBlogCards
          lead="Playbooks and field notes on running compliant, high-recovery collections with voice AI."
          posts={BLOG_POSTS}
        />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
