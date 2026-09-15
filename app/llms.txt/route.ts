import { BLOG_POSTS } from "@/lib/blog-posts";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/seo";

// llms.txt (https://llmstxt.org) — the old Webflow site served a hand-written
// one; generated here so new posts and case studies appear automatically.
export const dynamic = "force-static";

const link = (title: string, path: string, note?: string) =>
  `- [${title}](${path.startsWith("http") ? path : SITE_URL + path})${note ? `: ${note}` : ""}`;

export function GET() {
  const body = [
    "# Vodex — Voice AI for Debt Collection & Automated Outreach",
    "",
    "> Vodex provides enterprise-grade Voice AI agents for debt collection: automated right-party contact, payment reminders, promise-to-pay capture, and compliant outreach at scale (FDCPA, TCPA, Reg F; SOC 2, ISO 27001).",
    "",
    "## Product",
    "",
    link("Product", "/products", "Overview of Vodex AI voice agents and their capabilities"),
    link("Pricing", "/pricing", "Usage-based plans; pay only for connected calls"),
    link("Call Samples", "/resources/call-samples", "Recordings of real Vodex AI voice agent calls"),
    link("Compliance & Security", "/resources/compliance", "Certifications and regulatory adherence"),
    "",
    "## Solutions",
    "",
    link("Debt Collection", "/solutions/debt-collection"),
    link("Payment Reminders", "/solutions/payment-reminders"),
    link("Promise-to-Pay Capture", "/solutions/promise-to-pay"),
    link("Lead Qualification", "/solutions/lead-qualification"),
    link("Collection Software Integration", "/solutions/collection-software"),
    "",
    "## Resources",
    "",
    link("Blog", "/resources/blog"),
    link("Case Studies", "/resources/case-studies"),
    link("Videos", "/resources/videos"),
    link("Research", "/resources/research"),
    link("FAQ", "/resources/faq"),
    link("Docs", "https://docs.vodex.ai/", "Developer and user documentation"),
    link("Help Center", "https://vodexhelpcenter.featurebase.app/help"),
    "",
    "## Blog posts",
    "",
    ...BLOG_POSTS.map((p) => link(p.title, `/resources/blog/${p.slug}`, p.excerpt)),
    "",
    "## Case studies",
    "",
    ...CASE_STUDIES.map((c) => link(c.title, `/resources/case-studies/${c.slug}`, c.description)),
    "",
    "## Company",
    "",
    link("About Us", "/company/about"),
    link("News", "/company/news"),
    link("Investors & Partners", "/company/investors"),
    link("Contact", "/company/contact"),
    link("Careers", "https://careers.vodex.ai/"),
    link("Login", "https://app.vodex.ai/"),
    link("Get started for free", "https://app.vodex.ai/register"),
    "",
    "## Legal",
    "",
    link("Privacy Policy", "/privacy-policy"),
    link("Terms of Use", "/terms-of-use"),
    link("Cookie Policy", "/cookie-management"),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
