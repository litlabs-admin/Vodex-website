import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts, type BlogPostFrontmatter } from "@/lib/blog-posts";
import { renderMdx } from "@/lib/mdx";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

// Every slug this route can ever render comes from content/blog/*.mdx at
// build time (generateStaticParams above) — a request for anything else
// should 404 statically rather than attempting an on-demand render.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `Vodex — ${post.title}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content, toc } = await renderMdx<BlogPostFrontmatter>("blog", slug);
  const related = getRelatedPosts(post.slug, 3);
  const hasToc = toc.length >= 2;

  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar solid />
      </header>
      <main>
        <ArticleHeader post={post} />

        <section className={styles.section}>
          <div className="container">
            <div className={`${styles.grid} ${hasToc ? "" : styles.gridNoToc}`}>
              {hasToc && <ArticleToc items={toc} />}
              <ArticleBody>{content}</ArticleBody>
            </div>
          </div>
        </section>

        {related.length > 0 && <RelatedPosts posts={related} />}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
