import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { SolutionIndustries } from "@/components/sections/SolutionIndustries";
import solutionHeroBg from "@/public/assets/solution-payment-reminders-hero-bg.jpg";

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
        <SolutionIndustries />
        {/* Workflows / Comparison / Results / Security / FAQ / Enterprise / Final CTA
            -- out of scope this round, append here later */}
      </main>
      <Footer />
    </>
  );
}
