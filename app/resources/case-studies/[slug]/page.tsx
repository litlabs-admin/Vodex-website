import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { CaseStudyDetailHeader } from "@/components/case-studies/CaseStudyDetailHeader";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArrowRight } from "@/components/ui/icons";
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
  type CaseStudyFrontmatter,
} from "@/lib/case-studies";
import { renderMdx } from "@/lib/mdx";
import styles from "./page.module.css";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return pageMetadata({
    title: study.title,
    description: study.description,
    path: `/resources/case-studies/${study.slug}`,
    image: study.thumb,
  });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const { content } = await renderMdx<CaseStudyFrontmatter>("case-studies", slug);

  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar solid />
      </header>
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/resources/case-studies" },
            { name: study.title, path: `/resources/case-studies/${study.slug}` },
          ])}
        />
        <CaseStudyDetailHeader study={study} />

        <section className={styles.section}>
          <div className="container">
            <ArticleBody>{content}</ArticleBody>

            {study.pdf && (
              <a
                href={study.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pdfLink}
              >
                Download the full case study (PDF)
                <ArrowRight />
              </a>
            )}
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
