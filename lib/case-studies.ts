/**
 * Mock content for /resources/case-studies. Same treatment as
 * lib/blog-posts.ts / lib/videos.ts: a plain typed array, no CMS. The
 * featured entry ("Debt Recovery, Improved by 3X") mirrors the landing
 * page's existing FeaturedCaseStudy stats (3X / 7X) — same real numbers,
 * new copy for this page's own card. The 5 grid entries are new, grounded
 * in the exact industries already established on the Debt Collection
 * solutions page (app/solutions/debt-collection/page.tsx's INDUSTRIES
 * array) rather than invented from nothing, reusing that page's own
 * industry photos.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  description: string;
  statNumber: string;
  statLabel: string;
  secondStatNumber?: string;
  secondStatLabel?: string;
  thumb: string;
  featured?: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "debt-recovery",
    title: "Improved by 3X",
    industry: "Debt Recovery",
    description:
      "Learn how a debt collection firm streamlined its outreach operations using Vodex's AI-powered voice agents.",
    statNumber: "3X",
    statLabel: "Debt recovery rate improvement",
    secondStatNumber: "7X",
    secondStatLabel: "Connect rate improvement",
    thumb: "/assets/case-study-bg.jpg",
    featured: true,
  },
  {
    slug: "bnpl-installment-recovery",
    title: "Cutting Missed Installments Without More Headcount",
    industry: "Buy Now Pay Later (BNPL)",
    description:
      "A BNPL provider automated short-term installment reminders and failed-payment follow-ups across a high-volume portfolio.",
    statNumber: "2.4X",
    statLabel: "More installments recovered before default",
    thumb: "/assets/debt-collection-industry-1.png",
  },
  {
    slug: "healthcare-patient-balances",
    title: "Reducing Overdue Patient Balances, Compliantly",
    industry: "Medical & Healthcare",
    description:
      "A healthcare billing team rolled out HIPAA-compliant payment reminders and EOB clarification calls at scale.",
    statNumber: "45%",
    statLabel: "Reduction in 90+ day overdue balances",
    thumb: "/assets/debt-collection-industry-2.jpg",
  },
  {
    slug: "credit-card-delinquency",
    title: "Faster Promise-to-Pay Capture on Delinquent Accounts",
    industry: "Credit Card Payments",
    description:
      "A card issuer replaced manual outbound calling with AI-run delinquency recovery and payment plan negotiation.",
    statNumber: "5X",
    statLabel: "Faster promise-to-pay capture",
    thumb: "/assets/debt-collection-industry-4.jpg",
  },
  {
    slug: "insurance-lapsed-policies",
    title: "Recovering Lapsed Policies Before They're Gone",
    industry: "Insurance Collections",
    description:
      "An insurer used automated reminders to catch missed premium payments before policies lapsed for good.",
    statNumber: "3.1X",
    statLabel: "Lift in lapsed-policy recoveries",
    thumb: "/assets/debt-collection-industry-5.jpg",
  },
  {
    slug: "bank-loan-followups",
    title: "Fewer Manual Calls, More Loans Serviced",
    industry: "Banks & Lending",
    description:
      "A regional lender automated loan repayment follow-ups and card payment reminders across its entire servicing book.",
    statNumber: "60%",
    statLabel: "Fewer manual follow-up calls needed",
    thumb: "/assets/debt-collection-industry-6.jpg",
  },
];

export function getFeaturedCaseStudy(): CaseStudy {
  return CASE_STUDIES.find((study) => study.featured) ?? CASE_STUDIES[0];
}

export function getGridCaseStudies(): CaseStudy[] {
  const featured = getFeaturedCaseStudy();
  return CASE_STUDIES.filter((study) => study.slug !== featured.slug);
}
