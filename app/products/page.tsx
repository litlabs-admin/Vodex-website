import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductHero } from "@/components/sections/ProductHero";
import { CoreFeatures } from "@/components/sections/CoreFeatures";

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
      </main>
      <Footer />
    </>
  );
}
