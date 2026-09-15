import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Vodex | Terms of Use",
  description:
    "Read our Terms of Use to understand the rules and guidelines for using our services. We are committed to transparency and ensuring a clear user experience.",
  path: "/terms-of-use",
});

export default function Page() {
  return <LegalPage slug="terms-of-use" />;
}
