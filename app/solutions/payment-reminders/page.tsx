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
import { BankIcon, PhoneCallIcon, ShieldPlusIcon } from "@/components/ui/icons";
import solutionHeroBg from "@/public/assets/solution-payment-reminders-hero-bg.jpg";

const INDUSTRY_CARDS = [
  {
    title: "Banks & Financial Institutions",
    description:
      "Proactively manage payment reminders regarding credit cards, debts, short-term loans, and more.",
    Icon: BankIcon,
    src: "/assets/industries-banks.jpg",
  },
  {
    title: "Collection Agencies",
    description:
      "First-touch voice AI reminders for upcoming and overdue payments, freeing agents for escalation-worthy cases.",
    Icon: PhoneCallIcon,
    src: "/assets/industries-collection-agencies.jpg",
  },
  {
    title: "Healthcare",
    description:
      "Ensure reduced missed payments with due date reminders, on-day reminders, and more.",
    Icon: ShieldPlusIcon,
    src: "/assets/industries-healthcare.jpg",
  },
];

const WORKFLOWS = [
  {
    title: "Upcoming Due Date Reminders",
    description: "Proactive reminders that help you manage forthcoming customer payments.",
    src: "/assets/workflow-1.jpg",
  },
  {
    title: "Same-Day Payment Reminders",
    description: "Reduce missed payments with same-day reminders at scale.",
    src: "/assets/workflow-2.jpg",
  },
  {
    title: "Grace-Period Follow-Ups",
    description: "Timely and proactive payment reminders to avoid overdues or bad debts.",
    src: "/assets/workflow-3.jpg",
  },
  {
    title: "Overdue Payment Reminders",
    description: "Escalate with a more direct reminder once payments are overdue.",
    src: "/assets/workflow-4.jpg",
  },
  {
    title: "Final & Last-Chance Notifications",
    description: "Inform your customers regarding last-chance notifications to reduce delinquencies.",
    src: "/assets/workflow-5.jpg",
  },
  {
    title: "Promise-to-Pay Confirmations",
    description: "Seek payment confirmations from your customers for proactive debt management.",
    src: "/assets/workflow-6.jpg",
  },
];

const RESULTS_STATS = [
  {
    number: "Up to 30%",
    label: "Timely payment improvements",
    description: "Make a better impact with calls rather than emails or SMS.",
  },
  {
    number: "90–95%",
    label: "Automated Reminders",
    description:
      "Free up agents from repetitive follow-ups and keep accounts on track effortlessly.",
  },
  {
    number: "Up to 40%",
    label: "Faster collections",
    description: "Accelerate recovery timelines without hiring more agents.",
  },
];

export const metadata: Metadata = {
  title: "Vodex — AI Voice Agents for Payment Reminders",
  description:
    "Timely reminders help your customers avoid missed payments and reduce delinquencies.",
};

export default function PaymentRemindersPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="payment-reminders-hero-title"
          badgeLabel="Use Case"
          titleLines={
            <>
              AI Voice Agents for Payment
              <br data-hide-mobile /> <span className="accent">Reminders</span>
            </>
          }
          lead="Timely reminders help your customers avoid missed payments and reduce delinquencies."
          primaryCta={{ label: "Get Started", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={solutionHeroBg}
        />
        <SolutionIndustries
          lead="Wherever a due date matters, an AI voice agent can make the reminder call for you."
          cards={INDUSTRY_CARDS}
        />
        <SolutionWorkflows
          lead="Free your teams from manual follow-ups regarding payment reminders across multiple accounts at scale."
          workflows={WORKFLOWS}
        />
        <SolutionComparison />
        <SolutionResults
          lead="Results our clients report when AI voice agents take over the reminder workload."
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
