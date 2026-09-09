import "server-only";

import { readFrontmatterDir } from "@/lib/mdx";

/**
 * Real content, migrated from Webflow's "case-studies" collection — see
 * scripts/webflow/. Body sections (About / Challenges / Solutions /
 * Results) live as MDX in content/case-studies/*.mdx; this module reads
 * only the frontmatter for the listing/card views. The detail route
 * (app/resources/case-studies/[slug]/page.tsx) calls lib/mdx.ts's
 * `renderMdx` directly for the compiled body.
 *
 * `statNumber`/`statLabel`/`secondStatNumber`/`secondStatLabel` are kept as
 * derived aliases of `stats[0]`/`stats[1]` specifically so CaseStudyCard
 * and CaseStudyFeatured — both already written against that flat shape —
 * need no changes; only the new detail page reads the full `stats[]` array
 * (Webflow's own data has 3–5 stat pairs per case study, not a fixed 2).
 */

export type CaseStudyStat = { number: string; label: string };

export type CaseStudyFrontmatter = {
  title: string;
  industry: string;
  description: string;
  thumb: string;
  stats: CaseStudyStat[];
  pdf?: string;
  featured?: boolean;
};

export type CaseStudy = CaseStudyFrontmatter & {
  slug: string;
  statNumber: string;
  statLabel: string;
  secondStatNumber?: string;
  secondStatLabel?: string;
};

function loadCaseStudies(): CaseStudy[] {
  const frontmatter = readFrontmatterDir<CaseStudyFrontmatter>("case-studies");
  return frontmatter.map((study) => ({
    ...study,
    statNumber: study.stats[0]?.number ?? "",
    statLabel: study.stats[0]?.label ?? "",
    secondStatNumber: study.stats[1]?.number,
    secondStatLabel: study.stats[1]?.label,
  }));
}

export const CASE_STUDIES: CaseStudy[] = loadCaseStudies();

export function getFeaturedCaseStudy(): CaseStudy {
  return CASE_STUDIES.find((study) => study.featured) ?? CASE_STUDIES[0];
}

export function getGridCaseStudies(): CaseStudy[] {
  const featured = getFeaturedCaseStudy();
  return CASE_STUDIES.filter((study) => study.slug !== featured.slug);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
