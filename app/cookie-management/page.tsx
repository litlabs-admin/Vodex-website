import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Management Policy | Vodex",
  description:
    "Discover how we use cookies to enhance your experience and manage your preferences with transparency. Read our cookie policy for details.",
  path: "/cookie-management",
});

export default function Page() {
  return <LegalPage slug="cookie-management" />;
}
