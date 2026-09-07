import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/hero/TrustStrip";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
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

export default function HomePage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <Hero />
        <TrustStrip />
        <DashboardShowcase />
        <IntroducingDros />
        <Solutions />
        <AutoRedialBanner />
        <CallSamples />
        <Why />
        <FeaturedCaseStudy />
        <Resources />
        <Faq />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
