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
import { Faq } from "@/components/sections/Faq";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { PhoneCallIcon, SignalTowerIcon, SparkleIcon } from "@/components/ui/icons";
import solutionHeroBg from "@/public/assets/debt-collection-hero-bg.jpg";
import statBandBg from "@/public/assets/debt-collection-stats-bg.jpg";
import integrationBg from "@/public/assets/debt-collection-integration-bg.jpg";

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
    href: "/solutions/debt-collection#consistent-outreach",
    src: "/assets/why-vodex-1.jpg",
  },
  {
    title: "Operational Scalability",
    description: "Handle high call volumes without increasing manpower.",
    Icon: SignalTowerIcon,
    href: "/solutions/debt-collection#operational-scalability",
    src: "/assets/why-vodex-2.jpg",
  },
  {
    title: "Effortless Compliance",
    description: "Simplified compliance with FDCPA, TCPA and other regulations.",
    Icon: SparkleIcon,
    href: "/solutions/debt-collection#effortless-compliance",
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
    src: "/assets/debt-collection-industry-4.jpg",
  },
  {
    title: "Insurance Collections",
    description: "Lapsed policy reminders and missed premium outreach.",
    src: "/assets/debt-collection-industry-5.jpg",
  },
  {
    title: "Banks & Lending",
    description: "Loan repayment follow-ups and credit card payment reminders.",
    src: "/assets/debt-collection-industry-6.jpg",
  },
];

const INTEGRATION_ITEMS = [
  "API-first, pilot-ready integration",
  "Outcomes written back to your CRM",
  "Audit-ready recordings and transcripts",
];

const BLOG_POSTS = [
  {
    title: "Why Most Agencies Are Stuck Below 25% RPC And What's Actually Working Now",
    href: "/resources/blog",
    src: "/assets/debt-collection-blog-1.jpg",
  },
  {
    title: "Voice AI in Collections for CFPB Compliance and Reduced AHTs",
    href: "/resources/blog",
    src: "/assets/debt-collection-blog-2.jpg",
  },
  {
    title: "How to Automate Promise-to-Pay (PTP) Capture with Voice AI",
    href: "/resources/blog",
    src: "/assets/debt-collection-blog-3.jpg",
  },
];

export const metadata: Metadata = {
  title: "Vodex — AI Voice Agents for Debt Collection",
  description:
    "For payment reminders, overdue follow-ups, and debt recovery, helping you scale collections while staying fully compliant.",
};

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
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
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
