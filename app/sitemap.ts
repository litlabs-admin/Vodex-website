import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { CASE_STUDIES } from "@/lib/case-studies";

const SITE_URL = "https://www.vodex.ai";

const STATIC_ROUTES = [
  "/",
  "/products",
  "/pricing",
  "/solutions/payment-reminders",
  "/solutions/promise-to-pay",
  "/solutions/lead-qualification",
  "/solutions/debt-collection",
  "/solutions/collection-software",
  "/resources/blog",
  "/resources/videos",
  "/resources/call-samples",
  "/resources/case-studies",
  "/resources/faq",
  "/resources/research",
  "/resources/compliance",
  "/company/about",
  "/company/news",
  "/company/investors",
  "/company/contact",
];

/**
 * Next's file-convention sitemap — didn't exist before this migration. The
 * cutover ships ~25 permanent redirects (next.config.ts) from vodex.ai's
 * old Webflow URLs; publishing a real sitemap for the new routes alongside
 * those redirects is what makes the migration complete from a crawler's
 * point of view, not just from a visitor's.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/resources/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/resources/case-studies/${study.slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
