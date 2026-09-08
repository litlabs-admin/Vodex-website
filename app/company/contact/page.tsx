import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionHero } from "@/components/sections/SolutionHero";
import { ContactDepartments } from "@/components/sections/ContactDepartments";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactOffices } from "@/components/sections/ContactOffices";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import contactHeroBg from "@/public/assets/debt-collection-hero-bg.jpg";

export const metadata: Metadata = {
  title: "Vodex — Contact Us",
  description:
    "Whether you're a potential partner, a curious customer, a talented candidate, or an interested investor, we'd love to hear from you. Let's explore opportunities together.",
};

/**
 * See CLAUDE.md for the reasoning behind this page's two confirmed fixes to
 * the reference mockup: the hero badge (mismatched "Newsroom" leftover from
 * a different page's mockup, fixed to "Contact") and the form's submit
 * controls (a nonsensical "Sign Up" / "Back to Login" pair, fixed to a
 * single "Send Message" button).
 */
export default function ContactPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <SolutionHero
          headingId="contact-hero-title"
          badgeLabel="Contact"
          titleLines={
            <>
              Let&apos;s <span className="accent">talk</span>
            </>
          }
          lead="Whether you're a potential partner, a curious customer, a talented candidate, or an interested investor, we'd love to hear from you. Let's explore opportunities together."
          primaryCta={{ label: "Talk To Our Expert", href: "/demo" }}
          secondaryCta={{ label: "Schedule a Demo", href: "/demo" }}
          bgImage={contactHeroBg}
        />
        <ContactDepartments />
        <ContactForm />
        <ContactOffices />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
