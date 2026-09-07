import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductHero } from "@/components/sections/ProductHero";
import { CoreFeatures } from "@/components/sections/CoreFeatures";
import { WhyItWorks } from "@/components/sections/WhyItWorks";
import { WorksWithTools } from "@/components/sections/WorksWithTools";
import { SeeItInAction } from "@/components/sections/SeeItInAction";
import { WhatYourTeamGets } from "@/components/sections/WhatYourTeamGets";
import { Faq } from "@/components/sections/Faq";
import { EnterpriseBand } from "@/components/sections/EnterpriseBand";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Vodex — AI powered phone calls for enterprises",
  description:
    "Effortless, intelligent calling that scales with your business. Human-like conversations, deep system integration, and enterprise-grade standards, built for high call volumes.",
};

export default function ProductsPage() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <ProductHero />
        <CoreFeatures />
        <WhyItWorks />
        <WorksWithTools />
        <SeeItInAction />
        <WhatYourTeamGets />
        <Faq />
        <EnterpriseBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
