import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { SolutionIntegrationSteps } from "@/components/sections/SolutionIntegrationSteps";
import { SolutionVoiceLayer } from "@/components/sections/SolutionVoiceLayer";
import { SolutionIndustries } from "@/components/sections/SolutionIndustries";
import { SolutionWorkflows } from "@/components/sections/SolutionWorkflows";
import { SolutionImpact } from "@/components/sections/SolutionImpact";
import { SolutionCompliance } from "@/components/sections/SolutionCompliance";
import { Faq } from "@/components/sections/Faq";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import {
  BankIcon,
  PhoneCallIcon,
  SignalTowerIcon,
  ShieldCheckIcon,
  CheckIcon,
} from "@/components/ui/icons";
import solutionHeroBg from "@/public/assets/collection-software-hero-bg.jpg";

const STEPS = [
  {
    title: "Plug in via API",
    description:
      "Connect Vodex to your collections platform through APIs and webhooks, or start a pilot with a simple CSV upload.",
    src: "/assets/collection-software-step-1.jpg",
  },
  {
    title: "Configure flows",
    description:
      "Set scripts, disclosures, intents, routing rules, and pacing so every call follows your business logic.",
    src: "/assets/collection-software-step-2.jpg",
  },
  {
    title: "Launch campaigns",
    description:
      "Run payment reminders, promise-to-pay capture, and right-party contact campaigns from your existing account data.",
    src: "/assets/collection-software-step-3.jpg",
  },
  {
    title: "Sync outcomes back",
    description:
      "Call outcomes and transcripts are written back to your platform via API, webhook, or downloadable CSV. Everything stays audit-ready.",
    src: "/assets/collection-software-step-4.jpg",
  },
];

const CAPABILITY_CARDS = [
  {
    title: "Debt Collection Firms",
    description:
      "Effectively capture promise-to-pays with timely and compliant payment reminder calls.",
    Icon: BankIcon,
    src: "/assets/collection-software-capability-1.jpg",
  },
  {
    title: "Lending & Financial Services",
    description:
      "Make timely and compliant reminders to capture intent or allow borrowers to negotiate payment terms.",
    Icon: PhoneCallIcon,
    src: "/assets/collection-software-capability-2.jpg",
  },
  {
    title: "Utilities & Telecom",
    description:
      "Reduce missed payments with timely reminders and meaningful capturing of promise-to-pays, with a smooth experience for your customers.",
    Icon: SignalTowerIcon,
    src: "/assets/collection-software-capability-3.jpg",
  },
];

const WORKFLOWS = [
  {
    title: "Payment Reminders",
    description:
      "Automated reminder calls before and after due dates, with every outcome logged back to your platform.",
    src: "/assets/collection-software-workflow-1.jpg",
  },
  {
    title: "Promise to Pay Capture",
    description:
      "Capture PTP commitments with the required disclosures, then schedule follow-ups automatically.",
    src: "/assets/collection-software-step-2.jpg",
  },
  {
    title: "Right Party Contact",
    description:
      "Verify identity before any account discussion so every conversation stays compliant.",
    src: "/assets/collection-software-workflow-3.jpg",
  },
  {
    title: "Dispute Triage",
    description:
      "Log disputes, tag the account, and route complex cases to your human agents.",
    src: "/assets/collection-software-workflow-4.jpg",
  },
];

const IMPACT_GROUPS = [
  {
    label: "For banks, agencies & lenders",
    stats: [
      { number: "40%+", label: "Faster recovery on overdue accounts" },
      { number: "95%", label: "Automation in outbound and inbound calls" },
      { number: "30%+", label: "Reduction in missed follow-ups" },
    ],
  },
  {
    label: "For software providers",
    stats: [
      { number: "3–5×", label: "Stickier adoption" },
      { number: "25%", label: "Uplift in retention" },
      { number: "40%", label: "Increase in ARPU" },
    ],
  },
];

const COMPLIANCE_ITEMS = [
  { label: "Script locking & audit trails" },
  { label: "Consent capture before every call", Icon: CheckIcon },
  { label: "TCPA, FDCPA & Reg F guardrails", Icon: ShieldCheckIcon },
  { label: "Encrypted recordings & transcripts" },
  { label: "SOC 2 and ISO 27001 controls", Icon: ShieldCheckIcon },
];

const CLOSING = {
  text: "Running a collections operation?",
  linkText: "See Vodex for Debt Collection",
  href: "/solutions/debt-collection",
};

export const metadata: Metadata = {
  title: "Vodex — API-First Voice AI for Collection Software",
  description:
    "Add compliant, API-first Voice AI into your debt collection software. Run payment reminders, capture promises-to-pay, and write outcomes back to your platform.",
};

export default function CollectionSoftwarePage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="collection-software-hero-title"
          badgeLabel="Use Case"
          titleLines={
            <>
              Add compliant, API-first Voice
              <br data-hide-mobile /> AI into your{" "}
              <span className="accent">debt collection</span> software
            </>
          }
          lead="Run payment reminders, capture promises-to-pay, and write outcomes back to your collections platform. With pilot-ready and API-first integration."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={solutionHeroBg}
        />
        <SolutionIntegrationSteps
          eyebrow="How it works"
          heading={
            <>
              How the <span className="accent">integration</span> works
            </>
          }
          lead="Vodex is the voice layer for receivables platforms: plug in via API, start campaigns quickly, and keep everything audit-ready."
          steps={STEPS}
          closing={CLOSING}
        />
        <SolutionVoiceLayer
          eyebrow="The gap"
          heading={
            <>
              Why add a <span className="accent">voice</span> layer
            </>
          }
          lead="Collection platforms can manage accounts, track payments, and run workflows, but they can't hold a conversation."
          left={{
            label: "Why Voice AI",
            title: "The conversation your platform can't have",
            description:
              "Your software already knows which accounts to call and when. Voice AI makes the call itself.",
            items: ["Faster right-party contacts", "Fewer manual dials", "Cleaner audit trails"],
          }}
          right={{
            label: "Why Vodex",
            title: "A voice layer without the rebuild",
            description:
              "Vodex adds a Voice AI layer to your platform instantly; no rebuilds required.",
            items: ["Instant integration", "No rebuilds", "Multi-channel consistency"],
          }}
          bgImage="/assets/collection-software-voicelayer-bg.jpg"
        />
        <SolutionIndustries
          eyebrow="Platform"
          heading={
            <>
              Key <span className="accent">capabilities</span>
            </>
          }
          lead="Everything a receivables platform needs to run compliant voice campaigns, from first dial to final report."
          cards={CAPABILITY_CARDS}
        />
        <SolutionWorkflows
          eyebrow="Workflows"
          heading={
            <>
              Four core <span className="accent">workflows</span>
            </>
          }
          lead="The Tier-1 conversations that make up most of a collections floor's day, ready to run from your platform."
          workflows={WORKFLOWS}
          variant="panel"
          columns={4}
          closing={{
            text: "Want the collections team view?",
            linkText: "See how agencies and lenders use Vodex",
            href: "/solutions/debt-collection",
          }}
        />
        <SolutionImpact
          lead="Results banks, collection agencies, lenders, and the software providers who serve them are experiencing."
          groups={IMPACT_GROUPS}
          closing={CLOSING}
        />
        <SolutionCompliance
          lead="Every campaign runs inside guardrails your compliance team can inspect, lock, and audit."
          items={COMPLIANCE_ITEMS}
          closing={CLOSING}
        />
        <Faq />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
