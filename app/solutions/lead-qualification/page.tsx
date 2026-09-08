import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { SolutionIndustryStrip } from "@/components/sections/SolutionIndustryStrip";
import { SolutionWorkflows } from "@/components/sections/SolutionWorkflows";
import { SolutionComparison } from "@/components/sections/SolutionComparison";
import { SolutionResults } from "@/components/sections/SolutionResults";
import { SolutionSecurity } from "@/components/sections/SolutionSecurity";
import { Faq } from "@/components/sections/Faq";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import solutionHeroBg from "@/public/assets/lead-qualification-hero-bg.jpg";

const INDUSTRIES = [
  {
    label: "Banking & Credit",
    description: "Pre-qualify credit card and loan applicants before they reach a loan officer.",
    src: "/assets/lead-qualification-industry-1.jpg",
  },
  {
    label: "Education & Student Loans",
    description: "Screen student loan and financing inquiries for eligibility in real time.",
    src: "/assets/lead-qualification-industry-2.jpg",
  },
  {
    label: "Real Estate",
    description: "Qualify property buyers and renters before scheduling a viewing.",
    src: "/assets/lead-qualification-industry-3.jpg",
  },
  {
    label: "Healthcare",
    description: "Verify financing eligibility for procedures and payment plans.",
    src: "/assets/lead-qualification-industry-4.jpg",
  },
  {
    label: "Mortgage & Property Finance",
    description: "Confirm income and eligibility before a mortgage application moves forward.",
    src: "/assets/lead-qualification-industry-5.jpg",
  },
  {
    label: "Insurance",
    description: "Screen policy inquiries for eligibility and coverage fit.",
    src: "/assets/lead-qualification-industry-6.jpg",
  },
  {
    label: "Marketing & Sales Teams",
    description: "Qualify inbound leads the moment they convert, before they go cold.",
    src: "/assets/lead-qualification-industry-7.jpg",
  },
];

const WORKFLOWS = [
  {
    title: "Data Collection & Validation",
    description:
      "Collection and validation of lead information, such as name, contact details, employment, income, needs & preferences.",
    src: "/assets/lead-qualification-workflow-1.jpg",
  },
  {
    title: "Qualification Calls",
    description:
      "Screen leads for eligibility based on pre-set business rules (e.g., loan criteria, insurance plan prerequisites, property buying capability).",
    src: "/assets/lead-qualification-workflow-2.jpg",
  },
  {
    title: "Intent Analysis",
    description:
      "Detect interest level, urgency, and qualification status in real time by analyzing responses and sentiment.",
    src: "/assets/lead-qualification-workflow-3.jpg",
  },
  {
    title: "Compliance & Consent Logging",
    description:
      "Ensure every communication is compliant (e.g., GLBA, TCPA, HIPAA), log disclosures, and handle opt-outs.",
    src: "/assets/lead-qualification-workflow-4.jpg",
  },
  {
    title: "Human Handoff",
    description: "Escalate complex cases or high-value opportunities to live human agents when needed.",
    src: "/assets/lead-qualification-workflow-5.jpg",
  },
  {
    title: "Appointment Scheduling",
    description:
      "Book meetings, site visits, callbacks, or policy walkthroughs automatically without human coordination.",
    src: "/assets/lead-qualification-workflow-6.jpg",
  },
];

const RESULTS_STATS = [
  {
    number: "Up to 35%",
    label: "Higher PTP intent rate",
    description: "Consistent, compliant calls that surface payment intent on the first conversation.",
  },
  {
    number: "Up to 40%",
    label: "Reduction in missed payments",
    description: "Planned reminder sequences keep every commitment on track.",
  },
  {
    number: "Over 28%",
    label: "Lift in PTP conversions",
    description: "Follow-ups, reschedules, and confirmations that never slip through the cracks.",
  },
];

export const metadata: Metadata = {
  title: "Vodex — AI Voice Agents for Loan & Borrower Lead Qualification",
  description:
    "Automate borrower screening and pre-qualification with natural conversations that verify intent, financial readiness, and eligibility for credit or repayment programs.",
};

export default function LeadQualificationPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="lead-qualification-hero-title"
          badgeLabel="Use Case"
          titleLines={
            <>
              AI Voice Agents for Loan &
              <br data-hide-mobile /> Borrower Lead <span className="accent">Qualification</span>
            </>
          }
          lead="Automate borrower screening and pre-qualification with natural conversations that verify intent, financial readiness, and eligibility for credit or repayment programs."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={solutionHeroBg}
        />
        <SolutionIndustryStrip
          lead="Any business handling high lead volumes or time-sensitive inquiries can automate early screening and let human teams focus only on qualified opportunities."
          industries={INDUSTRIES}
        />
        <SolutionWorkflows
          lead="Ensure reduced missed payments, a better recovery rate, and improved customer experience for your borrowers."
          workflows={WORKFLOWS}
        />
        <SolutionComparison />
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
