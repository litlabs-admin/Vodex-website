import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { SolutionIndustries } from "@/components/sections/SolutionIndustries";
import { SolutionWorkflows } from "@/components/sections/SolutionWorkflows";
import { SolutionComparison } from "@/components/sections/SolutionComparison";
import { SolutionResults } from "@/components/sections/SolutionResults";
import { SolutionSecurity } from "@/components/sections/SolutionSecurity";
import { Faq } from "@/components/sections/Faq";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { BankIcon, PhoneCallIcon, SignalTowerIcon } from "@/components/ui/icons";
import solutionHeroBg from "@/public/assets/solution-promise-to-pay-hero-bg.jpg";

const INDUSTRY_CARDS = [
  {
    title: "Debt Collection Firms",
    description:
      "Effectively capture promise-to-pays with timely and compliant payment reminder calls.",
    Icon: BankIcon,
    src: "/assets/promise-to-pay-industries-1.jpg",
  },
  {
    title: "Lending & Financial Services",
    description:
      "Make timely and compliant reminders to capture intent or allow borrowers to negotiate payment terms.",
    Icon: PhoneCallIcon,
    src: "/assets/promise-to-pay-industries-2.jpg",
  },
  {
    title: "Utilities & Telecom",
    description:
      "Reduce missed payments with timely reminders and meaningful capturing of promise-to-pays, with a smooth experience for your customers.",
    Icon: SignalTowerIcon,
    src: "/assets/promise-to-pay-industries-3.jpg",
  },
];

const WORKFLOWS = [
  {
    title: "PTP Capture & Confirmation",
    description:
      "Automate the initial PTP call to understand and capture borrower intent regarding the due payment.",
    src: "/assets/promise-to-pay-workflow-1.jpg",
  },
  {
    title: "PTP Reminder Sequence",
    description:
      "Sensitively craft a planned sequence to create ideal touchpoints to ensure promise-to-pay and reduce missed payments.",
    src: "/assets/promise-to-pay-workflow-2.jpg",
  },
  {
    title: "Missed PTP Recovery",
    description:
      "Initiates a reminder and inquiry call to understand the reason behind the 'broken promise' and offer possible fulfilment options.",
    src: "/assets/promise-to-pay-workflow-3.jpg",
  },
  {
    title: "PTP Update or Reschedule Calls",
    description:
      "Voice AI agents reschedule calls based on the borrower's availability to ensure on-time reminders and consistent CX.",
    src: "/assets/promise-to-pay-workflow-4.jpg",
  },
  {
    title: "SMS & Email Confirmations",
    description:
      "Send a PTP capture confirmation email or SMS to the borrower while helping them stay on the same page as you.",
    src: "/assets/promise-to-pay-workflow-5.jpg",
  },
  {
    title: "PTP Negotiation Paths",
    description:
      "Voice AI agents can handle sensitive payment negotiations with borrowers to create flexibility for the borrower and improve recovery rates.",
    src: "/assets/promise-to-pay-workflow-6.jpg",
  },
];

const RESULTS_STATS = [
  {
    number: "Up to 35%",
    label: "Higher PTP intent rate",
    description:
      "Consistent, compliant calls that surface payment intent on the first conversation.",
  },
  {
    number: "Up to 40%",
    label: "Reduction in missed payments",
    description: "Planned reminder sequences keep every commitment on track.",
  },
  {
    number: "Over 28%",
    label: "Lift in PTP conversions",
    description:
      "Follow-ups, reschedules, and confirmations that never slip through the cracks.",
  },
];

export const metadata: Metadata = {
  title: "Vodex — AI Voice Agents for Promise-to-Pay Capture",
  description:
    "Automated agents that handle payment term negotiations, capture payment-related intent, whether partial or complete, and handle compliance language automatically.",
};

export default function PromiseToPayPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="promise-to-pay-hero-title"
          badgeLabel="Use Case"
          titleLines={
            <>
              Voice AI Agents that Capture
              <br data-hide-mobile /> Payment <span className="accent">Intent</span>
            </>
          }
          lead="Automated agents that handle payment term negotiations, capture payment-related intent, whether partial or complete, and handle compliance language automatically."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={solutionHeroBg}
        />
        <SolutionIndustries
          lead="Any team that lives on borrower commitments can put PTP capture on autopilot."
          cards={INDUSTRY_CARDS}
        />
        <SolutionWorkflows
          lead="Ensure reduced missed payments, a better recovery rate, and improved customer experience for your borrowers."
          workflows={WORKFLOWS}
        />
        <SolutionComparison bgImage="/assets/promise-to-pay-comparison-bg.jpg" />
        <SolutionResults
          lead="Results our clients report when voice AI runs the PTP conversation end to end."
          stats={RESULTS_STATS}
        />
        <SolutionSecurity />
        <Faq />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
