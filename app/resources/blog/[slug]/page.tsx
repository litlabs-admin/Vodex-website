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
import { BLOG_POSTS, getPostBySlug, getRelatedPosts, tocFromBlocks } from "@/lib/blog-posts";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

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

  const toc = tocFromBlocks(post.body);
  const related = getRelatedPosts(post.slug, 3);

  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <ArticleHeader post={post} />

        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              <ArticleToc items={toc} />
              <ArticleBody body={post.body} />
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
