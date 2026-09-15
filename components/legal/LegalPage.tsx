import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { Entrance } from "@/components/ui/Entrance";
import { renderMdx } from "@/lib/mdx";
import { rehypeLegalSections } from "@/lib/rehype-legal-sections";
import { LegalSection } from "./LegalSection";
import styles from "./LegalPage.module.css";

export type LegalFrontmatter = { title: string; description: string; lastUpdated?: string };

const CONTACT_EMAIL = "contact@vodex.ai";

/** Shared shell for the legal pages migrated from the old Webflow site
 * (content/legal/*.mdx). Routes keep the old slugs, so no redirect.
 *
 * Layout: a centred intro that eases in on load, then a sticky "On this
 * page" TOC beside the document. The TOC highlights the section in view.
 * The document is split into numbered sections by rehypeLegalSections, and
 * each one reveals as it scrolls into view. */
export async function LegalPage({ slug }: { slug: string }) {
  const { frontmatter, content, toc } = await renderMdx<LegalFrontmatter>("legal", slug, {
    rehypePlugins: [rehypeLegalSections],
    components: { section: LegalSection },
  });

  // Same numbering rehypeLegalSections gives each section: position, padded.
  const tocItems = toc.map((item, i) => ({
    id: item.id,
    text: `${String(i + 1).padStart(2, "0")}. ${item.text}`,
  }));
  const hasToc = tocItems.length >= 2;

  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar solid />
      </header>
      <main>
        {/* Sections server-render in their pre-reveal state (opacity 0) and
            only the client animates them in — keep the document readable
            when JavaScript never runs. */}
        <noscript>
          <style>{`.${styles.section}{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <header className={styles.header}>
          <div className="container">
            <Entrance delay={0}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Legal
              </p>
            </Entrance>
            <Entrance delay={120}>
              <h1 className={styles.title}>{frontmatter.title}</h1>
            </Entrance>
            <Entrance delay={240}>
              <p className={styles.intro}>
                {frontmatter.description}
                {frontmatter.lastUpdated && (
                  <span className={styles.updated}> Last updated: {frontmatter.lastUpdated}.</span>
                )}
              </p>
            </Entrance>
          </div>
        </header>

        <section className={styles.content}>
          <div className="container">
            <div className={`${styles.grid} ${hasToc ? "" : styles.gridNoToc}`}>
              {hasToc && <ArticleToc items={tocItems} />}
              <div className={styles.doc}>
                <ArticleBody>{content}</ArticleBody>
                <LegalSection className={styles.contact}>
                  <p className={styles.contactLead}>
                    {slug === "terms-of-use" ? "Questions about these terms?" : "Questions about this policy?"}
                  </p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactLink}>
                    {CONTACT_EMAIL}
                  </a>
                </LegalSection>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
