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
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Automate Inbound & Outbound Calls with AI Voice Agents",
  description:
    "Automate payment reminders, lead qualification and scheduling with Vodex AI voice agents, improve contact rates and operational efficiency.",
  path: "/products",
});

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
