import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Vodex | Privacy Policy",
  description:
    "Read our Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy is our priority, and we are committed to maintaining transparency.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
