import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/hero/TrustStrip";
import { InitiateCall } from "@/components/sections/InitiateCall";
import { IntroducingDros } from "@/components/sections/IntroducingDros";
import { Solutions } from "@/components/sections/Solutions";
import { AutoRedialBanner } from "@/components/sections/AutoRedialBanner";
import { CallSamples } from "@/components/sections/CallSamples";
import { Why } from "@/components/sections/Why";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { Resources } from "@/components/sections/Resources";
import { Faq } from "@/components/sections/Faq";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, organizationSchema, websiteSchema } from "@/lib/structured-data";
import { HOME_FAQS } from "@/lib/faqs";

export const metadata: Metadata = pageMetadata({
  title: "Voice AI for Debt Collection & Automated Outreach | Vodex",
  description:
    "Boost recovery with enterprise Voice AI for debt collection. Automate right-party contact, payment reminders, and promise-to-pay capture with fully compliant, 24/7 conversational agents.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), faqPageSchema(HOME_FAQS)]} />
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <Hero />
        <TrustStrip />
        <InitiateCall />
        <IntroducingDros />
        <Solutions />
        <AutoRedialBanner />
        <CallSamples />
        <Why />
        <FeaturedCaseStudy />
        <Resources />
        <Faq items={HOME_FAQS} />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
